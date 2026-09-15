"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { formatSafeDate } from "@/lib/utils";
import Image from "next/image";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function SwissInternational({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-black w-[800px] min-h-[1131px] p-10 overflow-hidden font-sans space-y-6"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Heavy Black Header Bar */}
      <div className="border-b-4 border-black pb-6 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
              {resumeData.name || "FIRSTNAME LASTNAME"}
            </h1>
            <p className="text-sm font-bold tracking-tight text-neutral-600 uppercase">
              {resumeData.title || "CREATIVE DIRECTOR & SYSTEMS DESIGNER"}
            </p>
          </div>

          {profileImg && (
            <div className="size-20 grayscale contrast-125 border-2 border-black overflow-hidden shrink-0">
              <Image
                src={profileImg}
                alt="Portrait"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-4 gap-2 text-xs font-mono text-neutral-800 pt-2 border-t border-black">
          {contact.email && <div>MAIL: {contact.email}</div>}
          {contact.phone && <div>TEL: {contact.phone}</div>}
          {contact.location && <div>LOC: {contact.location}</div>}
          {contact.website && <div>WEB: {contact.website}</div>}
        </div>
      </div>

      {/* Summary Row */}
      {resumeData.summary && (
        <div className="grid grid-cols-4 gap-6 border-b border-black pb-4 text-xs">
          <div className="font-bold uppercase tracking-wider text-black">
            01 / PROFILE
          </div>
          <div className="col-span-3 text-neutral-800 leading-relaxed font-normal">
            {resumeData.summary}
          </div>
        </div>
      )}

      {/* Experience Row */}
      {experience.length > 0 && (
        <div className="grid grid-cols-4 gap-6 border-b border-black pb-5 text-xs">
          <div className="font-bold uppercase tracking-wider text-black">
            02 / EXPERIENCE
          </div>
          <div className="col-span-3 space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-black">
                    {exp.title || exp.position} — {exp.company || exp.companyName}
                  </span>
                  <span className="font-mono text-xs text-neutral-600">
                    {formatSafeDate(exp.startDate)} – {formatSafeDate(exp.endDate)}
                  </span>
                </div>
                {exp.location && <p className="text-neutral-500 font-mono text-[11px]">{exp.location}</p>}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-neutral-800 space-y-1 pt-1 leading-normal">
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

      {/* Projects Row */}
      {projects.length > 0 && (
        <div className="grid grid-cols-4 gap-6 border-b border-black pb-4 text-xs">
          <div className="font-bold uppercase tracking-wider text-black">
            03 / PROJECTS
          </div>
          <div className="col-span-3 space-y-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-black">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="font-mono text-[11px] underline">
                      {proj.link}
                    </a>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="font-mono text-[10px] text-neutral-600">
                    [{proj.technologies.join(", ")}]
                  </p>
                )}
                {proj.description && <p className="text-neutral-800 leading-normal">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Row */}
      {education.length > 0 && (
        <div className="grid grid-cols-4 gap-6 border-b border-black pb-4 text-xs">
          <div className="font-bold uppercase tracking-wider text-black">
            04 / EDUCATION
          </div>
          <div className="col-span-3 space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-black">{edu.degree}</span>
                  <span className="text-neutral-700">, {edu.university || edu.institution}</span>
                </div>
                <span className="font-mono text-neutral-600">
                  {formatSafeDate(edu.startDate, "yyyy")} – {formatSafeDate(edu.endDate, "yyyy")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Capabilities Row */}
      {skills.length > 0 && (
        <div className="grid grid-cols-4 gap-6 border-b border-black pb-4 text-xs">
          <div className="font-bold uppercase tracking-wider text-black">
            05 / EXPERTISE
          </div>
          <div className="col-span-3 flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span key={idx} className="border border-black px-2 py-0.5 font-mono text-[11px]">
                {s.name || s.skillName}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications, Languages, HR, References Row */}
      <div className="grid grid-cols-4 gap-6 text-xs pt-1">
        <div className="font-bold uppercase tracking-wider text-black">
          06 / DETAILS
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-4">
          {certifications.length > 0 && (
            <div>
              <p className="font-bold uppercase text-[11px] mb-1">Certifications</p>
              {certifications.map((c, idx) => (
                <p key={idx} className="text-neutral-700">{c.name} ({c.issuer})</p>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <p className="font-bold uppercase text-[11px] mb-1">Languages</p>
              {languages.map((l, idx) => (
                <p key={idx} className="text-neutral-700">{l.language}: {l.proficiency}</p>
              ))}
            </div>
          )}

          {hasPersonalInfo && (
            <div>
              <p className="font-bold uppercase text-[11px] mb-1">Personal Info</p>
              {contact.nationality && <p className="text-neutral-700">Nationality: {contact.nationality}</p>}
              {contact.visaStatus && <p className="text-neutral-700">Visa: {contact.visaStatus}</p>}
              {contact.dateOfBirth && <p className="text-neutral-700">DOB: {contact.dateOfBirth}</p>}
            </div>
          )}

          {references.length > 0 && (
            <div>
              <p className="font-bold uppercase text-[11px] mb-1">References</p>
              {references.map((r, idx) => (
                <p key={idx} className="text-neutral-700">{r.name} — {r.position}, {r.company}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

