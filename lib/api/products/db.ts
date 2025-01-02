// Simulated database
let products = [
    { id: 1, name: "Premium Laptop", rate_avg: 4.8, inStock: true },
    { id: 2, name: "Wireless Headphones", rate_avg: 4.5, inStock: false },
    { id: 3, name: "Smart Watch", rate_avg: 4.2, inStock: true },
    { id: 4, name: "Gaming Mouse", rate_avg: 4.7, inStock: true },
    { id: 5, name: "Mechanical Keyboard", rate_avg: 4.6, inStock: false },
    { id: 6, name: "4K Monitor", rate_avg: 4.9, inStock: true },
    { id: 7, name: "Bluetooth Speaker", rate_avg: 4.3, inStock: true },
    { id: 8, name: "Smartphone", rate_avg: 4.7, inStock: true },
    { id: 9, name: "Laptop Stand", rate_avg: 4.6, inStock: true },
    { id: 10, name: "Portable Charger", rate_avg: 4.8, inStock: true },
    { id: 11, name: "VR Headset", rate_avg: 4.4, inStock: true },
    { id: 12, name: "Gaming Chair", rate_avg: 4.3, inStock: false },
    { id: 13, name: "Wireless Mouse", rate_avg: 4.5, inStock: true },
    { id: 14, name: "External Hard Drive", rate_avg: 4.7, inStock: true },
    { id: 15, name: "Smart Thermostat", rate_avg: 4.1, inStock: false },
    { id: 16, name: "Action Camera", rate_avg: 4.6, inStock: true },
    { id: 17, name: "Electric Scooter", rate_avg: 4.8, inStock: true },
    { id: 18, name: "Fitness Tracker", rate_avg: 4.4, inStock: true },
    { id: 19, name: "Robot Vacuum", rate_avg: 4.7, inStock: true },
    { id: 20, name: "Tablet", rate_avg: 4.6, inStock: false },
    { id: 21, name: "Smart Light Bulbs", rate_avg: 4.3, inStock: true },
    { id: 22, name: "Electric Kettle", rate_avg: 4.2, inStock: false },
    { id: 23, name: "Smart Door Lock", rate_avg: 4.5, inStock: true },
    { id: 24, name: "Bluetooth Earbuds", rate_avg: 4.6, inStock: true },
    { id: 25, name: "Gaming Laptop", rate_avg: 4.8, inStock: true },
    { id: 26, name: "Smart Refrigerator", rate_avg: 4.7, inStock: false },
    { id: 27, name: "Noise Cancelling Headphones", rate_avg: 4.9, inStock: true },
    { id: 28, name: "Drones with Camera", rate_avg: 4.5, inStock: true },
    { id: 29, name: "Electric Guitar", rate_avg: 4.4, inStock: true },
    { id: 30, name: "LED Projector", rate_avg: 4.6, inStock: true }
]


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