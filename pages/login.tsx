import IndexLayout from "@/layout";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);

  return (
    <IndexLayout type="login" extraClass="items-end md:items-center">
      <div className="w-full md:w-fit px-10 min-h-[50%] md:h-fit bg-white text-black rounded-t-3xl md:rounded-2xl p-5">
        <h1 className="text-4xl text-center font-bold mb-6 md:mb-3">Welcome back!</h1>
        <form className="flex flex-col gap-[0.4rem]">
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
          <button
            className="w-full h-12 text-white font-semibold rounded-lg bg-[#25ab75] text-lg flex items-center justify-center mt-6 hover:bg-[#1f8b60]"
            type="submit"
          >
            Sign in
          </button>
        </form>
        {/* Divider */}
        <div className="inline-flex items-center justify-center w-full h-11">
          <hr className="w-64 h-px my-8 bg-gray-300 border-0" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">or</span>
        </div>
        {/* Google Login */}
        <button className="w-full flex justify-center items-center border border-black rounded-xl font-semibold text-sm py-2 hover:bg-gray-200">
          <FcGoogle className="mr-1" /> Log in with Google
        </button>
        {/* Password restore */}
        <Link href={"/"} className="w-full flex items-center justify-center text-sm text-gray-500 mt-3">
          Forgot your password?
        </Link>
      </div>
    </IndexLayout>
  );
};

export default Login;