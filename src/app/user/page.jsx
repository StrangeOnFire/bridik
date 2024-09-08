"use client";
import React from "react";
import { useSelector } from "react-redux";
import ProfilePage from "@/components/user/dashboard/ProfilePage";
import UserDashboard from "@/components/user/dashboard/UserDashboard";

export default function Page() {
  const user = useSelector((state) => state.user);
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl  h-screen overflow-y-scroll border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full ">
      <h1 className="text-2xl font-bold">
        Hi, {user?.fullName || "Welcome"}👋
      </h1>
      <p className="text-sm sm:text-base text-neutral-500">
        Unlock your potential and boost your career.
      </p>
      <UserDashboard user={user} />
      <ProfilePage />
    </div>
  );
}
