"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Subject {
  name: string;
  marks: number;
}
// interface EditStudentFormProps {
//   id: string;
//   fullName: string;
//   dateOfBirth: string; // Assuming dateOfBirth is represented as a string in ISO format
//   studentClass: string;
//   subjects: Subject[];
//   percentage: number;
//   grade: string;
// }

interface Student {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  studentClass: string;
  subjects: Subject[];
  percentage: number;
  grade: string;
}

interface EditStudentFormProps {
  student: Student;
}

export default function EditStudentForm({ student }: EditStudentFormProps) {
  const [fullName, setFullName] = useState(student.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(student.dateOfBirth);
  const [studentClass, setStudentClass] = useState(student.studentClass);
  const [subjects, setSubjects] = useState<Subject[]>(student.subjects || []);
  const [percentage, setPercentage] = useState(student.percentage);
  const [grade, setGrade] = useState(student.grade);

  const router = useRouter();

  // useEffect(() => {
  //   // This effect will run when the component mounts and whenever the student prop changes
  //   setFullName(student.fullName);
  //   setDateOfBirth(student.dateOfBirth);
  //   setStudentClass(student.studentClass);
  //   setSubjects(student.subjects);
  //   setPercentage(student.percentage);
  //   setGrade(student.grade);
  // }, [student]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/students/${student._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          dateOfBirth,
          studentClass,
          subjects,
          percentage,
          grade,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update student");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("Error updating studnet:", error);
      alert("Failed to update student. Please try again.");
    }
  };

  const handleSubjectChange = (
    index: number,
    field: keyof Subject,
    value: string
  ) => {
    const updatedSubjects = subjects.map((subject, i) => {
      if (i === index) {
        return {
          ...subject,
          [field]: field === "marks" ? Number(value) : value,
        };
      }
      return subject;
    });
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", marks: 0 }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label htmlFor="fullName" className="block">
          Full Name:{" "}
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block">
          Date of Birth :{" "}
        </label>
        <input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          required
        />
      </div>

      <div>
        <label htmlFor="studentClass" className="block">
          {" "}
          Class:{" "}
        </label>
        <input
          id="studentclass"
          type="text"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="border border-slate-500 px-8 py-2"
          required
        />
      </div>

      {
        /* Handling subjects array
      <div>
        {subjects.map((subject, index) => (
          <div key={index} className="flex gap-3">
            <input
              onChange={(e) =>
                setSubjects((prevSubjects) =>
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
                setSubjects((prevSubjects) =>
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
            setSubjects((prevSubjects) => [
              ...prevSubjects,
              { name: "", marks: 0 },
            ])
          }
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
        >
          Add Subject
        </button>
      </div> */
        //
      }

      <div>
        <label className="block">Subjects:</label>
        {subjects.map((subject, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={subject.name}
              onChange={(e) =>
                handleSubjectChange(index, "name", e.target.value)
              }
              placeholder="Subject Name"
              className="flex-1 border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              value={subject.marks}
              onChange={(e) =>
                handleSubjectChange(index, "marks", e.target.value)
              }
              placeholder="Marks"
              className="w-24 border rounded px-3 py-2"
              required
              // step="any"
            />
            <button
              type="button"
              onClick={() => removeSubject(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubject}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Subject
        </button>
      </div>

      <div>
        <label htmlFor="percentage" className="block">
          Percentage:
        </label>
        <input
          id="percentage"
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
          required
          step="any"
        />
      </div>

      <div>
        <label htmlFor="grade" className="block">
          Grade:
        </label>
        <input
          id="grade"
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Student
      </button>
    </form>
  );
}

// export default EditStudentForm;
