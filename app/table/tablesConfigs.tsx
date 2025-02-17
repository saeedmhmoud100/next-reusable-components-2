// Table configurations

import {enhanceTableConfig} from "@/lib/table/utils";
import {Badge} from "@/components/ui/badge";

const productsTableConfig = enhanceTableConfig({
    name: "product",
    endpoint: "api/products",
    itemsPerPage: 10,
    searchEnabled: true,
    sortEnabled: true,
    createEnabled: true,
    updateEnabled: true,
    deleteEnabled: true,
    dialogType: "modal",
    booleanInputType: "switch",
    styles: {
        table: "w-full border-collapse",
        row: "border-t border-gray-200",
        cell: "px-6 py-4 text-sm",
        pagination: "border-t p-4 flex-col-reverse",
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
    },
    actions: {
        // Custom fetch implementation
        // fetch: async (endpoint, { page, searchTerm, sortBy, sortOrder }) => {
        //     const params = new URLSearchParams({
        //         page: page.toString(),
        //         search: searchTerm || '',
        //     });
        //
        //     const response = await fetch(`${endpoint}?${params}`);
        //     const result = await response.json();
        //     return result
        // },

        create: async (data, endpoint) => {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return response.json();
        },

        // Custom update implementation
        update: async (id, data, endpoint) => {
            const response = await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return response.json();
        },

        // Custom delete implementation
        delete: async (id, endpoint) => {
            await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                }
            });
        }
    }
});

const userTableConfig = enhanceTableConfig({
    name: "user",
    title: "Users",
    endpoint: "users",
    baseUrl:"https://jsonplaceholder.typicode.com",
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
    actions:{
        fetch: async (endpoint, params) => {
            const response = await fetch(`${endpoint}?${params}`);
            const result = await response.json();
            return {data:result,total:result.length}
        }
    },
    columns: [
        {
            name: "id",
            type: "number",
            sortable: true,
            editable: false,
            searchable: true,
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
            searchable: true,
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
const CategoriesTableConfig = enhanceTableConfig({
    name: "category",
    title: "Categories",
    endpoint: "api/categories",
    baseUrl:"http://192.168.1.19:8000",
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
        delete: true // Example of restricted permission
    },
    columns: [
        {
            name: "name",
            type: "text",
            sortable: true,
            searchable: true,
            required: true
        },
        {
            name: "slug",
            type: "text",
            sortable: true,
            required: true,
        }
    ],
    actions: {
        // Custom fetch implementation
        fetch: async (endpoint, {page, searchTerm, sortBy, sortOrder}) => {
            const params = new URLSearchParams({
                page: page.toString(),
                search: searchTerm || '',
            });

            const response = await fetch(`${endpoint}?${params}`);
            const result = await response.json();
            return result
        },
        create: async (data, endpoint) => {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response)
            return response.json();
        },

        // Custom update implementation
        update: async (id, data, endpoint) => {
            const response = await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return response.json();
        },

        delete: async (id, endpoint) => {
            await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                }
            });
        }
    }
})
export const tables = {
    users: userTableConfig,
    products:productsTableConfig,
    categories:CategoriesTableConfig
    // Add more table configurations as needed
};