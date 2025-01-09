'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicFormProps } from './types';
import { generateValidationSchema } from './utils';
import { Field } from './Field';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const DynamicForm: React.FC<DynamicFormProps> = ({
                                                            fields,
                                                            onSubmit,
                                                            initialValues,
                                                            className,
                                                            submitButtonText = 'Submit',
                                                            resetButtonText = 'Reset',
                                                            showReset = true,
                                                            submitButtonClassName,
                                                            resetButtonClassName,
                                                            buttonsContainerClassName,
                                                        }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validationSchema = generateValidationSchema(fields);

    const form = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: initialValues,
    });

    const { handleSubmit, reset, formState: { errors } } = form;

    const handleFormSubmit = async (data: any) => {
        try {
            setIsSubmitting(true);
            await onSubmit(data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('space-y-6', className)}>
            <div className="space-y-4">
                {fields.map((field) => (
                    <Field
                        key={field.name}
                        config={field}
                        form={form}
                        error={errors[field.name]?.message as string}
                    />
                ))}
            </div>

            <div className={cn("flex space-x-2", buttonsContainerClassName)}>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={submitButtonClassName}
                >
                    {isSubmitting ? "Submitting..." : submitButtonText}
                </Button>
                {showReset && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => reset()}
                        disabled={isSubmitting}
                        className={resetButtonClassName}
                    >
                        {resetButtonText}
                    </Button>
                )}
            </div>
        </form>
    );
};