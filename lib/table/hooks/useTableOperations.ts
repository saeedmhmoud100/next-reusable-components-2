"use client";

import { useEffect, useCallback, useState, useRef } from 'react';
import { useTable } from '../context';
import { TableOperations } from '../types/operations';

export function useTableOperations() {
    const { state, config, dispatch } = useTable();
    const [operationLoading, setOperationLoading] = useState<string | null>(null);
    const dataCache = useRef<any[]>([]);
    const isMounted = useRef(true);

    const getEndpoint = useCallback((type: 'get' | 'create' | 'update' | 'delete') => {
        const baseEndpoint = `/api/${config.endpoint}`;
        return config.customEndpoints?.[type] || baseEndpoint;
    }, [config.endpoint, config.customEndpoints]);

    const defaultOperations: TableOperations = {
        fetch: async ({ page, searchTerm, sortBy, sortOrder }) => {
            const endpoint = getEndpoint('get');
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Failed to fetch data');
            const rawData = await response.json();

            // Store raw data in cache
            dataCache.current = rawData;

            // Process data in a web worker or async to prevent UI blocking
            return new Promise((resolve) => {
                queueMicrotask(() => {
                    let processedData = [...rawData];

                    if (searchTerm) {
                        processedData = defaultOperations.search!(searchTerm, processedData);
                    }

                    if (sortBy) {
                        processedData = defaultOperations.sort!(processedData, sortBy, sortOrder || 'asc');
                    }

                    const total = processedData.length;
                    const itemsPerPage = config.itemsPerPage || 10;
                    const start = (page - 1) * itemsPerPage;
                    const paginatedData = processedData.slice(start, start + itemsPerPage);

                    resolve({ data: paginatedData, total });
                });
            });
        },

        create: async (data) => {
            const endpoint = getEndpoint('create');
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create item');
            return response.json();
        },

        update: async (id, data) => {
            const endpoint = getEndpoint('update');
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...data }),
            });
            if (!response.ok) throw new Error('Failed to update item');
            return response.json();
        },

        delete: async (id) => {
            const endpoint = getEndpoint('delete');
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error('Failed to delete item');
        },

        search: (term, data) => {
            const searchLower = term.toLowerCase();
            return data.filter(item =>
                Object.entries(item).some(([key, value]) => {
                    const column = config.columns.find(col => col.key === key);
                    return column?.searchable && String(value).toLowerCase().includes(searchLower);
                })
            );
        },

        sort: (data, field, order) => {
            return [...data].sort((a, b) => {
                const aVal = a[field];
                const bVal = b[field];
                const modifier = order === 'desc' ? -1 : 1;

                if (typeof aVal === 'string') {
                    return aVal.localeCompare(bVal) * modifier;
                }
                return ((aVal ?? 0) - (bVal ?? 0)) * modifier;
            });
        },

        paginate: (data, page, itemsPerPage) => {
            const total = data.length;
            const start = (page - 1) * itemsPerPage;
            const paginatedData = data.slice(start, start + itemsPerPage);
            return { data: paginatedData, total };
        },
    };

    const operations = {
        ...defaultOperations,
        ...config.operations,
    };

    const fetchData = useCallback(async () => {
        if (!isMounted.current) return;

        try {
            const result = await operations.fetch!({
                page: state.page,
                searchTerm: state.searchTerm,
                sortBy: state.sortBy || undefined,
                sortOrder: state.sortOrder,
            });

            if (isMounted.current) {
                dispatch({
                    type: 'SET_DATA',
                    payload: {
                        data: result.data,
                        page: state.page,
                        totalPages: Math.ceil(result.total / (config.itemsPerPage || 10)),
                        total: result.total,
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
    }, [operations, state.page, state.searchTerm, state.sortBy, state.sortOrder, config.itemsPerPage, dispatch]);

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
            await operations!.create!(data);
            await fetchData();
        });
    }, [operations, fetchData, wrapOperation]);

    const updateItem = useCallback(async (id: number | string, data: any) => {
        await wrapOperation('update', async () => {
            await operations!.update!(id, data);
            await fetchData();
        });
    }, [operations, fetchData, wrapOperation]);

    const deleteItem = useCallback(async (id: number | string) => {
        await wrapOperation('delete', async () => {
            await operations!.delete!(id);
            await fetchData();
        });
    }, [operations, fetchData, wrapOperation]);

    useEffect(() => {
        isMounted.current = true;
        fetchData();
        return () => {
            isMounted.current = false;
        };
    }, [fetchData]);

    return {
        ...operations,
        refetch: fetchData,
        create: createItem,
        update: updateItem,
        delete: deleteItem,
        operationLoading
    };
}