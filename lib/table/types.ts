export type DialogType = 'create' | 'update' | 'delete';

export interface ColumnConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'select';
  sortable?: boolean;
  searchable?: boolean;
  editable?: boolean;
  createEnabled?: boolean;
  required?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
    options?: { label: string; value: any }[];
  };
  step?: number;
}

export interface TableConfig {
  name: string;
  title: string;
  endpoint: string;
  columns: ColumnConfig[];
  itemsPerPage?: number;
  searchEnabled?: boolean;
  sortEnabled?: boolean;
  createEnabled?: boolean;
  updateEnabled?: boolean;
  deleteEnabled?: boolean;
  styles?: {
    table?: string;
    header?: string;
    row?: string;
    cell?: string;
    pagination?: string;
    dialog?: string;
  };
  customComponents?: {
    Cell?: Record<string, React.ComponentType<any>>;
    DialogTitle?: Record<DialogType, string>;
  };
}