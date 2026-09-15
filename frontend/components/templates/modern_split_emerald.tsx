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

export default function ModernSplitEmerald({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] overflow-hidden flex font-sans"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Left Column (Emerald Sidebar) */}
      <div className="w-[280px] bg-emerald-950 text-emerald-100 p-6 space-y-6 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Avatar */}
          {profileImg && (
            <div className="flex justify-center">
              <div className="size-28 rounded-full overflow-hidden border-4 border-emerald-500/40 shadow-xl bg-emerald-900">
                <Image
                  src={profileImg}
                  alt={resumeData.name || "Profile"}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Contact Details */}
          <section className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-800 pb-1">
              Contact
            </h2>
            <div className="space-y-2 text-xs text-emerald-200">
              {contact.email && (
                <div className="flex items-start gap-2">
                  <Mail size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span className="break-all">{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-emerald-400 shrink-0" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>{contact.location}</span>
                </div>
              )}
              {contact.website && (
                <div className="flex items-center gap-2">
                  <Globe size={13} className="text-emerald-400 shrink-0" />
                  <span className="break-all">{contact.website}</span>
                </div>
              )}
              {contact.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={13} className="text-emerald-400 shrink-0" />
                  <span className="break-all">{contact.linkedin}</span>
                </div>
              )}
              {contact.github && (
                <div className="flex items-center gap-2">
                  <Github size={13} className="text-emerald-400 shrink-0" />
                  <span className="break-all">{contact.github}</span>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-800 pb-1 flex items-center gap-1.5">
                <GraduationCap size={13} />
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-xs font-bold text-white">{edu.degree}</p>
                    <p className="text-xs text-emerald-300">{edu.university || edu.institution}</p>
                    <p className="text-[11px] text-emerald-400">
                      {formatSafeDate(edu.startDate)} - {formatSafeDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-[10px] text-emerald-400">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-800 pb-1">
                Expertise
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-2 py-0.5 rounded"
                  >
                    {s.name || s.skillName}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Personal Info */}
          {hasPersonalInfo && (
            <section className="space-y-2 text-xs">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-800 pb-1 flex items-center gap-1.5">
                <Sparkles size={13} />
                Personal Info
              </h2>
              <div className="space-y-1 text-emerald-300">
                {contact.dateOfBirth && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/80 block">DOB</span>
                    <span>{contact.dateOfBirth}</span>
                  </div>
                )}
                {contact.nationality && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/80 block">Nationality</span>
                    <span>{contact.nationality}</span>
                  </div>
                )}
                {contact.maritalStatus && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/80 block">Marital Status</span>
                    <span>{contact.maritalStatus}</span>
                  </div>
                )}
                {contact.gender && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/80 block">Gender</span>
                    <span>{contact.gender}</span>
                  </div>
                )}
                {contact.visaStatus && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/80 block">Visa / Work Auth</span>
                    <span>{contact.visaStatus}</span>
                  </div>
                )}
                {contact.drivingLicense && (
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/80 block">Driving License</span>
                    <span>{contact.drivingLicense}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-800 pb-1 flex items-center gap-1.5">
                <Languages size={13} />
                Languages
              </h2>
              <div className="space-y-1.5 text-xs text-emerald-300">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-emerald-400 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Right Column (Content Area) */}
      <div className="flex-1 p-8 space-y-6 bg-white text-slate-800">
        {/* Name & Title Header */}
        <div className="border-b-2 border-emerald-600 pb-4">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {resumeData.name || "Candidate Name"}
          </h1>
          <p className="text-base font-semibold text-emerald-700 tracking-wide mt-0.5 uppercase">
            {resumeData.title || "Professional Role"}
          </p>
        </div>

        {/* Profile / Summary */}
        {resumeData.summary && (
          <section className="space-y-2 bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Executive Profile
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Briefcase size={13} className="text-emerald-700" />
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 relative pl-4 border-l-2 border-emerald-500">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-slate-900">
                      {exp.title || exp.position}
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-700">
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

        {/* Key Projects */}
        {projects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <FolderGit2 size={13} className="text-emerald-700" />
              Key Projects
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-emerald-700 font-medium hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[10px] text-emerald-800 font-medium">
                      {proj.technologies.join(" • ")}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-600">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Award size={13} className="text-emerald-700" />
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((c, idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-[11px] text-slate-600">{c.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Users size={13} className="text-emerald-700" />
              References
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {references.map((r, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900">{r.name}</p>
                  <p className="text-[11px] text-slate-600">{r.position} • {r.company}</p>
                  {r.relationship && <p className="text-[10px] text-slate-500 italic">{r.relationship}</p>}
                  {r.email && <p className="text-[11px] text-emerald-700">{r.email}</p>}
                  {r.phone && <p className="text-[11px] text-slate-600">{r.phone}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

