'use client';

import {DynamicForm, FormConfig} from "@/lib/form";

export default function Page() {
    // Example form configuration
    const formConfig: FormConfig = {
        fields: [
            {
                name: 'fullName',
                label: 'Full Name',
                type: 'text',
                placeholder: 'Enter your full name',
                validation: {
                    required: true,
                    minLength: 2,
                },
            },
            {
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email',
                validation: {
                    required: true,
                },
            },
            {
                name: 'age',
                label: 'Age',
                type: 'number',
                validation: {
                    required: true,
                    min: 18,
                    max: 100,
                },
            },
            {
                name: 'bio',
                label: 'Bio',
                type: 'textarea',
                placeholder: 'Tell us about yourself',
            },
            {
                name: 'role',
                label: 'Role',
                type: 'select',
                options: [
                    { label: 'Developer', value: 'developer' },
                    { label: 'Designer', value: 'designer' },
                    { label: 'Manager', value: 'manager' },
                ],
                validation: {
                    required: true,
                },
            },
            {
                name: 'newsletter',
                label: 'Subscribe to newsletter',
                type: 'checkbox',
                defaultValue: true,
            },
            {
                name: 'experience',
                label: 'Experience Level',
                type: 'radio',
                options: [
                    { label: 'Junior', value: 'junior' },
                    { label: 'Mid-Level', value: 'mid' },
                    { label: 'Senior', value: 'senior' },
                ],
                validation: {
                    required: true,
                },
            },
        ],
        onSubmit: async (data) => {
            console.log('Form submitted:', data);
        },
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Dynamic Form Example</h1>
                <div className="bg-card p-6 rounded-lg shadow-lg">
                    <DynamicForm {...formConfig} />
                </div>
            </div>
        </div>
    );
}