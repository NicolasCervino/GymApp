import Link from "next/link";
import { AiOutlineLeft, AiOutlineSave } from "react-icons/ai";

const RoutineHeader = () => {
  const handleSaveRoutine = () => {
    console.log("test");
  };

  return (
    <div className="bg-[#151515] min-h-[8vh] flex items-center justify-between text-white">
      <Link className="ml-5 border-white border-2 p-2 rounded-lg hover:bg-slate-500" href={"/profile"}>
        <AiOutlineLeft className="w-5 h-5" />
      </Link>
      <h1 className="text-xl font-bold">Create Routine</h1>
      {/* Save button */}
      <button className="mr-5 border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleSaveRoutine}>
        <AiOutlineSave className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RoutineHeader;
