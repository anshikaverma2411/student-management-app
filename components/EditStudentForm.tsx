"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditStudentFormProps {
  id: string;
  name: string;
  details: string;
}

export default function EditStudentForm({
  id,
  name,
  details,
}: EditStudentFormProps) {
  const [newName, setNewName] = useState(name);
  const [newDetail, setNewDetail] = useState(details);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newDetail }),
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
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Student Name"
      />

      <input
        onChange={(e) => setNewDetail(e.target.value)}
        value={newDetail}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Student Details"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Student
      </button>
    </form>
  );
}
