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
  Sparkles,
  Rocket,
  Code2,
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function StartupInnovator({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] p-8 overflow-hidden font-sans space-y-6"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Startup Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white p-6 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-5">
          {profileImg && (
            <div className="size-20 rounded-2xl overflow-hidden border-2 border-sky-400/80 shadow-md shrink-0 bg-slate-800">
              <Image
                src={profileImg}
                alt="Avatar"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-sky-500/30 text-sky-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Rocket size={10} /> Innovator & Builder
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white mt-1">
              {resumeData.name || "Founder / Developer"}
            </h1>
            <p className="text-sky-300 text-xs font-semibold mt-0.5">
              {resumeData.title || "Full-Stack Engineer & Product Architect"}
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="text-right space-y-1 text-xs text-slate-200">
          {contact.email && <p className="flex items-center justify-end gap-1.5 hover:text-sky-300"><Mail size={12} className="text-sky-400" /> {contact.email}</p>}
          {contact.phone && <p className="flex items-center justify-end gap-1.5"><Phone size={12} className="text-sky-400" /> {contact.phone}</p>}
          {contact.location && <p className="flex items-center justify-end gap-1.5"><MapPin size={12} className="text-sky-400" /> {contact.location}</p>}
          {contact.github && <p className="flex items-center justify-end gap-1.5 text-sky-300"><Github size={12} /> {contact.github}</p>}
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="flex gap-6">
        {/* Left Column (Skills, Education, Certs, Personal) */}
        <div className="w-[260px] space-y-5 shrink-0 text-xs">
          {/* Tech Stack */}
          {skills.length > 0 && (
            <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                <Code2 size={13} className="text-sky-600" />
                Tech Stack & Tools
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-white text-sky-900 border border-sky-200 px-2 py-0.5 rounded shadow-2xs"
                  >
                    {s.name || s.skillName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <GraduationCap size={13} className="text-sky-600" />
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="font-bold text-slate-900 text-[11px]">{edu.degree}</p>
                    <p className="text-slate-600 text-[11px]">{edu.university || edu.institution}</p>
                    <p className="text-[10px] text-sky-700 font-semibold">
                      {formatSafeDate(edu.startDate)} - {formatSafeDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Languages size={13} className="text-sky-600" />
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span className="text-slate-800 font-medium">{l.language}</span>
                    <span className="text-sky-700 font-semibold">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Info */}
          {hasPersonalInfo && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-slate-600 text-[11px]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Personal Info
              </h2>
              {contact.dateOfBirth && <p>DOB: {contact.dateOfBirth}</p>}
              {contact.nationality && <p>Nationality: {contact.nationality}</p>}
              {contact.maritalStatus && <p>Status: {contact.maritalStatus}</p>}
              {contact.gender && <p>Gender: {contact.gender}</p>}
              {contact.visaStatus && <p>Visa: {contact.visaStatus}</p>}
              {contact.drivingLicense && <p>License: {contact.drivingLicense}</p>}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Award size={13} className="text-sky-600" />
                Certifications
              </h2>
              <div className="space-y-1 text-[11px]">
                {certifications.map((c, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-slate-500 text-[10px]">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Bio, Experience, Shipped Projects, References) */}
        <div className="flex-1 space-y-5 text-xs">
          {/* Pitch / Summary */}
          {resumeData.summary && (
            <div className="p-4 bg-sky-500/5 rounded-xl border border-sky-500/20 space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Product Pitch & Experience
              </h2>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Work Milestones */}
          {experience.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Briefcase size={13} className="text-sky-600" />
                Career Milestones & Impact
              </h2>
              <div className="space-y-3">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1 pl-3 border-l-2 border-sky-500">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-xs">
                        {exp.title || exp.position}
                      </h3>
                      <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                        {formatSafeDate(exp.startDate)} - {formatSafeDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium text-[11px]">
                      {exp.company || exp.companyName} {exp.location ? `• ${exp.location}` : ""}
                    </p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-slate-600 space-y-0.5 text-[11px]">
                        {exp.responsibilities.map((r, rIdx) => (
                          <li key={rIdx}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipped Projects */}
          {projects.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Rocket size={13} className="text-sky-600" />
                Shipped Products & Projects
              </h2>
              <div className="space-y-2">
                {projects.map((proj, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-xs">{proj.title}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-sky-600 font-semibold hover:underline"
                        >
                          Launch Product ↗
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] text-sky-700 font-semibold">
                        Stack: {proj.technologies.join(", ")}
                      </p>
                    )}
                    {proj.description && <p className="text-slate-600 text-[11px]">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div className="space-y-2 border-t border-slate-200 pt-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Users size={13} className="text-sky-600" />
                References
              </h2>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {references.map((r, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded">
                    <p className="font-bold text-slate-900">{r.name}</p>
                    <p className="text-slate-600 text-[10px]">{r.position}, {r.company}</p>
                    {r.email && <p className="text-sky-700 text-[10px]">{r.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

