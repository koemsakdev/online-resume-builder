"use client";

import React, { useRef } from "react";
import { CVData } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageIcon, Upload, Globe, Linkedin, Github } from "lucide-react";
import { Button } from "../ui/button";
import AiAssistantButton from "@/components/ai/ai-assistant-button";

interface ProfileInfoFormProps {
  profileData: CVData["contact"];
  title: string;
  name: string;
  summary: string;
  onUpdateSection: (key: string, value: string) => void;
  onNext?: () => void;
}

const ProfileInfoForm = ({
  profileData,
  title,
  summary,
  name,
  onUpdateSection,
}: ProfileInfoFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateSection("profile", reader.result as string);
        onUpdateSection("profileImageUrl", reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Personal & Contact Information</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide your basic credentials and channels so hiring managers can reach you.
        </p>
      </div>
      <Separator />

      {/* Avatar Upload */}
      <div className="flex items-center gap-5 p-4 rounded-xl border border-border/60 bg-card/40">
        <Avatar className="w-20 h-20 rounded-xl border-2 border-cyan-500/30 overflow-hidden shadow-sm">
          {profileData?.profile || profileData?.profileImageUrl ? (
            <AvatarImage
              src={profileData?.profile || profileData?.profileImageUrl}
              alt={name || "User Avatar"}
              className="object-cover"
            />
          ) : (
            <AvatarFallback className="bg-muted">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>

        <div className="space-y-1.5">
          <p className="text-sm font-semibold">Profile Photo</p>
          <p className="text-xs text-muted-foreground">PNG, JPG or SVG, max 5MB</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            ref={inputRef}
            onChange={handleProfileImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="text-xs flex items-center gap-1.5 mt-1 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10"
          >
            <Upload className="w-3.5 h-3.5" /> Upload Photo
          </Button>
        </div>
      </div>

      {/* Name and Target Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Full Name *</Label>
          <Input
            type="text"
            value={name || ""}
            onChange={(e) => onUpdateSection("fullName", e.target.value)}
            placeholder="e.g. Jane Doe"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Target Job Title *</Label>
          <Input
            type="text"
            value={title || ""}
            onChange={(e) => onUpdateSection("title", e.target.value)}
            placeholder="e.g. Senior Full-Stack Engineer"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Email Address *</Label>
          <Input
            type="email"
            value={profileData?.email || ""}
            onChange={(e) => onUpdateSection("email", e.target.value)}
            placeholder="e.g. jane.doe@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Phone Number *</Label>
          <Input
            type="tel"
            value={profileData?.phone || ""}
            onChange={(e) => onUpdateSection("phone", e.target.value)}
            placeholder="e.g. +1 (555) 019-2834"
          />
        </div>
      </div>

      {/* Address / Location */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold">Location / Address</Label>
        <Input
          type="text"
          value={profileData?.location || profileData?.address || ""}
          onChange={(e) => {
            onUpdateSection("location", e.target.value);
            onUpdateSection("address", e.target.value);
          }}
          placeholder="e.g. San Francisco, CA or Remote"
        />
      </div>

      {/* Links: Portfolio, LinkedIn, GitHub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Portfolio / Website
          </Label>
          <Input
            type="url"
            value={profileData?.portfolio || profileData?.website || ""}
            onChange={(e) => {
              onUpdateSection("portfolio", e.target.value);
              onUpdateSection("website", e.target.value);
            }}
            placeholder="https://janedoe.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn
          </Label>
          <Input
            type="url"
            value={profileData?.linkedin || ""}
            onChange={(e) => onUpdateSection("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold flex items-center gap-1">
            <Github className="w-3.5 h-3.5 text-purple-400" /> GitHub
          </Label>
          <Input
            type="url"
            value={profileData?.github || ""}
            onChange={(e) => onUpdateSection("github", e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      {/* Professional Summary with AI Assistant */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold">Professional Summary / Objective</Label>
          <AiAssistantButton
            section="summary"
            roleTitle={title || name}
            currentText={summary || ""}
            onApply={(aiText) => onUpdateSection("summary", aiText)}
            label="Write Summary with AI"
          />
        </div>
        <Textarea
          value={summary || ""}
          onChange={(e) => onUpdateSection("summary", e.target.value)}
          placeholder="Write a concise 2-4 sentence summary highlighting your career achievements, core specializations, and unique value proposition, or click 'Write Summary with AI'..."
          rows={4}
          className="rounded-xl border-border/80 text-xs"
        />
      </div>
    </div>
  );
};

export default ProfileInfoForm;