"use client";

import { ColumnConfig, TableConfig } from '../types';

export function generateLabel(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function generateEndpoint(name: string): string {
  return `${name.toLowerCase()}s`;
}

export function enhanceColumnConfig(column: Partial<ColumnConfig> & { name: string }): ColumnConfig {
  const key = column.name.toLowerCase().replace(/\s+/g, '_');
  
  return {
    key,
    label: column.label || generateLabel(key),
    type: column.type || 'text',
    sortable: column.sortable ?? true,
    searchable: column.searchable ?? (column.type === 'text'),
    editable: column.editable ?? true,
    required: column.required ?? false,
    validation: column.validation,
    width: column.width,
    align: column.align,
    format: column.format,
    step: column.step
  };
}

export function enhanceTableConfig(config: Partial<TableConfig> & { name: string }): TableConfig {
  const name = config.name.toLowerCase();
  const title = config.title || generateLabel(name);
  const endpoint = config.endpoint || generateEndpoint(name);

  return {
    name,
    title,
    endpoint,
    columns: config.columns?.map(col => 
      'name' in col ? enhanceColumnConfig(col) : col
    ) || [],
    itemsPerPage: config.itemsPerPage || 10,
    searchEnabled: config.searchEnabled ?? true,
    sortEnabled: config.sortEnabled ?? true,
    createEnabled: config.createEnabled ?? true,
    updateEnabled: config.updateEnabled ?? true,
    deleteEnabled: config.deleteEnabled ?? true,
    dialogType: config.dialogType || 'modal',
    booleanInputType: config.booleanInputType || 'switch',
    customComponents: config.customComponents || {},
    styles: {
      table: "min-w-full bg-white rounded-lg overflow-hidden",
      header: "bg-gray-100",
      row: "hover:bg-gray-50 transition-colors",
      cell: "p-4",
      pagination: "bg-white border-t p-4",
      search: "w-full max-w-sm",
      dialog: "sm:max-w-[425px]",
      ...config.styles
    }
  };
}