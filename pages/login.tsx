import IndexLayout from "@/layout";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { supabaseClient } from "@/utils/supabaseClient";
import SubmitButton from "@/components/SubmitButton";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message); // Invalid login credentials
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <IndexLayout extraClass="items-end md:items-center">
      <div className="w-full md:w-fit px-10 min-h-[50%] md:h-fit bg-white text-black rounded-t-3xl md:rounded-2xl p-5">
        <h1 className="text-4xl text-center font-bold mb-6 md:mb-3">Welcome back!</h1>
        <form className="flex flex-col gap-[0.4rem]" onSubmit={handleSubmit}>
          <label className="text-sm">Email</label>
          <input
            className="bg-transparent border-b py-2 outline-none"
            type={"email"}
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete={"on"}
          />
          <label className="text-sm">Password</label>
          <PasswordInput handlePassword={handlePassword} />
          {/* Error message */}
          <label className={`text-red-500 font-semibold text-sm text-center ${message === "" ? "hidden" : ""}`}>{message}</label>
          <SubmitButton text="Sign in" />
        </form>
        {/* Divider */}
        <div className="inline-flex items-center justify-center w-full h-11">
          <hr className="w-64 h-px my-8 bg-gray-300 border-0" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">or</span>
        </div>
        {/* Google Login */}
        <button
          className="w-full flex justify-center items-center border border-black rounded-xl font-semibold text-sm py-2 hover:bg-gray-200"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-1" /> Log in with Google
        </button>
        {/* Password restore */}
        <Link
          href={"/reset-password"}
          className="w-full flex items-center justify-center text-sm text-gray-500 mt-3 hover:text-black hover:font-semibold"
        >
          Forgot your password?
        </Link>
        {/* Link to register */}
        <p className="w-full flex items-center justify-center text-sm text-gray-500 mt-3 cursor-default">
          Are you new?{" "}
          <Link href={"/register"} className="ml-1 text-[#25ab75] font-bold">
            Register
          </Link>
        </p>
      </div>
    </IndexLayout>
  );
};

export default Login;
