"use client";

import React from "react";
import { CVData, EducationItem } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Plus, Trash2, GraduationCap, Building2, Calendar, MapPin, Award } from "lucide-react";
import DatePicker from "@/components/ui/date-picker";

interface EducationFormProps {
  educationData: CVData["education"];
  updateArrayItem: (index: number, key: string, value: any) => void;
  addArrayItem: (newItem: EducationItem) => void;
  removeArrayItem: (index: number) => void;
}

const EducationForm = ({
  educationData = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}: EducationFormProps) => {
  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Education & Academics</h2>
        <p className="text-sm text-muted-foreground mt-1">
          List your degrees, academic institutions, graduation dates, and honors.
        </p>
      </div>
      <Separator />

      {educationData.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-xl p-6 bg-muted/20">
          <GraduationCap className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
          <p className="text-sm font-medium text-muted-foreground mb-4">
            No education entries added yet. Add your university or high school degree.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              addArrayItem({
                degree: "",
                university: "",
                institution: "",
                startDate: "",
                endDate: "",
                location: "",
                gpa: "",
              })
            }
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-full"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add First Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="relative p-5 rounded-2xl border border-border/80 bg-card/60 space-y-4 shadow-sm"
            >
              {/* Header with Title & Delete */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full">
                  Education #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(index)}
                  className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0 rounded-lg"
                  title="Remove education"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Degree & Institution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5 h-5 whitespace-nowrap">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Degree / Certificate *
                  </Label>
                  <Input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) => updateArrayItem(index, "degree", e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5 h-5 whitespace-nowrap">
                    <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> College / University *
                  </Label>
                  <Input
                    type="text"
                    value={edu.university || edu.institution || ""}
                    onChange={(e) => {
                      updateArrayItem(index, "university", e.target.value);
                      updateArrayItem(index, "institution", e.target.value);
                    }}
                    placeholder="e.g. Stanford University"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Dates & GPA */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5 h-5 whitespace-nowrap text-foreground/90">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500 shrink-0" /> Start Date
                  </Label>
                  <DatePicker
                    mode="month-year"
                    value={typeof edu.startDate === "string" ? edu.startDate : edu.startDate ? new Date(edu.startDate).toISOString() : ""}
                    onChange={(val) => updateArrayItem(index, "startDate", val)}
                    placeholder="Pick start date..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5 h-5 whitespace-nowrap text-foreground/90">
                    <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" /> End Date (or Expected)
                  </Label>
                  <DatePicker
                    mode="month-year"
                    allowPresent={true}
                    value={typeof edu.endDate === "string" ? edu.endDate : edu.endDate ? new Date(edu.endDate).toISOString() : ""}
                    onChange={(val) => updateArrayItem(index, "endDate", val)}
                    placeholder="Pick end date..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5 h-5 whitespace-nowrap text-foreground/90">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" /> GPA / Honors
                  </Label>
                  <Input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) => updateArrayItem(index, "gpa", e.target.value)}
                    placeholder="e.g. 3.85 / 4.0 or Magna Cum Laude"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              addArrayItem({
                degree: "",
                university: "",
                institution: "",
                startDate: "",
                endDate: "",
                location: "",
                gpa: "",
              })
            }
            className="border-dashed border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 rounded-2xl w-full py-5 text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add Another Degree / School
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
