import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RoutineHeader from "@/components/RoutineHeader";
import { WorkoutHeader } from "@/components/WorkoutHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [routineMode, setRoutineMode] = useState<boolean>(false);
  const [workoutMode, setWorkoutMode] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setRoutineMode(router.asPath.includes("/new-routine"));
    setWorkoutMode(router.asPath.includes("/workout/routine"));
  }, [router.asPath]);

  const renderHeader = () => {
    if (routineMode) {
      return <RoutineHeader />;
    }

    if (workoutMode) {
      return <WorkoutHeader />;
    }

    return <Header />;
  };

  return (
    <div className="min-h-screen bg-[#151515] text-white">
      {renderHeader()}
      {children}
      {routineMode ? "" : <Footer />}
    </div>
  );
};

export default AppLayout;
