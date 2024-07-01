// import mongoose, { Schema, Document } from "mongoose";

// interface IStudent extends Document {
//   fullName: string;
//   age: number;
//   dateOfBirth: Date;
//   class: string;
//   subjects: {
//     subjectName: string;
//     marks: number;
//   }[];
//   percentage: number;
//   grade: string;
// }

// const StudentSchema: Schema = new Schema({
//   fullName: { type: String, required: true },
//   age: { type: Number, required: true },
//   dateOfBirth: { type: Date, required: true },
//   class: { type: String, required: true },
//   subjects: [
//     {
//       subjectName: { type: String, required: true },
//       marks: { type: Number, required: true },
//     },
//   ],
//   percentage: { type: Number, required: true },
//   grade: { type: String, required: true },
// });

// const Student =
//   mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

// export default Student;

import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: String,
    details: String,
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
