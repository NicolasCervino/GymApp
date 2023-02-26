import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RoutineHeader from "@/components/RoutineHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [routineMode, setRoutineMode] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setRoutineMode(router.asPath.includes("/new-routine"));
  }, [router.asPath]);

  return (
    <div className="min-h-screen bg-[#151515] text-white">
      {routineMode ? <RoutineHeader /> : <Header />}
      {children}
      {routineMode ? "" : <Footer />}
    </div>
  );
};

export default AppLayout;
