"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColumnConfig } from '../types';

export function DynamicForm({ columns, initialData, onSubmit }: { 
  columns: ColumnConfig[];
  initialData?: any;
  onSubmit: (data: any) => void;
}) {
  const schema = buildZodSchema(columns);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || buildDefaultValues(columns),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {columns.map((column) => (
          <FormField
            key={column.key}
            control={form.control}
            name={column.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{column.label}</FormLabel>
                <FormControl>
                  {renderFormControl(column, field)}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full">
          {initialData ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}

function buildZodSchema(columns: ColumnConfig[]) {
  const shape: Record<string, z.ZodType<any>> = {};

  columns.forEach(column => {
    let schema: z.ZodType<any>;

    switch (column.type) {
      case 'number':
        schema = z.number();
        if (column.validation?.min !== undefined) schema = schema.min(column.validation.min);
        if (column.validation?.max !== undefined) schema = schema.max(column.validation.max);
        break;
      case 'boolean':
        schema = z.boolean();
        break;
      case 'select':
        schema = z.string();
        if (column.validation?.options) {
          schema = z.enum(column.validation.options.map(opt => opt.value));
        }
        break;
      default:
        schema = z.string();
        if (column.validation?.pattern) {
          schema = schema.regex(new RegExp(column.validation.pattern), column.validation.message);
        }
    }

    if (column.required) {
      shape[column.key] = schema;
    } else {
      shape[column.key] = schema.optional();
    }
  });

  return z.object(shape);
}

function buildDefaultValues(columns: ColumnConfig[]) {
  const defaults: Record<string, any> = {};

  columns.forEach(column => {
    switch (column.type) {
      case 'number':
        defaults[column.key] = 0;
        break;
      case 'boolean':
        defaults[column.key] = false;
        break;
      case 'select':
        defaults[column.key] = column.validation?.options?.[0]?.value || '';
        break;
      default:
        defaults[column.key] = '';
    }
  });

  return defaults;
}

function renderFormControl(column: ColumnConfig, field: any) {
  switch (column.type) {
    case 'number':
      return (
        <Input 
          type="number" 
          step={column.step || 1} 
          {...field}
          onChange={e => field.onChange(parseFloat(e.target.value))}
        />
      );
    case 'boolean':
      return (
        <div className="flex items-center space-x-2">
          <Switch 
            checked={field.value} 
            onCheckedChange={field.onChange}
          />
        </div>
      );
    case 'select':
      return (
        <Select 
          value={field.value} 
          onValueChange={field.onChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {column.validation?.options?.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    default:
      return <Input {...field} />;
  }
}