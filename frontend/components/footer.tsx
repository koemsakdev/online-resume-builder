import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/50 bg-card/40 backdrop-blur-lg mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm shadow-cyan-500/20">
                <Image
                  src="/rb-logo.png"
                  alt="ResumeRise Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black brand-gradient-text">ResumeRise</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Empowering job seekers worldwide with AI-optimized, ATS-friendly resumes that capture recruiter attention and land more interviews.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
              </li>
              <li>
                <a href="#templates" className="hover:text-cyan-400 transition-colors">Resume Templates</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Account
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/sign-in" className="hover:text-cyan-400 transition-colors">Sign In</Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-cyan-400 transition-colors">Register Free</Link>
              </li>
              <li>
                <Link href="/resume-templates" className="hover:text-cyan-400 transition-colors">Create Resume</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} ResumeRise. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for ambitious careers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

