


"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableDocsExamples from "@/lib/table/docs/Examples";
import TableDocsOverview from "@/lib/table/docs/Overview";
import TableDocsApi from "@/lib/table/docs/Api";
import TableDocsConfiguration from "@/lib/table/docs/Configuration";

export default function TableDocs() {
    const [activeTab, setActiveTab] = useState("overview");

    const basicConfig = {
        name: "user",
        endpoint: "users",
        columns: [
            { name: "id", type: "number" },
            { name: "name", type: "text" },
            { name: "email", type: "text" }
        ]
    };

    return (
        <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-8">Data Table Documentation</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="configuration">Configuration</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="api">API Reference</TabsTrigger>
                </TabsList>

                <TableDocsOverview />

                <TableDocsConfiguration />

                <TableDocsExamples />

                <TableDocsApi />
            </Tabs>
        </div>
    );
}