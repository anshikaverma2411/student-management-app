"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudent() {
  return (
    <form className="flex flex-col gap-3">
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Student Name"
      />

      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Student Details"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Student
      </button>
    </form>
  );
}
