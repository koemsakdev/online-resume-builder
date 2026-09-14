"use client";

import React from "react";
import { ReferenceItem } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Users, Plus, Trash2, Mail, Phone, Building2, Briefcase, HeartHandshake, ShieldCheck } from "lucide-react";

interface ReferencesFormProps {
  referencesData: ReferenceItem[];
  updateArrayItem: (index: number, key: string, value: any) => void;
  addArrayItem: (item: ReferenceItem) => void;
  removeArrayItem: (index: number) => void;
}

const ReferencesForm = ({
  referencesData,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}: ReferencesFormProps) => {

  const handleAddDefault = () => {
    addArrayItem({
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
      relationship: "",
    });
  };

  const handleAddAvailableUponRequest = () => {
    addArrayItem({
      name: "Available upon request",
      position: "Professional references ready upon request",
      company: "Various companies",
      email: "",
      phone: "",
      relationship: "Former managers and senior team leads",
    });
  };

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Professional References</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add mentors, managers, or colleagues who can endorse your qualifications and character.
        </p>
      </div>
      <Separator />

      {/* Pro Tip Box */}
      <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-cyan-300">Privacy Tip</span>
          <p className="text-muted-foreground leading-relaxed">
            Most hiring managers check references in final stages. You can list specific managers, or click below to add a standard &quot;Available Upon Request&quot; notice.
          </p>
        </div>
      </div>

      {referencesData.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border/80 rounded-2xl p-6 bg-muted/10 space-y-4">
          <Users className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">No references added yet</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Add past direct managers, technical leads, or professors who can advocate for your capabilities.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddDefault}
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add First Reference
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAddAvailableUponRequest}
              className="text-xs text-muted-foreground hover:text-cyan-300 rounded-xl"
            >
              Add &quot;Available Upon Request&quot;
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {referencesData.map((ref, index) => (
            <div
              key={index}
              className="relative p-5 rounded-2xl border border-border/80 bg-card/60 space-y-4 shadow-sm"
            >
              {/* Reference Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full">
                    Reference #{index + 1}
                  </span>
                  {ref.name && (
                    <span className="text-xs font-semibold text-muted-foreground truncate max-w-[200px]">
                      {ref.name}
                    </span>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeArrayItem(index)}
                  className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0 rounded-lg"
                  title="Delete Reference"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Reference Name & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Referee Full Name *</Label>
                  <Input
                    type="text"
                    value={ref.name || ""}
                    onChange={(e) => updateArrayItem(index, "name", e.target.value)}
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Job Title / Position *
                  </Label>
                  <Input
                    type="text"
                    value={ref.position || ""}
                    onChange={(e) => updateArrayItem(index, "position", e.target.value)}
                    placeholder="e.g. VP of Engineering"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Company & Relationship */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" /> Company / Organization *
                  </Label>
                  <Input
                    type="text"
                    value={ref.company || ""}
                    onChange={(e) => updateArrayItem(index, "company", e.target.value)}
                    placeholder="e.g. Stripe or Google"
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-rose-400" /> Relationship / Context
                  </Label>
                  <Input
                    type="text"
                    value={ref.relationship || ""}
                    onChange={(e) => updateArrayItem(index, "relationship", e.target.value)}
                    placeholder="e.g. Former Direct Manager for 3 years"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Work Email
                  </Label>
                  <Input
                    type="email"
                    value={ref.email || ""}
                    onChange={(e) => updateArrayItem(index, "email", e.target.value)}
                    placeholder="e.g. s.jenkins@company.com"
                    className="rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone Number
                  </Label>
                  <Input
                    type="tel"
                    value={ref.phone || ""}
                    onChange={(e) => updateArrayItem(index, "phone", e.target.value)}
                    placeholder="e.g. +1 (555) 349-2810"
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Reference Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddDefault}
            className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-2xl py-5 text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Another Reference
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReferencesForm;

