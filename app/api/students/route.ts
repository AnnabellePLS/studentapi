import { NextResponse } from 'next/server';
import { students } from '@/lib/db'; 

export async function GET() {
    try {
        return NextResponse.json(students);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const newStudent = {
            ...body,
            _id: body._id || Date.now().toString(), 
        };

        students.push(newStudent); 

        return NextResponse.json(newStudent, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add student" }, { status: 400 });
    }
}