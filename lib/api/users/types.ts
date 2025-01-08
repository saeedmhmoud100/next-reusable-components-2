export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
}

export interface UserCreateInput {
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
}

export interface UserUpdateInput extends UserCreateInput {
    id: number;
}