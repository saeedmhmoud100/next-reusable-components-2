"use client";

import { DynamicForm } from "../DynamicForm";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Operation } from "../../types/dialog";
import { TableConfig } from "../../types";

interface DialogBodyProps {
    config: TableConfig;
    operation: Operation;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}

export function DialogBody({
                               config,
                               operation,
                               onSubmit,
                               onCancel
                           }: DialogBodyProps) {
    if (operation.type === 'delete') {
        return (
            <DeleteConfirmation
                config={config}
                onConfirm={() => onSubmit(operation.data)}
                onCancel={onCancel}
            />
        );
    }

    const CustomForm = operation.type === 'create'
        ? config.customComponents?.CreateForm
        : config.customComponents?.UpdateForm;

    if (CustomForm) {
        return (
            <CustomForm
                data={operation.data}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        );
    }

    const editableColumns = config.columns.filter(col => {
        if (operation.type === 'create') {
            return col.createEnabled !== false && col.key !== 'id';
        }
        return col.editable !== false && col.key !== 'id';
    });

    return (
        <DynamicForm
            columns={editableColumns}
            initialData={operation.data}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
}