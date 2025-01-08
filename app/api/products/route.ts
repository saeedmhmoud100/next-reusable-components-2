// This file can be deleted as we're using client-side data handling

import { NextResponse } from 'next/server';
import { db } from '@/lib/api/products/db';
import type { ProductCreateInput, ProductUpdateInput } from '@/lib/api/products/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const per_page = parseInt(searchParams.get('per_page') || '10');
        const search = searchParams.get('search');
        const sort_by = searchParams.get('sort_by');
        const sort_order = searchParams.get('sort_order');

        let products = db.products.findMany();

        // Apply search
        if (search) {
            const searchLower = search.toLowerCase();
            products = products.filter(product =>
                product.name.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        if (sort_by) {
            products.sort((a: any, b: any) => {
                const aVal = a[sort_by];
                const bVal = b[sort_by];
                const modifier = sort_order === 'desc' ? -1 : 1;

                if (typeof aVal === 'string') {
                    return aVal.localeCompare(bVal) * modifier;
                }
                return ((aVal ?? 0) - (bVal ?? 0)) * modifier;
            });
        }

        // Apply pagination
        const total = products.length;
        const total_pages = Math.ceil(total / per_page);
        const start = (page - 1) * per_page;
        const paginatedData = products.slice(start, start + per_page);

        return NextResponse.json({
            data: paginatedData,
            pagination: {
                current_page: page,
                total_pages,
                total_items: total,
                items_per_page: per_page
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data: ProductCreateInput = await request.json();
        const product = db.products.create(data);
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data: ProductUpdateInput = await request.json();
        const { id, ...updateData } = data;
        const product = db.products.update(id, updateData);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const product = db.products.delete(id);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}