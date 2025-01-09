"use client";

import { DataTable } from '@/lib/table/components';
import { tables } from './tablesConfigs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TablesPage() {
    return (
        <div className="py-10">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Data Tables</h1>

            <Tabs defaultValue="products">
                <TabsList>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>

                <TabsContent value="products">
                    <DataTable config={tables.products} />
                </TabsContent>

                <TabsContent value="users">
                    <DataTable config={tables.users} />
                </TabsContent>
            </Tabs>
        </div>
    );
}