"use client";

export interface TableOperations<T = any> {
    // Data fetching
    fetch?: (params: {
        page: number;
        searchTerm?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }) => Promise<{
        data: T[];
        total: number;
    }>;

    // CRUD operations
    create?: (data: Partial<T>) => Promise<T>;
    update?: (id: number | string, data: Partial<T>) => Promise<T>;
    delete?: (id: number | string) => Promise<void>;

    // Search and filter
    search?: (term: string, data: T[]) => T[];
    filter?: (data: T[], filters: Record<string, any>) => T[];

    // Sorting
    sort?: (data: T[], field: string, order: 'asc' | 'desc') => T[];

    // Pagination
    paginate?: (data: T[], page: number, itemsPerPage: number) => {
        data: T[];
        total: number;
        totalPages?: number;
    };
}