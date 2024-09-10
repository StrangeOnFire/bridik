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

// ---------------------------------------------------------------------------------
export default function UserSidebar({ children }) {
  const router = useRouter();
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handleAnalyzeSkills = async () => {
    if (!user) return;

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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching AI suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.loggedIn === false) {
      router.push("/");
    }
    if (user?.analysisResult === null && user?.currentSkills?.length > 0) {
      setTimeout(() => {
        handleAnalyzeSkills();
      }, 1000);
    }
  }, [user]);

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
                <SidebarLink key={idx} link={link} />
              ))}
              <SidebarLogout />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
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
