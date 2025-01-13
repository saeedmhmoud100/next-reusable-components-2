"use client";

import {ColumnConfig, TableConfig, TablePaginationConfig} from '../types';

export function generateLabel(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') + 's';
}

export function generateEndpoint(name: string): string {
  return `${name.toLowerCase()}s`;
}

export function generatePolar(name: string): string {
  return `${name.toLowerCase()}s`;
}

export function enhanceColumnConfig(column: Partial<ColumnConfig> & { name: string }): ColumnConfig {
  const key = column.key || column.name.toLowerCase().replace(/\s+/g, '_');
  
  return {
    key,
    name:column.name,
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
  const name = generatePolar(config.name.toLowerCase());
  const title = config.title || generateLabel(config.name);
  const endpoint = config.endpoint || generateEndpoint(config.name);

  const defaultPagination: TablePaginationConfig = {
    enabled: true,
    dataKey: 'data',
    paginationKey: 'pagination',
    pageKey: 'current_page',
    totalPagesKey: 'total_pages',
    totalItemsKey: 'total_items',
    itemsPerPageKey: 'items_per_page'
  };

  return {
    ...config,
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
      pagination: {
      ...defaultPagination,
      ...config.pagination
    },
    permissions:{
      read:true,
      create:true,
      update:true,
      delete:true,
      ...config.permissions,
    },
    styles: {
      table: "min-w-full bg-white rounded-lg overflow-hidden",
      header: "bg-gray-100",
      row: "transition-colors",
      cell: "p-4",
      search: "w-full max-w-sm",
      dialog: "sm:max-w-[425px]",
      ...config.styles
    },
  };
}