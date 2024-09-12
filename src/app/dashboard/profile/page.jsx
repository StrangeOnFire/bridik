"use client";
import { useSelector } from "react-redux";
import ProfileUpdateForm from "@/components/user/profile/ProfileUpdateForm";
export default function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl pb-10  relative h-screen overflow-y-scroll border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full ">
      <ProfileUpdateForm user={user} />
    </div>
  );
}
