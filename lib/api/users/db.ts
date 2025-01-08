// Simulated users database
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "user" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "guest" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "user" },
    { id: 6, name: "David Clark", email: "david@example.com", role: "admin" },
    { id: 7, name: "Eva White", email: "eva@example.com", role: "user" },
    { id: 8, name: "Frank Green", email: "frank@example.com", role: "guest" },
    { id: 9, name: "Grace Harris", email: "grace@example.com", role: "user" },
    { id: 10, name: "Henry Miller", email: "henry@example.com", role: "admin" },
    { id: 11, name: "Isla Carter", email: "isla@example.com", role: "user" },
    { id: 12, name: "Jack Moore", email: "jack@example.com", role: "user" },
    { id: 13, name: "Kimberly Lee", email: "kimberly@example.com", role: "guest" },
    { id: 14, name: "Liam Hall", email: "liam@example.com", role: "admin" },
    { id: 15, name: "Megan Young", email: "megan@example.com", role: "user" },
    { id: 16, name: "Nina Scott", email: "nina@example.com", role: "user" },
    { id: 17, name: "Oscar King", email: "oscar@example.com", role: "guest" },
    { id: 18, name: "Paul Adams", email: "paul@example.com", role: "admin" },
    { id: 19, name: "Quinn Nelson", email: "quinn@example.com", role: "user" },
    { id: 20, name: "Rachel Evans", email: "rachel@example.com", role: "guest" }
];

export const db = {
    users: {
        findMany: () => [...users],
        create: (data: any) => {
            const newUser = { ...data, id: users.length + 1 };
            users.push(newUser);
            return newUser;
        },
        update: (id: number, data: any) => {
            const index = users.findIndex(u => u.id === id);
            if (index === -1) return null;
            users[index] = { ...users[index], ...data };
            return users[index];
        },
        delete: (id: number) => {
            const index = users.findIndex(u => u.id === id);
            if (index === -1) return null;
            const deleted = users[index];
            users = users.filter(u => u.id !== id);
            return deleted;
        }
    }
};