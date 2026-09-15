"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { templateList } from "@/constants";
import { ArrowRight, Sparkles, LayoutTemplate } from "lucide-react";
import { TemplateThumbnail } from "./templates/template-thumbnail";

const FEATURED_TEMPLATE_IDS = [
  "black_white_minimalist",
  "modern_clean",
  "tech_dark_terminal",
  "executive_corporate",
];

const TemplateShowcase = () => {
  const featuredTemplates = templateList.filter((tpl) =>
    FEATURED_TEMPLATE_IDS.includes(tpl.id)
  );

  return (
    <section id="templates" className="w-full py-16 md:py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] purple-glow pointer-events-none opacity-25 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-semibold text-sky-400">
            <LayoutTemplate className="w-3.5 h-3.5" />
            Featured CV Drafts
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready-to-Use <span className="brand-gradient-text">CV Drafts</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Select a pre-formatted draft to jumpstart your resume, or explore our full collection of 18+ ATS-compliant formats.
          </p>
        </div>

        {/* Templates Grid with Scaled Previews (4 Curated Drafts) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="group relative rounded-2xl border border-slate-200/80 dark:border-border/80 bg-card/90 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/20 hover:-translate-y-2"
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
                      Use This Template
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
                    <span>Preview & Customize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner to view all 18+ templates */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-indigo-500/5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-foreground">
              Looking for more specialized resume formats?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore our full gallery with 18+ industry-specific designs including Infographic, Compact, and Academic formats.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="brand-gradient-btn rounded-full px-8 py-5 text-sm font-semibold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all shrink-0"
          >
            <Link href="/resume-templates" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Browse All 18+ Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
