"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTable } from "../../context";
import { useTableData } from "../../hooks/useTableData";
import { DynamicForm } from "../DynamicForm";

export function CreateDialog() {
  const [open, setOpen] = useState(false);
  const { config } = useTable();
  const { createProduct } = useTableData();

  const editableColumns = config.columns.filter(col =>
      col.createEnabled !== false && col.key !== 'id'
  );

  const handleCreate = async (data: any) => {
    await createProduct(data);
    setOpen(false);
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add {config.name}
          </Button>
        </DialogTrigger>
        <DialogContent className={config.styles?.dialog}>
          <DialogHeader>
            <DialogTitle>
              {config.customComponents?.DialogTitle?.create || `Create ${config.name}`}
            </DialogTitle>
          </DialogHeader>
          <DynamicForm
              columns={editableColumns}
              onSubmit={handleCreate}
          />
        </DialogContent>
      </Dialog>
  );
}