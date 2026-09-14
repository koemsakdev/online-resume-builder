import React from "react";
import { CVData, ProjectItem } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Plus, Trash2, FolderGit2, ExternalLink } from "lucide-react";
import AiAssistantButton from "@/components/ai/ai-assistant-button";

interface ProjectsFormProps {
  projectsData?: CVData["projects"];
  updateArrayItem: (index: number, key: string, value: any) => void;
  addArrayItem: (newItem: ProjectItem) => void;
  removeArrayItem: (index: number) => void;
}

const ProjectsForm = ({
  projectsData = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}: ProjectsFormProps) => {

  const handleTechChange = (index: number, value: string) => {
    const techArray = value.split(",").map((t) => t.trim()).filter(Boolean);
    updateArrayItem(index, "technologies", techArray);
  };

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Personal & Professional Projects</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Showcase notable projects, open-source work, side hustles, or client portfolio items.
        </p>
      </div>
      <Separator />

      {projectsData.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-xl p-6 bg-muted/20">
          <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
          <p className="text-sm font-medium text-muted-foreground mb-4">
            No projects added yet. Add a key project to demonstrate practical expertise.
          </p>
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
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-full"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add First Project
          </Button>
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
                  <Label className="text-xs">Project Title</Label>
                  <Input
                    type="text"
                    value={project.title || ""}
                    onChange={(e) => updateArrayItem(index, "title", e.target.value)}
                    placeholder="e.g. Distributed E-Commerce Microservices"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Technologies (comma separated)</Label>
                  <Input
                    type="text"
                    value={Array.isArray(project.technologies) ? project.technologies.join(", ") : ""}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    placeholder="e.g. Next.js, Node.js, Redis, Docker"
                  />
                </div>
              </div>

              {/* Project URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Live Demo URL</Label>
                  <Input
                    type="url"
                    value={project.link || ""}
                    onChange={(e) => updateArrayItem(index, "link", e.target.value)}
                    placeholder="https://myproject.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">GitHub / Repository URL</Label>
                  <Input
                    type="url"
                    value={project.githubLink || ""}
                    onChange={(e) => updateArrayItem(index, "githubLink", e.target.value)}
                    placeholder="https://github.com/user/project"
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

