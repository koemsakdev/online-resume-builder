import React from "react";
import { keyFeatures } from "@/constants";
import FeatureCard from "./cards/feature-card";
import { Sparkles } from "lucide-react";

const Feature = () => {
  return (
    <section id="features" className="w-full py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            Cutting-Edge Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Professionals Choose{" "}
            <span className="brand-gradient-text">ResumeRise</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Every feature is engineered to give you a strategic advantage against ATS bots and competitive applicant pools.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              iconColor={feature.iconColor}
              gradient={feature.gradient}
              borderGlow={feature.borderGlow}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Feature;
