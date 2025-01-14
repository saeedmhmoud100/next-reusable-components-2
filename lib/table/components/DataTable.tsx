"use client";

import { useTableContext } from '../context';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { TableActions } from './TableActions';
import { TableError } from './TableError';
import { TableProvider } from '../context';
import { TableConfig } from '../types';
import { cn } from '@/lib/utils';
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from './LoadingSpinner';
import {enhanceTableConfig} from "@/lib/table/utils";

function DataTableContent({ className }: { className?: string }) {
    const { state, config } = useTableContext();

    // Check read permission
    if (config.permissions?.read === false) {
        return (
            <Card className={cn("p-6", className)}>
                <div className="text-center text-muted-foreground">
                    You don't have permission to view this data.
                </div>
            </Card>
        );
    }

    if (state.loading) {
        return (
            <Card className={cn("", className)}>
                <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-sm text-muted-foreground">Loading data...</p>
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
            <div className="rounded-md border ">
                <table className={cn(config.styles?.table,"w-full bg-primary-foreground text-secondary-foreground text-foreground")}>
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
        <TableProvider config={enhanceTableConfig(config)}>
            <DataTableContent className={className} />
        </TableProvider>
    );
}