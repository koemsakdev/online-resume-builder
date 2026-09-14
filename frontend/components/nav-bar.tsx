"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LayoutTemplate, LogIn, Sparkles, ArrowRight } from "lucide-react";
import { ProfileAccount } from "./ui/profile-account";
import { UserContext } from "@/contexts/useContext";
import { useContext } from "react";
import { Button } from "./ui/button";

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/rb-logo.png"
              alt="ResumeRise Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-extrabold tracking-tight brand-gradient-text">
            ResumeRise
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#templates" className="hover:text-foreground transition-colors">
            Templates
          </a>
          <a href="#reviews" className="hover:text-foreground transition-colors">
            Reviews
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground">
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild size="sm" className="brand-gradient-btn rounded-full px-4 text-xs font-semibold shadow-md shadow-cyan-500/20">
                <Link href="/resume-templates">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  New Resume
                </Link>
              </Button>
              <ProfileAccount />
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Button asChild variant="ghost" size="sm" className="text-sm font-medium">
                <Link href="/sign-in" className="flex items-center gap-1.5">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild size="sm" className="brand-gradient-btn rounded-full px-4 text-xs font-semibold shadow-md shadow-cyan-500/20">
                <Link href="/dashboard" className="flex items-center gap-1">
                  Get Started Free
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
