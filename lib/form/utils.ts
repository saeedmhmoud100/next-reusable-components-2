import { z } from 'zod';
import { FieldConfig } from './types';

export const generateValidationSchema = (fields: FieldConfig[]) => {
    const schema: Record<string, any> = {};

    fields.forEach((field) => {
        let fieldSchema = z.any();

        switch (field.type) {
            case 'email':
                fieldSchema = z.string().email('Invalid email address');
                break;
            case 'number':
                fieldSchema = z.number();
                if (field.validation?.min !== undefined) {
                    fieldSchema = fieldSchema.min(field.validation.min);
                }
                if (field.validation?.max !== undefined) {
                    fieldSchema = fieldSchema.max(field.validation.max);
                }
                break;
            default:
                fieldSchema = z.string();
        }

        if (field.validation?.required) {
            fieldSchema = fieldSchema.min(1, 'This field is required');
        }

        if (field.validation?.minLength) {
            fieldSchema = fieldSchema.min(field.validation.minLength, `Minimum length is ${field.validation.minLength}`);
        }

        if (field.validation?.maxLength) {
            fieldSchema = fieldSchema.max(field.validation.maxLength, `Maximum length is ${field.validation.maxLength}`);
        }

        if (field.validation?.pattern) {
            fieldSchema = fieldSchema.regex(field.validation.pattern);
        }

        schema[field.name] = fieldSchema;
    });

    return z.object(schema);
};