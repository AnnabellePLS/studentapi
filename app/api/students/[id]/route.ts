import { NextResponse } from 'next/server';
import { students, setStudents } from '@/lib/db'; 

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const index = students.findIndex((s: any) => s._id === id);

        if (index !== -1) {
            students[index] = { ...students[index], ...body };
            return NextResponse.json(students[index], { status: 200 });
        }
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const newList = students.filter((s: any) => s._id !== id);
        setStudents(newList); 
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}