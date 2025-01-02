"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { SheetTitle } from "@/components/ui/sheet";
import { Operation } from "../../types/dialog";
import { TableConfig } from "../../types";

interface DialogHeaderProps {
    config: TableConfig;
    operation: Operation;
}

export function DialogHeader({ config, operation }: DialogHeaderProps) {
    const title = config.customComponents?.DialogTitle?.[operation.type] ||
        `${operation.type === 'create' ? 'Create' : operation.type === 'update' ? 'Update' : 'Delete'} ${config.name}`;

    return (
        <div className="mb-4">
            {config.dialogType === 'modal' ? (
                <DialogTitle>{title}</DialogTitle>
            ) : (
                <SheetTitle>{title}</SheetTitle>
            )}
        </div>
    );
}