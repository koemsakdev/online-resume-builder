"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { CVData } from "@/types/cv";
import { useParams, useRouter } from "next/navigation";
import InputTitle from "@/components/inputs/inputTitle";
import NavbarLayout from "@/components/layouts/navbar-layout";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPath";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Replace,
  Save,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Award,
  Check,
  Printer as LucidePrinter,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Users,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ProfileInfoForm from "@/components/forms/profile-info-form";
import EducationForm from "@/components/forms/education-form";
import ExperienceForm from "@/components/forms/experience-form";
import SkillsForm from "@/components/forms/skills-form";
import ProjectsForm from "@/components/forms/projects-form";
import AdditionalInfoForm from "@/components/forms/additional-info-form";
import ReferencesForm from "@/components/forms/references-form";
import ResumePreview from "@/components/pages/resume-preview";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { templateList } from "@/constants";

interface ResumeEditorPageProps {
  params: {
    resumeId: string;
  };
}

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "additional", label: "Certifications", icon: Award },
  { id: "references", label: "References", icon: Users },
];

export default function EditResumePage({ params }: ResumeEditorPageProps) {
  const { resumeId }: { resumeId: string } = params;
  const router = useRouter();
  const resumeRef = useRef<HTMLDivElement>(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [currentTab, setCurrentTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("black_white_minimalist");
  const [zoomLevel, setZoomLevel] = useState(1);

  const [resumeData, setResumeData] = useState<CVData>({
    name: "",
    title: "",
    thumnailLink: "",
    thumbnailLink: "",
    template: "black_white_minimalist",
    contact: {
      profile: "",
      email: "",
      phone: "",
      portfolio: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      dateOfBirth: "",
      maritalStatus: "",
      nationality: "",
      gender: "",
      drivingLicense: "",
      visaStatus: "",
      photoCrop: { x: 0, y: 0, zoom: 1 },
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
    references: [],
  });

  const fetchResumeData = async (id: string) => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(id));
      if (response.data) {
        const resumeInfo = response.data;
        const currentTemplate = resumeInfo?.template || "black_white_minimalist";
        setSelectedTemplate(currentTemplate);

        setResumeData({
          _id: resumeInfo._id,
          title: resumeInfo?.title || "Untitled Resume",
          name: resumeInfo?.fullName || "",
          fullName: resumeInfo?.fullName || "",
          jobTitle: resumeInfo?.jobTitle || "",
          thumnailLink: resumeInfo?.thumbnailLink || resumeInfo?.thumnailLink || "",
          thumbnailLink: resumeInfo?.thumbnailLink || resumeInfo?.thumnailLink || "",
          template: currentTemplate,
          contact: {
            profile: resumeInfo?.contactInfo?.profileImageUrl || "",
            email: resumeInfo?.contactInfo?.email || "",
            phone: resumeInfo?.contactInfo?.phone || "",
            portfolio: resumeInfo?.contactInfo?.portfolio || resumeInfo?.contactInfo?.website || "",
            website: resumeInfo?.contactInfo?.website || "",
            location: resumeInfo?.contactInfo?.address || resumeInfo?.contactInfo?.location || "",
            linkedin: resumeInfo?.contactInfo?.linkedin || "",
            github: resumeInfo?.contactInfo?.github || "",
            dateOfBirth: resumeInfo?.contactInfo?.dateOfBirth || "",
            maritalStatus: resumeInfo?.contactInfo?.maritalStatus || "",
            nationality: resumeInfo?.contactInfo?.nationality || "",
            gender: resumeInfo?.contactInfo?.gender || "",
            drivingLicense: resumeInfo?.contactInfo?.drivingLicense || "",
            visaStatus: resumeInfo?.contactInfo?.visaStatus || "",
            photoCrop: resumeInfo?.contactInfo?.photoCrop || { x: 0, y: 0, zoom: 1 },
          },
          summary:
            typeof resumeInfo?.summary === "string"
              ? resumeInfo.summary
              : Array.isArray(resumeInfo?.summary)
              ? resumeInfo.summary.join(" ")
              : "",
          skills: (resumeInfo?.skills || []).map((skill: any) => ({
            name: skill?.name || skill?.skillName || "",
            skillName: skill?.skillName || skill?.name || "",
            proficiency: skill?.proficiency || "Intermediate",
            category: skill?.category || "General",
          })),
          experience: (resumeInfo?.experience || []).map((exp: any) => ({
            title: exp?.position || exp?.title || "",
            position: exp?.position || exp?.title || "",
            company: exp?.companyName || exp?.company || "",
            companyName: exp?.companyName || exp?.company || "",
            location: exp?.location || "",
            startDate: exp?.startDate || null,
            endDate: exp?.endDate || null,
            isCurrent: exp?.isCurrent || false,
            responsibilities: Array.isArray(exp?.responsibilities) ? exp.responsibilities : [],
            description: exp?.description || "",
          })),
          education: (resumeInfo?.education || []).map((edu: any) => ({
            degree: edu?.degree || "",
            university: edu?.institution || edu?.university || "",
            institution: edu?.institution || edu?.university || "",
            fieldOfStudy: edu?.fieldOfStudy || "",
            startDate: edu?.startDate || null,
            endDate: edu?.endDate || null,
            location: edu?.location || "",
            gpa: edu?.gpa || "",
          })),
          projects: (resumeInfo?.projects || []).map((p: any) => ({
            title: p?.title || "",
            description: p?.description || "",
            technologies: Array.isArray(p?.technologies) ? p.technologies : [],
            link: p?.link || "",
            githubLink: p?.githubLink || "",
          })),
          certifications: resumeInfo?.certifications || [],
          languages: resumeInfo?.languages || [],
          interests: resumeInfo?.interests || [],
          references: (resumeInfo?.references || []).map((ref: any) => ({
            name: ref?.name || "",
            company: ref?.company || "",
            position: ref?.position || "",
            email: ref?.email || "",
            phone: ref?.phone || "",
            relationship: ref?.relationship || "",
          })),
        });
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      toast({
        title: "Error loading resume",
        description: "Could not retrieve resume data from server.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (showToast = true) => {
    setIsSaving(true);
    try {
      const payload = {
        title: resumeData.title,
        fullName: resumeData.name,
        jobTitle: resumeData.title,
        template: selectedTemplate,
        summary: resumeData.summary,
        contactInfo: {
          profileImageUrl: resumeData.contact?.profile || "",
          email: resumeData.contact?.email || "",
          phone: resumeData.contact?.phone || "",
          address: resumeData.contact?.location || "",
          website: resumeData.contact?.portfolio || resumeData.contact?.website || "",
          portfolio: resumeData.contact?.portfolio || "",
          linkedin: resumeData.contact?.linkedin || "",
          github: resumeData.contact?.github || "",
          dateOfBirth: resumeData.contact?.dateOfBirth || "",
          maritalStatus: resumeData.contact?.maritalStatus || "",
          nationality: resumeData.contact?.nationality || "",
          gender: resumeData.contact?.gender || "",
          drivingLicense: resumeData.contact?.drivingLicense || "",
          visaStatus: resumeData.contact?.visaStatus || "",
          photoCrop: resumeData.contact?.photoCrop || { x: 0, y: 0, zoom: 1 },
        },
        skills: resumeData.skills.map((s) => ({
          skillName: s.name || s.skillName,
          name: s.name || s.skillName,
          proficiency: s.proficiency || "Intermediate",
          category: s.category || "General",
        })),
        experience: resumeData.experience.map((e) => ({
          companyName: e.company || e.companyName,
          position: e.title || e.position,
          location: e.location || "",
          startDate: e.startDate,
          endDate: e.endDate,
          isCurrent: e.isCurrent || false,
          responsibilities: e.responsibilities || [],
          description: e.description || "",
        })),
        education: resumeData.education.map((edu) => ({
          institution: edu.university || edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy || "",
          startDate: edu.startDate,
          endDate: edu.endDate,
          location: edu.location || "",
          gpa: edu.gpa || "",
        })),
        projects: (resumeData.projects || []).map((p) => ({
          title: p.title,
          description: p.description,
          technologies: p.technologies,
          link: p.link,
          githubLink: p.githubLink,
        })),
        certifications: resumeData.certifications || [],
        languages: resumeData.languages || [],
        interests: resumeData.interests || [],
        references: resumeData.references || [],
      };

      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), payload);
      if (showToast) {
        toast({
          title: "Saved successfully!",
          description: "All resume changes have been stored to the cloud.",
        });
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Failed to save",
        description: "Please check your network and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resume? This cannot be undone.")) {
      return;
    }
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast({
        title: "Resume deleted",
        description: "The resume has been permanently removed.",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast({
        title: "Deletion failed",
        description: "Could not delete the resume.",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const updateSection = (sectionKey: string, value: string) => {
    if (sectionKey === "fullName") {
      setResumeData((prev) => ({ ...prev, name: value, fullName: value }));
    } else if (sectionKey === "title") {
      setResumeData((prev) => ({ ...prev, title: value }));
    } else if (sectionKey === "summary") {
      setResumeData((prev) => ({ ...prev, summary: value }));
    } else {
      setResumeData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [sectionKey]: value,
        },
      }));
    }
  };

  const updateArrayItem = (section: string, index: number, key: string, value: any) => {
    setResumeData((prev) => {
      const arrayCopy = [...((prev as any)[section] || [])];
      arrayCopy[index] = {
        ...arrayCopy[index],
        [key]: value,
      };
      return { ...prev, [section]: arrayCopy };
    });
  };

  const addArrayItem = (section: string, newItem: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...((prev as any)[section] || []), newItem],
    }));
  };

  const removeArrayItem = (section: string, index: number) => {
    setResumeData((prev) => {
      const arrayCopy = [...((prev as any)[section] || [])];
      arrayCopy.splice(index, 1);
      return { ...prev, [section]: arrayCopy };
    });
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth || 800);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    if (resumeId) {
      fetchResumeData(resumeId);
    }
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, [resumeId]);

  // Section completion calculator
  const completedSections = useMemo(() => {
    let count = 0;
    if (resumeData.name && resumeData.contact?.email) count++;
    if (resumeData.experience && resumeData.experience.length > 0) count++;
    if (resumeData.education && resumeData.education.length > 0) count++;
    if (resumeData.skills && resumeData.skills.length > 0) count++;
    if (resumeData.projects && resumeData.projects.length > 0) count++;
    if (resumeData.certifications && resumeData.certifications.length > 0) count++;
    if (resumeData.references && resumeData.references.length > 0) count++;
    return count;
  }, [resumeData]);

  const renderCurrentForm = () => {
    switch (currentTab) {
      case "profile":
        return (
          <ProfileInfoForm
            profileData={resumeData.contact}
            title={resumeData.title}
            name={resumeData.name}
            summary={resumeData.summary}
            onUpdateSection={updateSection}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            experienceData={resumeData.experience}
            updateArrayItem={(idx, key, val) => updateArrayItem("experience", idx, key, val)}
            addArrayItem={(item) => addArrayItem("experience", item)}
            removeArrayItem={(idx) => removeArrayItem("experience", idx)}
          />
        );
      case "education":
        return (
          <EducationForm
            educationData={resumeData.education}
            updateArrayItem={(idx, key, val) => updateArrayItem("education", idx, key, val)}
            addArrayItem={(item) => addArrayItem("education", item)}
            removeArrayItem={(idx) => removeArrayItem("education", idx)}
          />
        );
      case "skills":
        return (
          <SkillsForm
            skillsData={resumeData.skills}
            updateArrayItem={(idx, key, val) => updateArrayItem("skills", idx, key, val)}
            addArrayItem={(item) => addArrayItem("skills", item)}
            removeArrayItem={(idx) => removeArrayItem("skills", idx)}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            projectsData={resumeData.projects}
            updateArrayItem={(idx, key, val) => updateArrayItem("projects", idx, key, val)}
            addArrayItem={(item) => addArrayItem("projects", item)}
            removeArrayItem={(idx) => removeArrayItem("projects", idx)}
          />
        );
      case "additional":
        return (
          <AdditionalInfoForm
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case "references":
        return (
          <ReferencesForm
            referencesData={resumeData.references || []}
            updateArrayItem={(idx, key, val) => updateArrayItem("references", idx, key, val)}
            addArrayItem={(item) => addArrayItem("references", item)}
            removeArrayItem={(idx) => removeArrayItem("references", idx)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavbarLayout>
      <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#0B1120] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] cyan-glow pointer-events-none opacity-15 -z-10" />
        <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] purple-glow pointer-events-none opacity-15 -z-10" />

        {/* Breadcrumb Navigation & Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-cyan-400">
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/resume-templates" className="text-muted-foreground hover:text-cyan-400">
                    Templates
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-cyan-300 font-semibold">Studio Editor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Action Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Change Template Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-cyan-500/30 bg-card/60 text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
                >
                  <Replace className="w-3.5 h-3.5 mr-1.5" />
                  <span>Layout</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border shadow-xl rounded-xl">
                <DropdownMenuLabel className="text-xs">Switch ATS Template</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {templateList.map((tpl) => (
                  <DropdownMenuItem
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplate(tpl.id);
                      setResumeData((prev) => ({ ...prev, template: tpl.id }));
                      toast({
                        title: `Template switched: ${tpl.name}`,
                        description: "Preview updated.",
                      });
                    }}
                    className="flex items-center justify-between cursor-pointer text-xs py-2"
                  >
                    <span>{tpl.name}</span>
                    {selectedTemplate === tpl.id && (
                      <Check className="w-4 h-4 text-cyan-400" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Print / Download Button */}
            <Button
              size="sm"
              onClick={handlePrint}
              variant="outline"
              className="border-purple-500/30 bg-card/60 text-purple-300 hover:bg-purple-500/10 rounded-xl"
            >
              <LucidePrinter className="w-3.5 h-3.5 mr-1.5" />
              <span>Print / PDF</span>
            </Button>

            {/* Delete Button */}
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              className="rounded-xl text-xs"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Delete</span>
            </Button>

            {/* Save Button */}
            <Button
              size="sm"
              disabled={isSaving}
              onClick={() => handleSave(true)}
              className="brand-gradient-btn rounded-xl shadow-md shadow-cyan-500/20 font-semibold text-xs"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>{isSaving ? "Saving..." : "Save Resume"}</span>
            </Button>
          </div>
        </div>

        {/* Title Bar & Progress Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md shadow-lg">
          <div className="flex-1 max-w-md">
            <InputTitle
              title={resumeData.title || ""}
              setTitle={(newTitle) => setResumeData((prev) => ({ ...prev, title: newTitle }))}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-cyan-300">{completedSections} / 7</span>
              <span>Sections Ready</span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
              {templateList.find((t) => t.id === selectedTemplate)?.name || "Modern"}
            </span>
          </div>
        </div>

        {/* Main Editor Grid (Left: Form tabs, Right: Live preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Form Builder (6 cols on lg) */}
          <div className="lg:col-span-6 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Section Tab Bar */}
            <div className="flex overflow-x-auto border-b border-border/60 bg-muted/30 p-2 gap-1.5 scrollbar-none">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Tab Form Content (Smooth natural flow without double scrollbar) */}
            <div className="custom-scrollbar">
              {renderCurrentForm()}
            </div>

            {/* Bottom Form Navigation Bar */}
            <div className="p-4 border-t border-border/60 flex items-center justify-between bg-muted/30 mt-auto">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentTab === TABS[0].id}
                onClick={() => {
                  const currentIndex = TABS.findIndex((t) => t.id === currentTab);
                  if (currentIndex > 0) setCurrentTab(TABS[currentIndex - 1].id);
                }}
                className="text-xs rounded-xl"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  const currentIndex = TABS.findIndex((t) => t.id === currentTab);
                  if (currentIndex < TABS.length - 1) {
                    setCurrentTab(TABS[currentIndex + 1].id);
                  } else {
                    handleSave(true);
                  }
                }}
                className="brand-gradient-btn rounded-xl text-xs font-semibold shadow-md shadow-cyan-500/20"
              >
                {currentTab === TABS[TABS.length - 1].id ? "Save Resume" : "Next Section"}
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right Live Preview Area (6 cols on lg) */}
          <div className="lg:col-span-6 sticky top-24 space-y-3">
            <div className="p-4 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl space-y-4 shadow-2xl">
              
              {/* Preview Header & Controls */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Live Real-Time Preview
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Scales to printable A4
                </span>

                {/* Zoom & Scaling Controls */}
                <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/60">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-lg"
                    onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </Button>
                  <span className="text-[10px] font-mono font-bold px-1 text-muted-foreground">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-lg"
                    onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-lg"
                    onClick={() => setZoomLevel(1)}
                    title="Reset Zoom"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Preview Canvas Container */}
              <div
                ref={resumeRef}
                style={{
                  transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : undefined,
                  transformOrigin: "top center",
                  transition: "transform 0.2s ease",
                }}
                className="w-full overflow-hidden rounded-2xl border border-border/60 bg-white shadow-2xl p-2 min-h-[500px]"
              >
                <ResumePreview
                  templateName={selectedTemplate}
                  resumeData={resumeData}
                  containerWidth={baseWidth}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </NavbarLayout>
  );
}
