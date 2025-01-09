"use client";
import {Card} from "@/components/ui/card";
import { TabsContent} from "@/components/ui/tabs";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";

export default function TableDocsApi() {

    return (
        <TabsContent value="api" className="space-y-4">
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">API Reference</h2>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="table-config">
                        <AccordionTrigger>TableConfig Interface</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Required Properties</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Badge>name</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">The name of the table (used for generating labels)</p>
                                    </li>
                                    <li>
                                        <Badge>endpoint</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">The API endpoint for CRUD operations</p>
                                    </li>
                                    <li>
                                        <Badge>columns</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Array of column configurations</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold">Optional Properties</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Badge variant="secondary">title</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Custom table title (defaults to formatted name)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">itemsPerPage</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Number of items per page (default: 10)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">searchEnabled</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Enable search functionality (default: true)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">sortEnabled</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Enable sorting functionality (default: true)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">createEnabled</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Enable create functionality (default: true)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">updateEnabled</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Enable update functionality (default: true)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">deleteEnabled</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Enable delete functionality (default: true)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">dialogType</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Type of dialog for forms ('modal' | 'sidebar', default: 'modal')</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">booleanInputType</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Type of input for boolean fields ('switch' | 'checkbox', default: 'switch')</p>
                                    </li>
                                </ul>
                            </div>

                            <pre className="bg-muted p-4 rounded-lg overflow-auto">
                    {`interface TableConfig {
  // Required
  name: string;
  endpoint: string;
  columns: ColumnConfig[];

  // Optional
  title?: string;
  itemsPerPage?: number;
  searchEnabled?: boolean;
  sortEnabled?: boolean;
  createEnabled?: boolean;
  updateEnabled?: boolean;
  deleteEnabled?: boolean;
  dialogType?: 'modal' | 'sidebar';
  booleanInputType?: 'switch' | 'checkbox';
  customComponents?: CustomComponents;
  styles?: TableStyles;
  customEndpoints?: CustomEndpoints;
  actions?: TableActions;
  pagination?: TablePaginationConfig;
  permissions?: TablePermissions;
  onRowClick?: (row: any) => void;
}`}
                  </pre>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="column-config">
                        <AccordionTrigger>ColumnConfig Interface</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Required Properties</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Badge>name</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Column name (used as key and for labels)</p>
                                    </li>
                                    <li>
                                        <Badge>type</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Data type ('text' | 'number' | 'boolean' | 'date' | 'select' | 'custom')</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold">Optional Properties</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Badge variant="secondary">label</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Display label (defaults to formatted name)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">sortable</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Enable column sorting (default: true)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">searchable</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Include in global search (default: true for text)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">editable</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Allow editing (default: true)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">required</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Mark as required in forms (default: false)</p>
                                    </li>
                                    <li>
                                        <Badge variant="secondary">validation</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Validation rules object</p>
                                    </li>
                                </ul>
                            </div>

                            <pre className="bg-muted p-4 rounded-lg overflow-auto">
                    {`interface ColumnConfig {
  // Required
  name: string;
  type: ColumnType;

  // Optional
  key?: string;
  label?: string;
  sortable?: boolean;
  searchable?: boolean;
  editable?: boolean;
  createEnabled?: boolean;
  required?: boolean;
  validation?: ValidationConfig;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  step?: number;
}`}
                  </pre>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="custom-components">
                        <AccordionTrigger>Custom Components</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Available Customizations</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Badge>Cell</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Custom cell renderers per column</p>
                                    </li>
                                    <li>
                                        <Badge>Loading</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Custom loading component</p>
                                    </li>
                                    <li>
                                        <Badge>Empty</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Custom empty state component</p>
                                    </li>
                                    <li>
                                        <Badge>Error</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Custom error component</p>
                                    </li>
                                    <li>
                                        <Badge>DialogTitle</Badge>
                                        <p className="mt-1 text-sm text-muted-foreground">Custom dialog titles for CRUD operations</p>
                                    </li>
                                </ul>
                            </div>

                            <pre className="bg-muted p-4 rounded-lg overflow-auto">
                    {`interface CustomComponents {
  Loading?: ComponentType;
  Empty?: ComponentType;
  Error?: ComponentType<{ error: Error }>;
  Header?: ComponentType;
  Footer?: ComponentType;
  Cell?: Record<string, ComponentType<{ 
    value: any; 
    row: any 
  }>>;
  Input?: Record<string, ComponentType<{ 
    value: any; 
    onChange: (value: any) => void; 
    column: ColumnConfig 
  }>>;
  DialogTitle?: Record<
    'create' | 'update' | 'delete', 
    ReactNode
  >;
  CreateForm?: ComponentType;
  UpdateForm?: ComponentType;
  DeleteConfirm?: ComponentType<{
    onCancel: () => void;
    onConfirm: () => void;
  }>;
}`}
                  </pre>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="hooks">
                        <AccordionTrigger>Available Hooks</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4">
                                <li>
                                    <Badge>useTable</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">Access table context and state</p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {`const { 
  state,  // Current table state
  config, // Table configuration
  dispatch // State update dispatcher
} = useTable();`}
                      </pre>
                                </li>
                                <li>
                                    <Badge>useTableData</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">Handle CRUD operations</p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {`const { 
  refetch,  // Refresh table data
  create,   // Create new record
  update,   // Update existing record
  delete    // Delete record
} = useTableData();`}
                      </pre>
                                </li>
                                <li>
                                    <Badge>useTableOperations</Badge>
                                    <p className="mt-1 text-sm text-muted-foreground">Access loading states and operations</p>
                                    <pre className="bg-muted mt-2 p-4 rounded-lg text-sm">
                        {`const { 
  operationLoading, // Current operation
  loading: {        // Detailed loading states
    create: boolean;
    update: boolean;
    delete: boolean;
    fetch: boolean;
  }
} = useTableOperations();`}
                      </pre>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="styles">
                        <AccordionTrigger>Styling Configuration</AccordionTrigger>
                        <AccordionContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto">
                    {`interface TableStyles {
  table?: string;  // Table container
  header?: string; // Table header
  row?: string;    // Table row
  cell?: string;   // Table cell
  pagination?: string; // Pagination container
  dialog?: string;    // Dialog/Modal
  search?: string;    // Search input
}

// Default styles
{
  table: "min-w-full bg-white rounded-lg overflow-hidden",
  header: "bg-gray-100",
  row: "hover:bg-gray-50 transition-colors",
  cell: "p-4",
  pagination: "bg-white border-t p-4",
  dialog: "sm:max-w-[425px]",
  search: "w-full max-w-sm"
}`}
                  </pre>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>
        </TabsContent>

    );
}