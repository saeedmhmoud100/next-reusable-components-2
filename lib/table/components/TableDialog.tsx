"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useTableContext } from '../context';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogType, ColumnConfig } from '../types';

interface TableDialogProps {
  type: DialogType;
  row?: any;
}

export function TableDialog({ type, row }: TableDialogProps) {
  const [open, setOpen] = useState(false);
  const { config } = useTableContext();

  const handleAction = async (data?: any) => {
    setOpen(false);
  };

  const columns = config.columns.filter(col => 
    type === 'create' ? col.createEnabled !== false : col.editable !== false
  );

  const schema = buildZodSchema(columns);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: row || buildDefaultValues(columns),
  });

  if (type === 'delete') {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {config.customComponents?.DialogTitle?.delete || `Delete ${config.name}`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {config.name.toLowerCase()}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction()} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type === 'create' ? (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add {config.name}
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={config.styles?.dialog}>
        <DialogHeader>
          <DialogTitle>
            {config.customComponents?.DialogTitle?.[type] || `${type === 'create' ? 'Create' : 'Edit'} ${config.name}`}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className="space-y-4">
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
              {type === 'create' ? 'Create' : 'Update'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
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