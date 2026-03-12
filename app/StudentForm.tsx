"use client";

import { useState, useEffect } from "react";

export default function StudentForm({ onSubmit, initialData }: any) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        currentCollege: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ firstName: "", lastName: "", email: "", age: "", currentCollege: "" });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        
        if (!initialData) {
            setFormData({ firstName: "", lastName: "", email: "", age: "", currentCollege: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-[#111] p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-white">
                {initialData ? "Edit Student" : "Add New Student"}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
                <input
                    placeholder="First Name"
                    className="bg-[#1a1a1a] border border-gray-700 p-2 rounded text-white focus:border-blue-500 outline-none"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                />
                <input
                    placeholder="Last Name"
                    className="bg-[#1a1a1a] border border-gray-700 p-2 rounded text-white focus:border-blue-500 outline-none"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                />
            </div>

            <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#1a1a1a] border border-gray-700 p-2 rounded text-white focus:border-blue-500 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="number"
                    placeholder="Age"
                    className="bg-[#1a1a1a] border border-gray-700 p-2 rounded text-white focus:border-blue-500 outline-none"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                />
                <input
                    placeholder="College"
                    className="bg-[#1a1a1a] border border-gray-700 p-2 rounded text-white focus:border-blue-500 outline-none"
                    value={formData.currentCollege}
                    onChange={(e) => setFormData({ ...formData, currentCollege: e.target.value })}
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
                {initialData ? "Update Student" : "Add Student"}
            </button>
        </form>
    );
}