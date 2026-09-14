"use client";

import { CVData } from "@/types/cv";
import { Globe, Languages, Mail, Phone, ExternalLink, Award, FolderGit2 } from "lucide-react";
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
  const resumeRef = useRef<HTMLDivElement>(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
    setBaseWidth(actualBaseWidth);
    if (containerWidth > 0 && actualBaseWidth > 0) {
      setScale(containerWidth / actualBaseWidth);
    }
  }, [containerWidth]);

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
      ref={resumeRef}
      className="flex bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-sm shadow-md overflow-hidden min-h-[950px]"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
      }}
    >
      {/* Left Sidebar (Dark Accent) */}
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
      <div className="w-2/3 px-8 py-8 space-y-6">
        
        {/* Name, Title & Summary */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {resumeData.name || "Your Name"}
          </h1>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-1 uppercase tracking-wider">
            {resumeData.title || "Job Title"}
          </p>
          {resumeData.summary && (
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              {resumeData.summary}
            </p>
          )}
        </div>

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {exp.title || exp.position}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {formatSafeDate(exp.startDate)} - {formatSafeDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                    {exp.company || exp.companyName} {exp.location ? `• ${exp.location}` : ""}
                  </p>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-0.5 pt-1">
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-1.5">
              <FolderGit2 size={14} className="text-cyan-500" />
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {proj.title}
                    </h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Tech: {proj.technologies.join(", ")}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300">
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-1.5">
              <Award size={14} className="text-purple-500" />
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert, index) => (
                <div key={index} className="text-xs space-y-0.5">
                  <p className="font-semibold text-slate-900 dark:text-white">{cert.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1">
              References
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {references.map((ref, index) => (
                <div key={index} className="space-y-0.5">
                  <p className="font-bold text-slate-900 dark:text-white">{ref.name}</p>
                  <p className="text-slate-600 dark:text-slate-400">{ref.position} - {ref.company}</p>
                  {ref.email && <p className="text-slate-500 text-[11px]">{ref.email}</p>}
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
