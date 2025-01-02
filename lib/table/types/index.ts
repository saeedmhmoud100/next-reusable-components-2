import { ReactNode, ComponentType } from 'react';

export type DialogType = 'sidebar' | 'modal';
export type OperationType = 'create' | 'update' | 'delete';
export type ColumnType = 'text' | 'number' | 'boolean' | 'date' | 'select' | 'custom';

export interface ValidationConfig {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
  options?: { label: string; value: any }[];
}

export interface ColumnConfig {
  key: string;
  label: string;
  type: ColumnType;
  sortable?: boolean;
  searchable?: boolean;
  editable?: boolean;
  required?: boolean;
  validation?: ValidationConfig;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  step?: number;
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
    DialogTitle?: Record<OperationType, ReactNode>;
    CreateForm?: ComponentType;
    UpdateForm?: ComponentType;
    DeleteConfirm?: ComponentType;
  };
  styles?: {
    table?: string;
    header?: string;
    row?: string;
    cell?: string;
    pagination?: string;
    search?: string;
    dialog?: string;
  };
  onRowClick?: (row: any) => void;
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