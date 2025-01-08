"use client";

import { useState } from 'react';
import { useTable } from '../context';
import { useTableOperations } from '../hooks/useTableOperations';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { CrudDialog } from './dialogs/CrudDialog';
import { LoadingSpinner } from './LoadingSpinner';

export function TableRowActions({ row }: { row: any }) {
  const [operation, setOperation] = useState<{ type: 'update' | 'delete', isOpen: boolean }>({
    type: 'update',
    isOpen: false
  });

  const { config } = useTable();
  const { update, delete: deleteItem, operationLoading } = useTableOperations();

  // Check permissions
  const canUpdate = config.permissions?.update && config.updateEnabled;
  const canDelete = config.permissions?.delete && config.deleteEnabled;

  const handleUpdate = async (data: any) => {
    await update(row.id, data);
    setOperation(prev => ({ ...prev, isOpen: false }));
  };

  const handleDelete = async () => {
    await deleteItem(row.id);
    setOperation(prev => ({ ...prev, isOpen: false }));
  };

  if (!canUpdate && !canDelete) return null;

  return (
      <div className="flex justify-end gap-2">
        {canUpdate && (
            <>
              <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setOperation({ type: 'update', isOpen: true })}
                  disabled={operationLoading === 'update'}
              >
                {operationLoading === 'update' ? (
                    <LoadingSpinner size="sm" />
                ) : (
                    <Pencil className="h-4 w-4" />
                )}
              </Button>
              {operation.type === 'update' && (
                  <CrudDialog
                      type={config.dialogType || 'modal'}
                      isOpen={operation.isOpen}
                      onClose={() => setOperation(prev => ({ ...prev, isOpen: false }))}
                      config={config}
                      operation={{ type: 'update', data: row }}
                      onSubmit={handleUpdate}
                  />
              )}
            </>
        )}

        {canDelete && (
            <>
              <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  onClick={() => setOperation({ type: 'delete', isOpen: true })}
                  disabled={operationLoading === 'delete'}
              >
                {operationLoading === 'delete' ? (
                    <LoadingSpinner size="sm" className="border-destructive border-t-transparent" />
                ) : (
                    <Trash2 className="h-4 w-4" />
                )}
              </Button>
              {operation.type === 'delete' && (
                  <CrudDialog
                      type={config.dialogType || 'modal'}
                      isOpen={operation.isOpen}
                      onClose={() => setOperation(prev => ({ ...prev, isOpen: false }))}
                      config={config}
                      operation={{ type: 'delete', data: row.id }}
                      onSubmit={handleDelete}
                  />
              )}
            </>
        )}
      </div>
  );
}