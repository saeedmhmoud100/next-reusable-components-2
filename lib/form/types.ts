import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

export type FieldType =
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'custom';

export interface SelectOption {
    label: string;
    value: string | number;
}

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: SelectOption[];
    validation?: {
        required?: boolean;
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        custom?: (value: any) => boolean | string;
    };
    defaultValue?: any;
    disabled?: boolean;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    customRender?: (props: CustomFieldProps) => React.ReactNode;
}

export interface FormConfig {
    fields: FieldConfig[];
    onSubmit: (data: any) => void | Promise<void>;
    className?: string;
    submitButtonText?: string;
    resetButtonText?: string;
    showReset?: boolean;
    submitButtonClassName?: string;
    resetButtonClassName?: string;
    buttonsContainerClassName?: string;
}

export interface DynamicFormProps extends FormConfig {
    initialValues?: Record<string, any>;
}

export interface FieldProps {
    config: FieldConfig;
    form: UseFormReturn<any>;
    error?: string;
}

export interface CustomFieldProps extends FieldProps {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
}