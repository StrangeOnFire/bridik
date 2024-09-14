"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Mail, AlertCircle, ArrowRight } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-4" id="newsletter">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Keep connected to our team and progress.
            </h2>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-medium ">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-6 bg-white/5 border-white/10  placeholder-gray-500"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full py-6 text-lg  transition-all duration-200 ease-in-out transform "
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Keep me posted
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
            {status === "success" && (
              <div className="mt-4 flex items-center text-green-700 text-sm sm:text-base">
                <CheckCircle2 className="mr-2 h-5 w-5 " />
                <p>Thank you for subscribing!</p>
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 flex items-center text-red-400">
                <AlertCircle className="mr-2 h-5 w-5" />
                <p>Please enter a valid email address.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
