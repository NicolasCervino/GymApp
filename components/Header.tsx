import { useUser } from "@/hooks/useUser";
import { supabaseClient } from "@/utils/supabaseClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const Header = () => {
  const userData = useUser();
  const username = userData ? userData.username : null;
  const imageUrl = userData ? userData.image : null;

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
    <div className="bg-[#0f0f0f] min-h-[12vh] flex items-center justify-between text-white">
      {/* Profile pic and name */}
      <div className="flex items-center gap-3 ml-5">
        {imageUrl ? (
          <Image src={userData?.image || ""} alt="profile-pic" className="w-12 h-12 rounded-full" width={48} height={48} />
        ) : (
          <FaUserCircle className="w-12 h-12" />
        )}

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
