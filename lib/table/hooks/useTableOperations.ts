"use client";

import { useEffect, useCallback, useState, useRef } from 'react';
import {useTableContext} from '../context';
import { LoadingState, OperationType } from '../types/operations';

const initialLoadingState: LoadingState = {
    fetch: false,
    create: false,
    update: false,
    delete: false
};

export function useTableOperations() {
    const { state, config, dispatch } = useTableContext();
    const [loading, setLoading] = useState<LoadingState>(initialLoadingState);
    const [operationLoading, setOperationLoading] = useState<string | null>(null);
    const isMounted = useRef(true);

    const getEndpoint = useCallback((type: 'get' | 'create' | 'update' | 'delete') => {
        const baseEndpoint = `/api/${config.endpoint}`;
        return config.customEndpoints?.[type] || baseEndpoint;
    }, [config.endpoint, config.customEndpoints]);

    const setLoadingState = useCallback((operation: OperationType, isLoading: boolean) => {
        if (isMounted.current) {
            setLoading(prev => ({ ...prev, [operation]: isLoading }));
        }
    }, []);

    const fetchData = useCallback(async () => {
        if (!isMounted.current) return;

        try {
            setLoadingState('fetch', true);
            const endpoint = getEndpoint('get');

            // Use custom fetch action if provided
            if (config.actions?.fetch) {
                const result = await config.actions.fetch(endpoint, {
                    page: state.page,
                    searchTerm: state.searchTerm,
                    sortBy: state.sortBy || undefined,
                    sortOrder: state.sortOrder
                });

                if (isMounted.current) {
                    dispatch({
                        type: 'SET_DATA',
                        payload: {
                            data: result.data,
                            page: result.pagination?.current_page || state.page,
                            totalPages: result.pagination?.total_pages || 1,
                            total: result.pagination?.total_items || result.data.length,
                        },
                    });
                }
                return;
            }

            // Default fetch implementation
            const params = new URLSearchParams({
                page: state.page.toString(),
                per_page: (config.itemsPerPage || 10).toString(),
                ...(state.searchTerm && { search: state.searchTerm }),
                ...(state.sortBy && { sort_by: state.sortBy, sort_order: state.sortOrder })
            });

            const response = await fetch(`${endpoint}?${params}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();

            if (isMounted.current) {
                const paginationConfig = config.pagination;
                const dataKey = paginationConfig?.dataKey || 'data';
                const paginationKey = paginationConfig?.paginationKey || 'pagination';
                const pageKey = paginationConfig?.pageKey || 'current_page';
                const totalPagesKey = paginationConfig?.totalPagesKey || 'total_pages';
                const totalItemsKey = paginationConfig?.totalItemsKey || 'total_items';

                const data = paginationConfig?.enabled ? result[dataKey] : result;
                const pagination = result[paginationKey];

                dispatch({
                    type: 'SET_DATA',
                    payload: {
                        data,
                        page: pagination?.[pageKey] || state.page,
                        totalPages: pagination?.[totalPagesKey] || 1,
                        total: pagination?.[totalItemsKey] || data.length,
                    },
                });
            }
        } catch (error) {
            if (isMounted.current) {
                dispatch({
                    type: 'SET_ERROR',
                    payload: error instanceof Error ? error : new Error('Failed to fetch data'),
                });
            }
        } finally {
            setLoadingState('fetch', false);
        }
    }, [config, getEndpoint, state.page, state.searchTerm, state.sortBy, state.sortOrder, dispatch, setLoadingState]);

    const wrapOperation = useCallback(async (operation: OperationType, fn: () => Promise<void>) => {
        setOperationLoading(operation);
        setLoadingState(operation, true);
        try {
            await fn();
        } finally {
            if (isMounted.current) {
                setOperationLoading(null);
                setLoadingState(operation, false);
            }
        }
    }, [setLoadingState]);

    const createItem = useCallback(async (data: any) => {
        await wrapOperation('create', async () => {
            const endpoint = getEndpoint('create');

            // Use custom create action if provided
            if (config.actions?.create) {
                await config.actions.create(data, endpoint);
            } else {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (!response.ok) throw new Error('Failed to create item');
            }
            await fetchData();
        });
    }, [config.actions, fetchData, getEndpoint, wrapOperation]);

    const updateItem = useCallback(async (id: number | string, data: any) => {
        await wrapOperation('update', async () => {
            const endpoint = getEndpoint('update');

            // Use custom update action if provided
            if (config.actions?.update) {
                await config.actions.update(id, data, endpoint);
            } else {
                const response = await fetch(endpoint, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, ...data }),
                });
                if (!response.ok) throw new Error('Failed to update item');
            }
            await fetchData();
        });
    }, [config.actions, fetchData, getEndpoint, wrapOperation]);

    const deleteItem = useCallback(async (id: number | string) => {
        await wrapOperation('delete', async () => {
            const endpoint = getEndpoint('delete');

            // Use custom delete action if provided
            if (config.actions?.delete) {
                await config.actions.delete(id, endpoint);
            } else {
                const response = await fetch(endpoint, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });
                if (!response.ok) throw new Error('Failed to delete item');
            }
            await fetchData();
        });
    }, [config.actions, fetchData, getEndpoint, wrapOperation]);

    useEffect(() => {
        isMounted.current = true;
        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [fetchData]);

    return {
        refetch: fetchData,
        create: createItem,
        update: updateItem,
        delete: deleteItem,
        operationLoading,
        loading
    };
}