"use client";

import { useEffect, useState } from "react";

import StudentForm from "./StudentForm"; 
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "./api/studentAPI";

interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    currentCollege: string;
}

export default function StudentPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const loadStudents = async () => {
        try {
            const data = await fetchStudents();
            setStudents(data);
        } catch (error) {
            console.error("Error Fetching Students: ", error);
        }
    };

    const handleFormSubmit = async (data: any) => {
        try {
            if (selectedStudent) {
                const updated = await updateStudent(selectedStudent._id, data);
                setStudents(students.map(s => s._id === updated._id ? updated : s));
            } else {
                const created = await addStudent(data);
                setStudents([...students, created]);
            }
            setSelectedStudent(null);
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this student?")) {
            try {
                await deleteStudent(id);
                setStudents(students.filter(s => s._id !== id));
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-8 text-center">Student Management System</h1>
                
                {/* Form Section */}
                <div className="bg-[#111] p-6 rounded-lg border border-gray-800 mb-10">
                    <StudentForm 
                        onSubmit={handleFormSubmit} 
                        initialData={selectedStudent} 
                    />
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400 text-sm uppercase">
                                <th className="py-4 px-2">First Name</th>
                                <th className="py-4 px-2">Last Name</th>
                                <th className="py-4 px-2">Email</th>
                                <th className="py-4 px-2">Age</th>
                                <th className="py-4 px-2">College</th>
                                <th className="py-4 px-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id} className="border-b border-gray-900 hover:bg-[#111]">
                                    <td className="py-4 px-2">{student.firstName}</td>
                                    <td className="py-4 px-2">{student.lastName}</td>
                                    <td className="py-4 px-2 text-gray-300">{student.email}</td>
                                    <td className="py-4 px-2">{student.age}</td>
                                    <td className="py-4 px-2">{student.currentCollege}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex justify-center gap-4">
                                            <button onClick={() => setSelectedStudent(student)} className="text-blue-500 hover:underline">Edit</button>
                                            <button onClick={() => handleDelete(student._id)} className="text-red-500 hover:underline">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}