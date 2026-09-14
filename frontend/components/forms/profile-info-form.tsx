"use client";

import React, { useRef, useState } from "react";
import { CVData } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  ImageIcon,
  Upload,
  Globe,
  Linkedin,
  Github,
  Crop,
  Calendar,
  Heart,
  Flag,
  UserCheck,
  CreditCard,
  Car,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import AiAssistantButton from "@/components/ai/ai-assistant-button";
import ImageCropModal from "@/components/ui/image-crop-modal";

interface ProfileInfoFormProps {
  profileData: CVData["contact"];
  title: string;
  name: string;
  summary: string;
  onUpdateSection: (key: string, value: any) => void;
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
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [tempImageForCrop, setTempImageForCrop] = useState<string>("");

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const rawResult = reader.result as string;
        setTempImageForCrop(rawResult);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(files[0]);
    }
    // Reset file input so re-selecting same file triggers onChange
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleOpenCropModal = () => {
    const currentImg = profileData?.profile || profileData?.profileImageUrl;
    if (currentImg) {
      setTempImageForCrop(currentImg);
      setIsCropModalOpen(true);
    } else {
      inputRef.current?.click();
    }
  };

  const handleApplyCroppedImage = (
    croppedDataUrl: string,
    cropData: { x: number; y: number; zoom: number }
  ) => {
    onUpdateSection("profile", croppedDataUrl);
    onUpdateSection("profileImageUrl", croppedDataUrl);
    onUpdateSection("photoCrop", cropData);
  };

  const handleRemovePhoto = () => {
    onUpdateSection("profile", "");
    onUpdateSection("profileImageUrl", "");
    onUpdateSection("photoCrop", { x: 0, y: 0, zoom: 1 });
  };

  const hasPhoto = Boolean(profileData?.profile || profileData?.profileImageUrl);

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Personal & Contact Information</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide your core credentials, contact channels, and HR-requested details.
        </p>
      </div>
      <Separator />

      {/* Avatar Upload & Interactive Crop Tool */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-sm">
        <div className="relative group">
          <Avatar className="w-24 h-24 rounded-full border-2 border-cyan-500/40 overflow-hidden shadow-lg shadow-cyan-500/10 bg-slate-950">
            {hasPhoto ? (
              <AvatarImage
                src={profileData?.profile || profileData?.profileImageUrl}
                alt={name || "User Avatar"}
                className="object-cover w-full h-full"
              />
            ) : (
              <AvatarFallback className="bg-muted flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-foreground">Profile Photo</p>
            {hasPhoto && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            PNG, JPG or SVG. Click &quot;Crop &amp; Position&quot; to center and scale your face.
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            ref={inputRef}
            onChange={handleProfileImageUpload}
            className="hidden"
          />

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
              className="text-xs flex items-center gap-1.5 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
            >
              <Upload className="w-3.5 h-3.5" /> {hasPhoto ? "Replace Photo" : "Upload Photo"}
            </Button>

            {hasPhoto && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleOpenCropModal}
                  className="text-xs flex items-center gap-1.5 border-purple-500/30 text-purple-300 hover:bg-purple-500/10 rounded-xl"
                >
                  <Crop className="w-3.5 h-3.5" /> Adjust Crop &amp; Face
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemovePhoto}
                  className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image Crop Modal Dialog */}
      {isCropModalOpen && (
        <ImageCropModal
          isOpen={isCropModalOpen}
          onClose={() => setIsCropModalOpen(false)}
          imageSrc={tempImageForCrop}
          initialCrop={profileData?.photoCrop}
          onApply={handleApplyCroppedImage}
          onRemovePhoto={handleRemovePhoto}
        />
      )}

      {/* Name and Target Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Full Name *</Label>
          <Input
            type="text"
            value={name || ""}
            onChange={(e) => onUpdateSection("fullName", e.target.value)}
            placeholder="e.g. Jane Doe"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Target Job Title *</Label>
          <Input
            type="text"
            value={title || ""}
            onChange={(e) => onUpdateSection("title", e.target.value)}
            placeholder="e.g. Senior Full-Stack Engineer"
            className="rounded-xl"
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
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Phone Number *</Label>
          <Input
            type="tel"
            value={profileData?.phone || ""}
            onChange={(e) => onUpdateSection("phone", e.target.value)}
            placeholder="e.g. +1 (555) 019-2834"
            className="rounded-xl"
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
          placeholder="e.g. Phnom Penh, Cambodia or Remote / San Francisco, CA"
          className="rounded-xl"
        />
      </div>

      {/* NEW HR-Requested Personal Details */}
      <div className="p-4 rounded-2xl border border-border/70 bg-muted/20 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-2">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            HR &amp; Personal Details (Optional for International / Local HR)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Date of Birth */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Date of Birth
            </Label>
            <Input
              type="date"
              value={profileData?.dateOfBirth || ""}
              onChange={(e) => onUpdateSection("dateOfBirth", e.target.value)}
              className="rounded-xl text-xs"
            />
          </div>

          {/* Marital Status */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1 text-slate-300">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Marital Status
            </Label>
            <select
              value={profileData?.maritalStatus || ""}
              onChange={(e) => onUpdateSection("maritalStatus", e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select status...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Nationality */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1 text-slate-300">
              <Flag className="w-3.5 h-3.5 text-amber-400" /> Nationality / Citizenship
            </Label>
            <Input
              type="text"
              value={profileData?.nationality || ""}
              onChange={(e) => onUpdateSection("nationality", e.target.value)}
              placeholder="e.g. Cambodian, American"
              className="rounded-xl text-xs"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1 text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-purple-400" /> Gender / Pronouns
            </Label>
            <select
              value={profileData?.gender || ""}
              onChange={(e) => onUpdateSection("gender", e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select gender...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Visa / Work Authorization */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1 text-slate-300">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Visa / Work Authorization
            </Label>
            <Input
              type="text"
              value={profileData?.visaStatus || ""}
              onChange={(e) => onUpdateSection("visaStatus", e.target.value)}
              placeholder="e.g. Citizen, Permanent Resident, H-1B"
              className="rounded-xl text-xs"
            />
          </div>

          {/* Driving License */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium flex items-center gap-1 text-slate-300">
              <Car className="w-3.5 h-3.5 text-blue-400" /> Driving License
            </Label>
            <Input
              type="text"
              value={profileData?.drivingLicense || ""}
              onChange={(e) => onUpdateSection("drivingLicense", e.target.value)}
              placeholder="e.g. Clean Driver's License, Class B"
              className="rounded-xl text-xs"
            />
          </div>
        </div>
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
            className="rounded-xl"
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
            className="rounded-xl"
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
            className="rounded-xl"
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

export { ProfileInfoForm };
export default ProfileInfoForm;