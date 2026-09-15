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
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function NordicMinimalist({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-slate-800 w-[800px] min-h-[1131px] p-10 overflow-hidden font-sans space-y-6"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Nordic Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-light tracking-wide text-slate-900 uppercase">
            {resumeData.name || "Candidate Name"}
          </h1>
          <p className="text-sm font-medium tracking-widest text-slate-500 uppercase">
            {resumeData.title || "Creative Lead & Architect"}
          </p>
        </div>

        {profileImg && (
          <div className="size-20 rounded-full overflow-hidden border border-slate-200 shadow-sm shrink-0">
            <Image
              src={profileImg}
              alt="Avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* 2-Column Nordic Grid */}
      <div className="flex gap-8">
        {/* Left Column (Contact, HR, Skills, Languages) */}
        <div className="w-[230px] space-y-6 shrink-0 text-xs">
          {/* Contact Details */}
          <div className="space-y-2 text-slate-600">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Contact</p>
            {contact.email && (
              <p className="flex items-center gap-1.5 break-all">
                <Mail size={12} className="text-slate-400 shrink-0" />
                {contact.email}
              </p>
            )}
            {contact.phone && (
              <p className="flex items-center gap-1.5">
                <Phone size={12} className="text-slate-400 shrink-0" />
                {contact.phone}
              </p>
            )}
            {contact.location && (
              <p className="flex items-center gap-1.5">
                <MapPin size={12} className="text-slate-400 shrink-0" />
                {contact.location}
              </p>
            )}
            {contact.website && (
              <p className="flex items-center gap-1.5 break-all">
                <Globe size={12} className="text-slate-400 shrink-0" />
                {contact.website}
              </p>
            )}
            {contact.linkedin && (
              <p className="flex items-center gap-1.5 break-all">
                <Linkedin size={12} className="text-slate-400 shrink-0" />
                {contact.linkedin}
              </p>
            )}
            {contact.github && (
              <p className="flex items-center gap-1.5 break-all">
                <Github size={12} className="text-slate-400 shrink-0" />
                {contact.github}
              </p>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Expertise</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm"
                  >
                    {s.name || s.skillName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Education</p>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="font-semibold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600">{edu.university || edu.institution}</p>
                    <p className="text-[10px] text-slate-400">
                      {formatSafeDate(edu.startDate, "yyyy")} — {formatSafeDate(edu.endDate, "yyyy")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Languages</p>
              {languages.map((l, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="text-slate-700">{l.language}</span>
                  <span className="text-slate-400">{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}

          {/* Personal Info */}
          {hasPersonalInfo && (
            <div className="space-y-1.5 text-slate-600">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Personal</p>
              {contact.dateOfBirth && <p>DOB: {contact.dateOfBirth}</p>}
              {contact.nationality && <p>Nationality: {contact.nationality}</p>}
              {contact.maritalStatus && <p>Status: {contact.maritalStatus}</p>}
              {contact.gender && <p>Gender: {contact.gender}</p>}
              {contact.visaStatus && <p>Auth: {contact.visaStatus}</p>}
              {contact.drivingLicense && <p>License: {contact.drivingLicense}</p>}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Certifications</p>
              {certifications.map((c, idx) => (
                <div key={idx}>
                  <p className="font-medium text-slate-800">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (Summary, Experience, Projects, References) */}
        <div className="flex-1 space-y-6 text-xs">
          {/* Summary */}
          {resumeData.summary && (
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">About</p>
              <p className="text-slate-600 leading-relaxed font-light">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Experience</p>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold text-slate-900 text-sm">{exp.title || exp.position}</p>
                      <span className="text-[11px] text-slate-400 font-light">
                        {formatSafeDate(exp.startDate)} — {formatSafeDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium">
                      {exp.company || exp.companyName} {exp.location ? `• ${exp.location}` : ""}
                    </p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-slate-600 space-y-1 pt-1 font-light leading-relaxed">
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

          {/* Projects */}
          {projects.length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">Projects</p>
              <div className="space-y-2.5">
                {projects.map((proj, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium text-slate-900">{proj.title}</p>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 text-[10px] underline">
                          Link
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[10px] text-slate-400">{proj.technologies.join(" / ")}</p>
                    )}
                    {proj.description && <p className="text-slate-600 font-light leading-relaxed">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-900">References</p>
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                {references.map((r, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="font-semibold text-slate-800">{r.name}</p>
                    <p className="text-slate-500">{r.position}, {r.company}</p>
                    {r.email && <p className="text-slate-400">{r.email}</p>}
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

