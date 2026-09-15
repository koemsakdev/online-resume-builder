import React from "react";
import { CVData, ProjectItem } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Plus, Trash2, FolderGit2, ExternalLink, SkipForward } from "lucide-react";
import AiAssistantButton from "@/components/ai/ai-assistant-button";

interface ProjectsFormProps {
  projectsData?: CVData["projects"];
  updateArrayItem: (index: number, key: string, value: any) => void;
  addArrayItem: (newItem: ProjectItem) => void;
  removeArrayItem: (index: number) => void;
  onSkipSection?: () => void;
}

const ProjectsForm = ({
  projectsData = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  onSkipSection,
}: ProjectsFormProps) => {

  const handleTechChange = (index: number, value: string) => {
    const techArray = value.split(",").map((t) => t.trim()).filter(Boolean);
    updateArrayItem(index, "technologies", techArray);
  };

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Personal & Professional Projects</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium border border-border">
              Optional
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Showcase notable projects, open-source work, side hustles, or client portfolio items.
          </p>
        </div>
        {onSkipSection && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSkipSection}
            className="text-xs text-muted-foreground hover:text-foreground shrink-0 rounded-xl"
          >
            <span>Skip Section</span>
            <SkipForward className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>
      <Separator />

      {projectsData.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-xl p-6 bg-muted/20 space-y-4">
          <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto opacity-60" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              No projects added yet
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              If you don&apos;t have personal or side projects to showcase, you can safely skip this section. It won&apos;t appear on your resume.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem({
                  title: "",
                  description: "",
                  technologies: [],
                  link: "",
                  githubLink: "",
                })
              }
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Add First Project
            </Button>
            {onSkipSection && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onSkipSection}
                className="text-xs text-muted-foreground hover:text-cyan-300 rounded-xl"
              >
                Skip This Section
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="relative p-5 rounded-xl border border-border/80 bg-card/60 space-y-4"
            >
              {/* Header with Title & Delete */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full">
                  Project #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(index)}
                  className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Title & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5 h-5 whitespace-nowrap">
                    <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Project Title *
                  </Label>
                  <Input
                    type="text"
                    value={project.title || ""}
                    onChange={(e) => updateArrayItem(index, "title", e.target.value)}
                    placeholder="e.g. Distributed E-Commerce Microservices"
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5 h-5 whitespace-nowrap">
                    Technologies (comma separated)
                  </Label>
                  <Input
                    type="text"
                    value={Array.isArray(project.technologies) ? project.technologies.join(", ") : ""}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    placeholder="e.g. Next.js, Node.js, Redis, Docker"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Project URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5 h-5 whitespace-nowrap text-foreground/90">
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-500 shrink-0" /> Live Demo URL
                  </Label>
                  <Input
                    type="url"
                    value={project.link || ""}
                    onChange={(e) => updateArrayItem(index, "link", e.target.value)}
                    placeholder="https://myproject.com"
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5 h-5 whitespace-nowrap text-foreground/90">
                    GitHub / Repository URL
                  </Label>
                  <Input
                    type="url"
                    value={project.githubLink || ""}
                    onChange={(e) => updateArrayItem(index, "githubLink", e.target.value)}
                    placeholder="https://github.com/user/project"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Description with AI Assistant */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold">Project Description & Impact</Label>
                  <AiAssistantButton
                    section="project"
                    roleTitle={project.title || "Software Project"}
                    currentText={project.description || ""}
                    label="Write with AI"
                    onApply={(aiText) => updateArrayItem(index, "description", aiText)}
                  />
                </div>
                <Textarea
                  value={project.description || ""}
                  onChange={(e) => updateArrayItem(index, "description", e.target.value)}
                  placeholder="Describe what you built, architecture decisions, and metrics/results achieved, or click 'Write with AI'..."
                  rows={3}
                  className="rounded-xl border-border/80 text-xs"
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              addArrayItem({
                title: "",
                description: "",
                technologies: [],
                link: "",
                githubLink: "",
              })
            }
            className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-xl py-5"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Another Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;

