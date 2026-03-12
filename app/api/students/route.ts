import { NextResponse } from 'next/server';

// Temporary data storage (resets when you restart the server)
let students = [
    { _id: "1", firstName: "Test", lastName: "Student", email: "test@test.com", age: 20, currentCollege: "Test University" }
];

// 1. This handles the GET request (Loading the list)
export async function GET() {
    return NextResponse.json(students);
}

// 2. This handles the POST request (Adding a new student)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const newStudent = {
            ...body,
            _id: body._id || Date.now().toString(), 
        };

        students.push(newStudent); // Add to our list

        return NextResponse.json(newStudent, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add student" }, { status: 400 });
    }
}