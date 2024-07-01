"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Subject {
  name: string;
  marks: number;
}

interface StudentData {
  fullName: string;
  dateOfBirth: string;
  studentClass: string;
  subjects: Subject[];
  percentage: number;
  grade: string;
}

export default function AddStudent() {
  const [studentData, setStudentData] = useState<StudentData>({
    fullName: "",
    dateOfBirth: "",
    studentClass: "",
    subjects: [{ name: "", marks: 0 }],
    percentage: 0,
    grade: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, dateOfBirth, studentClass, subjects, percentage, grade } =
      studentData;

    if (!fullName || !dateOfBirth || !studentClass || !percentage || !grade) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        const errorData = await res.json();
        console.log(errorData);
        throw new Error(errorData.message || "Failed to create a student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while adding the student"
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: name === "percentage" ? parseFloat(value) : value,
    }));
  };

  const handleSubjectChange = (
    index: number,
    key: keyof Subject,
    value: string | number
  ) => {
    const updatedSubjects = [...studentData.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [key]: key === "marks" ? parseInt(value as string) : value,
    };
    setStudentData((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  const handleAddSubject = () => {
    setStudentData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", marks: 0 }],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={handleInputChange}
        value={studentData.fullName}
        name="fullName"
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Full Name"
        required
      />

      <input
        onChange={handleInputChange}
        value={studentData.dateOfBirth}
        name="dateOfBirth"
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Date of Birth"
        required
      />

      <input
        onChange={handleInputChange}
        value={studentData.studentClass}
        name="studentClass"
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Class"
        required
      />

      <div>
        {studentData.subjects.map((subject, index) => (
          <div key={index} className="flex gap-3">
            <input
              onChange={(e) =>
                handleSubjectChange(index, "name", e.target.value)
              }
              value={subject.name}
              className="border border-slate-500 px-8 py-2"
              type="text"
              placeholder={`Subject ${index + 1} Name`}
              required
            />
            <input
              onChange={(e) =>
                handleSubjectChange(index, "marks", e.target.value)
              }
              value={subject.marks}
              className="border border-slate-500 px-8 py-2"
              type="number"
              placeholder={`Subject ${index + 1} Marks`}
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSubject}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        >
          Add Subject
        </button>
      </div>

      <input
        onChange={handleInputChange}
        value={studentData.percentage}
        name="percentage"
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Percentage"
        required
      />

      <input
        onChange={handleInputChange}
        value={studentData.grade}
        name="grade"
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Grade"
        required
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Student
      </button>

      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </form>
  );
}
