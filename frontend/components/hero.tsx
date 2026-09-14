"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Download, Award } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24">
      {/* Background ambient lighting matching rb-logo.png (electric cyan and purple) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] cyan-glow pointer-events-none opacity-40 -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[400px] purple-glow pointer-events-none opacity-35 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Value Prop */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-xs sm:text-sm font-medium text-cyan-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Gen AI Resume & CV Builder</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-muted-foreground hidden sm:inline">Free & ATS-Optimized</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              Build Standout Resumes That Get You{" "}
              <span className="brand-gradient-text">
                Hired Faster
              </span>
            </h1>

            {/* Subcopy */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Create professional, recruiter-approved resumes tailored for your target roles in minutes. Powered by intelligent keyword suggestions and modern ATS-proof formatting.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Button asChild size="lg" className="brand-gradient-btn rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-cyan-500/25">
                <Link href="/dashboard" className="flex items-center justify-center gap-2">
                  Create Your Resume Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-6 border-border/80 hover:bg-muted/50 text-base font-medium">
                <a href="#templates" className="flex items-center justify-center gap-2">
                  Explore Templates
                </a>
              </Button>
            </div>

            {/* Key Assurance Checks */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50 w-full max-w-lg text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>99% ATS Pass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Instant PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>No Credit Card</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Mockup Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Glow behind Card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/10 rounded-3xl blur-2xl -z-10" />

            {/* Main Resume Card Mockup */}
            <div className="relative w-full max-w-[420px] rounded-2xl bg-card border border-cyan-500/20 shadow-2xl shadow-cyan-950/50 overflow-hidden p-5 transition-transform hover:-translate-y-1 duration-300">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  ATS Score: 98/100
                </div>
              </div>

              {/* Candidate Info Preview */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-cyan-500/30 shrink-0 shadow-sm">
                  <Image
                    src="/rb-logo.png"
                    alt="Candidate Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold tracking-tight text-foreground">
                    Alexander Wright
                  </h3>
                  <p className="text-xs font-medium text-cyan-400">
                    Lead Full-Stack Engineer
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    San Francisco, CA • alex.wright@example.com
                  </p>
                </div>
              </div>

              {/* Resume Body Snippets */}
              <div className="space-y-3 text-xs">
                {/* Summary */}
                <div className="p-2.5 rounded-lg bg-muted/40 border border-border/40">
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    Architected scalable cloud platforms serving 4M+ daily active users. Reduced latency by 42% and spearheaded microservice migration.
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-cyan-500/15 text-cyan-300 font-medium">React / Next.js</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-purple-500/15 text-purple-300 font-medium">Node & Go</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-sky-500/15 text-sky-300 font-medium">AWS & Docker</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-fuchsia-500/15 text-fuchsia-300 font-medium">PostgreSQL</span>
                </div>

                {/* Experience Item */}
                <div className="p-2.5 rounded-lg border border-border/60 bg-background/50 space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-semibold">
                    <span>Senior Software Engineer</span>
                    <span className="text-muted-foreground text-[10px]">2022 - Present</span>
                  </div>
                  <p className="text-[10px] text-cyan-400">TechCorp Solutions Inc.</p>
                  <ul className="text-[10px] text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>Led distributed team of 8 engineers delivering core API</li>
                    <li>Automated CI/CD pipelines reducing deploy cycle to 6 mins</li>
                  </ul>
                </div>
              </div>

              {/* Floating Badge 1: Recruiter Verified */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-xl shadow-lg shadow-purple-500/30 flex items-center gap-1.5 text-xs font-semibold border border-purple-400/30">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Top 1% Candidate</span>
              </div>

              {/* Floating Badge 2: One-Click Export */}
              <div className="absolute top-12 -left-3 bg-background/90 backdrop-blur-md border border-cyan-500/30 text-foreground px-3 py-1.5 rounded-xl shadow-lg shadow-cyan-950/40 flex items-center gap-1.5 text-xs font-medium">
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export to PDF</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
