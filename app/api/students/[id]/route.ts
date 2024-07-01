import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }) {
  const { id } = params;
  const { newName: name, newDetail: details } = await request.json();
  await connectMongoDB();
  await Student.findByIdAndUpdate(id, { name, details });
  return NextResponse.json({ message: "Student updated" }, { status: 200 });
}

export async function GET(request: any, { params }) {
  const { id } = params;
  await connectMongoDB();
  const student = await Student.findOne({ _id: id });
  return NextResponse.json({ student }, { status: 200 });
}
