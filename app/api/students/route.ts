// import { NextRequest, NextResponse } from "next/server";
// import connectToDatabase from "../../../lib/mongodb";
// import Student from "../../../models/Student";

// export async function GET() {
//   await connectToDatabase();
//   const students = await Student.find({});
//   return NextResponse.json(students);
// }

// export async function POST(req: NextRequest) {
//   await connectToDatabase();
//   try {
//     const body = await req.json();
//     const student = new Student(body);
//     await student.save();
//     return NextResponse.json(student, { status: 201 });
//   } catch (error) {
//     // @ts-ignore
//     return NextResponse.json({ message: error.message }, { status: 400 });
//   }
// }
import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { name, details } = await request.json();
  await connectMongoDB();
  await Student.create({ name, details });
  return NextResponse.json({ message: "Student Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const students = await Student.find();
  return NextResponse.json({ students });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Student.findByIdAndDelete(id);
  return NextResponse.json({ message: "Student deleted" }, { status: 200 });
}
