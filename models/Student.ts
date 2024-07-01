// models/Student.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  fullName: string;
  dateOfBirth: Date;
  Class: string;
  subjects: { name: string; marks: number }[];
  percentage: number;
  grade: string;
}

const studentSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    Class: { type: String, required: true },
    subjects: [{ name: String, marks: Number }],
    percentage: { type: Number, required: true },
    grade: {
      type: String,
      enum: ["A+", "A", "B", "C", "D", "F"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);

export default Student;
