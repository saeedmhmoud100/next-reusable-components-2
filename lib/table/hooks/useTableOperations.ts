"use client";

import { useEffect, useCallback, useState, useRef } from 'react';
import { useTableContext } from '../context';
import { TableOperations } from '../types/operations';

export function useTableOperations() {
    const { state, config, dispatch } = useTableContext();
    const [operationLoading, setOperationLoading] = useState<string | null>(null);
    const isMounted = useRef(true);

    const getEndpoint = useCallback((type: 'get' | 'create' | 'update' | 'delete') => {
        const baseEndpoint = `/api/${config.endpoint}`;
        return config.customEndpoints?.[type] || baseEndpoint;
    }, [config.endpoint, config.customEndpoints]);

    const fetchData = useCallback(async () => {
        if (!isMounted.current) return;

        try {
            const endpoint = getEndpoint('get');
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
        }
    }, [config, getEndpoint, state.page, state.searchTerm, state.sortBy, state.sortOrder, dispatch]);

    const wrapOperation = useCallback(async (operation: string, fn: () => Promise<void>) => {
        setOperationLoading(operation);
        try {
            await fn();
        } finally {
            if (isMounted.current) {
                setOperationLoading(null);
            }
        }
    }, []);

    const createItem = useCallback(async (data: any) => {
        await wrapOperation('create', async () => {
            const endpoint = getEndpoint('create');
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create item');
            await fetchData();
        });
    }, [fetchData, getEndpoint, wrapOperation]);

    const updateItem = useCallback(async (id: number | string, data: any) => {
        await wrapOperation('update', async () => {
            const endpoint = getEndpoint('update');
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...data }),
            });
            if (!response.ok) throw new Error('Failed to update item');
            await fetchData();
        });
    }, [fetchData, getEndpoint, wrapOperation]);

    const deleteItem = useCallback(async (id: number | string) => {
        await wrapOperation('delete', async () => {
            const endpoint = getEndpoint('delete');
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error('Failed to delete item');
            await fetchData();
        });
    }, [fetchData, getEndpoint, wrapOperation]);

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
        operationLoading
    };
}