"use client";
import { useSelector } from "react-redux";
import ProfileUpdateForm from "@/components/user/profile/ProfileUpdateForm";
export default function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl h-screen border border-neutral-200  bg-white   w-full overflow-y-auto">
      <ProfileUpdateForm user={user} />
    </div>
  );
}
