"use client";

import { CreateDialog } from './dialogs/CreateDialog';
import { useTable } from '../context';
import { TableSearch } from './TableSearch';

export function TableActions() {
  const { state, config, dispatch } = useTable();

  const handleSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH', payload: value });
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
          {config.createEnabled && <CreateDialog />}
        </div>
      </div>
    </div>
  );
}