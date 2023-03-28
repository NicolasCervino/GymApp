import publicOnly from "@/hocs/publicOnly";
import IndexLayout from "@/layout";
import Link from "next/link";
import { BiDumbbell } from "react-icons/bi";

const LandingPage = () => {
  return (
    <IndexLayout extraClass="text-white">
      <div className="flex items-center gap-2 mt-20 w-fit h-fit text-center select-none">
        <BiDumbbell className="text-4xl text-primary-green" />
        <h1 className="text-3xl font-bold">Ego-Lifting</h1>
      </div>
      <div className="w-full md:w-fit mx-auto px-6 sm:h-fit gap-5 bg-white absolute bottom-0 rounded-t-3xl flex flex-col items-center justify-around">
        <h2 className="mt-9 mx-4 text-black text-3xl text-center font-bold">Get a better life and have a healthy body</h2>
        <p className="text-gray-500 font-medium w-[60%] text-center">Spend your fun time at home practicing anytime anywhere</p>
        <Link
          href={"register"}
          className="w-full h-12 font-semibold rounded-lg bg-primary-green hover:bg-[#1f8b60] text-lg flex items-center justify-center"
        >
          Get Started
        </Link>
        <p className="text-gray-500 font-semibold pb-3">
          Already have an account?{" "}
          <Link href={"login"} className="text-primary-green font-bold">
            Login
          </Link>
        </p>
      </div>
    </IndexLayout>
  );
};

export default publicOnly(LandingPage);
