"use client";

import { useTable } from '../context';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { TableActions } from './TableActions';
import { TableError } from './TableError';
import { TableProvider } from '../context';
import { TableConfig } from '../types';
import { cn } from '@/lib/utils';
import { Card } from "@/components/ui/card";
import { useTableData } from '../hooks/useTableData';

function DataTableContent({ className }: { className?: string }) {
  const { state, config } = useTable();
  useTableData();

  if (state.loading) {
    return (
      <Card className={cn("", className)}>
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </Card>
    );
  }

  if (state.error) {
    return (
      <Card className={cn("p-6", className)}>
        <TableError error={state.error} />
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-auto", className)}>
      <div className="p-6">
        <TableActions />
      </div>
      <div className="rounded-md border">
        <table className={cn("w-full", config.styles?.table)}>
          <TableHeader />
          <TableBody />
        </table>
      </div>
      <div className="p-6">
        <TablePagination />
      </div>
    </Card>
  );
}

export function DataTable({ config, className }: { config: TableConfig; className?: string }) {
  return (
    <TableProvider config={config}>
      <DataTableContent className={className} />
    </TableProvider>
  );
}