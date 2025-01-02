"use client";

import {AlertDialogHeader, AlertDialogFooter} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {TableConfig} from "../../types";
import {ComponentType, ReactNode} from "react";

interface DeleteConfirmationProps {
    config: TableConfig;
    onConfirm: () => void;
    onCancel: () => void;
}

type CustomDeleteProps = (ComponentType | undefined)

export function DeleteConfirmation({
                                       config,
                                       onConfirm,
                                       onCancel
                                   }: DeleteConfirmationProps) {
    const CustomDelete = config.customComponents?.DeleteConfirm;

    if (CustomDelete) {
        return <CustomDelete onConfirm={onConfirm} onCancel={onCancel}/>;
    }

    return (
        <div className="space-y-4">
            <AlertDialogHeader>
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this {config.name.toLowerCase()}?
                    This action cannot be undone.
                </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirm}>
                    Delete
                </Button>
            </AlertDialogFooter>
        </div>
    );
}