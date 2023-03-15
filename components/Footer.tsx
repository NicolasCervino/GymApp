import React from "react";
import { RiHomeLine, RiUser3Line } from "react-icons/ri";
import { BiDumbbell } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();

  return (
    <div className="flex w-full md:hidden items-center justify-around bg-[#151515] fixed bottom-0 left-0 min-h-[7vh] border-t py-4 border-primary-green text-white">
      <Link href={"/app"} className={`flex flex-col items-center ${router.pathname === "/app" ? "text-primary-green" : ""}`}>
        <RiHomeLine className="w-5 h-5" />
      </Link>
      <Link href={"/exercises"} className={`flex flex-col items-center ${router.pathname === "/exercises" ? "text-primary-green" : ""}`}>
        <BiDumbbell className="w-5 h-5" />
      </Link>
      <Link href={"/profile"} className={`flex flex-col items-center ${router.pathname === "/profile" ? "text-primary-green" : ""}`}>
        <RiUser3Line className="w-5 h-5" />
      </Link>
    </div>
  );
}

export default Footer;
