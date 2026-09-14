import React from "react";
import Image from "next/image";
import { workingSteps } from "@/constants";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const WorkingStep = () => {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] cyan-glow pointer-events-none opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-semibold text-purple-400">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How It Works in{" "}
            <span className="brand-gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            No complex setup or design skills needed. Go from blank page to job-ready PDF in less than 10 minutes.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {workingSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-8 flex flex-col items-start space-y-5 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-950/20 group"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between w-full">
                <span className="text-3xl font-black brand-gradient-text">
                  {step.id}
                </span>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-2 flex items-center justify-center shrink-0">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Check indicator */}
              <div className="pt-3 mt-auto flex items-center gap-2 text-xs font-medium text-cyan-400">
                <div className="w-5 h-5 rounded-full bg-cyan-500/15 flex items-center justify-center">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span>Fast & Intuitive</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="brand-gradient-btn rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-cyan-500/20">
            <Link href="/dashboard" className="inline-flex items-center gap-2">
              Start Building Your Resume Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default WorkingStep;
