"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      setError(result.error); 
    } else {
      // Fetch user data after successful login
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const userData = await res.json();
          dispatch(setUser(userData));
          router.push("/dashboard");
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { redirect: false });
    if (result.error) {
      setError(result.error);
    } else {
      // Fetch user data after successful Google sign-in
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const userData = await res.json();
          dispatch(setUser(userData));
          router.push("/dashboard");
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1>Welcome, {user?.fullName}!</h1>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Log in
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Continue with Google
      </button>
    </form>
  );
}
