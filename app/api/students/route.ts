// import connectMongoDB from "@/lib/mongodb";
// import Student from "@/models/Student";
// import { NextResponse } from "next/server";

// export async function POST(request: any) {
//   const { name, details } = await request.json();
//   await connectMongoDB();
//   await Student.create({ name, details });
//   return NextResponse.json({ message: "Student Created" }, { status: 201 });
// }

// export async function GET() {
//   await connectMongoDB();
//   const students = await Student.find();
//   return NextResponse.json({ students });
// }

// export async function DELETE(request: any) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Student.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Student deleted" }, { status: 200 });
// }

// pages/api/students/index.ts
// pages/api/students/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../../../lib/mongodb";
import Student, { IStudent } from "../../../models/Student";
import { NextResponse } from "next/server";

// Connect MongoDB middleware
const withDB =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongoDB();
    return handler(req, res);
  };
export async function POST(request: any) {
  try {
    const {
      fullName,
      dateOfBirth,
      Class: studentClass,
      subjects,
      percentage,
      grade,
    } = await request.json();

    await connectMongoDB();

    const newStudent: IStudent = new Student({
      fullName,
      dateOfBirth,
      class: studentClass,
      subjects,
      percentage,
      grade,
    });

    const savedStudent = await newStudent.save();

    return NextResponse.json(
      { message: "Student Created", student: savedStudent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { message: "Failed to create student" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const students = await Student.find();
  return NextResponse.json({ students });
}

// // // GET /api/students
// const getStudents = async (_req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json({ students });
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     res.status(500).json({ message: "Failed to fetch students" });
//   }
// };

// // DELETE /api/students/:id
// const deleteStudent = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { id } = req.query;

//     const deletedStudent = await Student.findByIdAndDelete(id as string);

//     if (!deletedStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.status(200).json({ message: "Student deleted" });
//   } catch (error) {
//     console.error("Error deleting student:", error);
//     res.status(500).json({ message: "Failed to delete student" });
//   }
// };

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Student.findByIdAndDelete(id);
  return NextResponse.json({ message: "Student deleted" }, { status: 200 });
}

// Export the API routes
// export default withDB((req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     return postStudent(req, res);
//   } else if (req.method === "GET") {
//     return getStudents(req, res);
//   } else if (req.method === "DELETE") {
//     return deleteStudent(req, res);
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// });
