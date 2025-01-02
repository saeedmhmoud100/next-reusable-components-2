"use client";

export type DialogType = 'modal' | 'sidebar';
export type OperationType = 'create' | 'update' | 'delete';

export interface Operation {
    type: OperationType;
    data?: any;
}

export interface DialogProps {
    type: DialogType;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}