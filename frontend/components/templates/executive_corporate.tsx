"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { formatSafeDate } from "@/lib/utils";
import Image from "next/image";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function ExecutiveCorporate({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] p-10 overflow-hidden font-serif space-y-5"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Header */}
      <div className="text-center space-y-2 border-b-2 border-slate-900 pb-5">
        {profileImg && (
          <div className="flex justify-center mb-2">
            <div className="size-20 rounded-full overflow-hidden border-2 border-slate-700 shadow-sm">
              <Image
                src={profileImg}
                alt={resumeData.name || "Profile"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-widest uppercase text-slate-950">
          {resumeData.name || "Candidate Name"}
        </h1>
        <p className="text-sm font-sans tracking-widest text-slate-700 uppercase font-semibold">
          {resumeData.title || "Executive Director / Corporate Officer"}
        </p>

        {contactItems.length > 0 && (
          <p className="text-xs font-sans text-slate-600 tracking-normal pt-1">
            {contactItems.join("  |  ")}
          </p>
        )}
      </div>

      {/* Executive Summary */}
      {resumeData.summary && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Executive Profile
          </h2>
          <p className="text-xs text-slate-700 font-sans leading-relaxed text-justify">
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Core Competencies & Leadership
          </h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1 font-sans text-xs text-slate-800">
            {skills.map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-slate-400">•</span>
                <span>{s.name || s.skillName}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-950">
                    {exp.company || exp.companyName}
                    {exp.location ? `, ${exp.location}` : ""}
                  </span>
                  <span className="text-xs font-sans text-slate-600 font-medium">
                    {formatSafeDate(exp.startDate, "MMM yyyy")} – {formatSafeDate(exp.endDate, "MMM yyyy")}
                  </span>
                </div>
                <p className="text-xs font-sans italic text-slate-700 font-semibold">
                  {exp.title || exp.position}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 font-sans text-xs text-slate-700 space-y-1 pt-0.5">
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
        <section className="space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Education & Credentials
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline font-sans text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600"> — {edu.university || edu.institution}</span>
                  {edu.gpa && <span className="text-slate-500 text-[11px]"> (GPA: {edu.gpa})</span>}
                </div>
                <span className="text-slate-600 font-medium">
                  {formatSafeDate(edu.startDate, "yyyy")} – {formatSafeDate(edu.endDate, "yyyy")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Key Strategic Projects & Engagements
          </h2>
          <div className="space-y-2 font-sans text-xs">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-800 hover:underline text-[11px]">
                      Reference
                    </a>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-[11px] text-slate-500 font-medium">
                    Domain / Technologies: {proj.technologies.join(", ")}
                  </p>
                )}
                {proj.description && <p className="text-slate-700 leading-normal">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-6 font-sans text-xs pt-1">
          {certifications.length > 0 && (
            <section className="space-y-1.5">
              <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
                Certifications & Board Honors
              </h2>
              <div className="space-y-1">
                {certifications.map((c, idx) => (
                  <div key={idx}>
                    <span className="font-semibold text-slate-900">{c.name}</span>
                    <span className="text-slate-500"> ({c.issuer})</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section className="space-y-1.5">
              <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-slate-900 font-medium">{l.language}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Personal Info */}
      {hasPersonalInfo && (
        <section className="space-y-1 font-sans text-xs pt-1">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
            Personal Details
          </h2>
          <div className="grid grid-cols-3 gap-2 text-slate-700">
            {contact.dateOfBirth && <div><strong>DOB:</strong> {contact.dateOfBirth}</div>}
            {contact.nationality && <div><strong>Nationality:</strong> {contact.nationality}</div>}
            {contact.maritalStatus && <div><strong>Status:</strong> {contact.maritalStatus}</div>}
            {contact.gender && <div><strong>Gender:</strong> {contact.gender}</div>}
            {contact.visaStatus && <div><strong>Visa:</strong> {contact.visaStatus}</div>}
            {contact.drivingLicense && <div><strong>License:</strong> {contact.drivingLicense}</div>}
          </div>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="space-y-2 font-sans text-xs pt-1">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
            Executive References
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {references.map((r, idx) => (
              <div key={idx} className="space-y-0.5 p-2 border border-slate-200 rounded">
                <p className="font-bold text-slate-900">{r.name}</p>
                <p className="text-slate-600 text-[11px]">{r.position}, {r.company}</p>
                {r.relationship && <p className="text-slate-500 italic text-[10px]">{r.relationship}</p>}
                {r.email && <p className="text-slate-600 text-[11px]">{r.email}</p>}
                {r.phone && <p className="text-slate-600 text-[11px]">{r.phone}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

