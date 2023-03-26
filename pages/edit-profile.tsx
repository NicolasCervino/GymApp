import UserImage from "@/components/UserImage";
import withAuth from "@/hocs/withAuth";
import { useUser } from "@/hooks/useUser";
import AppLayout from "@/layout/appLayout";
import { supabaseClient } from "@/utils/supabaseClient";
import { useSweetAlert } from "@/utils/useSwal";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const EditProfile = () => {
  const userData = useUser();
  const [uploading, setUploading] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [previousUrl, setPreviousUrl] = useState<string | undefined>(undefined);
  const [newUsername, setNewUsername] = useState<string | undefined>(undefined);

  const router = useRouter();

  const { showAlert, showingAlert } = useSweetAlert();

  useEffect(() => {
    if (newAvatar) {
      const newUrl = URL.createObjectURL(newAvatar);
      setPreviewUrl(newUrl);
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
      setPreviousUrl(newUrl);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAvatar]);

  const uploadNewAvatarImage = async () => {
    if (!previewUrl || !newAvatar) {
      return;
    }
    setUploading(true);
    if (userData) {
      const filePath = userData.userId + "/" + userData.email;
      const { error: uploadError } = await supabaseClient.storage.from("avatars").upload(filePath, newAvatar, {
        upsert: true,
      });
      if (uploadError) {
        setUploading(false);
        throw uploadError;
      }
      const avatarUrl = "https://dpkgyzzgvsfjlqyyhmej.supabase.co/storage/v1/object/public/avatars/" + filePath;
      setUploading(false);
      return avatarUrl;
    }
  };

  const updateUserAvatarUrl = async (url: string | undefined) => {
    if (!url) {
      return;
    }
    const { data, error } = await supabaseClient.auth.updateUser({
      data: {
        custom_avatar: url,
      },
    });
    if (error) {
      showAlert(error.message, "error");
    }
    if (data) showAlert("userAvatarUpdated", "success");
  };

  const updateUserName = async () => {
    if (!userData || !newUsername) {
      return;
    }
    if (newUsername !== userData.username && newUsername.length <= 15) {
      const { data, error } = await supabaseClient.auth.updateUser({
        data: { custom_name: newUsername },
      });
      if (error) {
        showAlert(error.message, "error");
      }
    } else {
      throw new Error("There is no image to upload.");
    }
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setNewAvatar(e.target.files[0]);
  };

  const handleSaveButton = async () => {
    try {
      let hasChanges = false;
      if (newUsername && newUsername !== userData?.username) {
        await updateUserName();
        hasChanges = true;
      }
      if (newAvatar) {
        const url = await uploadNewAvatarImage();
        await updateUserAvatarUrl(url);
        hasChanges = true;
      }
      if (hasChanges) {
        showAlert("Changes saved successfully!", "success", () => router.push("/profile"));
      }
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  return (
    <AppLayout>
      <div className="md:mx-28 h-[85vh] md:h-[92vh] overflow-x-hidden px-6 py-5 text-white">
        <div className="flex flex-col gap-2 items-center justify-center mt-5 mb-12">
          <h2 className="font-bold text-2xl">{userData?.username}</h2>
          <h3 className="font-light text-sm text-gray-300">{userData?.email}</h3>
          <div className="flex items-center mt-3 gap-2">
            <UserImage size={90} />
            {previewUrl && (
              <>
                <BsArrowRight />
                <Image
                  src={previewUrl}
                  alt="new-profile-pic"
                  className="w-[90px] h-[90px] rounded-full"
                  style={{ objectFit: "cover" }}
                  width={90}
                  height={90}
                />
              </>
            )}
          </div>
          <label className="mt-3 flex items-center bg-primary-green h-9 text-base px-4 py-1 rounded-md cursor-pointer">
            Change Picture
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleSelectImage(e)}
            />
          </label>
        </div>
        {/* Username input */}
        <div className="flex flex-col">
          <label className="text-sm">Change username:</label>
          <input
            className="bg-transparent border-b py-2 outline-none"
            type={"text"}
            placeholder={"New Username"}
            defaultValue={userData?.username}
            maxLength={15}
            onChange={(e) => setNewUsername(e.target.value)}
            autoComplete={"on"}
          />
        </div>

        <button
          className="bg-primary-green disabled:opacity-50 rounded-md text-lg w-80 mt-20 h-14 mx-auto flex justify-center items-center"
          onClick={handleSaveButton}
          disabled={((!newUsername || newUsername === userData?.username) && !newAvatar) || showingAlert}
        >
          Save
        </button>
      </div>
    </AppLayout>
  );
};

export default withAuth(EditProfile);
