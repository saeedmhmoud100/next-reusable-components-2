"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTableContext } from '../context';
import { TableSearch } from './TableSearch';
import { CrudDialog } from './dialogs/CrudDialog';
import { LoadingSpinner } from './LoadingSpinner';
import {useTableHook} from "@/lib/table/hooks";

export function TableActions() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { config, dispatch } = useTableContext();
  const { create, operationLoading } = useTableHook();

  const handleSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH', payload: value });
  };

  const handleCreate = async (data: any) => {
    await create(data);
    setDialogOpen(false);
  };

  // Check create permission
  const canCreate = config.permissions?.create && config.createEnabled;
  return (
      <div className="mb-6">
        <div className="flex sm:items-center flex-col gap-8 mb-8 justify-between my-8">
          <div style={{marginBottom:"20px"}}>
            <h2 className="text-2xl font-semibold text-gray-900">{config.title}</h2>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center justify-between gap-4 my-8">
            {config.searchEnabled && <TableSearch />}
            {canCreate && (
                <>
                  <Button
                      className="flex items-center gap-2 min-w-[120px] justify-center"
                      onClick={() => setDialogOpen(true)}
                      disabled={operationLoading === 'create'}
                  >
                    {operationLoading === 'create' ? (
                        <LoadingSpinner size="sm" />
                    ) : (
                        <Plus className="h-4 w-4" />
                    )}
                    Add {config.name}
                  </Button>
                  <CrudDialog
                      type={config.dialogType || 'modal'}
                      isOpen={dialogOpen}
                      onClose={() => setDialogOpen(false)}
                      config={config}
                      operation={{ type: 'create' }}
                      onSubmit={handleCreate}
                  />
                </>
            )}
          </div>
        </div>
      </div>
  );
}