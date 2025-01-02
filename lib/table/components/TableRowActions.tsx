"use client";

import { useState } from 'react';
import { useTable } from '../context';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { CrudDialog } from './dialogs/CrudDialog';

export function TableRowActions({ row, updateItem, deleteItem }: { row: any,updateItem:() =>{},deleteItem:() =>{} }) {
  const [operation, setOperation] = useState<{ type: 'update' | 'delete', isOpen: boolean }>({
    type: 'update',
    isOpen: false
  });

  const { config } = useTable();

  const handleUpdate = async (data: any) => {
    await updateItem(row.id, data);
    setOperation(prev => ({ ...prev, isOpen: false }));
  };

  const handleDelete = async () => {
    await deleteItem(row.id);
    setOperation(prev => ({ ...prev, isOpen: false }));
  };

  return (
      <div className="flex justify-end gap-2">
        {config.updateEnabled && (
            <>
              <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setOperation({ type: 'update', isOpen: true })}
              >
                <Pencil className="h-4 w-4" />
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

        {config.deleteEnabled && (
            <>
              <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  onClick={() => setOperation({ type: 'delete', isOpen: true })}
              >
                <Trash2 className="h-4 w-4" />
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