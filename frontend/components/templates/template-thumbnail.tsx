"use client";

import React, { useRef, useState, useEffect } from "react";
import { CVData } from "@/types/cv";
import ResumePreview from "../pages/resume-preview";
import sampleResume from "@/assets/resume.json";

interface TemplateThumbnailProps {
  templateId: string;
  resumeData?: Partial<CVData>;
  className?: string;
}

const DEFAULT_SAMPLE_DATA: CVData = {
  name: "Alexander Wright",
  title: "Senior Full Stack Engineer",
  template: "black_white_minimalist",
  contact: {
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    email: "alex.wright@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexwright.dev",
    linkedin: "https://linkedin.com/in/alexwright",
    github: "https://github.com/alexwright",
  },
  summary:
    "Innovative Software Engineer with 6+ years of building high-concurrency microservices, cloud-native platforms, and intuitive web apps. Proven track record in leading engineering teams and accelerating product release cycles.",
  skills: [
    { name: "TypeScript", proficiency: "Expert", category: "Languages" },
    { name: "React / Next.js", proficiency: "Expert", category: "Frontend" },
    { name: "Node.js / Express", proficiency: "Advanced", category: "Backend" },
    { name: "PostgreSQL & MongoDB", proficiency: "Advanced", category: "Databases" },
    { name: "Docker & AWS", proficiency: "Intermediate", category: "Cloud" },
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Apex Cloud Systems",
      startDate: "2021",
      endDate: "Present",
      responsibilities: [
        "Architected real-time analytics engine handling 40M+ daily events.",
        "Reduced API latency by 35% through Redis caching.",
      ],
      description:
        "Architected real-time analytics engine handling 40M+ daily events. Reduced API latency by 35% through Redis caching.",
    },
    {
      title: "Frontend Developer",
      company: "Vanguard Labs",
      startDate: "2018",
      endDate: "2021",
      responsibilities: [
        "Built design system and customer-facing dashboard used by 150k active users.",
      ],
      description:
        "Built design system and customer-facing dashboard used by 150k active users.",
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      university: "Stanford University",
      institution: "Stanford University",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  projects: [
    {
      title: "AI Resume Builder",
      description: "Next.js SaaS platform with automated ATS formatting and AI bullet enhancements.",
      technologies: ["Next.js", "Tailwind", "MongoDB"],
    },
  ],
  certifications: [
    {
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      issueDate: "2023",
    },
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Conversational" },
  ],
  interests: ["Distributed Systems", "Open Source", "Photography"],
};

export const TemplateThumbnail = ({
  templateId,
  resumeData,
  className = "",
}: TemplateThumbnailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  // Merge sample data with any provided resume data
  const candidateName =
    (resumeData as any)?.fullName?.trim() ||
    resumeData?.name?.trim() ||
    (resumeData?.title && !resumeData?.title.toLowerCase().includes("resume")
      ? resumeData.title
      : DEFAULT_SAMPLE_DATA.name);

  const candidateTitle =
    (resumeData as any)?.jobTitle?.trim() ||
    (resumeData?.title && !resumeData?.title.toLowerCase().includes("resume")
      ? resumeData.title
      : DEFAULT_SAMPLE_DATA.title);

  const mergedData: CVData = {
    ...DEFAULT_SAMPLE_DATA,
    ...resumeData,
    name: candidateName,
    title: candidateTitle,
    contact: {
      ...DEFAULT_SAMPLE_DATA.contact,
      ...(resumeData?.contact || {}),
      profile:
        resumeData?.contact?.profile ||
        (resumeData as any)?.contactInfo?.profileImageUrl ||
        DEFAULT_SAMPLE_DATA.contact.profile,
    },
    skills:
      resumeData?.skills && resumeData.skills.length > 0
        ? resumeData.skills
        : DEFAULT_SAMPLE_DATA.skills,
    experience:
      resumeData?.experience && resumeData.experience.length > 0
        ? resumeData.experience
        : DEFAULT_SAMPLE_DATA.experience,
    education:
      resumeData?.education && resumeData.education.length > 0
        ? resumeData.education
        : DEFAULT_SAMPLE_DATA.education,
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) {
          setScale(width / 800);
        }
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[1/1.414] overflow-hidden bg-white select-none pointer-events-none rounded-t-xl border-b border-border/40 shadow-sm ${className}`}
    >
      <div
        style={{
          width: "800px",
          height: "1131px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="absolute top-0 left-0 bg-white text-slate-900 pointer-events-none overflow-hidden"
      >
        <ResumePreview
          templateName={templateId}
          resumeData={mergedData}
          containerWidth={800}
        />
      </div>
    </div>
  );
};
