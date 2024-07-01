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
      student.fullName.toLowerCase().includes(searchValue) ||
      student.dateOfBirth.toLowerCase().includes(searchValue) ||
      student.class.toLowerCase().includes(searchValue) ||
      student.grade.toLowerCase().includes(searchValue)
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
          className="bg-white rounded-lg shadow-md overflow-hidden my-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-2xl text-gray-800">
                  {s.fullName}
                </h2>
                <div className="text-gray-600 mt-1">{s.dateOfBirth}</div>
              </div>
              <div className="flex gap-2">
                <RemoveBtn id={s._id} />
                <Link href={`/editStudent/${s._id}`}>
                  <HiPencilAlt
                    size={24}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <p>
                  <span className="font-semibold">Class:</span> {s.class}
                </p>
                <p>
                  <span className="font-semibold">Percentage:</span>{" "}
                  {s.percentage}%
                </p>
                <p>
                  <span className="font-semibold">Grade:</span> {s.grade}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Subjects:</p>
                <div className="space-y-1">
                  {s.subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded p-1 text-sm"
                    >
                      <span className="font-medium">{subject.name}:</span>{" "}
                      {subject.marks}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
