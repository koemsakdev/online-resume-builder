import React from "react";
import { testimonials } from "@/constants";
import { Star, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

const Testimonial = () => {
  return (
    <section id="reviews" className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[300px] cyan-glow pointer-events-none opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-400">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            Candidate Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Loved by Job Seekers <span className="brand-gradient-text">Worldwide</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Over 50,000 professionals have used ResumeRise to land interviews at Fortune 500 companies and leading tech startups.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Content */}
              <p className="text-sm text-foreground/90 leading-relaxed italic">
                &ldquo;{item.content}&rdquo;
              </p>

              {/* User Bio */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-border/50">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-cyan-500/30 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-cyan-400 font-medium">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Hired at {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonial;
