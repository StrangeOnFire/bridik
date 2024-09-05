import React from "react";

export default function Header() {
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
      <video
        className="  max-w-md m-4 rounded-xl border-2 border-black mt-10 w-full h-full  z-0"
        autoPlay
        muted
        loop
        playsInline
        loading="lazy"
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/videos%2F38762011.mp4?alt=media&token=030d2aae-776b-4682-b283-04c00a02c116"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </header>
  );
}
