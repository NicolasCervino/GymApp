import { useUser } from "@/hooks/useUser";
import { supabaseClient } from "@/utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbLogout, TbPencil } from "react-icons/tb";
import Swal from "sweetalert2";
import UserImage from "./UserImage";

const Header = () => {
  const userData = useUser();
  const username = userData ? userData.username : null;
  const [profileMode, setProfileMode] = useState<boolean>(false);
  const router = useRouter();

  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    setProfileMode(router.asPath.includes("/profile"));
  }, [router.asPath]);

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
    Swal.fire({
      title: "Are you sure you want to exit?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#25ab75",
    }).then(async (result) => {
      if (result.isConfirmed) await supabaseClient.auth.signOut();
    });
  };

  return (
    <div className="bg-[#151515] min-h-[8vh] flex items-center justify-between text-white">
      {profileMode ? (
        <Link className="ml-5 border-white border-2 p-2 rounded-lg hover:bg-slate-500" href={"/edit-profile"}>
          <TbPencil className="w-5 h-5" />
        </Link>
      ) : (
        <div className="flex items-center gap-3 ml-5">
          <UserImage size={48} />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Hello {username}</h1>
            <p className="text-base font-light">{greeting}</p>
          </div>
        </div>
      )}
      {profileMode ? <h1 className="text-xl font-bold">Profile</h1> : ""}
      {/* Logout button */}
      <button className="mr-5 border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleLogout}>
        <TbLogout className="w-5 h-5"></TbLogout>
      </button>
    </div>
  );
};

export default Header;
