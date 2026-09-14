import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor?: string;
  gradient?: string;
  borderGlow?: string;
}

const FeatureCard = ({
  title,
  description,
  Icon,
  iconColor = "text-cyan-400",
  gradient = "from-cyan-500/15 via-sky-500/5 to-transparent",
  borderGlow = "hover:border-cyan-500/40",
}: FeatureCardProps) => {
  return (
    <div className={`group relative rounded-2xl p-6 transition-all duration-300 border border-border/70 bg-card/60 backdrop-blur-md ${borderGlow} hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/20`}>
      {/* Subtle top inner gradient */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

      <div className="relative z-10 space-y-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
