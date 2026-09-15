"use client";

import React, { useState } from "react";
import NavbarLayout from "@/components/layouts/navbar-layout";
import { templateList } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sparkles,
  ArrowRight,
  LayoutTemplate,
  Eye,
  FileText,
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPath";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
import ResumePreview from "@/components/pages/resume-preview";
import sampleResume from "@/assets/resume.json";
import AuthGuard from "@/components/auth/auth-guard";

const CATEGORIES = ["All", "Technical", "Leadership", "Corporate", "Academic"];

export default function ResumeTemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Full-size Preview Modal state
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const filteredTemplates =
    activeCategory === "All"
      ? templateList
      : templateList.filter(
          (t) => t.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setResumeTitle("");
    setDialogOpen(true);
  };

  const handleCreateResume = async () => {
    if (!resumeTitle.trim()) {
      toast({
        title: "Title is required",
        description: "Please enter a name for your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title: resumeTitle.trim(),
        template: selectedTemplate || "black_white_minimalist",
      });

      if (response.data && response.data._id) {
        toast({
          title: "Resume created successfully!",
          description: "Redirecting you to the editor...",
        });
        setDialogOpen(false);
        router.push(`/resume-templates/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      toast({
        title: "Failed to create resume",
        description: "Please check your network and try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AuthGuard>
      <NavbarLayout>
        <div className="relative min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-slate-50/80 via-background to-slate-100/50 dark:from-[#0B1120] dark:via-background dark:to-[#080d19] text-foreground p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] cyan-glow pointer-events-none opacity-10 dark:opacity-20 -z-10" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] purple-glow pointer-events-none opacity-10 dark:opacity-20 -z-10" />

        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>ATS Resume Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Choose an <span className="brand-gradient-text">ATS-Ready Template</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Each layout is designed with clean typography, optimal section hierarchy, and ATS screening compliance. Pick a design to begin customizing.
            </p>
          </div>
        </div>

        {/* Category Pills (without scrollbar) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                  : "bg-card text-muted-foreground border border-border/80 hover:text-foreground hover:bg-muted/60 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid with Real Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="group relative rounded-3xl border border-border/80 bg-card/90 dark:bg-card/80 backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-cyan-500/50 shadow-md shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-cyan-950/20 hover:-translate-y-1.5"
            >
              {/* Real Scaled Visual Template Preview */}
              <div className="relative group/preview overflow-hidden bg-white">
                <TemplateThumbnail templateId={tpl.id} />

                {/* Badge Overlay */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-md">
                    {tpl.badge}
                  </span>
                </div>

                {/* Hover Overlay with Action Buttons */}
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4 z-20">
                  <Button
                    onClick={() => handleSelectTemplate(tpl.id)}
                    size="sm"
                    className="brand-gradient-btn rounded-full px-5 text-xs font-semibold shadow-lg shadow-cyan-500/30 w-3/4"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Use This Template
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewTemplate(tpl.id)}
                    className="rounded-full px-4 text-xs border-white/20 bg-white/10 hover:bg-white/20 text-white w-3/4 backdrop-blur-md"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    Quick Preview
                  </Button>
                </div>
              </div>

              {/* Template Card Details */}
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
                  onClick={() => handleSelectTemplate(tpl.id)}
                  variant="outline"
                  size="sm"
                  className="w-full rounded-2xl text-xs font-semibold border-border/80 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                >
                  <span>Select Template</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Name your resume before creating */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border/80 shadow-2xl p-6 rounded-3xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold">
                    Name Your <span className="brand-gradient-text">Resume</span>
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                    Give this resume a descriptive target job title to stay organized.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-3">
              <div className="space-y-2">
                <Label htmlFor="resumeTitle" className="text-xs font-semibold">
                  Resume Title
                </Label>
                <Input
                  id="resumeTitle"
                  placeholder="e.g. Senior Full Stack Engineer - Google"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="rounded-xl border-border/80 focus:border-cyan-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateResume();
                  }}
                />
              </div>

              {selectedTemplate && (
                <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Selected Layout:</span>
                  <span className="font-bold text-cyan-300">
                    {templateList.find((t) => t.id === selectedTemplate)?.name}
                  </span>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                className="rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                disabled={isCreating}
                onClick={handleCreateResume}
                className="brand-gradient-btn rounded-xl text-xs font-semibold shadow-md shadow-cyan-500/20"
              >
                {isCreating ? "Creating..." : "Start Editing"}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal: Full Size Quick Preview */}
        <Dialog
          open={!!previewTemplate}
          onOpenChange={(open) => !open && setPreviewTemplate(null)}
        >
          <DialogContent className="max-w-3xl bg-card border-border/80 shadow-2xl p-6 max-h-[90vh] overflow-y-auto rounded-3xl custom-scrollbar">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                <LayoutTemplate className="w-5 h-5 text-cyan-400" />
                {templateList.find((t) => t.id === previewTemplate)?.name} Preview
              </DialogTitle>
              <DialogDescription>
                Realistic sample data preview of this layout.
              </DialogDescription>
            </DialogHeader>

            {previewTemplate && (
              <div className="mt-4 flex justify-center items-start p-4 bg-slate-900/40 dark:bg-slate-950/60 rounded-2xl border border-border/70 overflow-x-auto">
                <div
                  style={{
                    width: "680px",
                    height: `${1131 * (680 / 800)}px`,
                  }}
                  className="relative shrink-0"
                >
                  <div
                    style={{
                      width: "800px",
                      minHeight: "1131px",
                      transform: `scale(${680 / 800})`,
                      transformOrigin: "top left",
                    }}
                    className="bg-white text-slate-900 shadow-2xl ring-1 ring-slate-900/10 rounded-sm overflow-hidden"
                  >
                    <ResumePreview
                      templateName={previewTemplate}
                      resumeData={sampleResume as any}
                      containerWidth={800}
                    />
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </NavbarLayout>
    </AuthGuard>
  );
}

