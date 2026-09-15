"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { formatSafeDate } from "@/lib/utils";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Award,
  Languages,
  Users,
  Briefcase,
  GraduationCap,
  Terminal,
  Cpu,
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function EngineeringTechnical({ resumeData, containerWidth }: Props) {
  const scale = containerWidth > 0 && containerWidth !== 800 ? containerWidth / 800 : 1;

  const contact = resumeData.contact || { email: "", phone: "" };
  const experience = resumeData.experience || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const projects = resumeData.projects || [];
  const certifications = resumeData.certifications || [];
  const languages = resumeData.languages || [];
  const references = resumeData.references || [];
  const profileImg = contact.profile || contact.profileImageUrl;

  const hasPersonalInfo =
    contact.dateOfBirth ||
    contact.maritalStatus ||
    contact.nationality ||
    contact.gender ||
    contact.visaStatus ||
    contact.drivingLicense;

  return (
    <div
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] p-8 overflow-hidden font-sans space-y-5"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-blue-600" />
            <span className="font-mono text-xs font-semibold text-blue-600">engineering_resume.v2</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 uppercase">
            {resumeData.name || "Software Engineer"}
          </h1>
          <p className="text-xs font-mono font-bold text-slate-700 uppercase">
            {resumeData.title || "Principal Systems Architect / Senior Backend Engineer"}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-mono pt-1">
            {contact.email && <span className="flex items-center gap-1"><Mail size={12} /> {contact.email}</span>}
            {contact.phone && <span className="flex items-center gap-1"><Phone size={12} /> {contact.phone}</span>}
            {contact.location && <span className="flex items-center gap-1"><MapPin size={12} /> {contact.location}</span>}
            {contact.github && <span className="flex items-center gap-1 text-blue-700 font-semibold"><Github size={12} /> {contact.github}</span>}
            {contact.linkedin && <span className="flex items-center gap-1 text-blue-700 font-semibold"><Linkedin size={12} /> {contact.linkedin}</span>}
          </div>
        </div>

        {profileImg && (
          <div className="size-20 rounded-lg overflow-hidden border-2 border-slate-800 shrink-0">
            <Image
              src={profileImg}
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <section className="space-y-1">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 flex items-center gap-1.5">
            <Cpu size={13} className="text-blue-600" />
            System Overview & Engineering Focus
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Technical Skills Matrix */}
      {skills.length > 0 && (
        <section className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            Technical Competencies & Toolchain
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono font-semibold bg-white text-slate-800 border border-slate-300 px-2 py-0.5 rounded"
              >
                {s.name || s.skillName}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 flex items-center gap-1.5">
            <Briefcase size={13} className="text-blue-600" />
            Engineering & Leadership Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1 pl-3 border-l-2 border-blue-600">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">
                    {exp.title || exp.position} — <span className="font-semibold text-slate-700">{exp.company || exp.companyName}</span>
                  </span>
                  <span className="font-mono text-[11px] font-medium text-blue-700">
                    {formatSafeDate(exp.startDate)} – {formatSafeDate(exp.endDate)}
                  </span>
                </div>
                {exp.location && <p className="text-slate-500 text-[11px]">{exp.location}</p>}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-0.5 pt-0.5">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Projects & Open Source */}
      {projects.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Featured Systems & Open Source Projects
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-slate-900">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 font-mono text-[10px] hover:underline">
                      GitHub / Demo
                    </a>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="font-mono text-[10px] text-blue-800">
                    [{proj.technologies.join(", ")}]
                  </p>
                )}
                {proj.description && <p className="text-[11px] text-slate-600 leading-snug">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education, Certifications & Details */}
      <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-2 text-xs">
        {education.length > 0 && (
          <div className="space-y-1">
            <h2 className="font-mono font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="text-[11px]">
                <p className="font-bold text-slate-900">{edu.degree}</p>
                <p className="text-slate-600">{edu.university || edu.institution}</p>
                <p className="font-mono text-[10px] text-slate-500">
                  {formatSafeDate(edu.startDate, "yyyy")} - {formatSafeDate(edu.endDate, "yyyy")}
                </p>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className="space-y-1">
            <h2 className="font-mono font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              Certifications
            </h2>
            {certifications.map((c, idx) => (
              <div key={idx} className="text-[11px]">
                <p className="font-bold text-slate-900">{c.name}</p>
                <p className="text-slate-500 text-[10px]">{c.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {(languages.length > 0 || hasPersonalInfo) && (
          <div className="space-y-1 text-[11px]">
            <h2 className="font-mono font-bold uppercase tracking-wider text-slate-900">
              Languages & Info
            </h2>
            {languages.map((l, idx) => (
              <p key={idx} className="text-slate-700">
                {l.language}: <span className="text-slate-500">{l.proficiency}</span>
              </p>
            ))}
            {contact.nationality && <p className="text-slate-600">Nationality: {contact.nationality}</p>}
            {contact.visaStatus && <p className="text-slate-600">Visa: {contact.visaStatus}</p>}
            {contact.dateOfBirth && <p className="text-slate-600">DOB: {contact.dateOfBirth}</p>}
          </div>
        )}
      </div>

      {/* References */}
      {references.length > 0 && (
        <section className="border-t border-slate-200 pt-2 space-y-1 text-xs">
          <h2 className="font-mono font-bold uppercase tracking-wider text-slate-900 text-[11px]">
            Professional References
          </h2>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {references.map((r, idx) => (
              <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded">
                <p className="font-bold text-slate-900">{r.name}</p>
                <p className="text-slate-600 text-[10px]">{r.position}, {r.company}</p>
                {r.email && <p className="font-mono text-blue-700 text-[10px]">{r.email}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

