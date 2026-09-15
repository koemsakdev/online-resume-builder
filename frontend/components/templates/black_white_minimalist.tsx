"use client";

import { CVData } from "@/types/cv";
import { Globe, Languages, Mail, Phone, ExternalLink, Award, FolderGit2, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import imgUser from "@/assets/person.png";
import Image from "next/image";
import { formatSafeDate } from "@/lib/utils";

interface BlackWhiteMinimalistProps {
  resumeData: CVData;
  containerWidth: number;
}

const BlackWhiteMinimalist = ({
  resumeData,
  containerWidth,
}: BlackWhiteMinimalistProps) => {
  const scale = containerWidth > 0 && containerWidth !== 800 ? containerWidth / 800 : 1;

  const contact = resumeData.contact || {};
  const skills = resumeData.skills || [];
  const experience = resumeData.experience || [];
  const education = resumeData.education || [];
  const projects = resumeData.projects || [];
  const certifications = resumeData.certifications || [];
  const languages = resumeData.languages || [];
  const references = resumeData.references || [];

  return (
    <div
      className="flex bg-white text-slate-900 overflow-hidden w-[800px] min-h-[1131px]"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >  {/* Left Sidebar (Dark Accent) */}
      <div className="w-1/3 bg-slate-900 text-slate-100 px-6 py-8 flex flex-col space-y-6 shrink-0">
        
        {/* Profile Picture */}
        {(contact.profile || contact.profileImageUrl) && (
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 relative rounded-full overflow-hidden border-2 border-cyan-400 shadow-md">
              <Image
                src={contact.profile || contact.profileImageUrl || imgUser}
                alt={resumeData.name || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Contact Info */}
        <section className="space-y-3">
          <h2 className="uppercase text-xs tracking-widest font-bold text-cyan-400 border-b border-slate-700 pb-1">
            Contact
          </h2>
          <div className="space-y-2 text-xs text-slate-300">
            {contact.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail size={13} className="text-cyan-400 shrink-0" />
                <span>{contact.email}</span>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-cyan-400 shrink-0" />
                <span>{contact.phone}</span>
              </div>
            )}
            {(contact.location || contact.address) && (
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-cyan-400 shrink-0" />
                <span>{contact.location || contact.address}</span>
              </div>
            )}
            {(contact.website || contact.portfolio) && (
              <div className="flex items-center gap-2 break-all">
                <ExternalLink size={13} className="text-cyan-400 shrink-0" />
                <span>{contact.website || contact.portfolio}</span>
              </div>
            )}
          </div>
        </section>

        {/* HR Personal Details */}
        {(contact.dateOfBirth || contact.maritalStatus || contact.nationality || contact.visaStatus || contact.drivingLicense || contact.gender) && (
          <section className="space-y-3">
            <h2 className="uppercase text-xs tracking-widest font-bold text-cyan-400 border-b border-slate-700 pb-1">
              Personal Details
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              {contact.dateOfBirth && (
                <div>
                  <span className="text-[10px] uppercase text-cyan-300/80 block font-semibold">Date of Birth</span>
                  <span className="text-slate-200">{contact.dateOfBirth}</span>
                </div>
              )}
              {contact.maritalStatus && (
                <div>
                  <span className="text-[10px] uppercase text-cyan-300/80 block font-semibold">Marital Status</span>
                  <span className="text-slate-200">{contact.maritalStatus}</span>
                </div>
              )}
              {contact.nationality && (
                <div>
                  <span className="text-[10px] uppercase text-cyan-300/80 block font-semibold">Nationality</span>
                  <span className="text-slate-200">{contact.nationality}</span>
                </div>
              )}
              {contact.gender && (
                <div>
                  <span className="text-[10px] uppercase text-cyan-300/80 block font-semibold">Gender</span>
                  <span className="text-slate-200">{contact.gender}</span>
                </div>
              )}
              {contact.visaStatus && (
                <div>
                  <span className="text-[10px] uppercase text-cyan-300/80 block font-semibold">Work Authorization</span>
                  <span className="text-slate-200">{contact.visaStatus}</span>
                </div>
              )}
              {contact.drivingLicense && (
                <div>
                  <span className="text-[10px] uppercase text-cyan-300/80 block font-semibold">Driving License</span>
                  <span className="text-slate-200">{contact.drivingLicense}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-3">
            <h2 className="uppercase text-xs tracking-widest font-bold text-cyan-400 border-b border-slate-700 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="space-y-0.5">
                  <span className="text-[11px] text-cyan-300">
                    {formatSafeDate(edu.startDate)} - {formatSafeDate(edu.endDate)}
                  </span>
                  <p className="text-xs font-bold text-slate-100">{edu.degree}</p>
                  <p className="text-[11px] text-slate-300">{edu.university || edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-3">
            <h2 className="uppercase text-xs tracking-widest font-bold text-cyan-400 border-b border-slate-700 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-[11px] bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded-md"
                >
                  {skill.name || skill.skillName}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="space-y-3">
            <h2 className="uppercase text-xs tracking-widest font-bold text-cyan-400 border-b border-slate-700 pb-1 flex items-center gap-1.5">
              <Languages size={13} />
              Languages
            </h2>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <div key={index} className="text-xs flex justify-between">
                  <span className="text-slate-200">{lang.language}</span>
                  <span className="text-slate-400">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right Column (Main Body) */}
      <div className="w-2/3 px-8 py-8 space-y-6 bg-white text-slate-800">
        
        {/* Name, Title & Summary */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {resumeData.name || "Your Name"}
          </h1>
          <p className="text-sm font-semibold text-cyan-600 mt-1 uppercase tracking-wider">
            {resumeData.title || "Job Title"}
          </p>
          {resumeData.summary && (
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {resumeData.summary}
            </p>
          )}
        </div>

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">
                      {exp.title || exp.position}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      {formatSafeDate(exp.startDate)} - {formatSafeDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-cyan-600">
                    {exp.company || exp.companyName} {exp.location ? `• ${exp.location}` : ""}
                  </p>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5 pt-1">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
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
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <FolderGit2 size={14} className="text-cyan-500" />
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">
                      {proj.title}
                    </h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] text-cyan-600 hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] text-slate-500">
                      Tech: {proj.technologies.join(", ")}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-600">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Award size={14} className="text-purple-500" />
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert, index) => (
                <div key={index} className="text-xs space-y-0.5">
                  <p className="font-semibold text-slate-900">{cert.name}</p>
                  <p className="text-[11px] text-slate-500">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Users size={14} className="text-cyan-500" />
              References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {references.map((ref, index) => (
                <div key={index} className="space-y-1 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-900">{ref.name}</p>
                  <p className="text-slate-600 text-[11px] font-medium">
                    {ref.position} {ref.company ? `• ${ref.company}` : ""}
                  </p>
                  {ref.relationship && (
                    <p className="text-slate-500 text-[10px] italic">{ref.relationship}</p>
                  )}
                  <div className="flex flex-col gap-0.5 text-[11px] text-slate-500 pt-0.5">
                    {ref.email && <span>{ref.email}</span>}
                    {ref.phone && <span>{ref.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default BlackWhiteMinimalist;
