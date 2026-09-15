"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { formatSafeDate } from "@/lib/utils";
import Image from "next/image";
import { Scale } from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function LegalExecutive({ resumeData, containerWidth }: Props) {
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
      <div className="border-b-2 border-slate-900 pb-5 text-center space-y-2">
        {profileImg && (
          <div className="flex justify-center mb-1">
            <div className="size-20 rounded-full overflow-hidden border border-slate-700 shadow-xs">
              <Image
                src={profileImg}
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-center gap-2 text-slate-800">
          <Scale size={16} />
          <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-950">
            {resumeData.name || "Candidate Name, Esq."}
          </h1>
        </div>
        <p className="text-xs font-sans font-semibold tracking-widest text-slate-700 uppercase">
          {resumeData.title || "General Counsel & Corporate Governance Officer"}
        </p>

        {contactItems.length > 0 && (
          <p className="text-xs font-sans text-slate-600 pt-0.5">
            {contactItems.join("   •   ")}
          </p>
        )}
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <section className="space-y-1">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Executive Summary & Counsel Profile
          </h2>
          <p className="text-xs font-sans text-slate-700 leading-relaxed text-justify">
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Areas of Practice & Expertise */}
      {skills.length > 0 && (
        <section className="space-y-1">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Areas of Legal Practice & Regulatory Governance
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1 font-sans text-xs text-slate-800">
            {skills.map((s, idx) => (
              <span key={idx} className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-[11px]">
                {s.name || s.skillName}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Legal & Executive Experience */}
      {experience.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Legal & Corporate Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-950">
                    {exp.company || exp.companyName}
                    {exp.location ? `, ${exp.location}` : ""}
                  </span>
                  <span className="font-sans text-xs text-slate-600 font-medium">
                    {formatSafeDate(exp.startDate, "MMM yyyy")} – {formatSafeDate(exp.endDate, "MMM yyyy")}
                  </span>
                </div>
                <p className="font-sans text-xs italic text-slate-700 font-semibold">
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
        <section className="space-y-1.5">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
            Legal Education & Academic Credentials
          </h2>
          <div className="space-y-1.5 font-sans text-xs">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-950">{edu.degree}</span>
                  <span className="text-slate-700">, {edu.university || edu.institution}</span>
                </div>
                <span className="text-slate-600 font-medium">
                  {formatSafeDate(edu.startDate, "yyyy")} – {formatSafeDate(edu.endDate, "yyyy")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Significant Transactions & Matters */}
      {projects.length > 0 && (
        <section className="space-y-1.5 font-sans text-xs">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
            Significant Transactions & Matters
          </h2>
          <div className="space-y-1.5">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="font-bold text-slate-950">{proj.title}</span>
                {proj.description && <p className="text-slate-700 leading-normal">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bar Admissions & Certifications */}
      {certifications.length > 0 && (
        <section className="space-y-1 font-sans text-xs">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 text-xs">
            Bar Admissions & Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((c, idx) => (
              <p key={idx} className="text-slate-800">
                • <strong>{c.name}</strong> ({c.issuer})
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Languages & Personal Info */}
      {(languages.length > 0 || hasPersonalInfo) && (
        <div className="grid grid-cols-2 gap-6 font-sans text-xs pt-1 border-t border-slate-200">
          {languages.length > 0 && (
            <div>
              <p className="font-bold uppercase text-[11px] text-slate-900 mb-1">Languages</p>
              {languages.map((l, idx) => (
                <p key={idx} className="text-slate-700">{l.language}: {l.proficiency}</p>
              ))}
            </div>
          )}

          {hasPersonalInfo && (
            <div>
              <p className="font-bold uppercase text-[11px] text-slate-900 mb-1">Personal Details</p>
              {contact.nationality && <p className="text-slate-700">Nationality: {contact.nationality}</p>}
              {contact.visaStatus && <p className="text-slate-700">Work Auth: {contact.visaStatus}</p>}
              {contact.dateOfBirth && <p className="text-slate-700">DOB: {contact.dateOfBirth}</p>}
            </div>
          )}
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="font-sans text-xs border-t border-slate-200 pt-2 space-y-1">
          <h2 className="font-bold uppercase tracking-widest text-slate-900 text-[11px]">
            Professional & Board References
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {references.map((r, idx) => (
              <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded text-[11px]">
                <p className="font-bold text-slate-900">{r.name}</p>
                <p className="text-slate-600">{r.position}, {r.company}</p>
                {r.email && <p className="text-slate-600">{r.email}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

