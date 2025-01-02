"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { TableContextType, TableState, TableAction, TableConfig } from './types';

const TableContext = createContext<TableContextType | undefined>(undefined);

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  total: 0,
  sortBy: null,
  sortOrder: 'asc',
  searchTerm: '',
  selectedRows: [],
  isCached:false
};

function tableReducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case 'SET_DATA':
      return { 
        ...state, 
        data: action.payload.data,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        total: action.payload.total,
        loading: false, 
        error: null,
        isCached:true,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_SORT':
      return { 
        ...state, 
        sortBy: action.payload.column, 
        sortOrder: action.payload.order,
        page: 1 
      };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload, page: 1 };
    case 'TOGGLE_ROW_SELECTION':
      const selectedRows = state.selectedRows.includes(action.payload)
        ? state.selectedRows.filter((id: any) => id !== action.payload)
        : [...state.selectedRows, action.payload];
      return { ...state, selectedRows };
    default:
      return state;
  }
}

export function TableProvider({ children, config }: { children: ReactNode; config: TableConfig }) {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  return (
    <TableContext.Provider value={{ state, config, dispatch }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
}