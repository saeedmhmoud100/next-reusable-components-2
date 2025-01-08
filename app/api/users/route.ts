import { NextResponse } from 'next/server';
import { db } from '@/lib/api/users/db';
import type { UserCreateInput, UserUpdateInput } from '@/lib/api/users/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const per_page = parseInt(searchParams.get('per_page') || '10');
        const search = searchParams.get('search');
        const sort_by = searchParams.get('sort_by');
        const sort_order = searchParams.get('sort_order');

        let users = db.users.findMany();

        // Apply search
        if (search) {
            const searchLower = search.toLowerCase();
            users = users.filter(user =>
                user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        if (sort_by) {
            users.sort((a: any, b: any) => {
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
        const total = users.length;
        const total_pages = Math.ceil(total / per_page);
        const start = (page - 1) * per_page;
        const paginatedData = users.slice(start, start + per_page);

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
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data: UserCreateInput = await request.json();
        const user = db.users.create(data);
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data: UserUpdateInput = await request.json();
        const { id, ...updateData } = data;
        const user = db.users.update(id, updateData);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const user = db.users.delete(id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}