import { ReactNode, ComponentType } from 'react';
import {OperationType, TableOperations} from "@/lib/table/types/operations";

export type DialogType = 'sidebar' | 'modal';
export type ColumnType = 'text' | 'number' | 'boolean' | 'date' | 'select' | 'custom';

export interface ValidationConfig {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
  options?: { label: string; value: any }[];
}

export interface ColumnConfig {
  key?: string;
  name:string;
  label?: string;
  type: ColumnType;
  sortable?: boolean;
  searchable?: boolean;
  editable?: boolean;
  createEnabled?:boolean;
  required?: boolean;
  validation?: ValidationConfig;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  step?: number;
}


export interface TablePaginationConfig {
  enabled?: boolean;
  dataKey?: string;
  paginationKey?: string;
  pageKey?: string;
  totalPagesKey?: string;
  totalItemsKey?: string;
  itemsPerPageKey?: string;
}

export interface TablePermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface TableStyles {
  table?: string;
  header?: string;
  row?: string;
  cell?: string;
  pagination?: string;
  dialog?: string;
  search?: string;
}

export interface TableActions {
  fetch?: (endpoint: string, params: {
    page: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => Promise<{
    data: any[];
    pagination?: {
      current_page: number;
      total_pages: number;
      total_items: number;
      items_per_page: number;
    };
  }>;
  create?: (data: any,endpoint: string) => Promise<any>;
  update?: (id: number | string, data: any,endpoint: string) => Promise<any>;
  delete?: (id: number | string,endpoint: string) => Promise<any>;
}


export interface TableConfig {
  title: string;
  name: string;
  endpoint: string;
  columns: ColumnConfig[];
  itemsPerPage?: number;
  searchEnabled?: boolean;
  sortEnabled?: boolean;
  createEnabled?: boolean;
  updateEnabled?: boolean;
  deleteEnabled?: boolean;
  dialogType?: DialogType;
  booleanInputType?: 'checkbox' | 'switch';
  customEndpoints?: {
    create?: string;
    update?: string;
    delete?: string;
    get?: string;
  };
  customComponents?: {
    Loading?: ComponentType;
    Empty?: ComponentType;
    Error?: ComponentType<{ error: Error }>;
    Header?: ComponentType;
    Footer?: ComponentType;
    Cell?: Record<string, ComponentType<{ value: any; row: any }>>;
    Input?: Record<string, ComponentType<{ value: any; onChange: (value: any) => void; column: ColumnConfig }>>;
    DialogTitle?: Record<Omit<OperationType, "fetch">, ReactNode>;
    CreateForm?: ComponentType;
    UpdateForm?: ComponentType;
    DeleteConfirm?: ComponentType<{onCancel: (value: any) => void,onConfirm?: (value: any) => void}>;
  };
  actions?: TableActions;
  onRowClick?: (row: any) => void;

  styles?: TableStyles;
  operations?: TableOperations;

  pagination?: TablePaginationConfig;
  permissions?: TablePermissions;

}

export interface TableState {
  data: any[];
  loading: boolean;
  error: Error | null;
  page: number;
  totalPages: number;
  total: number;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  selectedRows: string[];
  isCached:boolean;
}

export interface TableAction {
  type: string;
  payload: any;
}

export interface TableContextType {
  state: TableState;
  config: TableConfig;
  dispatch: (action: TableAction) => void;
}