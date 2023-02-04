import IndexLayout from "@/layout";
import Link from "next/link";

export default function Home() {
  return (
    <IndexLayout type="home" extraClass="items-center">
      <div className="w-full md:w-fit mx-auto px-6 sm:h-fit gap-5 bg-white absolute bottom-0 rounded-t-3xl flex flex-col items-center justify-around">
        <h2 className="mt-9 mx-4 text-black text-3xl text-center font-bold">Get a better life and have a healthy body</h2>
        <p className="text-gray-500 font-medium w-[60%] text-center">Spend your fun time at home practicing anytime anywhere</p>
        <Link
          href={"register"}
          className="w-full h-12 font-semibold rounded-lg bg-[#25ab75] hover:bg-[#1f8b60] text-lg flex items-center justify-center"
        >
          Get Started
        </Link>
        <p className="text-gray-500 font-semibold pb-3">
          Alredy have an account?{" "}
          <Link href={"login"} className="text-[#25ab75] font-bold">
            Login
          </Link>
        </p>
      </div>
    </IndexLayout>
  );
}
