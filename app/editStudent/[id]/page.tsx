import EditStudentForm from "@/components/EditStudentForm";

// const getTopicById = async (id) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/students/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topic");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export default async function EditStudent() {
  //   const { id } = params;
  //   const { topic } = await getTopicById(id);
  //   const { title, description } = topic;

  return <EditStudentForm />;
}
