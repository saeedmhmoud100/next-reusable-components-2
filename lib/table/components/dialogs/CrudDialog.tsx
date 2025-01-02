"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DialogHeader } from "./DialogHeader";
import { DialogBody } from "./DialogBody";
import { DialogType, Operation } from "../../types/dialog";
import { TableConfig } from "../../types";

interface CrudDialogProps {
    type: DialogType;
    isOpen: boolean;
    onClose: () => void;
    config: TableConfig;
    operation: Operation;
    onSubmit: (data: any) => Promise<void>;
}

export function CrudDialog({
                               type,
                               isOpen,
                               onClose,
                               config,
                               operation,
                               onSubmit
                           }: CrudDialogProps) {
    const Wrapper = type === 'modal' ? Dialog : Sheet;
    const Content = type === 'modal' ? DialogContent : SheetContent;

    return (
        <Wrapper open={isOpen} onOpenChange={onClose}>
            <Content className={config.styles?.dialog}>
                <div className="flex justify-between items-center">
                    <DialogHeader
                        config={config}
                        operation={operation}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 p-1.5"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <DialogBody
                    config={config}
                    operation={operation}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                />
            </Content>
        </Wrapper>
    );
}