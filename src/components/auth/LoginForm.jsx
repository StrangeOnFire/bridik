"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// ---------------------------------------------------------------------------------
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        // Handle specific errors
        if (result.error === "No user found with this email") {
          setError("No account found with this email. Please check your email or sign up.");
        } else if (result.error === "Invalid password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError(result.error || "An unexpected error occurred");
        }
      } else {
        // Successful login
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="fixed top-0 sm:w-1/2 mb-4 w-full sm:mb-0 bg-gradient-to-r from-green-200 to-lime-200  px-6 py-2  sm:px-3.5 text-black flex justify-around items-center flex-col sm:flex-row">
        <p className="text-sm font-semibold leading-6 ">
          Wants demo how we actually work?
        </p>
        <Link href="/demologin">
          <Button className="bg-black/60">
            Try with dummy data <ArrowRight className="ml-2 w-4 h-4 " />
          </Button>
        </Link>
      </div>
      <Card className="w-full max-w-md mx-auto border-0 !shadow-none">
        <CardHeader className="space-y-1 mb-4 sm:mb-0">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-green-700 to-lime-600"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Sign In with Email
                </>
              )}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={handleGoogleSignIn}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
                Connecting...
              </div>
            ) : (
              <>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Fgoogle%20(1).png?alt=media&token=ac147adb-05c7-4838-8baf-eddbd6e3621e"
                  alt="google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Continue with Google
              </>
            )}
          </Button>
        </CardContent>
        {error && (
          <div className="flex items-center space-x-2 text-red-600 px-6 py-2 bg-red-50 rounded-b-lg">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            New to our platform?
            <Link
              href="/register"
              className="ml-2 font-semibold text-blue-500 hover:text-blue-600 underline underline-offset-4"
            >
              Get Started
            </Link>{" "}
          </p>
        </CardFooter>
      </Card>{" "}
    </div>
  );
}
