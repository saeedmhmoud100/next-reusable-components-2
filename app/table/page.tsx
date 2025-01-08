"use client";

import { DataTable } from '@/lib/table/components';
import { enhanceTableConfig } from '@/lib/table/utils';
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
                    <DataTable config={enhanceTableConfig(tables.products)} />
                </TabsContent>

                <TabsContent value="users">
                    <DataTable config={enhanceTableConfig(tables.users)} />
                </TabsContent>
            </Tabs>
        </div>
    );
}