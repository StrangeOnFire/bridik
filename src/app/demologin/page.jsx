"use client";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import toast from "react-hot-toast";

// ---------------------------------------------------------------------------------
export default function Demologin() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: "demo@bridik.in",
        password: "demo123",
      });

      if (result.error) {
        toast.error("An unexpected error occurred");
      } else {
        // Successful login
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
      handleSubmit();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Floading.png?alt=media&token=6773e6d3-199b-4ae1-babf-d2ce6c552816"
        alt="logo"
        className="animate-spin "
        width={100}
        height={100}
      />
    </div>
  );
}
