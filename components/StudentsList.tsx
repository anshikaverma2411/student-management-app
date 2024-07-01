"use client";
import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const getStudents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/students", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch student");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading students: ", error);
  }
};

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      if (data) {
        setStudents(data.students);
      }
    };

    fetchStudents();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student: any) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.details.toLowerCase().includes(searchValue) ||
      student._id.toLowerCase().includes(searchValue) // Assuming other fields if any
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search students..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />
      {filteredStudents.map((s: any) => (
        <div
          key={s._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{s.name}</h2>
            <div>{s.details}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={s._id} />
            <Link href={`/editStudent/${s._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
      <style jsx>{`
        input {
          display: block;
          width: 100%;
          max-width: 400px;
          margin-bottom: 1rem;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default StudentsList;
