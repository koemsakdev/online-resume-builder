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
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function TechLeadDarkAccent({ resumeData, containerWidth }: Props) {
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
      {/* Dark Slate Navy Header */}
      <div className="bg-slate-900 text-white px-8 py-7 flex items-center gap-6 border-b-4 border-cyan-500">
        {profileImg && (
          <div className="size-24 rounded-xl overflow-hidden border-2 border-cyan-400/80 shadow-md shrink-0 bg-slate-800">
            <Image
              src={profileImg}
              alt={resumeData.name || "Profile"}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase">
            {resumeData.name || "Candidate Name"}
          </h1>
          <p className="text-cyan-400 text-sm font-semibold tracking-wider mt-0.5 uppercase">
            {resumeData.title || "Senior Software Engineer / Tech Lead"}
          </p>

          {/* Quick Contact Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-300">
            {contact.email && (
              <span className="flex items-center gap-1.5 hover:text-white">
                <Mail size={13} className="text-cyan-400" />
                {contact.email}
              </span>
            )}
            {contact.phone && (
              <span className="flex items-center gap-1.5 hover:text-white">
                <Phone size={13} className="text-cyan-400" />
                {contact.phone}
              </span>
            )}
            {contact.location && (
              <span className="flex items-center gap-1.5 hover:text-white">
                <MapPin size={13} className="text-cyan-400" />
                {contact.location}
              </span>
            )}
            {contact.website && (
              <span className="flex items-center gap-1.5 hover:text-white">
                <Globe size={13} className="text-cyan-400" />
                {contact.website}
              </span>
            )}
            {contact.github && (
              <span className="flex items-center gap-1.5 hover:text-white">
                <Github size={13} className="text-cyan-400" />
                {contact.github}
              </span>
            )}
            {contact.linkedin && (
              <span className="flex items-center gap-1.5 hover:text-white">
                <Linkedin size={13} className="text-cyan-400" />
                {contact.linkedin}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Body Layout */}
      <div className="flex flex-1">
        {/* Left Column (Skills, Education, Personal, Certs) */}
        <div className="w-[280px] bg-slate-50 border-r border-slate-200 p-6 space-y-6 text-slate-800 shrink-0">
          {/* Personal / HR Info */}
          {hasPersonalInfo && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <Sparkles size={13} className="text-cyan-600" />
                Personal Details
              </h2>
              <div className="space-y-1.5 text-xs text-slate-600">
                {contact.dateOfBirth && (
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] uppercase block">Date of Birth</span>
                    <span>{contact.dateOfBirth}</span>
                  </div>
                )}
                {contact.nationality && (
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] uppercase block">Nationality</span>
                    <span>{contact.nationality}</span>
                  </div>
                )}
                {contact.maritalStatus && (
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] uppercase block">Marital Status</span>
                    <span>{contact.maritalStatus}</span>
                  </div>
                )}
                {contact.gender && (
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] uppercase block">Gender</span>
                    <span>{contact.gender}</span>
                  </div>
                )}
                {contact.visaStatus && (
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] uppercase block">Work Authorization</span>
                    <span>{contact.visaStatus}</span>
                  </div>
                )}
                {contact.drivingLicense && (
                  <div>
                    <span className="font-semibold text-slate-800 text-[10px] uppercase block">Driving License</span>
                    <span>{contact.drivingLicense}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <GraduationCap size={13} className="text-cyan-600" />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-xs text-slate-700">{edu.university || edu.institution}</p>
                    <span className="text-[11px] text-cyan-700 font-medium">
                      {formatSafeDate(edu.startDate)} - {formatSafeDate(edu.endDate)}
                    </span>
                    {edu.gpa && <p className="text-[11px] text-slate-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          {skills.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                Technical Stack
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-white text-slate-800 border border-slate-300 px-2 py-0.5 rounded shadow-sm"
                  >
                    {s.name || s.skillName}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <Award size={13} className="text-cyan-600" />
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((c, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-slate-600 text-[11px]">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <Languages size={13} className="text-cyan-600" />
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((l, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-800">{l.language}</span>
                      <span className="text-[11px] text-slate-500">{l.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                <Users size={13} className="text-cyan-600" />
                References
              </h2>
              <div className="space-y-3">
                {references.map((r, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900">{r.name}</p>
                    <p className="text-[11px] text-slate-600">{r.position} - {r.company}</p>
                    {r.relationship && <p className="text-[10px] text-slate-500 italic">{r.relationship}</p>}
                    {r.email && <p className="text-[11px] text-cyan-700">{r.email}</p>}
                    {r.phone && <p className="text-[11px] text-slate-600">{r.phone}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Main Column (Summary, Experience, Projects) */}
        <div className="flex-1 p-6 space-y-6 bg-white">
          {/* Executive Summary */}
          {resumeData.summary && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-700 border-b border-cyan-100 pb-1">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-700 border-b border-cyan-100 pb-1 flex items-center gap-1.5">
                <Briefcase size={13} className="text-cyan-600" />
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5 relative pl-4 border-l-2 border-slate-200">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-slate-900">
                        {exp.title || exp.position}
                      </h3>
                      <span className="text-[11px] text-cyan-700 font-semibold">
                        {formatSafeDate(exp.startDate)} - {formatSafeDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      {exp.company || exp.companyName} {exp.location ? `• ${exp.location}` : ""}
                    </p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-xs text-slate-600 space-y-1 pt-1">
                        {exp.responsibilities.map((item, rIdx) => (
                          <li key={rIdx}>{item}</li>
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-700 border-b border-cyan-100 pb-1 flex items-center gap-1.5">
                <FolderGit2 size={13} className="text-cyan-600" />
                Architecture & Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-cyan-600 hover:underline"
                        >
                          Repository / Demo
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] font-semibold text-slate-500">
                        Stack: {proj.technologies.join(", ")}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-xs text-slate-600 leading-normal">{proj.description}</p>
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

