import { useUser } from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { v4 as uuid } from "uuid";

const UserImage = ({ size }: { size: number }) => {
  const userData = useUser();
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    setImageSrc(userData?.image);
  }, [userData?.image]);

  return (
    <>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          style={{ width: size, height: size }}
          src={`${imageSrc}?${uuid()}`}
          alt={"profile-pic"}
          className="rounded-full object-cover"
        />
      ) : (
        <HiUserCircle size={size} />
      )}
    </>
  );
};

export default UserImage;
