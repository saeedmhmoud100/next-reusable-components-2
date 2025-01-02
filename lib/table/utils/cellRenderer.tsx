"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnConfig } from '../types';

export interface CellRendererProps {
  value: any;
  row: any;
  column: ColumnConfig;
  customComponents?: Record<string, React.ComponentType<any>>;
}

export function renderCell({ value, row, column, customComponents }: CellRendererProps) {
  // Check for custom component first
  const CustomCell = customComponents?.[column.key];
  if (CustomCell) {
    return <CustomCell value={value} row={row} />;
  }

  // Use column's format function if provided
  if (column.format) {
    return column.format(value);
  }

  // Default renderers based on column type
  switch (column.type) {
    case 'boolean':
      return (
        <Badge 
          variant={value ? "success" : "destructive"}
          className="font-medium"
        >
          {value ? 'In Stock' : 'Out of Stock'}
        </Badge>
      );
    
    case 'number':
      if (column.step) {
        const decimals = -Math.log10(column.step);
        return value?.toFixed(decimals);
      }
      return value;
      
    case 'date':
      return value ? new Date(value).toLocaleDateString() : '';
      
    default:
      return value ?? '';
  }
}