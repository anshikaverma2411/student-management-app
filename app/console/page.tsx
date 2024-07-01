"use client";

import { useState } from "react";

const Console = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  const handleCommand = async () => {
    switch (command.toLowerCase()) {
      case "show students":
        const response = await fetch("/api/students");
        const students = await response.json();
        setOutput(JSON.stringify(students, null, 2));
        break;

      case "add student":
        const newStudent = {
          fullName: "John Doe",
          age: 20,
          dateOfBirth: new Date("2004-01-01"),
          class: "10th Grade",
          subjects: [
            { subjectName: "Math", marks: 85 },
            { subjectName: "Science", marks: 90 },
          ],
          percentage: 87.5,
          grade: "A",
        };
        try {
          const addResponse = await fetch("/api/students/route", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
          });

          if (!addResponse.ok) {
            const errorData = await addResponse.json();
            setOutput(`Error: ${errorData.message}`);
          } else {
            const addedStudent = await addResponse.json();
            setOutput(JSON.stringify(addedStudent, null, 2));
          }
        } catch (error) {
          // @ts-ignore: Ignore TypeScript error for unknown property

          setOutput(`Error: ${error.message}`);
        }
        break;

      default:
        setOutput("Unknown command");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management Console</h1>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
        style={{ width: "300px", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleCommand} style={{ padding: "10px" }}>
        Execute
      </button>
      <pre
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        {output}
      </pre>
    </div>
  );
};

export default Console;
