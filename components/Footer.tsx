import React from "react";
import { RiHomeLine, RiUser3Line } from "react-icons/ri";
import { BiDumbbell } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();

  return (
    <div className="flex md:flex-col items-center md:text-xs md:justify-evenly justify-around bg-[#151515] fixed bottom-0 md:top-[12vh] left-0 w-full md:w-24 min-h-[7vh] md:h-full border-t md:border-r md:border-t-0 py-4 border-[#25ab75] text-white">
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
