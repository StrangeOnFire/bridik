"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import IphoneModel from "./IphoneModel";
export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="relative flex flex-col items-center justify-between p-4  overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 gap-10 place-content-center mt-[30vh] h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <p className="text-neutral-600 text-center sm:text-3xl text-xl font-[400]">
            Elevate your skills
          </p>
          <p className="text-neutral-600 text-center sm:text-3xl text-xl font-[400]">
            and advance your career.
          </p>
        </div>

        <h1 className="text-black text-center text-4xl sm:text-9xl font-semibold">
          Bridik for Growth
        </h1>
      </div>{" "}
      <Button
        onClick={() => router.push(session ? "/dashboard" : "/register")}
        className="bg-green-600 hover:bg-green-700 scale-75 sm:scale-100 text-white mt-8 text-lg sm:text-base px-12 py-8 rounded-full flex items-center justify-center "
      >
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Frocket.png?alt=media&token=8b617a86-da1d-4dd7-9565-188e5974854a"
          alt="download"
          width={40}
          height={40}
          className="mr-2 w-8 h-8"
        />
        {session ? "Go to Dashboard" : "Get Started For Free"}
      </Button>
      <div className="max-w-full asp">

      {/* <IphoneModel url={'bridik.in'} src={'https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/images%2FScreenshot%202024-09-12%20203336.png?alt=media&token=4d3b04b0-4f0b-4e07-ab6a-00f6b61ec681'}/> */}
      </div>
      <video
        className="  max-w-md m-4 rounded-xl border-2 border-black mt-10 w-full h-full  z-0"
        autoPlay
        muted
        loop
        playsInline
        loading="lazy"
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/videos%2FWhatsApp%20Video%202024-09-12%20at%208.19.47%20PM.mp4?alt=media&token=d763f4b1-cb92-49a9-9aa4-cd0ccf5e8b78"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </header>
  );
}
