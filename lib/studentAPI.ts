import axios from 'axios';

const API_URL = "http://localhost:3000/api/students";

export interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    currentCollege: string;
}

// 1. Fetch All Students
export async function fetchStudents(): Promise<Student[]> {
    try {
        // FIX: Just use API_URL, don't add "/students"
        const response = await axios.get(API_URL); 
        return response.data;
    } catch (error) {
        console.error("Error Fetching Students: ", error);
        throw new Error("Failed to Fetch Students");
    }
}

// 2. Add a Student
export async function addStudent(studentData: Omit<Student, "_id">): Promise<Student> {
    try {
        const payload = { ...studentData, _id: Date.now().toString() };
        // FIX: Just use API_URL
        const response = await axios.post(API_URL, payload);
        return response.data;
    } catch (error) {
        console.error("Error Adding Student: ", error);
        throw new Error("Failed to add student");
    }
}

// 3. Update a Student
export async function updateStudent(id: string, studentData: Omit<Student, "_id">): Promise<Student> {
    try {
        // FIX: Change `${API_URL}/students/${id}` to `${API_URL}/${id}`
        const response = await axios.put(`${API_URL}/${id}`, studentData);
        return response.data;
    } catch (error) {
        console.error("Error Updating Student: ", error);
        throw new Error("Failed to update student");
    }
}

// 4. Delete a Student
export async function deleteStudent(id: string): Promise<void> {
    try {
        // FIX: Change `${API_URL}/students/${id}` to `${API_URL}/${id}`
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error Deleting Student: ", error);
        throw new Error("Failed to delete student");
    }
}