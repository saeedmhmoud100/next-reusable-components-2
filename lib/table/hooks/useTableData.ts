"use client";

import { useEffect, useCallback } from 'react';
import { useTableContext } from '../context';

export function useTableData() {
  const { state, config, dispatch } = useTableContext();

  const getEndpoint = useCallback((type: 'get' | 'create' | 'update' | 'delete') => {
    const baseEndpoint = `/api/${config.endpoint}`;
    return config.customEndpoints?.[type] || baseEndpoint;
  }, [config.endpoint, config.customEndpoints]);

  const fetchData = useCallback(async () => {

    if(!state.isCached){
      dispatch({ type: 'SET_LOADING', payload: true });
    }

    try {
      const endpoint = getEndpoint('get');
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch data');

      let data = await response.json();

      // Search
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        data = data.filter((item: any) =>
            Object.entries(item).some(([key, value]) => {
              const column = config.columns.find(col => col.key === key);
              return column?.searchable && String(value).toLowerCase().includes(searchLower);
            })
        );
      }

      // Sort
      if (state.sortBy) {
        data.sort((a: any, b: any) => {
          const aVal = a[state.sortBy!];
          const bVal = b[state.sortBy!];
          const modifier = state.sortOrder === 'desc' ? -1 : 1;

          if (typeof aVal === 'string') {
            return aVal.localeCompare(bVal) * modifier;
          }
          return ((aVal ?? 0) - (bVal ?? 0)) * modifier;
        });
      }

      // Pagination
      const total = data.length;
      const totalPages = Math.ceil(total / (config.itemsPerPage || 10));
      const start = (state.page - 1) * (config.itemsPerPage || 10);
      const paginatedData = data.slice(start, start + (config.itemsPerPage || 10));

      dispatch({
        type: 'SET_DATA',
        payload: {
          data: paginatedData,
          page: state.page,
          totalPages,
          total
        }
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error : new Error('Failed to process data')
      });
    }
  }, [config.columns, config.itemsPerPage, dispatch, state.page, state.searchTerm, state.sortBy, state.sortOrder, getEndpoint]);

  const createItem = useCallback(async (data: any) => {
    try {
      const endpoint = getEndpoint('create');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create item');
      await fetchData();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }, [fetchData, getEndpoint]);

  const updateItem = useCallback(async (id: number, data: any) => {
    try {
      const endpoint = getEndpoint('update');
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });
      if (!response.ok) throw new Error('Failed to update item');
      await fetchData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }, [fetchData, getEndpoint]);

  const deleteItem = useCallback(async (id: number) => {
    try {
      const endpoint = getEndpoint('delete');
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete item');
      await fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }, [fetchData, getEndpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    refetch: fetchData,
    create: createItem,
    update: updateItem,
    delete: deleteItem
  };
}