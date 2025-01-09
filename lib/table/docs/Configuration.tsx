import {TabsContent} from "@/components/ui/tabs";
import {Card} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";


export default function TableDocsConfiguration() {
    return(
        <TabsContent value="configuration" className="space-y-4">
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Configuration Properties</h2>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="core">
                        <AccordionTrigger>
                            Core Properties
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge>name</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        <strong>Required</strong> - The name of the table, used for generating labels and endpoints
                                    </p>
                                </li>
                                <li>
                                    <Badge>endpoint</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        <strong>Required</strong> - The API endpoint for CRUD operations
                                    </p>
                                </li>
                                <li>
                                    <Badge>title</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Custom table title (defaults to formatted name)
                                    </p>
                                </li>
                                <li>
                                    <Badge>columns</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        <strong>Required</strong> - Array of column configurations
                                    </p>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="features">
                        <AccordionTrigger>
                            Feature Flags
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge variant="secondary">searchEnabled</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Enable search functionality (default: true)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">sortEnabled</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Enable sorting functionality (default: true)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">createEnabled</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Enable create functionality (default: true)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">updateEnabled</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Enable update functionality (default: true)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">deleteEnabled</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Enable delete functionality (default: true)
                                    </p>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pagination">
                        <AccordionTrigger>
                            Pagination Configuration
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge variant="secondary">itemsPerPage</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Number of items per page (default: 10)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">pagination</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Pagination configuration object:
                                    </p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {JSON.stringify({
                            enabled: true,
                            dataKey: 'data',
                            paginationKey: 'pagination',
                            pageKey: 'current_page',
                            totalPagesKey: 'total_pages',
                            totalItemsKey: 'total_items',
                            itemsPerPageKey: 'items_per_page'
                        }, null, 2)}
                      </pre>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="customization">
                        <AccordionTrigger>
                            UI Customization
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge variant="secondary">dialogType</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Type of dialog for forms ('modal' | 'sidebar', default: 'modal')
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">booleanInputType</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Type of input for boolean fields ('checkbox' | 'switch', default: 'switch')
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">styles</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Custom styles for table elements:
                                    </p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {JSON.stringify({
                            table: "min-w-full bg-white",
                            header: "bg-gray-50",
                            row: "hover:bg-gray-50",
                            cell: "p-4",
                            pagination: "bg-white border-t p-4",
                            dialog: "sm:max-w-[425px]",
                            search: "w-full max-w-sm"
                        }, null, 2)}
                      </pre>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="custom-components">
                        <AccordionTrigger>
                            Custom Components
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge variant="secondary">customComponents</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Override default components:
                                    </p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {JSON.stringify({
                            Loading: "ComponentType",
                            Empty: "ComponentType",
                            Error: "ComponentType<{ error: Error }>",
                            Header: "ComponentType",
                            Footer: "ComponentType",
                            Cell: "Record<string, ComponentType>",
                            Input: "Record<string, ComponentType>",
                            DialogTitle: "Record<OperationType, ReactNode>",
                            CreateForm: "ComponentType",
                            UpdateForm: "ComponentType",
                            DeleteConfirm: "ComponentType"
                        }, null, 2)}
                      </pre>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="actions">
                        <AccordionTrigger>
                            Custom Actions
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge variant="secondary">actions</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Custom CRUD operations:
                                    </p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {JSON.stringify({
                            fetch: "(endpoint, params) => Promise<{ data: any[], pagination?: {...} }>",
                            create: "(endpoint, data) => Promise<any>",
                            update: "(endpoint, id, data) => Promise<any>",
                            delete: "(endpoint, id) => Promise<any>"
                        }, null, 2)}
                      </pre>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="permissions">
                        <AccordionTrigger>
                            Permissions
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge variant="secondary">permissions</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Control access to operations:
                                    </p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {JSON.stringify({
                            create: true,
                            read: true,
                            update: true,
                            delete: true
                        }, null, 2)}
                      </pre>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="columns">
                        <AccordionTrigger>
                            Column Configuration
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge>name</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        <strong>Required</strong> - Column name/key
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">type</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Column data type ('text' | 'number' | 'boolean' | 'date' | 'select' | 'custom', default: 'text')
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">label</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Display label (defaults to formatted name)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">sortable</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Enable column sorting (default: true)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">searchable</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Include in search (default: true for text columns)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">editable</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Allow editing (default: true)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">required</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Make field required (default: false)
                                    </p>
                                </li>
                                <li>
                                    <Badge variant="secondary">validation</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Optional - Validation rules:
                                    </p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {JSON.stringify({
                            min: "number",
                            max: "number",
                            pattern: "string (regex)",
                            message: "string",
                            options: "[{ label: string, value: any }]"
                        }, null, 2)}
                      </pre>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </TabsContent>

    )
}