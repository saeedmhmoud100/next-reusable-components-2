"use client";

import { useEffect, useCallback } from 'react';
import { useTable } from '../context';
import { TableOperations } from '../types/operations';

export function useTableOperations() {
    const { state, config, dispatch } = useTable();

    const getEndpoint = useCallback((type: 'get' | 'create' | 'update' | 'delete') => {
        const baseEndpoint = `/api/${config.endpoint}`;
        return config.customEndpoints?.[type] || baseEndpoint;
    }, [config.endpoint, config.customEndpoints]);

    // Default operations implementation
    const defaultOperations: TableOperations = {
        fetch: async ({ page, searchTerm, sortBy, sortOrder }) => {
            const endpoint = getEndpoint('get');
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Failed to fetch data');
            let data = await response.json();

            // Apply search if no custom search function
            if (searchTerm && !config.operations?.search) {
                data = defaultOperations.search!(searchTerm, data);
            }

            // Apply sort if no custom sort function
            if (sortBy && !config.operations?.sort) {
                data = defaultOperations.sort!(data, sortBy, sortOrder || 'asc');
            }

            // Apply pagination if no custom pagination function
            if (!config.operations?.paginate) {
                const result = defaultOperations.paginate!(data, page, config.itemsPerPage || 10);
                return { data: result.data, total: result.total };
            }

            return { data, total: data.length };
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
            const totalPages = Math.ceil(total / itemsPerPage);
            const start = (page - 1) * itemsPerPage;
            const paginatedData = data.slice(start, start + itemsPerPage);

            return {
                data: paginatedData,
                total,
                totalPages,
            };
        },
    };

    // Merge custom operations with defaults
    const operations = {
        ...defaultOperations,
        ...config.operations,
    };

    const fetchData = useCallback(async () => {
        if (!state.isCached) {
            dispatch({ type: 'SET_LOADING', payload: true });
        }

        try {
            const result = await operations.fetch!({
                page: state.page,
                searchTerm: state.searchTerm,
                sortBy: state.sortBy || undefined,
                sortOrder: state.sortOrder,
            });

            dispatch({
                type: 'SET_DATA',
                payload: {
                    data: result.data,
                    page: state.page,
                    totalPages: Math.ceil(result.total / (config.itemsPerPage || 10)),
                    total: result.total,
                },
            });
        } catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error : new Error('Failed to fetch data'),
            });
        }
    }, [operations, state.page, state.searchTerm, state.sortBy, state.sortOrder, config.itemsPerPage, dispatch, state.isCached]);

    const createItem = useCallback(async (data: any) => {
        try {
            await operations.create!(data);
            await fetchData();
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    }, [operations, fetchData]);

    const updateItem = useCallback(async (id: number | string, data: any) => {
        try {
            await operations.update!(id, data);
            await fetchData();
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }, [operations, fetchData]);

    const deleteItem = useCallback(async (id: number | string) => {
        try {
            await operations.delete!(id);
            await fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }, [operations, fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        ...operations,
        refetch: fetchData,
        create: createItem,
        update: updateItem,
        delete: deleteItem,
    };
}