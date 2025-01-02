// This file can be deleted as we're using client-side data handling

import { NextResponse } from 'next/server';
import { db } from '@/lib/api/products/db';
import type { ProductCreateInput, ProductUpdateInput } from '@/lib/api/products/types';

export async function GET() {
    try {
        const products = db.products.findMany();
        return NextResponse.json(products);
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