"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Card} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DataTable} from '@/lib/table/components';
import {useState} from "react";

export default function TableDocsExamples() {
    const [activeTab, setActiveTab] = useState("basic");
    // Basic example config
    const basicConfig = {
        name: "user",
        endpoint: "users",
        columns: [
            {name: "id", type: "number"},
            {name: "name", type: "text"},
            {name: "email", type: "text"}
        ]
    };

    const advancedConfig = {
        name: "product",
        title: "Products",
        endpoint: "products",
        itemsPerPage: 10,
        searchEnabled: true,
        sortEnabled: true,
        createEnabled: true,
        updateEnabled: true,
        deleteEnabled: true,
        dialogType: "sidebar",
        booleanInputType: "switch",
        styles: {
            table: "w-full border-collapse bg-white",
            header: "bg-gray-50",
            row: "border-t border-gray-200 hover:bg-gray-50",
            cell: "px-6 py-4 text-sm",
            pagination: "bg-white border-t p-4",
            dialog: "w-[50%]"
        },
        columns: [
            {
                name: "id",
                type: "number",
                sortable: true,
                editable: false,
                width: "80px"
            },
            {
                name: "name",
                type: "text",
                sortable: true,
                searchable: true,
                required: true,
                validation: {
                    pattern: "^[A-Za-z0-9 ]+$",
                    message: "Only letters, numbers, and spaces allowed"
                }
            },
            {
                name: "price",
                type: "number",
                sortable: true,
                validation: {
                    min: 0,
                    message: "Price must be positive"
                }
            }
        ]
    };

    const BasicExample = () => {
        const [basicActiveTab, setBasicActiveTab] = useState("preview");
        return (
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Basic Example</h2>
                <p className="text-muted-foreground mb-4">
                    A simple table with minimal configuration:
                </p>
                <Tabs value={basicActiveTab} onValueChange={setBasicActiveTab}>
                    <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="configs">Configs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="space-y-4">
                        <DataTable config={basicConfig}/>
                    </TabsContent>
                    <TabsContent value={"configs"} className="space-y-4">
                        <pre className="bg-muted p-4 rounded-lg mt-4">
                          {JSON.stringify(basicConfig, null, 2)}
                        </pre>
                    </TabsContent>
                </Tabs>
            </Card>
        )
    }

    const AdvancedExample = () => {
        const [advancedActiveTab, setAdvancedActiveTab] = useState("preview");
        return (
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Advanced Example</h2>
                <p className="text-muted-foreground mb-4">
                    A fully featured table with custom styling and validation:
                </p>

                <Tabs value={advancedActiveTab} onValueChange={setAdvancedActiveTab}>
                    <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="configs">Configs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="space-y-4">
                        <DataTable config={advancedConfig}/>
                    </TabsContent>
                    <TabsContent value={"configs"} className="space-y-4">
                        <pre className="bg-muted p-4 rounded-lg mt-4">
                          {JSON.stringify(advancedConfig, null, 2)}
                        </pre>
                    </TabsContent>
                </Tabs>

            </Card>
        )
    }

    return (
        <TabsContent value="examples" className="space-y-4" style={{paddingLeft:"20px"}}>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="basic">Basic Table</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced Table</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4">
                    <BasicExample />
                </TabsContent>
                <TabsContent value={"advanced"} className="space-y-4">
                        <AdvancedExample />
                </TabsContent>
            </Tabs>


            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="custom-cell">
                        <AccordionTrigger>Custom Cell Rendering</AccordionTrigger>
                        <AccordionContent>
                  <pre className="bg-muted p-4 rounded-lg">
                    {`customComponents: {
  Cell: {
    status: ({ value }) => (
      <Badge variant={value ? "success" : "destructive"}>
        {value ? "Active" : "Inactive"}
      </Badge>
    )
  }
}`}
                  </pre>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="custom-validation">
                        <AccordionTrigger>Custom Validation</AccordionTrigger>
                        <AccordionContent>
                  <pre className="bg-muted p-4 rounded-lg">
                    {`columns: [{
  name: "email",
  type: "text",
  validation: {
    pattern: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",
    message: "Invalid email address"
  }
}]`}
                  </pre>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="custom-actions">
                        <AccordionTrigger>Custom Actions</AccordionTrigger>
                        <AccordionContent>
                  <pre className="bg-muted p-4 rounded-lg">
                    {`actions: {
  create: async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}`}
                  </pre>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </TabsContent>
    );
}