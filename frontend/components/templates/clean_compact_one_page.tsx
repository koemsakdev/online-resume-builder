"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { formatSafeDate } from "@/lib/utils";
import Image from "next/image";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function CleanCompactOnePage({ resumeData, containerWidth }: Props) {
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

  const contactItems: string[] = [];
  if (contact.email) contactItems.push(contact.email);
  if (contact.phone) contactItems.push(contact.phone);
  if (contact.location) contactItems.push(contact.location);
  if (contact.linkedin) contactItems.push(contact.linkedin);
  if (contact.github) contactItems.push(contact.github);
  if (contact.website) contactItems.push(contact.website);

  const hasPersonalInfo =
    contact.dateOfBirth ||
    contact.maritalStatus ||
    contact.nationality ||
    contact.gender ||
    contact.visaStatus ||
    contact.drivingLicense;

  return (
    <div
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] p-8 overflow-hidden font-sans space-y-3.5 text-xs"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            {resumeData.name || "Full Name"}
          </h1>
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            {resumeData.title || "Professional Title"}
          </p>
          {contactItems.length > 0 && (
            <p className="text-[11px] text-slate-600 pt-0.5">
              {contactItems.join("  •  ")}
            </p>
          )}
        </div>

        {profileImg && (
          <div className="size-16 rounded overflow-hidden border border-slate-300 shrink-0">
            <Image
              src={profileImg}
              alt="Profile"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <section className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Professional Summary
          </h2>
          <p className="text-[11px] text-slate-700 leading-snug">
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Key Skills & Core Competencies
          </h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-slate-100 border border-slate-300 text-slate-800 px-1.5 py-0.5 rounded"
              >
                {s.name || s.skillName}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Professional Experience
          </h2>
          <div className="space-y-2.5">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">
                    {exp.title || exp.position} — <span className="font-semibold text-slate-700">{exp.company || exp.companyName}</span>
                    {exp.location ? `, ${exp.location}` : ""}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">
                    {formatSafeDate(exp.startDate)} – {formatSafeDate(exp.endDate)}
                  </span>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-[11px] text-slate-700 space-y-0.5">
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

      {/* Education */}
      {education.length > 0 && (
        <section className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Education
          </h2>
          <div className="space-y-1">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-[11px]">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600">, {edu.university || edu.institution}</span>
                  {edu.gpa && <span className="text-slate-500"> (GPA: {edu.gpa})</span>}
                </div>
                <span className="text-[10px] font-semibold text-slate-600">
                  {formatSafeDate(edu.startDate, "yyyy")} – {formatSafeDate(edu.endDate, "yyyy")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
            Projects
          </h2>
          <div className="space-y-1.5">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5 text-[11px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline text-[10px]">
                      {proj.link}
                    </a>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-[10px] text-slate-500">Tech: {proj.technologies.join(", ")}</p>
                )}
                {proj.description && <p className="text-slate-700 leading-tight">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Grid: Certifications, Languages, HR Info */}
      {(certifications.length > 0 || languages.length > 0 || hasPersonalInfo) && (
        <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-2 text-[10px]">
          {certifications.length > 0 && (
            <div>
              <p className="font-bold uppercase text-slate-900 mb-1">Certifications</p>
              {certifications.map((c, idx) => (
                <p key={idx} className="text-slate-700 leading-tight">
                  • <strong>{c.name}</strong> ({c.issuer})
                </p>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <p className="font-bold uppercase text-slate-900 mb-1">Languages</p>
              {languages.map((l, idx) => (
                <p key={idx} className="text-slate-700">
                  {l.language}: <span className="text-slate-500">{l.proficiency}</span>
                </p>
              ))}
            </div>
          )}

          {hasPersonalInfo && (
            <div>
              <p className="font-bold uppercase text-slate-900 mb-1">Personal</p>
              <div className="space-y-0.5 text-slate-600">
                {contact.nationality && <p>Nationality: {contact.nationality}</p>}
                {contact.visaStatus && <p>Visa: {contact.visaStatus}</p>}
                {contact.dateOfBirth && <p>DOB: {contact.dateOfBirth}</p>}
                {contact.maritalStatus && <p>Status: {contact.maritalStatus}</p>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="border-t border-slate-200 pt-2 space-y-1">
          <p className="font-bold uppercase text-[11px] text-slate-900">References</p>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {references.map((r, idx) => (
              <div key={idx} className="p-1.5 bg-slate-50 border border-slate-200 rounded">
                <p className="font-bold text-slate-900">{r.name} ({r.position}, {r.company})</p>
                <p className="text-slate-600">{r.email} {r.phone ? `• ${r.phone}` : ""}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

