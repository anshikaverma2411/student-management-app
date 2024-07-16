// import connectMongoDB from "@/lib/mongodb";
// import Student from "@/models/Student";
// import { NextResponse } from "next/server";

// export async function PUT(request: any, { params }) {
//   const { id } = params;
//   const { newName: name, newDetail: details } = await request.json();
//   await connectMongoDB();
//   await Student.findByIdAndUpdate(id, { name, details });
//   return NextResponse.json({ message: "Student updated" }, { status: 200 });
// }

// export async function GET(request: any, { params }) {
//   const { id } = params;
//   await connectMongoDB();
//   const student = await Student.findOne({ _id: id });
//   return NextResponse.json({ student }, { status: 200 });
// }

import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { fullName, dateOfBirth, studentClass, subjects, percentage, grade } =
    await request.json();

  await connectMongoDB();

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    { fullName, dateOfBirth, studentClass, subjects, percentage, grade },
    { new: true }
  );

  if (!updatedStudent) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Student updated", student: updatedStudent },
    { status: 200 }
  );
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();
  const student = await Student.findById(id);

  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}
