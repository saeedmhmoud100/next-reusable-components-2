'use client';

import React from 'react';
import { FieldProps, CustomFieldProps } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const Field: React.FC<FieldProps> = ({ config, form, error }) => {
    const { register, watch, setValue } = form;
    const value = watch(config.name);

    if (config.type === 'custom' && config.customRender) {
        const customProps: CustomFieldProps = {
            config,
            form,
            error,
            value,
            onChange: (newValue) => setValue(config.name, newValue),
            onBlur: () => form.trigger(config.name),
        };
        return config.customRender(customProps);
    }

    const renderField = () => {
        switch (config.type) {
            case 'textarea':
                return (
                    <Textarea
                        id={config.name}
                        {...register(config.name)}
                        placeholder={config.placeholder}
                        className={cn(config.className)}
                        disabled={config.disabled}
                    />
                );

            case 'select':
                return (
                    <Select
                        onValueChange={(value) => setValue(config.name, value)}
                        defaultValue={config.defaultValue}
                        disabled={config.disabled}
                    >
                        <SelectTrigger className={cn(config.className)}>
                            <SelectValue placeholder={config.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {config.options?.map((option) => (
                                <SelectItem key={option.value.toString()} value={option.value.toString()}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={config.name}
                            {...register(config.name)}
                            disabled={config.disabled}
                            defaultChecked={config.defaultValue}
                            className={cn(config.className)}
                        />
                        <Label htmlFor={config.name} className={cn(config.labelClassName)}>
                            {config.label}
                        </Label>
                    </div>
                );

            case 'radio':
                return (
                    <RadioGroup
                        onValueChange={(value) => setValue(config.name, value)}
                        defaultValue={config.defaultValue}
                        disabled={config.disabled}
                        className={cn(config.className)}
                    >
                        {config.options?.map((option) => (
                            <div key={option.value.toString()} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value.toString()} id={`${config.name}-${option.value}`} />
                                <Label
                                    htmlFor={`${config.name}-${option.value}`}
                                    className={cn(config.labelClassName)}
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            default:
                return (
                    <Input
                        id={config.name}
                        type={config.type}
                        {...register(config.name)}
                        placeholder={config.placeholder}
                        className={cn(config.className)}
                        disabled={config.disabled}
                    />
                );
        }
    };

    return (
        <div className={cn("space-y-2", config.containerClassName)}>
            {config.type !== 'checkbox' && (
                <Label htmlFor={config.name} className={cn(config.labelClassName)}>
                    {config.label}
                </Label>
            )}
            {renderField()}
            {error && (
                <p className={cn("text-sm text-destructive", config.errorClassName)}>
                    {error}
                </p>
            )}
        </div>
    );
};