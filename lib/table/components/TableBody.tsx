"use client";

import { useTableContext } from '../context';
import { cn } from '@/lib/utils';
import { TableRowActions } from './TableRowActions';

export function TableBody() {
  const { state, config } = useTableContext();
  if (state.data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={config.columns.length + 1}
            className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap"
          >
            No results found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-gray-200">
      {state.data.map((row, index) => (
        <tr
          key={row.id || index}
          className={cn(
            "transition-colors",
            config.styles?.row
          )}
        >
          {config.columns.map((column) => {
            const CustomCell = config.customComponents?.Cell?.[column.key!];
            const value = row[column.key!];
            return (
              <td
                key={column.key}
                className={cn(
                  config.styles?.cell,
                  "px-6 py-4 text-sm whitespace-nowrap",
                  column.align === 'center' && "text-center",
                  column.align === 'right' && "text-right",
                )}
              >
                {CustomCell ? (
                  <CustomCell value={value} row={row} />
                ) : (
                  value
                )}
              </td>
            );
          })}
          {
            (config.permissions?.update || config.permissions?.delete) && (
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <TableRowActions row={row}/>
                  </td>)
          }
        </tr>
      ))}
    </tbody>
  );
}