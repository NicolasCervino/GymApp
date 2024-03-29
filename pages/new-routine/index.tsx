import AppLayout from "@/layout/appLayout";
import { BiDumbbell } from "react-icons/bi";
import { useRoutineContext } from "context/routine/RoutineProvider";
import TaskBanner from "@/components/TaskBanner";
import withAuth from "@/hocs/withAuth";
import { NewExerciseButton } from "@/components/NewExerciseButton";

const NewRoutine = () => {
  const { newRoutine, updateName } = useRoutineContext();

  return (
    <AppLayout>
      <div className="h-[92vh] md:px-20 overflow-x-hidden px-0 w-full py-5 text-white">
        {newRoutine && newRoutine.tasks.length > 0 && (
          <div className="mx-6">
            <input
              type="text"
              placeholder="Routine title"
              className="bg-inherit border-b w-full text-lg p-2"
              maxLength={27}
              value={newRoutine?.name || ""}
              onChange={(e) => updateName(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col items-center mt-5 gap-3 lg:mx-14">
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

          <NewExerciseButton route="new-routine/add-exercise" />
        </div>
      </div>
    </AppLayout>
  );
};

export default withAuth(NewRoutine);
