// Simulated database
let products = [
    { id: 1, name: "Premium Laptop", rate_avg: 4.8, inStock: true },
    { id: 2, name: "Wireless Headphones", rate_avg: 4.5, inStock: false },
    { id: 3, name: "Smart Watch", rate_avg: 4.2, inStock: true },
    { id: 4, name: "Gaming Mouse", rate_avg: 4.7, inStock: true },
    { id: 5, name: "Mechanical Keyboard", rate_avg: 4.6, inStock: false },
];

export const db = {
    products: {
        findMany: () => [...products],
        create: (data: any) => {
            const newProduct = { ...data, id: products.length + 1 };
            products.push(newProduct);
            return newProduct;
        },
        update: (id: number, data: any) => {
            const index = products.findIndex(p => p.id === id);
            if (index === -1) return null;
            products[index] = { ...products[index], ...data };
            return products[index];
        },
        delete: (id: number) => {
            const index = products.findIndex(p => p.id === id);
            if (index === -1) return null;
            const deleted = products[index];
            products = products.filter(p => p.id !== id);
            return deleted;
        }
    }
};