import AppLayout from "@/layout/appLayout";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDumbbell } from "react-icons/bi";
import { useRoutineContext } from "context/routine/RoutineProvider";
import TaskBanner from "@/components/TaskBanner";
import withAuth from "@/hocs/withAuth";

const NewRoutine = () => {
  const { newRoutine, updateName } = useRoutineContext();

  return (
    <AppLayout>
      <div className="h-[85vh] md:px-20 md:h-[92vh] overflow-x-hidden px-6 py-5 text-white">
        <input
          type="text"
          placeholder="Routine title"
          className="bg-inherit border-b w-full text-lg p-2"
          value={newRoutine?.name || ""}
          onChange={(e) => updateName(e.target.value)}
        />
        <div className="flex flex-col items-center mt-5 px-2 gap-3 lg:mx-14">
          {!newRoutine || newRoutine?.tasks.length === 0 ? (
            <>
              <BiDumbbell className="w-10 h-10" color="#25ab75" />
              <p className="text-center text-gray-400">Get started by adding an exercise to your routine</p>
            </>
          ) : (
            <>
              {newRoutine?.tasks.map((task) => (
                <TaskBanner key={task.id} task={task} />
              ))}
            </>
          )}

          <Link
            href={"new-routine/add-exercise"}
            className="flex gap-2 justify-center items-center w-full p-2 my-2 bg-[#25ab75] hover:bg-[#1f8b60] text-lg rounded-lg font-semibold"
          >
            <AiOutlinePlus />
            <span>Add Exercise</span>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default withAuth(NewRoutine);
