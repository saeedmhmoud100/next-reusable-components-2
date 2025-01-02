"use client";

import { TableSearch } from './TableSearch';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTable } from '../context';
import { CrudDialog } from './dialogs/CrudDialog';
import {useState} from "react";

export function TableActions({create}:{create:(data:any)=>{}}) {
  const { state, config, dispatch } = useTable();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH', payload: value });
  };

  const handleCreate = async (data: any) => {
    await create(data);
    setDialogOpen(false);
  };

  return (
    <div className="mb-6 ">
      <div className="flex sm:items-center flex-col gap-8 mb-8 justify-between my-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{config.title}</h2>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center justify-between gap-4 my-8">
          {config.searchEnabled && (
            <TableSearch />
          )}
          {config.createEnabled && (
              <>
                <Button
                    className="flex items-center gap-2"
                    onClick={() => setDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
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