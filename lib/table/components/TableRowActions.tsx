"use client";

import { useTable } from '../context';
import { UpdateDialog } from './dialogs/UpdateDialog';
import { DeleteDialog } from './dialogs/DeleteDialog';

export function TableRowActions({ row }: { row: any }) {
  const { config } = useTable();

  return (
    <div className="flex justify-end gap-2">
      {config.updateEnabled && <UpdateDialog row={row} />}
      {config.deleteEnabled && <DeleteDialog row={row} />}
    </div>
  );
}