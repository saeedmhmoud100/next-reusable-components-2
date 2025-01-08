// Table configurations

import {enhanceTableConfig} from "@/lib/table/utils";
import {Badge} from "@/components/ui/badge";

const productsTableConfig = enhanceTableConfig({
    name: "product",
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
        pagination: "bg-white border-t p-4 flex-col-reverse",
        dialog: "w-[50%]"
    },
    permissions: {
        create: true,
        read: true,
        update: true,
        delete: true
    },
    columns: [
        {
            name: "id",
            type: "number",
            sortable: true,
            editable: false,
            width: "80px",
            align: "left"
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
            name: "rate_avg",
            type: "number",
            sortable: true,
            step: 0.1,
            label: "Rating",
            validation: {
                min: 0,
                max: 5,
                message: "Rating must be between 0 and 5"
            }
        },
        {
            key: "inStock",
            name: "inStock",
            type: "boolean",
            sortable: true,
            label: "In Stock"
        }
    ],
    customComponents: {
        Cell: {
            inStock: ({value}) => (
                <Badge variant={value ? "success" : "destructive"} className="font-medium">
                    {value ? "In Stock" : "Out of Stock"}
                </Badge>
            ),
            rate_avg: ({value}) => (
                <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{value?.toFixed(1)}</span>
                </div>
            )
        },
        DialogTitle: {
            create: "Add Product",
            update: "Edit Product",
            delete: "Remove Product"
        }
    }
});

const userTableConfig = enhanceTableConfig({
    name: "user",
    title: "Users",
    endpoint: "users",
    itemsPerPage: 10,
    searchEnabled: true,
    sortEnabled: true,
    createEnabled: true,
    updateEnabled: true,
    deleteEnabled: true,
    permissions: {
        create: true,
        read: true,
        update: true,
        delete: false // Example of restricted permission
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
            required: true
        },
        {
            name: "email",
            type: "text",
            sortable: true,
            searchable: true,
            required: true,
            validation: {
                pattern: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",
                message: "Invalid email address"
            }
        },
        {
            name: "role",
            type: "select",
            sortable: true,
            required: true,
            validation: {
                options: [
                    {label: "Admin", value: "admin"},
                    {label: "User", value: "user"},
                    {label: "Guest", value: "guest"}
                ]
            }
        }
    ]
})
export const tables = {
    users: userTableConfig,
    products:productsTableConfig
    // Add more table configurations as needed
};