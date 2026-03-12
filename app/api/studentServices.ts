import axios from 'axios';

const API_URL = "http://localhost:3000";

export interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    currentCollege: string;
}

export async function fetchStudents(): Promise<Student[]> {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
}

export async function addStudent(studentData: Omit<Student, "_id">): Promise<Student> {
    const payload = { ...studentData, _id: Date.now().toString() };
    const response = await axios.post(`${API_URL}/students`, payload);
    return response.data;
}