import React from "react";
import NavBar from "@/components/nav-bar";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import WorkingStep from "@/components/cards/working-step";
import TemplateShowcase from "@/components/template-showcase";
import Testimonial from "@/components/testimonial";
import CtaBanner from "@/components/cta-banner";
import Footer from "@/components/footer";
import { Users, CheckCircle2, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navbar */}
      <NavBar />

      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <Hero />

        {/* Stats & Trust Bar */}
        <section className="w-full py-10 border-y border-border/50 bg-muted/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black brand-gradient-text">
                  <Users className="w-5 h-5 text-cyan-400" />
                  50,000+
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Resumes Crafted</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black brand-gradient-text">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  99%
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">ATS Pass Rate</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black brand-gradient-text">
                  <TrendingUp className="w-5 h-5 text-sky-400" />
                  3.5x
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">More Interviews</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-black brand-gradient-text">
                  <Zap className="w-5 h-5 text-fuchsia-400" />
                  &lt; 10 min
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Fast Generation</p>
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

        {/* Testimonials */}
        <Testimonial />

        {/* Final CTA Banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
