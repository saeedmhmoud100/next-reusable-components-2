"use client";
import {Card} from "@/components/ui/card";
import { TabsContent} from "@/components/ui/tabs";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Check, Info} from "lucide-react";

export default function TableDocsOverview() {

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

    return (
        <TabsContent value="overview" className="space-y-4">
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground mb-6">
                    The DataTable component is a powerful and flexible table solution that provides a complete set of
                    features
                    for building data-rich applications. It combines the best practices of modern UI design with robust
                    functionality.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Server-side pagination</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Column sorting</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Global search</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>CRUD operations</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Custom styling</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Component customization</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Type-safe configuration</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Customizable UI components</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Built-in form validation</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Responsive design</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500"/>
                                <span>Accessibility support</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Alert className="mt-6">
                    <Info className="h-4 w-4"/>
                    <AlertDescription>
                        Get started quickly with minimal configuration, then customize as needed.
                    </AlertDescription>
                </Alert>
            </Card>

            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        1. Import the DataTable component:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg">
                {`import { DataTable } from '@/lib/table/components';`}
              </pre>

                    <p className="text-muted-foreground">
                        2. Create a basic configuration:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg">
                {JSON.stringify(basicConfig, null, 2)}
              </pre>

                    <p className="text-muted-foreground">
                        3. Use the component:
                    </p>
                    <pre className="bg-muted p-4 rounded-lg">
                {`<DataTable config={config} />`}
              </pre>
                </div>
            </Card>
        </TabsContent>
    );
}