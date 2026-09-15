"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Download,
  Award,
} from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Background ambient lighting matching rb-logo.png (electric cyan and purple) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] cyan-glow pointer-events-none opacity-30 dark:opacity-40 -z-10" />
      <div className="absolute top-1/3 right-10 w-[480px] h-[420px] purple-glow pointer-events-none opacity-25 dark:opacity-35 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Value Prop */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-xs sm:text-sm font-medium text-cyan-500 dark:text-cyan-400 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Next-Gen AI Resume & CV Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-muted-foreground hidden sm:inline">18+ Curated Layouts</span>
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
              Create recruiter-approved resumes tailored for your dream jobs in minutes. Featuring intelligent ATS-friendly layouts, real-time live preview, and instant professional PDF export.
            </p>

            {/* Product Feature Highlights */}
            <div className="flex flex-wrap items-center gap-2.5 py-1 text-xs text-muted-foreground font-medium">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                100% Free
              </span>
              <span>•</span>
              <span>No Subscription Required</span>
              <span>•</span>
              <span>Instant Clean PDF Export</span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Button asChild size="lg" className="brand-gradient-btn rounded-full px-8 py-6 text-base font-semibold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all">
                <Link href="/dashboard" className="flex items-center justify-center gap-2">
                  Create Your Resume Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-6 border-slate-300 dark:border-border/80 hover:bg-muted/60 text-base font-medium transition-all">
                <a href="#templates" className="flex items-center justify-center gap-2">
                  Explore Templates
                </a>
              </Button>
            </div>

            {/* Key Assurance Checks */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border/60 w-full max-w-lg text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                <span className="font-medium">99% ATS Pass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0" />
                <span className="font-medium">Instant PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                <span className="font-medium">No Credit Card</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Mockup Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Glow behind Card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/15 rounded-3xl blur-3xl -z-10" />

            {/* Main Resume Card Mockup */}
            <div className="relative w-full max-w-[440px] rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-cyan-500/30 shadow-2xl shadow-slate-300/50 dark:shadow-cyan-950/60 overflow-hidden p-6 transition-all hover:-translate-y-1.5 duration-300">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-border/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/25">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  ATS Match: 98%
                </div>
              </div>

              {/* ATS Gauge Progress Bar */}
              <div className="mb-4 bg-slate-100 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700/50">
                <div className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 h-full rounded-full w-[98%]" />
              </div>

              {/* Candidate Info Preview */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-cyan-500/30 shrink-0 shadow-md">
                  <Image
                    src="/rb-logo.png"
                    alt="Candidate Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-foreground">
                    Alexander Wright
                  </h3>
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    Lead Full-Stack Engineer
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-muted-foreground">
                    San Francisco, CA • alex.wright@example.com
                  </p>
                </div>
              </div>

              {/* Resume Body Snippets */}
              <div className="space-y-3 text-xs">
                {/* Summary */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-muted/40 border border-slate-100 dark:border-border/40">
                  <p className="text-[11px] text-slate-600 dark:text-muted-foreground line-clamp-2 leading-relaxed">
                    Architected scalable cloud platforms serving 4M+ daily active users. Reduced latency by 42% and spearheaded microservice migration.
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-semibold">React / Next.js</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 font-semibold">Node & Go</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-sky-500/15 text-sky-700 dark:text-sky-300 font-semibold">AWS & Docker</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 font-semibold">PostgreSQL</span>
                </div>

                {/* Experience Item */}
                <div className="p-3 rounded-xl border border-slate-200 dark:border-border/60 bg-white/70 dark:bg-background/50 space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-slate-900 dark:text-foreground">
                    <span>Senior Software Engineer</span>
                    <span className="text-slate-500 dark:text-muted-foreground text-[10px]">2022 - Present</span>
                  </div>
                  <p className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400">TechCorp Solutions Inc.</p>
                  <ul className="text-[10px] text-slate-600 dark:text-muted-foreground list-disc list-inside space-y-0.5">
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
              <div className="absolute top-12 -left-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 text-slate-900 dark:text-foreground px-3 py-1.5 rounded-xl shadow-lg shadow-cyan-950/20 flex items-center gap-1.5 text-xs font-medium">
                <Download className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
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
