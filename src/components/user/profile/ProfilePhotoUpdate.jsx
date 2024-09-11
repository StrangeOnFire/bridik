"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { storage } from "../../../lib/firebase"; // Ensure this path is correct
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function ProfilePhotoUpdate({ user }) {
  const { data: session, update } = useSession();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    setIsUploading(true);
    try {
      const imageFile = await fetch(image).then((r) => r.blob());
      const storageRef = ref(storage, `avatars/${session.user.id}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update user profile with new image URL
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: downloadURL }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        dispatch(setUser(updatedUser));
        await update({
          ...session,
          user: { ...session.user, image: downloadURL },
        });
        toast.success("Profile picture updated successfully");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setImage(user?.image);
  }, [user]);

  return (
    <Card className="w-full !shadow-none mb-6  border bg-[#f5f5f5] rounded-2xl">
      <CardHeader className="mb-4 mt-2 sm:mt-0 sm:mb-0 text-center ">
        <CardTitle className="text-lg font-semibold">Profile Picture</CardTitle>
        <CardDescription className="text-sm text-gray-500 ">
          Recommended image size is 1:1 (square).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            disabled={isUploading}
            onChange={handleFileChange}
            ref={fileRef}
          />
          <span className="flex items-center justify-center border-2 border-green-700 rounded-full p-1 relative">
            <span className="overflow-hidden rounded-full h-40 w-40">
              <label
                onClick={() => fileRef.current.click()}
                className="text-green-600 text-center flex justify-center items-center h-full w-full"
              >
                <img
                  src={image || user?.image || ""}
                  alt="Profile"
                  className="bg-cover object-cover w-full h-full"
                />
              </label>
            </span>
            <label onClick={() => fileRef.current.click()}>
              <span className="bg-green-700 rounded-full p-2 absolute right-0 bottom-4 cursor-pointer text-white">
                <Edit size={18} />
              </span>
            </label>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {image && (
          <button
            type="button"
            disabled={isUploading}
            onClick={handleImageUpload}
            className="text-white bg-black w-[200px] font-semibold mt-4 sm:mt-0 m-auto rounded-lg px-10 py-1 h-[40px] flex items-center justify-center"
          >
            {isUploading ? <ButtonLoading /> : "Upload"}
          </button>
        )}
      </CardFooter>
    </Card>
  );
}

const ButtonLoading = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
  </div>
);
