"use client";

import { useEffect, useCallback } from 'react';
import { useTable } from '../context';
import { generateMockProducts } from '../utils/mockData';

// Store products in memory for demo purposes
let products = generateMockProducts(50);

export function useTableData() {
  const { state, config, dispatch } = useTable();

  const fetchData = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      let filteredData = [...products];

      // Search
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filteredData = filteredData.filter(item => 
          Object.entries(item).some(([key, value]) => {
            const column = config.columns.find(col => col.key === key);
            return column?.searchable && String(value).toLowerCase().includes(searchLower);
          })
        );
      }

      // Sort
      if (state.sortBy) {
        filteredData.sort((a, b) => {
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
      const total = filteredData.length;
      const totalPages = Math.ceil(total / (config.itemsPerPage || 10));
      const start = (state.page - 1) * (config.itemsPerPage || 10);
      const paginatedData = filteredData.slice(start, start + (config.itemsPerPage || 10));

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

  // Data manipulation functions
  const createProduct = useCallback((data: any) => {
    const newProduct = {
      ...data,
      id: products.length + 1
    };
    products = [...products, newProduct];
    fetchData();
  }, [fetchData]);

  const updateProduct = useCallback((id: number, data: any) => {
    products = products.map(product => 
      product.id === id ? { ...product, ...data } : product
    );
    fetchData();
  }, [fetchData]);

  const deleteProduct = useCallback((id: number) => {
    products = products.filter(product => product.id !== id);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { refetch: fetchData, createProduct, updateProduct, deleteProduct };
}