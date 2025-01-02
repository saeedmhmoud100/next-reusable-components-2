"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useTable } from "../../context";
import { useTableData } from "../../hooks/useTableData";
import { DynamicForm } from "../DynamicForm";

export function UpdateDialog({ row }: { row: any }) {
  const [open, setOpen] = useState(false);
  const { config } = useTable();
  const { updateProduct } = useTableData();

  const editableColumns = config.columns.filter(col =>
      col.editable !== false && col.key !== 'id'
  );

  const handleUpdate = async (data: any) => {
    await updateProduct(row.id, data);
    setOpen(false);
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className={config.styles?.dialog}>
          <DialogHeader>
            <DialogTitle>
              {config.customComponents?.DialogTitle?.update || `Edit ${config.name}`}
            </DialogTitle>
          </DialogHeader>
          <DynamicForm
              columns={editableColumns}
              initialData={row}
              onSubmit={handleUpdate}
          />
        </DialogContent>
      </Dialog>
  );
}