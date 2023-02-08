import { useUser } from "@/hooks/useUser";
import { supabaseClient } from "@/utils/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const Header = () => {
  const userData = useUser();
  const username = userData ? userData.username : null;

  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const handleLogout = async () => {
    // Maybe make it a modal for confirmation ??
    await supabaseClient.auth.signOut();
  };

  return (
    <div className="bg-[#25ab75] min-h-[12vh] flex items-center justify-between">
      {/* Profile pic and name */}
      <div className="flex items-center gap-3 ml-5">
        {/* <Image src={"s"} alt="profile-pic" width={20} height={20} /> */}
        <FaUserCircle className="w-12 h-12" />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Hello {username}</h1>
          <p className="text-base font-light">{greeting}</p>
        </div>
      </div>
      {/* Logout button */}
      <button className="mr-5 border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleLogout}>
        <TbLogout className="w-6 h-6"></TbLogout>
      </button>
    </div>
  );
};

export default Header;