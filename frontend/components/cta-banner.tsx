import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CtaBanner = () => {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-purple-950/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl shadow-cyan-950/30">
        
        {/* Glow ambient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-purple-500/10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free to Start
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Ready to Land Your Dream Job?
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Join thousands of candidates getting hired at the world&apos;s leading companies. Create your resume now in less than 10 minutes.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="brand-gradient-btn rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-cyan-500/30">
              <Link href="/dashboard" className="flex items-center gap-2">
                Build My Resume Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 border-white/20 text-white hover:bg-white/10 text-base">
              <Link href="/resume-templates">
                Explore Templates
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;

