"use client";

import { useTableContext } from '../context';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function TableHeader() {
  const { state, config, dispatch } = useTableContext();

  const handleSort = (column: string) => {
    if (!config.sortEnabled) return;
    const newOrder = state.sortBy === column && state.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch({ type: 'SET_SORT', payload: { column, order: newOrder } });
  };

  return (
    <thead className={cn( config.styles?.header,"bg-primary-background text-primary-foreground")}>
      <tr>
        {config.columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              column.align === 'center' && "text-center",
              column.align === 'right' && "text-right",
              column.width && `w-[${column.width}]`,
              config.styles?.cell
            )}
          >
            {column.sortable && config.sortEnabled ? (
              <button
                onClick={() => handleSort(column.key!)}
                className="group inline-flex items-center space-x-1 hover:text-gray-700"
              >
                <span>{column.label}</span>
                <span className="text-gray-400 group-hover:text-gray-700">
                  {state.sortBy === column.key ? (
                    state.sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </span>
              </button>
            ) : (
              column.label
            )}
          </th>
        ))}
        {
            (config.permissions?.update || config.permissions?.delete) && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
            )

        }
      </tr>
    </thead>
  );
}