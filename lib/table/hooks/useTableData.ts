"use client";

import { useEffect, useCallback } from 'react';
import { useTable } from '../context';

export function useTableData() {
  const { state, config, dispatch } = useTable();

  const fetchData = useCallback(async () => {
    if(!state.isCached){
      dispatch({ type: 'SET_LOADING', payload: true });
    }

    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');

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
  }, [config.columns, config.itemsPerPage, dispatch, state.page, state.searchTerm, state.sortBy, state.sortOrder]);

  const createProduct = useCallback(async (data: any) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create product');
      await fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }, [fetchData]);

  const updateProduct = useCallback(async (id: number, data: any) => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      });
      if (!response.ok) throw new Error('Failed to update product');
      await fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }, [fetchData]);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      await fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { refetch: fetchData, createProduct, updateProduct, deleteProduct };
}