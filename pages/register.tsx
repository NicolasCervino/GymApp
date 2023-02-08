import IndexLayout from "@/layout";
import PasswordInput from "../components/PasswordInput";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsCheck2Circle } from "react-icons/bs";
import Link from "next/link";
import { supabaseClient } from "@/utils/supabaseClient";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setMessage(password && repeatPassword && password !== repeatPassword ? "Passwords do not match" : "");
  }, [password, repeatPassword]);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);
  const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>): void => setRepeatPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The signUp function doesnt throw an error if you try to sign up
    // with an email that its already in use ._.
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: username,
          },
        },
      });
      if (data.user) setSuccess(true);
      else if (error) throw error;
    } catch (error: any) {
      alert(error.message);
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

  if (success) {
    return (
      <IndexLayout extraClass="items-end md:items-center">
        <div className="w-full md:w-fit px-10 min-h-[20%] md:h-fit bg-white text-black rounded-t-3xl md:rounded-2xl p-5">
          <div className="flex flex-col text-center justify-center items-center pb-4">
            <BsCheck2Circle className="w-14 h-14 text-[#25ab75]" />
            <h1 className="text-4xl font-bold text-gray-800">Check your mailbox</h1>
          </div>
          <p className="text-lg text-gray-700 text-center font-semibold mb-6 md:mb-3">
            We have sent a confirmation email with a link. Please ensure to check your spam box incase you can’t find it in your inbox
          </p>
        </div>
      </IndexLayout>
    );
  }

  return (
    <IndexLayout extraClass="items-end md:items-center">
      <div className="w-full md:w-fit px-10 min-h-[50%] md:h-fit bg-white text-black rounded-t-3xl md:rounded-2xl p-5">
        <h1 className="text-4xl text-center font-bold mb-6 md:mb-3">Register</h1>
        <form className="flex flex-col gap-[0.4rem]" onSubmit={handleSubmit}>
          <label className="text-sm">Username</label>
          <input
            className="bg-transparent border-b py-2 outline-none"
            type={"text"}
            placeholder="randomnickname"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete={"on"}
            required
          />
          <label className="text-sm">Email</label>
          <input
            className="bg-transparent border-b py-2 outline-none"
            type={"email"}
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete={"on"}
            required
          />
          <label className="text-sm">Password</label>
          <PasswordInput handlePassword={handlePassword} />
          <label className="text-sm">Confirm Password</label>
          <PasswordInput handlePassword={handleRepeatPassword} />
          {/* Error message */}
          <label className={`text-red-500 font-semibold text-sm text-center ${message === "" ? "hidden" : ""}`}>{message}</label>
          <button
            className="w-full h-12 text-white font-semibold rounded-lg bg-[#25ab75] text-lg flex items-center justify-center mt-6 hover:bg-[#1f8b60]"
            type="submit"
          >
            Register
          </button>
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

        <p className="w-full flex items-center justify-center text-sm text-gray-500 mt-3">
          Already have an account?{" "}
          <Link href={"/login"} className="ml-1 text-[#25ab75] font-bold">
            Login
          </Link>
        </p>
      </div>
    </IndexLayout>
  );
};

export default Register;
