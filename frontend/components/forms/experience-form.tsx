import React from "react";
import { CVData, ExperienceItem } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Plus, Trash2, Calendar, Building2, Briefcase } from "lucide-react";
import AiAssistantButton from "@/components/ai/ai-assistant-button";

interface ExperienceFormProps {
  experienceData: CVData["experience"];
  updateArrayItem: (index: number, key: string, value: any) => void;
  addArrayItem: (newItem: ExperienceItem) => void;
  removeArrayItem: (index: number) => void;
}

const ExperienceForm = ({
  experienceData = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}: ExperienceFormProps) => {

  const handleAddResponsibility = (expIndex: number) => {
    const currentResponsibilities = experienceData[expIndex]?.responsibilities || [];
    updateArrayItem(expIndex, "responsibilities", [...currentResponsibilities, ""]);
  };

  const handleUpdateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const currentResponsibilities = [...(experienceData[expIndex]?.responsibilities || [])];
    currentResponsibilities[respIndex] = value;
    updateArrayItem(expIndex, "responsibilities", currentResponsibilities);
  };

  const handleRemoveResponsibility = (expIndex: number, respIndex: number) => {
    const currentResponsibilities = [...(experienceData[expIndex]?.responsibilities || [])];
    currentResponsibilities.splice(respIndex, 1);
    updateArrayItem(expIndex, "responsibilities", currentResponsibilities);
  };

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Work Experience</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Highlight your career history, accomplishments, and quantifiable metrics.
        </p>
      </div>
      <Separator />

      {experienceData.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-xl p-6 bg-muted/20">
          <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
          <p className="text-sm font-medium text-muted-foreground mb-4">
            No work experiences added yet. Add your past or current roles.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              addArrayItem({
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                responsibilities: [""],
                description: "",
              })
            }
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-full"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="relative p-5 rounded-xl border border-border/80 bg-card/60 space-y-4"
            >
              {/* Header with Title & Delete */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full">
                  Role #{index + 1}
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

              {/* Position & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Job Title / Position</Label>
                  <Input
                    type="text"
                    value={exp.title || ""}
                    onChange={(e) => updateArrayItem(index, "title", e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Company Name</Label>
                  <Input
                    type="text"
                    value={exp.company || exp.companyName || ""}
                    onChange={(e) => {
                      updateArrayItem(index, "company", e.target.value);
                      updateArrayItem(index, "companyName", e.target.value);
                    }}
                    placeholder="e.g. Google or Stripe"
                  />
                </div>
              </div>

              {/* Dates & Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Start Date</Label>
                  <Input
                    type="text"
                    value={typeof exp.startDate === "string" ? exp.startDate : exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ""}
                    onChange={(e) => updateArrayItem(index, "startDate", e.target.value)}
                    placeholder="e.g. Jan 2021"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">End Date</Label>
                  <Input
                    type="text"
                    value={typeof exp.endDate === "string" ? exp.endDate : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
                    onChange={(e) => updateArrayItem(index, "endDate", e.target.value)}
                    placeholder="e.g. Present or Mar 2023"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Location</Label>
                  <Input
                    type="text"
                    value={exp.location || ""}
                    onChange={(e) => updateArrayItem(index, "location", e.target.value)}
                    placeholder="e.g. Remote / New York, NY"
                  />
                </div>
              </div>

              {/* Bullet Points / Responsibilities with AI Assistant */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <Label className="text-xs font-semibold">Accomplishments & Responsibilities</Label>
                  <div className="flex items-center gap-2">
                    <AiAssistantButton
                      section="experience"
                      roleTitle={`${exp.title || ""} at ${exp.company || exp.companyName || ""}`}
                      currentText={(exp.responsibilities || []).join("\n")}
                      label="AI Generate Bullets"
                      onApply={(aiText) => {
                        const rawBullets = aiText
                          .split("\n")
                          .map((line) => line.replace(/^[\s\-*•\d.]+\s*/, "").trim())
                          .filter((line) => line.length > 0);
                        if (rawBullets.length > 0) {
                          updateArrayItem(index, "responsibilities", rawBullets);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddResponsibility(index)}
                      className="text-cyan-400 hover:text-cyan-300 text-xs h-7 px-2"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Bullet Point
                    </Button>
                  </div>
                </div>

                {(exp.responsibilities || []).map((resp, respIdx) => (
                  <div key={respIdx} className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={resp}
                      onChange={(e) => handleUpdateResponsibility(index, respIdx, e.target.value)}
                      placeholder="e.g. Increased system uptime by 99.98% through automated alerting..."
                      className="text-sm"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveResponsibility(index, respIdx)}
                      className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add Another Experience Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              addArrayItem({
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                responsibilities: [""],
                description: "",
              })
            }
            className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-xl py-5"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Another Experience
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;