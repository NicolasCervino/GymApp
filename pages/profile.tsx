import RoutineBanner from "@/components/RoutineBanner";
import UserImage from "@/components/UserImage";
import withAuth from "@/hocs/withAuth";
import useRoutines from "@/hooks/useRoutines";
import { useUser } from "@/hooks/useUser";
import useWorkouts from "@/hooks/useWorkouts";
import AppLayout from "@/layout/appLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Profile = () => {
  const userData = useUser();
  const username = userData ? userData.username : null;
  const [workoutCount, setWorkoutCount] = useState<number>(0);

  const { workouts, loading: workoutLoading } = useWorkouts();
  const { routines, loading: routinesLoading, removeRoutine } = useRoutines();

  useEffect(() => {
    setWorkoutCount(workouts.length);
  }, [workouts, workoutLoading]);

  return (
    <AppLayout>
      <div className="md:ml-28 h-[85vh] md:h-[92vh] overflow-x-hidden px-6 py-5 text-white">
        {/* User Info Area */}
        <div className="flex items-center gap-4">
          <UserImage size={90} />
          <div>
            <h2 className="font-bold text-2xl">{username}</h2>
            <h3 className="text-lg font-normal text-gray-400">
              Workouts: <span className="text-[#25ab75]">{workoutCount}</span>
            </h3>
          </div>
        </div>
        {/* User Routines Area */}
        <div className="pt-6 flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Routines:</h2>
          <Link href={"/new-routine"} className="p-3 rounded-lg w-fit hover:bg-slate-500 flex gap-2 items-center bg-gray-700 text-base">
            <AiOutlinePlus color="#25ab75" />
            New Routine
          </Link>
          <div className="grid grid-row md:grid-cols-3 lg:grid-cols-4 gap-4">
            {routinesLoading ? (
              <h1>Loading...</h1>
            ) : (
              routines.map((routine) => <RoutineBanner routine={routine} key={routine.id} removeRoutine={removeRoutine} />)
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withAuth(Profile);
