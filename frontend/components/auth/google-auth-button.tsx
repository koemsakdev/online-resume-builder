"use client";

import React, { useState, useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPath";
import { UserContext } from "@/contexts/useContext";
import { useRouter } from "next/navigation";

interface GoogleAuthButtonProps {
  text?: string;
  className?: string;
}

export const GoogleAuthButton = ({
  text = "Continue with Google",
  className = "w-full",
}: GoogleAuthButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const router = useRouter();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Send access token to backend to verify with Google and create / retrieve user
        const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE, {
          accessToken: tokenResponse.access_token,
        });

        const userData = response.data;
        if (userData && userData.token) {
          localStorage.setItem("token", userData.token);
          updateUser(userData);
          toast({
            title: "Signed in with Google",
            description: `Welcome back, ${userData.name}!`,
          });
          router.push("/dashboard");
        }
      } catch (error: any) {
        console.error("Google Auth Error:", error);
        toast({
          title: "Google Authentication Failed",
          description:
            error?.response?.data?.message ||
            "Could not authenticate with your Google account. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login Cancelled or Failed:", errorResponse);
      setLoading(false);
    },
  });

  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        loginWithGoogle();
      }}
      className={`rounded-xl border-border/80 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all py-5 font-medium ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin text-cyan-400 shrink-0" />
      ) : (
        <FcGoogle className="w-5 h-5 mr-2.5 shrink-0" />
      )}
      <span>{loading ? "Connecting to Google..." : text}</span>
    </Button>
  );
};

