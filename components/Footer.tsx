import React from "react";
import { RiHomeLine, RiUser3Line } from "react-icons/ri";
import { BiDumbbell } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-around bg-[#151515] fixed bottom-0 left-0 w-full min-h-[7vh]">
      <Link href={"/app"} className={`flex flex-col items-center ${router.pathname === "/app" ? "text-[#25ab75]" : ""}`}>
        <RiHomeLine />
        Home
      </Link>
      <Link href={"/exercises"} className={`flex flex-col items-center ${router.pathname === "/exercises" ? "text-[#25ab75]" : ""}`}>
        <BiDumbbell />
        Exercises
      </Link>
      <Link href={"/profile"} className={`flex flex-col items-center ${router.pathname === "/profile" ? "text-[#25ab75]" : ""}`}>
        <RiUser3Line />
        Profile
      </Link>
    </div>
  );
}

export default Footer;
