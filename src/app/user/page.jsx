"use client";
import React from "react";
import { useSelector } from "react-redux";
import ProfilePage from "@/components/user/dashboard/ProfilePage";
export default function page() {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex flex-1 h-full overflow-y-scroll">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h1 className="text-2xl font-bold">
          Hi, {user?.fullName || "Welcome"}👋
        </h1>
        <p>Unlock your potential and boost your career.</p>
        <ProfilePage />
      </div>
    </div>
  );
}
