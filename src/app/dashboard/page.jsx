"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserDashboard from "@/components/user/dashboard/UserDashboard";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
export default function Page() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl relative h-screen overflow-y-scroll border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full ">
      <h1 className="text-2xl font-bold mt-4 sm:mt-0">Hi, Welcome back👋</h1>
      <p className="text-sm sm:text-base text-neutral-500 mb-4 sm:mb-0">
        Unlock your potential and boost your career.
      </p>
      <Banner />
      <UserDashboard user={user} />
    </div>
  );
}

function Banner() {
  const router = useRouter();
  return (
    <div className="relative mb-4 sm:mb-0 bg-gradient-to-r from-green-700 to-lime-600  px-6 py-4  sm:px-3.5 text-white rounded-lg flex justify-around items-center flex-col sm:flex-row">
      <p className="text-sm font-semibold leading-6 ">
        Want to Analyze again or update your info?
      </p>

      <div
        className=" w-fit h-[45px] ml-auto sm:ml-0 scale-75 sm:scale-90 overflow-hidden"
        onClick={() => {
          router.push("/dashboard/profile");
        }}
      >
        <div className="h-[90px] overflow-hidden">
          <div className=" flex relative group py-2 px-4 h-1/2 max-h-[90px] m-auto  cursor-pointer text-xl font-[500] border items-center overflow-hidden justify-center  rounded-3xl box-border gap-4 z-10">
            <div className="h-full max-h-[90px] overflow-hidden transition-all">
              <p className=" transition-all group-hover:translate-x-[10%] group-hover:translate-y-[-100%]">
                Go to Profile
              </p>
              <p className="transition-all translate-x-[10%] translate-y-[10%] group-hover:translate-x-[0%] group-hover:translate-y-[-100%]">
                Don&apos;t be shy
              </p>
            </div>

            <span className=" group-hover:scale-150 rounded-full bg-black flex w-5 h-5 justify-center items-center transition-all text-white">
              <ArrowRight className="transition-all group-hover:translate-x-0 scale-0 group-hover:scale-90  translate-x-[-110%] " />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
