import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const getStudents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/students", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch student");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading students: ", error);
  }
};
export default async function StudentsList() {
  const { students } = await getStudents();
  return (
    <>
      {students.map((s) => (
        <div
          key={s._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{s.title}</h2>
            <div>{s.details}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn />
            <Link href={`/editStudent/${s._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
