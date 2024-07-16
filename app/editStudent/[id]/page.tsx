// import EditStudentForm from "@/components/EditStudentForm";

// interface Student {
//   id: string;
//   name: string;
//   details: string;
// }

// const getStudentById = async (id: string): Promise<Student> => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/students/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch student");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// interface EditStudentProps {
//   params: {
//     id: string;
//   };
// }

// export default async function EditStudent({ params }: EditStudentProps) {
//   const { id } = params;
//   const student = await getStudentById(id);
//   const { name, details } = student;

//   return <EditStudentForm id={id} name={name} details={details} />;
// }

import EditStudentForm from "@/components/EditStudentForm";

interface Subject {
  name: string;
  marks: number;
}

interface Student {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  studentClass: string;
  subjects: Subject[];
  percentage: number;
  grade: string;
}

const getStudentById = async (id: string): Promise<Student> => {
  try {
    const res = await fetch(`http://localhost:3000/api/students/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch student");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface EditStudentProps {
  params: {
    id: string;
  };
}

export default async function EditStudent({ params }: EditStudentProps) {
  const { id } = params;
  const student = await getStudentById(id);

  // const { fullName, dateOfBirth, studentClass, subjects, percentage, grade } =
  //   student;

  // return (
  //   <EditStudentForm
  //     id={id}
  //     fullName={fullName}
  //     dateOfBirth={dateOfBirth}
  //     studentClass={studentClass}
  //     subjects={subjects}
  //     percentage={percentage}
  //     grade={grade}
  //   />

  // return <EditStudentForm student={student} />;

  return <EditStudentForm student={student} />;
}
