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
  FolderGit2,
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function BoldHeaderCrimson({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] overflow-hidden flex flex-col font-sans"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Crimson Banner */}
      <div className="bg-rose-950 text-white px-8 py-7 flex items-center justify-between border-b-4 border-rose-600">
        <div className="flex items-center gap-6">
          {profileImg && (
            <div className="size-24 rounded-full overflow-hidden border-2 border-rose-300 shadow-md shrink-0 bg-rose-900">
              <Image
                src={profileImg}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
              {resumeData.name || "Candidate Name"}
            </h1>
            <p className="text-rose-300 text-sm font-semibold tracking-wider mt-0.5 uppercase">
              {resumeData.title || "Executive Director / Operations Head"}
            </p>
          </div>
        </div>

        {/* Contact Info Header */}
        <div className="text-right space-y-1 text-xs text-rose-200 shrink-0">
          {contact.email && <p className="flex items-center justify-end gap-1.5"><Mail size={12} className="text-rose-400" /> {contact.email}</p>}
          {contact.phone && <p className="flex items-center justify-end gap-1.5"><Phone size={12} className="text-rose-400" /> {contact.phone}</p>}
          {contact.location && <p className="flex items-center justify-end gap-1.5"><MapPin size={12} className="text-rose-400" /> {contact.location}</p>}
          {contact.linkedin && <p className="flex items-center justify-end gap-1.5"><Linkedin size={12} className="text-rose-400" /> {contact.linkedin}</p>}
        </div>
      </div>

      {/* 2-Column Content */}
      <div className="flex flex-1">
        {/* Left Column (Skills, Education, Certs, Personal) */}
        <div className="w-[270px] bg-rose-50/40 border-r border-rose-100 p-6 space-y-6 shrink-0 text-slate-800">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1">
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-white text-rose-950 border border-rose-200 px-2 py-0.5 rounded shadow-2xs"
                  >
                    {s.name || s.skillName}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1 flex items-center gap-1.5">
                <GraduationCap size={13} className="text-rose-700" />
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-xs text-slate-700">{edu.university || edu.institution}</p>
                    <p className="text-[10px] text-rose-700 font-semibold">
                      {formatSafeDate(edu.startDate)} - {formatSafeDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1 flex items-center gap-1.5">
                <Languages size={13} className="text-rose-700" />
                Languages
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-800">{l.language}</span>
                    <span className="text-rose-800 font-medium text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1 flex items-center gap-1.5">
                <Award size={13} className="text-rose-700" />
                Certifications
              </h2>
              <div className="space-y-1 text-xs">
                {certifications.map((c, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-slate-500 text-[10px]">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Personal Info */}
          {hasPersonalInfo && (
            <section className="space-y-2 text-xs text-slate-700">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1">
                Personal Info
              </h2>
              {contact.dateOfBirth && <p><strong className="text-slate-900">DOB:</strong> {contact.dateOfBirth}</p>}
              {contact.nationality && <p><strong className="text-slate-900">Nationality:</strong> {contact.nationality}</p>}
              {contact.maritalStatus && <p><strong className="text-slate-900">Status:</strong> {contact.maritalStatus}</p>}
              {contact.gender && <p><strong className="text-slate-900">Gender:</strong> {contact.gender}</p>}
              {contact.visaStatus && <p><strong className="text-slate-900">Visa:</strong> {contact.visaStatus}</p>}
              {contact.drivingLicense && <p><strong className="text-slate-900">License:</strong> {contact.drivingLicense}</p>}
            </section>
          )}
        </div>

        {/* Right Main Column */}
        <div className="flex-1 p-6 space-y-6 bg-white">
          {/* Summary */}
          {resumeData.summary && (
            <section className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1">
                Executive Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {resumeData.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1 flex items-center gap-1.5">
                <Briefcase size={13} className="text-rose-700" />
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1 pl-4 border-l-2 border-rose-600">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-slate-900">
                        {exp.title || exp.position}
                      </h3>
                      <span className="text-[11px] font-semibold text-rose-800">
                        {formatSafeDate(exp.startDate)} - {formatSafeDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600">
                      {exp.company || exp.companyName} {exp.location ? `• ${exp.location}` : ""}
                    </p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-xs text-slate-600 space-y-1 pt-1">
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

          {/* Projects */}
          {projects.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1 flex items-center gap-1.5">
                <FolderGit2 size={13} className="text-rose-700" />
                Key Strategic Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] text-rose-700 hover:underline">
                          View Details
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] font-medium text-rose-800">
                        Technologies: {proj.technologies.join(", ")}
                      </p>
                    )}
                    {proj.description && <p className="text-xs text-slate-600">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references.length > 0 && (
            <section className="space-y-2 border-t border-slate-200 pt-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                <Users size={13} className="text-rose-700" />
                References
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {references.map((r, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <p className="font-bold text-slate-900">{r.name}</p>
                    <p className="text-slate-600 text-[11px]">{r.position} • {r.company}</p>
                    {r.email && <p className="text-rose-800 text-[11px]">{r.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

