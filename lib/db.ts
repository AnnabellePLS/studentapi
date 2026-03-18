export let students = [
    { _id: "1", firstName: "Test", lastName: "Student", email: "test@test.com", age: 20, currentCollege: "Test University" }
];

// This allows the DELETE function to overwrite the list
export const setStudents = (newList: any[]) => {
    students = newList;
    };