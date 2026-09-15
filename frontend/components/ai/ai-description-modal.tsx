"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPath";
import {
  Sparkles,
  Wand2,
  Check,
  Copy,
  ArrowRight,
  RefreshCw,
  Zap,
  Lightbulb,
} from "lucide-react";

interface AiDescriptionAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: "summary" | "experience" | "project";
  roleTitle?: string;
  currentText?: string;
  onApply: (generatedText: string) => void;
}

const TONES = [
  { id: "ats", label: "ATS Standard", desc: "Keyword-rich & clear" },
  { id: "action_metrics", label: "Action & Metrics", desc: "Quantifiable results" },
  { id: "leadership", label: "Executive / Lead", desc: "Strategic impact" },
];

const SUGGESTIONS: Record<string, string[]> = {
  summary: [
    "Full-Stack Developer with 4 years in React, Node.js, and AWS in Fintech",
    "Senior Product Manager driving user retention and cross-functional teams",
    "Data Scientist specializing in Machine Learning, Python, and Predictive Analytics",
  ],
  experience: [
    "Architected distributed microservices handling 20,000 requests per second",
    "Led frontend modernization migrating legacy app to Next.js with 40% speedup",
    "Implemented automated CI/CD pipeline reducing deployment cycle by 3 days",
  ],
  project: [
    "Real-time collaborative whiteboard app built with React, WebSockets, and Canvas",
    "Full-featured e-commerce platform with Next.js, Stripe payments, and Redis caching",
    "AI-powered customer support chatbot using OpenAI API and vector database",
  ],
};

export const AiDescriptionAssistant: React.FC<AiDescriptionAssistantProps> = ({
  open,
  onOpenChange,
  section,
  roleTitle = "",
  currentText = "",
  onApply,
}) => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("ats");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState("");
  const [copied, setCopied] = useState(false);

  const sectionLabel =
    section === "summary"
      ? "Professional Summary"
      : section === "experience"
      ? "Experience Bullet Points"
      : "Project Description";

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt is required",
        description: "Please enter a brief description or keywords of what to write.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedResult("");
    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_DESCRIPTION, {
        prompt: prompt.trim(),
        section,
        roleTitle,
        currentText,
        tone,
      });

      if (response.data && response.data.text) {
        setGeneratedResult(response.data.text);
        toast({
          title: "AI Draft Ready!",
          description: "Review and click Apply to insert into your resume.",
        });
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      toast({
        title: "Generation failed",
        description: "Could not generate description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard",
    });
  };

  const handleInsert = () => {
    if (!generatedResult) return;
    onApply(generatedResult);
    onOpenChange(false);
    toast({
      title: "Applied to Resume!",
      description: `Updated your ${sectionLabel.toLowerCase()}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-card border-border/80 shadow-2xl p-0 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[88vh]">
        <DialogHeader className="px-6 py-4 border-b border-border/60 bg-card/90 backdrop-blur shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                AI Writer: <span className="brand-gradient-text">{sectionLabel}</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Input your keywords or experience, and AI will format an ATS-optimized description.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
          {/* Quick suggestions */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Prompts / Examples:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(SUGGESTIONS[section] || []).map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(sug)}
                  className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-muted/50 hover:bg-cyan-500/10 hover:text-cyan-300 border border-border/60 transition-colors text-muted-foreground line-clamp-1 max-w-full"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* User Prompt Input */}
          <div className="space-y-1.5">
            <Label htmlFor="aiPrompt" className="text-xs font-semibold">
              What should AI highlight?
            </Label>
            <Textarea
              id="aiPrompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Led redesign of customer checkout flow with React and Tailwind, decreased drop-off by 18%, handled Stripe webhooks..."
              rows={3}
              className="rounded-xl border-border/80 bg-muted/20 text-xs focus:border-cyan-500"
              autoFocus
            />
          </div>

          {/* Tone Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Tone & Writing Style</Label>
            <div className="grid grid-cols-3 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    tone === t.id
                      ? "border-cyan-400 bg-cyan-500/10 shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-400"
                      : "border-border/70 bg-card/40 hover:bg-muted/40"
                  }`}
                >
                  <p className="text-xs font-bold text-foreground">{t.label}</p>
                  <p className="text-[10px] text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            type="button"
            disabled={isGenerating || !prompt.trim()}
            onClick={handleGenerate}
            className="w-full brand-gradient-btn rounded-xl text-xs font-semibold shadow-md shadow-cyan-500/20 py-2.5"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                Crafting ATS-grade text...
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5 mr-2" />
                Generate Description
              </>
            )}
          </Button>

          {/* Result Preview Box */}
          {generatedResult && (
            <div className="p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-500/5 space-y-2.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  <Zap className="w-3 h-3" /> AI Generated Result
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 mr-1 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="p-3 rounded-lg bg-background border border-border/60 text-xs leading-relaxed text-foreground whitespace-pre-line max-h-40 overflow-y-auto custom-scrollbar">
                {generatedResult}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-3.5 border-t border-border/60 bg-card/95 backdrop-blur shrink-0 flex items-center justify-between sm:justify-between w-full">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl text-xs"
          >
            Cancel
          </Button>

          {generatedResult && (
            <Button
              type="button"
              onClick={handleInsert}
              className="brand-gradient-btn rounded-xl text-xs font-semibold shadow-md shadow-cyan-500/20"
            >
              Apply to Resume
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiDescriptionAssistant;

