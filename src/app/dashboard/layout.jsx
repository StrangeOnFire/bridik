"use client";
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarLogout,
} from "@/components/ui/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisResult } from "@/store/userSlice";
import Loading from "./loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ---------------------------------------------------------------------------------
export default function UserSidebar({ children }) {
  const router = useRouter();
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Settings",
    //   href: "#",
    //   icon: (
    //     <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();

  const handleAnalyzeSkills = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/analyze-skills", {
        currentSkills: user.currentSkills,
        careerGoals: user.careerGoals,
        jobTitle: user.jobTitle,
        industry: user.industry,
        yearsOfExperience: user.yearsOfExperience,
        educationalBackground: user.educationalBackground,
      });
      dispatch(setAnalysisResult(response.data));
    } catch (error) {
      console.error("Error fetching AI suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session.user.jobTitle === "Not specified") {
        // Redirect new Google users to a profile completion page
        router.push("/dashboard/profile");
      } else if (
        user?.analysisResult === null &&
        user?.currentSkills?.length > 0
      ) {
        handleAnalyzeSkills();
      }
    }
  }, [status, session, user]);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto  overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => setOpen(false)}
                />
              ))}
              <SidebarLogout />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.fullName || session?.user?.fullName || "",
                href: "#",
                icon: (
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.image || ""} alt={user?.fullName} />
                    <AvatarFallback className="bg-zinc-700 text-white text-xs">
                      {user?.fullName
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                    </AvatarFallback>
                  </Avatar>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full h-screen min-h-screen overflow-y-auto">
        {loading && <Loading />}
        {children}
      </div>
    </div>
  );
}
const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fleaf.png?alt=media&token=aa41843d-e3b3-4799-89a4-072feae324e8"
        alt="logo"
        className="w-7 h-7"
        width={50}
        height={50}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black text-xl dark:text-white whitespace-pre"
      >
        Bridik
      </motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fleaf.png?alt=media&token=aa41843d-e3b3-4799-89a4-072feae324e8"
        alt="logo"
        className="w-7 h-7"
        width={50}
        height={50}
      />
    </Link>
  );
};
