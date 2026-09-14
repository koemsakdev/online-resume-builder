"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { templateList } from "@/constants";
import { ArrowRight, Sparkles, LayoutTemplate } from "lucide-react";
import { TemplateThumbnail } from "./templates/template-thumbnail";

const TemplateShowcase = () => {
  return (
    <section id="templates" className="w-full py-16 md:py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] purple-glow pointer-events-none opacity-25 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-semibold text-sky-400">
            <LayoutTemplate className="w-3.5 h-3.5" />
            Tested ATS Layouts
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Designed for Every <span className="brand-gradient-text">Industry & Career Stage</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Whether you&apos;re a seasoned executive or recent college graduate, our templates are optimized to showcase your strengths.
          </p>
        </div>

        {/* Templates Grid with Scaled Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templateList.map((tpl) => (
            <div
              key={tpl.id}
              className="group relative rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/30 hover:-translate-y-2"
            >
              {/* Scaled Preview */}
              <div className="relative group/preview overflow-hidden bg-white">
                <TemplateThumbnail templateId={tpl.id} />

                {/* Badge Overlay */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-md">
                    {tpl.badge}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4 z-20">
                  <Button
                    asChild
                    size="sm"
                    className="brand-gradient-btn rounded-full px-5 text-xs font-semibold shadow-lg shadow-cyan-500/30 w-full"
                  >
                    <Link href="/resume-templates">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      Explore Template
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Template Card Info */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-foreground group-hover:text-cyan-400 transition-colors">
                      {tpl.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/70">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tpl.description}
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl text-xs font-semibold border-border/80 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                >
                  <Link href="/resume-templates" className="flex items-center justify-center gap-1.5">
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button
            asChild
            size="lg"
            className="brand-gradient-btn rounded-full px-8 py-6 text-sm font-semibold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
          >
            <Link href="/resume-templates" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Explore All ATS Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
