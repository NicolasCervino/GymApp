import { useUser } from "@/hooks/useUser";
import { supabaseClient } from "@/utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbLogout, TbPencil } from "react-icons/tb";
import Swal from "sweetalert2";
import UserImage from "./UserImage";
import { RiHomeLine, RiUser3Line } from "react-icons/ri";
import { BiDumbbell } from "react-icons/bi";

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
    <div className="bg-[#151515] min-h-[8vh] py-3 flex items-center justify-between text-white">
      {profileMode ? (
        <Link
          className="ml-5 flex items-center md:border-none md:gap-2 border-white border-2 p-2 rounded-lg hover:bg-slate-500"
          href={"/edit-profile"}
        >
          <TbPencil className="w-5 h-5" />
          <span className="hidden md:block">Edit profile</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3 ml-5 md:ml-12">
          <UserImage size={48} />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Hello {username}</h1>
            <p className="text-base font-light">{greeting}</p>
          </div>
        </div>
      )}
      {profileMode ? <h1 className="md:hidden text-xl font-bold">Profile</h1> : ""}
      {/* Navigation */}
      <div className="flex">
        <div className="flex items-baseline space-x-4">
          <Link
            href="/"
            className={`hidden md:flex gap-2 ${
              router.pathname === "/app" ? "text-primary-green" : "text-gray-300 hover:text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Home
            <RiHomeLine className="w-5 h-5" />
          </Link>
          <Link
            href="/exercises"
            className={`hidden md:flex gap-2 ${
              router.pathname === "/exercises" ? "text-primary-green" : "text-gray-300 hover:text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Exercises
            <BiDumbbell className="w-5 h-5" />
          </Link>
          <Link
            href="/profile"
            className={`hidden md:flex gap-2 ${
              router.pathname === "/profile" ? "text-primary-green" : "text-gray-300 hover:text-white"
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Profile
            <RiUser3Line className="w-5 h-5" />
          </Link>
        </div>
        <button
          className="hidden md:flex gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          onClick={handleLogout}
        >
          Logout
          <TbLogout className="w-5 h-5"></TbLogout>
        </button>
        {/* Logout button */}
        <button className="md:hidden mr-5 border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleLogout}>
          <TbLogout className="w-5 h-5"></TbLogout>
        </button>
      </div>
    </div>
  );
};

export default Header;
