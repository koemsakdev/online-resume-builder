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
  ExternalLink,
  Layers,
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function CreativeDesignerViolet({ resumeData, containerWidth }: Props) {
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
      {/* Creative Violet Header */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 text-white px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {profileImg && (
            <div className="size-24 rounded-2xl overflow-hidden border-2 border-violet-300 shadow-xl bg-violet-950 shrink-0">
              <Image
                src={profileImg}
                alt={resumeData.name || "Profile"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <span className="text-violet-300 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles size={12} /> Portfolio & Curriculum Vitae
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
              {resumeData.name || "Creative Candidate"}
            </h1>
            <p className="text-violet-200 text-sm font-medium mt-0.5">
              {resumeData.title || "Product Designer / UI/UX Lead"}
            </p>
          </div>
        </div>

        {/* Contact Mini Block */}
        <div className="text-right space-y-1 text-xs text-violet-200 shrink-0">
          {contact.email && <p className="flex items-center justify-end gap-1.5"><Mail size={12} /> {contact.email}</p>}
          {contact.phone && <p className="flex items-center justify-end gap-1.5"><Phone size={12} /> {contact.phone}</p>}
          {contact.location && <p className="flex items-center justify-end gap-1.5"><MapPin size={12} /> {contact.location}</p>}
          {contact.portfolio && <p className="flex items-center justify-end gap-1.5 text-violet-300 font-semibold"><Globe size={12} /> {contact.portfolio}</p>}
        </div>
      </div>

      {/* Main 2-Column Creative Grid */}
      <div className="flex flex-1">
        {/* Left Column (Skills, Education, Certs, Personal) */}
        <div className="w-[280px] bg-slate-50 border-r border-violet-100 p-6 space-y-6 shrink-0">
          {/* Skills / Design Toolkit */}
          {skills.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-200 pb-1 flex items-center gap-1.5">
                <Layers size={13} />
                Design Toolkit
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-violet-100/80 text-violet-900 border border-violet-200 px-2 py-0.5 rounded-full"
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-200 pb-1 flex items-center gap-1.5">
                <GraduationCap size={13} />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-xs text-slate-600">{edu.university || edu.institution}</p>
                    <span className="text-[10px] text-violet-600 font-medium">
                      {formatSafeDate(edu.startDate)} - {formatSafeDate(edu.endDate)}
                    </span>
                    {edu.gpa && <p className="text-[10px] text-slate-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-200 pb-1 flex items-center gap-1.5">
                <Languages size={13} />
                Languages
              </h2>
              <div className="space-y-1.5">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-slate-800 font-medium">{l.language}</span>
                    <span className="text-violet-700 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Personal Info */}
          {hasPersonalInfo && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-200 pb-1">
                Personal Info
              </h2>
              <div className="space-y-1.5 text-xs text-slate-600">
                {contact.dateOfBirth && <div><span className="font-semibold text-slate-800 text-[10px] uppercase block">DOB:</span> {contact.dateOfBirth}</div>}
                {contact.nationality && <div><span className="font-semibold text-slate-800 text-[10px] uppercase block">Nationality:</span> {contact.nationality}</div>}
                {contact.maritalStatus && <div><span className="font-semibold text-slate-800 text-[10px] uppercase block">Marital Status:</span> {contact.maritalStatus}</div>}
                {contact.gender && <div><span className="font-semibold text-slate-800 text-[10px] uppercase block">Gender:</span> {contact.gender}</div>}
                {contact.visaStatus && <div><span className="font-semibold text-slate-800 text-[10px] uppercase block">Visa Status:</span> {contact.visaStatus}</div>}
                {contact.drivingLicense && <div><span className="font-semibold text-slate-800 text-[10px] uppercase block">Driving License:</span> {contact.drivingLicense}</div>}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-200 pb-1 flex items-center gap-1.5">
                <Award size={13} />
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((c, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-[11px] text-slate-500">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-200 pb-1 flex items-center gap-1.5">
                <Users size={13} />
                References
              </h2>
              <div className="space-y-2 text-xs">
                {references.map((r, idx) => (
                  <div key={idx} className="p-2 bg-white rounded border border-violet-100">
                    <p className="font-bold text-slate-900">{r.name}</p>
                    <p className="text-slate-600 text-[11px]">{r.position} • {r.company}</p>
                    {r.email && <p className="text-violet-700 text-[11px]">{r.email}</p>}
                    {r.phone && <p className="text-slate-500 text-[10px]">{r.phone}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Main Column (Statement, Projects, Experience) */}
        <div className="flex-1 p-7 space-y-6 bg-white">
          {/* Summary / Philosophy */}
          {resumeData.summary && (
            <section className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-100 pb-1">
                Design Philosophy & Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {resumeData.summary}
              </p>
            </section>
          )}

          {/* Featured Case Studies / Projects */}
          {projects.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-100 pb-1 flex items-center gap-1.5">
                <Sparkles size={13} />
                Featured Case Studies & Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="p-3.5 bg-violet-50/40 rounded-xl border border-violet-200/70 space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-violet-700 hover:underline flex items-center gap-1 font-medium"
                        >
                          View Prototype <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((t, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-white text-violet-800 border border-violet-200 px-1.5 py-0.2 rounded font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-800 border-b border-violet-100 pb-1 flex items-center gap-1.5">
                <Briefcase size={13} />
                Career History
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1 relative pl-4 border-l-2 border-violet-300">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-slate-900">
                        {exp.title || exp.position}
                      </h3>
                      <span className="text-[11px] font-semibold text-violet-700">
                        {formatSafeDate(exp.startDate)} - {formatSafeDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-600">
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
        </div>
      </div>
    </div>
  );
}

