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
  Award,
  Languages,
  Users,
  Briefcase,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function HealthcareMedical({ resumeData, containerWidth }: Props) {
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
      className="bg-white text-slate-900 w-[800px] min-h-[1131px] p-8 overflow-hidden font-sans space-y-5"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Clinical Header */}
      <div className="flex items-center justify-between border-b-2 border-teal-700 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-teal-700">
            <HeartPulse size={16} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Clinical Curriculum Vitae</span>
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-900">
            {resumeData.name || "Dr. Medical Professional, MD"}
          </h1>
          <p className="text-sm font-semibold text-teal-800 uppercase">
            {resumeData.title || "Physician & Clinical Specialist"}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
            {contact.email && <span className="flex items-center gap-1"><Mail size={12} className="text-teal-700" /> {contact.email}</span>}
            {contact.phone && <span className="flex items-center gap-1"><Phone size={12} className="text-teal-700" /> {contact.phone}</span>}
            {contact.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-teal-700" /> {contact.location}</span>}
            {contact.website && <span className="flex items-center gap-1"><Globe size={12} className="text-teal-700" /> {contact.website}</span>}
          </div>
        </div>

        {profileImg && (
          <div className="size-20 rounded-full overflow-hidden border-2 border-teal-600 shrink-0">
            <Image
              src={profileImg}
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Profile / Summary */}
      {resumeData.summary && (
        <section className="space-y-1 bg-teal-50/50 p-3.5 rounded-lg border border-teal-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-teal-700" />
            Clinical Practice & Specialization
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {resumeData.summary}
          </p>
        </section>
      )}

      {/* Clinical Appointments & Experience */}
      {experience.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-0.5 flex items-center gap-1.5">
            <Briefcase size={13} className="text-teal-700" />
            Clinical Appointments & Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1 pl-3 border-l-2 border-teal-600">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">
                    {exp.title || exp.position} — <span className="font-semibold text-slate-700">{exp.company || exp.companyName}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-teal-800">
                    {formatSafeDate(exp.startDate)} – {formatSafeDate(exp.endDate)}
                  </span>
                </div>
                {exp.location && <p className="text-slate-500 text-[11px]">{exp.location}</p>}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-0.5 pt-0.5">
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

      {/* Education, Residency & Fellowships */}
      {education.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-0.5 flex items-center gap-1.5">
            <GraduationCap size={13} className="text-teal-700" />
            Medical Education, Residency & Fellowships
          </h2>
          <div className="space-y-1.5">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-600"> — {edu.university || edu.institution}</span>
                </div>
                <span className="text-[11px] text-teal-800 font-semibold">
                  {formatSafeDate(edu.startDate, "yyyy")} – {formatSafeDate(edu.endDate, "yyyy")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Clinical Skills & Procedures */}
      {skills.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-0.5">
            Clinical Competencies & Procedures
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-teal-50 text-teal-900 border border-teal-200 px-2 py-0.5 rounded"
              >
                {s.name || s.skillName}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Medical Licenses */}
      {certifications.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-0.5 flex items-center gap-1.5">
            <Award size={13} className="text-teal-700" />
            Board Certifications & Licensure
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {certifications.map((c, idx) => (
              <div key={idx} className="p-1.5 bg-slate-50 border border-slate-200 rounded">
                <p className="font-bold text-slate-900">{c.name}</p>
                <p className="text-slate-600 text-[11px]">{c.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Research & Clinical Trials */}
      {projects.length > 0 && (
        <section className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 border-b border-teal-200 pb-0.5">
            Clinical Trials & Research Publications
          </h2>
          <div className="space-y-1.5 text-xs">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-teal-700 underline text-[10px]">
                      Publication Link
                    </a>
                  )}
                </div>
                {proj.description && <p className="text-slate-600 text-[11px]">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Grid: Languages, Personal & References */}
      <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-2 text-xs">
        <div className="space-y-2">
          {languages.length > 0 && (
            <div>
              <p className="font-bold uppercase text-[11px] text-slate-900 mb-1">Languages</p>
              {languages.map((l, idx) => (
                <p key={idx} className="text-slate-700">
                  {l.language}: <span className="text-slate-500">{l.proficiency}</span>
                </p>
              ))}
            </div>
          )}

          {hasPersonalInfo && (
            <div>
              <p className="font-bold uppercase text-[11px] text-slate-900 mb-1">Personal Info</p>
              {contact.nationality && <p className="text-slate-600">Nationality: {contact.nationality}</p>}
              {contact.visaStatus && <p className="text-slate-600">Visa: {contact.visaStatus}</p>}
              {contact.dateOfBirth && <p className="text-slate-600">DOB: {contact.dateOfBirth}</p>}
            </div>
          )}
        </div>

        {references.length > 0 && (
          <div>
            <p className="font-bold uppercase text-[11px] text-slate-900 mb-1 flex items-center gap-1">
              <Users size={12} className="text-teal-700" />
              Clinical References
            </p>
            <div className="space-y-1">
              {references.map((r, idx) => (
                <div key={idx} className="p-1.5 bg-slate-50 border border-slate-200 rounded text-[11px]">
                  <p className="font-bold text-slate-900">{r.name}</p>
                  <p className="text-slate-600">{r.position}, {r.company}</p>
                  {r.email && <p className="text-teal-800 text-[10px]">{r.email}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

