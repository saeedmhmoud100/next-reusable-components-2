export interface Product {
    id: number;
    name: string;
    rate_avg: number;
    inStock: boolean;
}

export interface ProductCreateInput {
    name: string;
    rate_avg: number;
    inStock: boolean;
}

export interface ProductUpdateInput extends ProductCreateInput {
    id: number;
}