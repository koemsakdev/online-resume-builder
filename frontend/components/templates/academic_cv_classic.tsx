"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { formatSafeDate } from "@/lib/utils";
import Image from "next/image";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function AcademicCvClassic({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] p-10 overflow-hidden font-serif space-y-5"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-800 pb-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-950 uppercase tracking-wide">
            {resumeData.name || "Scholar Name, Ph.D."}
          </h1>
          <p className="text-sm font-sans italic text-slate-700 font-semibold">
            {resumeData.title || "Postdoctoral Researcher / Assistant Professor"}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-slate-600 pt-1">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.location && <span>{contact.location}</span>}
            {contact.website && <span>{contact.website}</span>}
          </div>
        </div>

        {profileImg && (
          <div className="size-20 rounded-md overflow-hidden border border-slate-300 shrink-0">
            <Image
              src={profileImg}
              alt={resumeData.name || "Academic Profile"}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Research Statement / Summary */}
      {resumeData.summary && (
        <section className="space-y-1">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Research Interests & Profile
          </h2>
          <p className="text-xs font-sans text-slate-700 leading-relaxed text-justify">
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Education (Academic Standard: Prioritized near top) */}
      {education.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Education & Academic Credentials
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline font-sans text-xs">
                <div>
                  <span className="font-bold text-slate-950">{edu.degree}</span>
                  <span className="text-slate-700">, {edu.university || edu.institution}</span>
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

      {/* Academic & Research Appointments (Experience) */}
      {experience.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Academic & Research Appointments
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1 font-sans text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950 text-sm">
                    {exp.title || exp.position}
                  </span>
                  <span className="text-slate-600 font-medium">
                    {formatSafeDate(exp.startDate)} – {formatSafeDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-slate-700 italic font-medium">
                  {exp.company || exp.companyName} {exp.location ? `— ${exp.location}` : ""}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-slate-700 space-y-0.5 pt-0.5">
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

      {/* Publications / Research Projects */}
      {projects.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Publications & Working Research Projects
          </h2>
          <div className="space-y-2 font-sans text-xs">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-900 underline text-[11px]">
                      DOI / Link
                    </a>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-[11px] text-slate-500">
                    Methods / Stack: {proj.technologies.join(", ")}
                  </p>
                )}
                {proj.description && <p className="text-slate-700 leading-normal">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grants, Fellowships & Certifications */}
      {certifications.length > 0 && (
        <section className="space-y-1.5 font-sans text-xs">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
            Fellowships, Grants & Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((c, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className="font-bold text-slate-900">{c.name}</p>
                <p className="text-slate-600 text-[11px]">{c.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Methods */}
      {skills.length > 0 && (
        <section className="space-y-1 font-sans text-xs">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
            Methodological & Computational Expertise
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {skills.map((s) => s.name || s.skillName).join(" • ")}
          </p>
        </section>
      )}

      {/* Languages & Personal Info */}
      {(languages.length > 0 || hasPersonalInfo) && (
        <div className="grid grid-cols-2 gap-6 font-sans text-xs pt-1">
          {languages.length > 0 && (
            <div className="space-y-1">
              <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
                Languages
              </h2>
              <div className="space-y-0.5">
                {languages.map((l, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasPersonalInfo && (
            <div className="space-y-1">
              <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
                Biographical Details
              </h2>
              <div className="space-y-0.5 text-slate-600">
                {contact.nationality && <div>Nationality: {contact.nationality}</div>}
                {contact.visaStatus && <div>Visa/Auth: {contact.visaStatus}</div>}
                {contact.dateOfBirth && <div>DOB: {contact.dateOfBirth}</div>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Academic Referees / References */}
      {references.length > 0 && (
        <section className="space-y-2 font-sans text-xs pt-1">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
            Referees
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {references.map((r, idx) => (
              <div key={idx} className="space-y-0.5 p-2 bg-slate-50 border border-slate-200 rounded">
                <p className="font-bold text-slate-950">{r.name}</p>
                <p className="text-slate-700 text-[11px]">{r.position}, {r.company}</p>
                {r.relationship && <p className="text-slate-500 italic text-[10px]">{r.relationship}</p>}
                {r.email && <p className="text-blue-900 text-[11px]">{r.email}</p>}
                {r.phone && <p className="text-slate-600 text-[11px]">{r.phone}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

