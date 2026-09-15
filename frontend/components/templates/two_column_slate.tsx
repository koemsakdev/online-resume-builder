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
  FolderGit2,
} from "lucide-react";

interface Props {
  resumeData: CVData;
  containerWidth: number;
}

export default function TwoColumnSlate({ resumeData, containerWidth }: Props) {
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
      {/* Left Column (Slate Sidebar) */}
      <div className="w-[280px] bg-slate-100/90 text-slate-800 p-6 space-y-6 shrink-0 border-r border-slate-200">
        {/* Avatar */}
        {profileImg && (
          <div className="flex justify-center">
            <div className="size-24 rounded-full overflow-hidden border-2 border-slate-300 shadow-sm bg-white">
              <Image
                src={profileImg}
                alt="Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2.5 text-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
            Contact
          </h2>
          <div className="space-y-2 text-slate-600">
            {contact.email && (
              <p className="flex items-center gap-2 break-all">
                <Mail size={12} className="text-slate-500 shrink-0" />
                {contact.email}
              </p>
            )}
            {contact.phone && (
              <p className="flex items-center gap-2">
                <Phone size={12} className="text-slate-500 shrink-0" />
                {contact.phone}
              </p>
            )}
            {contact.location && (
              <p className="flex items-center gap-2">
                <MapPin size={12} className="text-slate-500 shrink-0" />
                {contact.location}
              </p>
            )}
            {contact.website && (
              <p className="flex items-center gap-2 break-all">
                <Globe size={12} className="text-slate-500 shrink-0" />
                {contact.website}
              </p>
            )}
            {contact.linkedin && (
              <p className="flex items-center gap-2 break-all">
                <Linkedin size={12} className="text-slate-500 shrink-0" />
                {contact.linkedin}
              </p>
            )}
            {contact.github && (
              <p className="flex items-center gap-2 break-all">
                <Github size={12} className="text-slate-500 shrink-0" />
                {contact.github}
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium bg-white text-slate-800 border border-slate-300 px-2 py-0.5 rounded shadow-2xs"
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
              <GraduationCap size={13} className="text-slate-600" />
              Education
            </h2>
            <div className="space-y-2.5 text-xs">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <p className="font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-slate-600 text-[11px]">{edu.university || edu.institution}</p>
                  <p className="text-[10px] text-slate-500">
                    {formatSafeDate(edu.startDate)} - {formatSafeDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
              <Languages size={13} className="text-slate-600" />
              Languages
            </h2>
            <div className="space-y-1 text-xs">
              {languages.map((l, idx) => (
                <div key={idx} className="flex justify-between text-slate-700">
                  <span>{l.language}</span>
                  <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Details */}
        {hasPersonalInfo && (
          <div className="space-y-1.5 text-xs text-slate-600">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Personal Info
            </h2>
            {contact.dateOfBirth && <p>DOB: {contact.dateOfBirth}</p>}
            {contact.nationality && <p>Nationality: {contact.nationality}</p>}
            {contact.maritalStatus && <p>Status: {contact.maritalStatus}</p>}
            {contact.gender && <p>Gender: {contact.gender}</p>}
            {contact.visaStatus && <p>Visa: {contact.visaStatus}</p>}
            {contact.drivingLicense && <p>License: {contact.drivingLicense}</p>}
          </div>
        )}
      </div>

      {/* Right Column (Main) */}
      <div className="flex-1 p-8 space-y-6 bg-white">
        {/* Name & Title */}
        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {resumeData.name || "Candidate Name"}
          </h1>
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
            {resumeData.title || "Senior Professional"}
          </p>
        </div>

        {/* Profile Summary */}
        {resumeData.summary && (
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Professional Profile
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {resumeData.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Briefcase size={13} className="text-slate-600" />
              Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 pl-4 border-l-2 border-slate-400">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-slate-900">
                      {exp.title || exp.position}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-600">
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
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <FolderGit2 size={13} className="text-slate-600" />
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] text-blue-600 hover:underline">
                        Project Link
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[10px] text-slate-500 font-medium">
                      {proj.technologies.join(" • ")}
                    </p>
                  )}
                  {proj.description && <p className="text-xs text-slate-600">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Award size={13} className="text-slate-600" />
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {certifications.map((c, idx) => (
                <div key={idx}>
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-slate-500 text-[11px]">{c.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div className="space-y-2 border-t border-slate-200 pt-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Users size={13} className="text-slate-600" />
              References
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {references.map((r, idx) => (
                <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900">{r.name}</p>
                  <p className="text-slate-600 text-[11px]">{r.position} • {r.company}</p>
                  {r.email && <p className="text-slate-600 text-[11px]">{r.email}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

