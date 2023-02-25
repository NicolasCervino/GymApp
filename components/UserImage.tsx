import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import { HiUserCircle } from "react-icons/hi";

const UserImage = ({ size }: { size: number }) => {
  const userData = useUser();
  const imageUrl = userData ? userData.image : null;

  return (
    <>
      {imageUrl ? (
        <Image
          src={userData?.image || ""}
          alt="profile-pic"
          className={`w-[${size}px] h-[${size}px] rounded-full`}
          width={size}
          height={size}
        />
      ) : (
        <HiUserCircle className={`w-[${size}px] h-[${size}px]`} />
      )}
    </>
  );
};

export default UserImage;
