import React, { useState } from "react";
import { CVData, Skills } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Plus, Trash2, Zap, Sparkles } from "lucide-react";
import Combobox from "@/components/ui/combobox";

interface SkillsFormProps {
  skillsData: CVData["skills"];
  updateArrayItem: (index: number, key: string, value: any) => void;
  addArrayItem: (newItem: Skills) => void;
  removeArrayItem: (index: number) => void;
}

const SkillsForm = ({
  skillsData = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}: SkillsFormProps) => {
  const [newSkillName, setNewSkillName] = useState("");
  const [newProficiency, setNewProficiency] = useState("Advanced");

  const handleQuickAdd = () => {
    if (!newSkillName.trim()) return;
    addArrayItem({
      name: newSkillName.trim(),
      skillName: newSkillName.trim(),
      proficiency: newProficiency,
      category: "Technical",
    });
    setNewSkillName("");
  };

  const predefinedSuggestions = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
    "Go", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Git",
    "GraphQL", "REST APIs", "CI/CD", "Agile", "System Design"
  ];

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Skills & Technologies</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add technical tools, frameworks, languages, and soft skills to pass ATS keyword scans.
        </p>
      </div>
      <Separator />

      {/* Quick Add Bar */}
      <div className="p-4 rounded-xl border border-cyan-500/20 bg-card/60 space-y-3">
        <Label className="text-xs font-semibold">Quick Add Skill</Label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleQuickAdd();
              }
            }}
            placeholder="e.g. React, Python, Product Strategy..."
            className="flex-1"
          />
          <div className="w-full sm:w-[150px] shrink-0">
            <Combobox
              options={["Beginner", "Intermediate", "Advanced", "Expert"]}
              value={newProficiency}
              onChange={setNewProficiency}
              placeholder="Proficiency"
              searchPlaceholder="Select level..."
              allowCustom={false}
            />
          </div>
          <Button
            type="button"
            onClick={handleQuickAdd}
            className="brand-gradient-btn rounded-lg px-4"
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>

        {/* Popular Suggestions */}
        <div className="pt-2">
          <p className="text-[11px] text-muted-foreground mb-2 font-medium">Quick suggestions (click to add):</p>
          <div className="flex flex-wrap gap-1.5">
            {predefinedSuggestions.map((sug) => {
              const alreadyAdded = skillsData.some(
                (s) => s.name?.toLowerCase() === sug.toLowerCase() || s.skillName?.toLowerCase() === sug.toLowerCase()
              );
              if (alreadyAdded) return null;
              return (
                <button
                  key={sug}
                  type="button"
                  onClick={() => {
                    addArrayItem({
                      name: sug,
                      skillName: sug,
                      proficiency: "Advanced",
                      category: "Technical",
                    });
                  }}
                  className="text-xs px-2.5 py-1 rounded-md border border-border/80 bg-background/60 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                >
                  + {sug}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Existing Skills List */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold">Your Added Skills ({skillsData.length})</Label>
        
        {skillsData.length === 0 ? (
          <p className="text-xs text-muted-foreground italic py-3 text-center">
            No skills added yet. Use the input above to add your top skills.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card/90 dark:bg-card/60 shadow-sm hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-2.5 flex-1 mr-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-sm font-medium">{skill.name || skill.skillName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold border border-purple-500/20">
                    {skill.proficiency || "Intermediate"}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(index)}
                  className="text-muted-foreground hover:text-red-400 h-7 w-7 p-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;

