"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      // Sync clear cookie
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
      router.replace("/sign-in");
    } else {
      // Sync set cookie if not present
      if (!document.cookie.includes("token=")) {
        document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
      }
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

