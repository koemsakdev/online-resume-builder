"use client";

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { API_PATHS } from "@/utils/apiPath";
import axiosInstance from "@/utils/axiosInstance";
import {
  FileUser,
  Plus,
  Sparkles,
  LayoutTemplate,
  Trash2,
  Copy,
  Calendar,
  Search,
  ArrowRight,
  MoreVertical,
  Edit3,
} from "lucide-react";
import NavbarLayout from "@/components/layouts/navbar-layout";
import { templateList } from "@/constants";
import { UserContext } from "@/contexts/useContext";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
import AuthGuard from "@/components/auth/auth-guard";

interface ResumeItem {
  _id: string;
  title: string;
  thumbnailLink?: string;
  thumnailLink?: string;
  template?: string;
  updatedAt: string;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("black_white_minimalist");
  const [isCreating, setIsCreating] = useState(false);

  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      if (Array.isArray(response.data)) {
        setResumes(response.data);
      } else {
        setResumes([]);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast({
        title: "Could not load resumes",
        description: "Please check your network and try refreshing.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateResume = async () => {
    if (!newTitle.trim()) {
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
        title: newTitle.trim(),
        template: selectedTemplate,
      });

      if (response.data && response.data._id) {
        toast({
          title: "Resume created!",
          description: "Redirecting to the editor...",
        });
        setCreateModalOpen(false);
        router.push(`/resume-templates/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      toast({
        title: "Creation failed",
        description: "Could not create resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(deleteTargetId));
      setResumes((prev) => prev.filter((r) => r._id !== deleteTargetId));
      toast({
        title: "Resume removed",
        description: "The resume was permanently deleted.",
      });
      setDeleteTargetId(null);
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast({
        title: "Delete failed",
        description: "Could not delete resume.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicateResume = async (resumeId: string) => {
    try {
      const target = resumes.find((r) => r._id === resumeId);
      const title = target ? `${target.title} (Copy)` : "Copied Resume";

      const getRes = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
      const sourceData = getRes.data;

      const createRes = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        ...sourceData,
        title,
        _id: undefined,
      });

      if (createRes.data) {
        toast({
          title: "Resume duplicated",
          description: `Created copy: ${title}`,
        });
        fetchResumes();
      }
    } catch (error) {
      console.error("Error duplicating resume:", error);
      toast({
        title: "Duplicate failed",
        description: "Could not duplicate resume.",
        variant: "destructive",
      });
    }
  };

  const filteredResumes = resumes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Minimalist" && r.template?.includes("minimalist")) ||
      (selectedFilter === "Modern" && r.template?.includes("modern")) ||
      (selectedFilter === "Academic" && r.template?.includes("college"));
    return matchesSearch && matchesFilter;
  });

  return (
    <AuthGuard>
      <NavbarLayout>
        <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Welcome Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-border/80 bg-gradient-to-br from-white via-slate-50/90 to-cyan-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/80 p-6 sm:p-8 shadow-md shadow-slate-200/50 dark:shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 cyan-glow pointer-events-none opacity-10 dark:opacity-20 -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Resume Studio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                Welcome back,{" "}
                <span className="brand-gradient-text">
                  {user?.name?.split(" ")[0] || "Creator"}
                </span>
              </h1>
              <p className="text-sm text-muted-foreground max-w-xl">
                Manage your job-targeted resumes, test them against applicant tracking systems, and land your next interview faster.
              </p>
            </div>

            {/* Quick Create CTA */}
            <div className="shrink-0 flex items-center gap-3">
              <Button
                onClick={() => setCreateModalOpen(true)}
                size="lg"
                className="brand-gradient-btn rounded-2xl px-6 py-6 text-sm font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Create Resume</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/70 text-foreground">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Resumes</p>
              <p className="text-2xl font-black text-cyan-600 dark:text-cyan-300 mt-0.5">{resumes.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">ATS Score Standard</p>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-300 mt-0.5">98%</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-muted-foreground font-medium">Active Layouts</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-300 mt-0.5">4 Ready</p>
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Filter Tabs & Add Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resumes by title..."
              className="pl-10 rounded-xl border-border/80 bg-card shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["All", "Minimalist", "Modern", "Academic"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedFilter === filter
                    ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "bg-card text-muted-foreground border border-border/80 hover:text-foreground hover:bg-muted/60 shadow-sm"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Resumes Grid / Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl border border-border/60 bg-card/40 animate-pulse"
              />
            ))}
          </div>
        ) : filteredResumes.length === 0 ? (
          <Card className="rounded-3xl border-dashed border-2 border-border/80 bg-card/40 p-12 text-center">
            <CardContent className="flex flex-col items-center justify-center p-0 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileUser className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-lg font-bold text-foreground">No resumes found</h3>
                <p className="text-xs text-muted-foreground">
                  {searchQuery
                    ? `No resumes match "${searchQuery}". Try a different search term.`
                    : "You haven't created any resumes yet. Pick an ATS template to craft your first one."}
                </p>
              </div>
              <Button
                onClick={() => setCreateModalOpen(true)}
                className="brand-gradient-btn rounded-xl text-xs font-semibold shadow-lg shadow-cyan-500/25"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Create New Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResumes.map((resume) => {
              const currentTpl =
                templateList.find((t) => t.id === resume.template) || templateList[0];

              return (
                <div
                  key={resume._id}
                  className="group relative rounded-2xl border border-border/80 bg-card/90 dark:bg-card/80 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 hover:border-cyan-500/50 shadow-md shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:shadow-cyan-500/15 dark:hover:shadow-2xl dark:hover:shadow-cyan-950/30 hover:-translate-y-1.5"
                >
                  {/* Real Scaled Template Thumbnail Preview */}
                  <div
                    onClick={() => router.push(`/resume-templates/${resume._id}`)}
                    className="relative cursor-pointer overflow-hidden group/preview bg-white"
                  >
                    <TemplateThumbnail
                      templateId={resume.template || "black_white_minimalist"}
                      resumeData={resume as any}
                    />

                    {/* Template Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-md">
                        {currentTpl.name}
                      </span>
                    </div>

                    {/* Hover Overlay with Edit Button */}
                    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2.5 p-4 z-20">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/resume-templates/${resume._id}`);
                        }}
                        className="brand-gradient-btn rounded-full px-5 text-xs font-semibold shadow-lg shadow-cyan-500/30 w-3/4"
                      >
                        <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                        Edit Resume
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateResume(resume._id);
                        }}
                        className="rounded-full px-4 text-xs border-white/20 bg-white/10 hover:bg-white/20 text-white w-3/4 backdrop-blur-md"
                      >
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        Duplicate
                      </Button>
                    </div>
                  </div>

                  {/* Card Details Footer */}
                  <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <h3
                          onClick={() => router.push(`/resume-templates/${resume._id}`)}
                          className="font-bold text-sm text-foreground line-clamp-1 cursor-pointer hover:text-cyan-400 transition-colors"
                        >
                          {resume.title || "Untitled Resume"}
                        </h3>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Edited {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Dropdown Menu for Resume Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-44 p-1 rounded-xl border border-border/80 bg-card/95 backdrop-blur-md shadow-xl"
                        >
                          <DropdownMenuItem
                            onClick={() => router.push(`/resume-templates/${resume._id}`)}
                            className="cursor-pointer text-xs py-2 rounded-lg flex items-center gap-2"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Edit Resume</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateResume(resume._id)}
                            className="cursor-pointer text-xs py-2 rounded-lg flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5 text-purple-400" />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteTargetId(resume._id)}
                            className="cursor-pointer text-xs py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create Resume Modal with Visual Template Selection */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="max-w-2xl bg-card border-border/80 shadow-2xl p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Create New Resume
              </DialogTitle>
              <DialogDescription>
                Name your resume and pick an ATS-ready design to get started.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="newTitle" className="text-xs font-semibold">
                  Resume Title
                </Label>
                <Input
                  id="newTitle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="rounded-xl border-border/80"
                  autoFocus
                />
              </div>

              {/* Visual Template Selector */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold">
                  Choose Template Design
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-1">
                  {templateList.map((tpl) => {
                    const isSelected = selectedTemplate === tpl.id;
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`cursor-pointer rounded-xl border p-2 flex flex-col items-center gap-2 transition-all ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-500/10 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400"
                            : "border-border/80 hover:border-border hover:bg-muted/40"
                        }`}
                      >
                        <div className="w-full aspect-[1/1.38] rounded-lg overflow-hidden border border-border/50 bg-white">
                          <TemplateThumbnail templateId={tpl.id} />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold truncate w-24">
                            {tpl.name}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {tpl.badge}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <DialogFooter className="sticky bottom-0 bg-card/95 backdrop-blur z-10 pt-3 border-t border-border/60 gap-2 sm:gap-0 mt-2">
              <Button
                variant="ghost"
                onClick={() => setCreateModalOpen(false)}
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

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deleteTargetId}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
        >
          <DialogContent className="sm:max-w-md bg-card border-border/80 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold text-red-400">
                <Trash2 className="w-5 h-5" />
                Delete Resume?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to permanently remove this resume?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2 sm:gap-0 mt-4">
              <Button
                variant="ghost"
                onClick={() => setDeleteTargetId(null)}
                className="rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                disabled={isDeleting}
                onClick={handleDeleteResume}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-red-500/20"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </NavbarLayout>
    </AuthGuard>
  );
}
