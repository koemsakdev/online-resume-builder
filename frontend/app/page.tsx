"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/nav-bar";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import WorkingStep from "@/components/cards/working-step";
import TemplateShowcase from "@/components/template-showcase";
import CtaBanner from "@/components/cta-banner";
import Footer from "@/components/footer";
import { ShieldCheck, Download, LayoutTemplate, Lock } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.replace("/dashboard");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">Loading workspace...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navbar */}
      <NavBar />

      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <Hero />

        {/* Feature Highlights Bar */}
        <section className="w-full py-8 border-y border-border/50 bg-muted/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-lg sm:text-xl font-extrabold brand-gradient-text">
                  <ShieldCheck className="w-5 h-5 text-cyan-500" />
                  ATS-Optimized
                </div>
                <p className="text-xs text-muted-foreground font-medium">Recruiter-ready layout standards</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-lg sm:text-xl font-extrabold brand-gradient-text">
                  <Download className="w-5 h-5 text-purple-500" />
                  Instant Export
                </div>
                <p className="text-xs text-muted-foreground font-medium">High-resolution clean PDF download</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-lg sm:text-xl font-extrabold brand-gradient-text">
                  <LayoutTemplate className="w-5 h-5 text-sky-500" />
                  18+ Formats
                </div>
                <p className="text-xs text-muted-foreground font-medium">Crafted for diverse job industries</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-lg sm:text-xl font-extrabold brand-gradient-text">
                  <Lock className="w-5 h-5 text-emerald-500" />
                  100% Free
                </div>
                <p className="text-xs text-muted-foreground font-medium">No paywalls or hidden fees</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <Feature />

        {/* 3-Step Workflow */}
        <WorkingStep />

        {/* Template Showcase */}
        <TemplateShowcase />

        {/* Final CTA Banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
