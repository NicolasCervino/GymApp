import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export const NewExerciseButton = ({ route }: { route: string }) => {
  return (
    <Link
      href={route}
      className="flex gap-2 justify-center items-center w-full p-2 my-2 bg-[#25ab75] hover:bg-[#1f8b60] text-lg rounded-lg font-semibold"
    >
      <AiOutlinePlus />
      <span>Add Exercise</span>
    </Link>
  );
};
