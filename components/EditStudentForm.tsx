"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Subject {
  name: string;
  marks: number;
}
interface EditStudentFormProps {
  id: string;
  fullName: string;
  dateOfBirth: string; // Assuming dateOfBirth is represented as a string in ISO format
  studentClass: string;
  subjects: Subject[];
  percentage: number;
  grade: string;
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({
  id,
  fullName,
  dateOfBirth,
  studentClass,
  subjects,
  percentage,
  grade,
}: EditStudentFormProps) => {
  const [newFullName, setNewFullName] = useState(fullName);
  const [newDateOfBirth, setNewDateOfBirth] = useState(dateOfBirth);
  const [newStudentClass, setNewStudentClass] = useState(studentClass);
  const [newSubjects, setNewSubjects] = useState<Subject[]>(subjects || []);
  const [newPercentage, setNewPercentage] = useState(percentage);
  const [newGrade, setNewGrade] = useState(grade);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullName: newFullName,
          dateOfBirth: newDateOfBirth,
          studentClass: newStudentClass,
          subjects: newSubjects,
          percentage: newPercentage,
          grade: newGrade,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update student");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewFullName(e.target.value)}
        value={newFullName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Full Name"
      />

      <input
        onChange={(e) => setNewDateOfBirth(e.target.value)}
        value={newDateOfBirth}
        className="border border-slate-500 px-8 py-2"
        type="date"
        placeholder="Date of Birth"
      />

      <input
        onChange={(e) => setNewStudentClass(e.target.value)}
        value={newStudentClass}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Class"
      />

      {/* Handling subjects array */}
      <div>
        {newSubjects.map((subject, index) => (
          <div key={index} className="flex gap-3">
            <input
              onChange={(e) =>
                setNewSubjects((prevSubjects) =>
                  prevSubjects.map((s, idx) =>
                    idx === index ? { ...s, name: e.target.value } : s
                  )
                )
              }
              value={subject.name}
              className="border border-slate-500 px-8 py-2"
              type="text"
              placeholder={`Subject ${index + 1} Name`}
            />
            <input
              onChange={(e) =>
                setNewSubjects((prevSubjects) =>
                  prevSubjects.map((s, idx) =>
                    idx === index
                      ? { ...s, marks: parseInt(e.target.value) }
                      : s
                  )
                )
              }
              value={subject.marks}
              className="border border-slate-500 px-8 py-2"
              type="number"
              placeholder={`Subject ${index + 1} Marks`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setNewSubjects((prevSubjects) => [
              ...prevSubjects,
              { name: "", marks: 0 },
            ])
          }
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        >
          Add Subject
        </button>
      </div>

      <input
        onChange={(e) => setNewPercentage(parseFloat(e.target.value))}
        value={newPercentage}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Percentage"
      />

      <input
        onChange={(e) => setNewGrade(e.target.value)}
        value={newGrade}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Grade"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Student
      </button>
    </form>
  );
};

export default EditStudentForm;
