import { useState, useEffect } from "react";
import IndexLayout from "@/layout";
import { AiOutlineExclamationCircle, AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import { supabaseClient } from "@/utils/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import SubmitButton from "@/components/SubmitButton";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/Spinner";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const isAuth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  // In case user tries to enter this route beeing logged in
  useEffect(() => {
    const path = router.asPath;
    if (!path.includes("type=recovery") && isAuth) {
      setLoading(true);
      router.push("/app");
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [isAuth]);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => setNewPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: "https://ego-lifting.vercel.app/reset-password",
    });
    if (data) {
      setErrorMessage(null);
      setSuccess(true);
    }
    if (error) {
      setSuccess(false);
      setErrorMessage(error.message);
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabaseClient.auth.updateUser({ password: newPassword });
    if (data) {
      alert("Password updated successfully!");
      await supabaseClient.auth.signOut();
      router.push("/login");
    }
    if (error) alert("There was an error updating your password.");
  };

  if (loading) {
    return <Spinner />;
  }

  if (isAuth) {
    return (
      <IndexLayout extraClass="items-end md:items-center">
        <div className="w-full md:w-fit px-10 min-h-[20%] md:h-fit bg-white text-black rounded-t-3xl md:rounded-2xl p-5">
          <div className="flex flex-col text-center justify-center items-center pb-4 gap-3">
            <AiOutlineExclamationCircle className="w-14 h-14 text-primary-green" />
            <h1 className="text-4xl font-bold text-gray-800">Reset password</h1>
          </div>
          <p className="text-lg text-gray-600 text-center font-semibold mb-6 md:mb-3">Enter you new password</p>
          <form className="flex flex-col gap-[0.4rem]" onSubmit={handleNewPasswordSubmit}>
            <label className="text-sm">Password</label>
            <PasswordInput handlePassword={handlePassword} />
            <SubmitButton text="Submit" />
            <Link href={"/login"} className="flex items-center w-fit font-semibold text-gray-500 hover:text-primary-green">
              <AiOutlineLeft className="text-black" />
              Back to login
            </Link>
          </form>
        </div>
      </IndexLayout>
    );
  }

  return (
    <IndexLayout extraClass="items-end md:items-center">
      <div className="w-full md:w-fit px-10 min-h-[20%] md:h-fit bg-white text-black rounded-t-3xl md:rounded-2xl p-5">
        <div className="flex flex-col text-center justify-center items-center pb-4 gap-3">
          <AiOutlineExclamationCircle className="w-14 h-14 text-primary-green" />
          <h1 className="text-4xl font-bold text-gray-800">Forgot Password</h1>
        </div>
        <p className="text-lg text-gray-600 text-center font-semibold mb-6 md:mb-3">
          Enter you email and we’ll send you a link to reset your password
        </p>
        <form className="flex flex-col gap-[0.4rem]" onSubmit={handleSubmit}>
          <label className="text-sm">Email</label>
          <input
            className="bg-transparent border-b py-2 outline-none"
            type={"email"}
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete={"on"}
          />
          <SubmitButton text="Submit" />
          {/* Success message */}
          <label className={`text-primary-green text-base font-semibold text-center ${!success ? "hidden" : ""}`}>
            Check your mailbox!
          </label>
          {/* Error message */}
          <label className={`text-red-500 text-base font-semibold text-center ${!errorMessage ? "hidden" : ""}`}>{errorMessage}</label>
          <Link href={"/login"} className="flex items-center mt-2 w-fit font-semibold text-gray-500 hover:text-primary-green">
            <AiOutlineLeft className="text-black" />
            Back to login
          </Link>
        </form>
      </div>
    </IndexLayout>
  );
};

export default ResetPassword;
