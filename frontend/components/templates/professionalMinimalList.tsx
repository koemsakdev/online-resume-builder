"use client";

import { CVData } from "@/types/cv";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import imgUser from "@/assets/person.png";
import { Globe, Inbox, PhoneCall } from "lucide-react";
import { Separator } from "../ui/separator";
import { formatSafeDate } from "@/lib/utils";

interface ProfessionalMinimalistProps {
  resumeData: CVData;
  containerWidth: number;
}

const ProfessionalMinimalist = ({
  resumeData,
  containerWidth,
}: ProfessionalMinimalistProps) => {
  const scale = containerWidth > 0 && containerWidth !== 800 ? containerWidth / 800 : 1;

  return (
    <div
      className="bg-white text-slate-800 p-8 w-[800px] min-h-[1131px]"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Contact Information */}
      <div className="w-full flex">
        <div className="w-1/3 px-4">
          {resumeData?.contact?.profile && (
            <div className="size-[180px]">
              <Image
                src={resumeData?.contact?.profile || imgUser}
                alt="profile"
                width={180}
                height={180}
                className="rounded-full object-cover border-8 border-slate-300 shadow-lg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>

        <div className="w-2/3 px-4 space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold uppercase">{resumeData.name}</h2>
            <h2 className="text-xl font-light">{resumeData.title}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {resumeData.contact.email && (
                <div className="flex items-center gap-x-2">
                  <div className="bg-slate-600 dark:bg-slate-700 text-white dark:text-slate-200 p-1 rounded-sm">
                    <Inbox className="size-4" />
                  </div>
                  <span className="text-sm">{resumeData.contact.email}</span>
                </div>
              )}
            </div>
            <div>
              {resumeData.contact.phone && (
                <div className="flex items-center gap-x-2">
                  <div className="bg-slate-600 dark:bg-slate-700 text-white dark:text-slate-200 p-1 rounded-sm">
                    <PhoneCall className="size-4" />
                  </div>
                  <span className="text-sm">{resumeData.contact.phone}</span>
                </div>
              )}
            </div>
            <div className="col-span-2">
              {resumeData.contact.location && (
                <div className="flex items-center gap-x-2">
                  <div className="bg-slate-600 dark:bg-slate-700 text-white dark:text-slate-200 p-1 rounded-sm">
                    <Globe className="size-4" />
                  </div>
                  <span className="text-sm">{resumeData.contact.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <div className="flex">
        <div className="w-1/3 px-4 py-4 border-r">
          {/* Education */}
          <section className="mb-6">
            <h2 className="uppercase text-xl tracking-wider font-extrabold mb-3">
              Education
            </h2>
            <div className="flex flex-wrap gap-3">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {edu.degree}
                  </span>
                  <span className="text-base text-slate-600 font-bold dark:text-slate-200">
                    {edu.university}
                  </span>
                  <span className="text-sm text-slate-800 dark:text-slate-200">
                    {formatSafeDate(edu.startDate, "MMM yyyy")} -{" "}
                    {formatSafeDate(edu.endDate, "MMM yyyy")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="uppercase text-lg tracking-wider font-extrabold mb-3">
              Skills
            </h2>
            <ul className="list-disc list-outside ml-5 text-gray-600 dark:text-slate-200 space-y-1">
              {resumeData.skills.map((skill, index) => (
                <li
                  key={index}
                  className="text-gray-600 dark:text-slate-400 text-sm"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>

          {/* Languages */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <section className="mb-6">
              <h2 className="uppercase text-lg tracking-wider font-extrabold mb-3">
                Languages
              </h2>
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-xs">{lang.language}</span>
                    <span className="text-xs">{lang.proficiency}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-blue-400 dark:bg-sky-700 h-1 rounded-full"
                      style={{
                        width:
                          lang.proficiency === "Native"
                            ? "100%"
                            : lang.proficiency === "Fluent"
                            ? "90%"
                            : lang.proficiency === "Advanced"
                            ? "75%"
                            : lang.proficiency === "Intermediate"
                            ? "50%"
                            : "25%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Personal Details */}
          {(resumeData.contact.dateOfBirth || resumeData.contact.maritalStatus || resumeData.contact.nationality || resumeData.contact.visaStatus || resumeData.contact.drivingLicense || resumeData.contact.gender) && (
            <section className="mb-6">
              <h2 className="uppercase text-lg tracking-wider font-extrabold mb-3 text-slate-800">
                Personal Info
              </h2>
              <div className="space-y-2 text-xs text-slate-600">
                {resumeData.contact.dateOfBirth && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[10px] uppercase">Date of Birth</span>
                    <span>{resumeData.contact.dateOfBirth}</span>
                  </div>
                )}
                {resumeData.contact.maritalStatus && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[10px] uppercase">Marital Status</span>
                    <span>{resumeData.contact.maritalStatus}</span>
                  </div>
                )}
                {resumeData.contact.nationality && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[10px] uppercase">Nationality</span>
                    <span>{resumeData.contact.nationality}</span>
                  </div>
                )}
                {resumeData.contact.gender && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[10px] uppercase">Gender</span>
                    <span>{resumeData.contact.gender}</span>
                  </div>
                )}
                {resumeData.contact.visaStatus && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[10px] uppercase">Work Authorization</span>
                    <span>{resumeData.contact.visaStatus}</span>
                  </div>
                )}
                {resumeData.contact.drivingLicense && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[10px] uppercase">Driving License</span>
                    <span>{resumeData.contact.drivingLicense}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
        <div className="w-2/3 px-6 py-4">
          {/* Summary */}
          <section className="mb-6">
            <h2 className="uppercase text-xl tracking-wider font-extrabold mb-3 text-slate-800">
              Profile
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {resumeData.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="uppercase text-xl tracking-wider font-extrabold mb-3 text-slate-800">
              Work Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-lg">
                  <p className="font-bold text-slate-900 mb-1">
                    {exp.company}
                  </p>
                  <span className="font-bold text-slate-700 text-sm">
                    {formatSafeDate(exp.startDate, "yyyy")} -{" "}
                    {formatSafeDate(exp.endDate, "yyyy")}
                  </span>
                </div>
                <h3 className="text-slate-700 text-sm font-semibold">
                  {exp.title}
                </h3>
                <ul className="list-disc list-outside ml-5 text-sm text-slate-600 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="text-slate-700 text-sm"
                    >
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* References - Hidden by default, shown on request */}
          {resumeData.references && resumeData.references.length > 0 && (
            <section className="mb-6">
              <h2 className="uppercase text-xl tracking-wider font-extrabold mb-3 text-slate-800">
                References
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-2 lg:text-left gap-4">
                {resumeData.references.map((ref, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      {ref.company}
                    </h3>
                    <h3 className="text-base text-slate-800 mb-1">
                      {ref.name} / {ref.position}
                    </h3>
                    {ref.relationship && (
                      <p className="text-xs text-slate-500 italic mb-1.5">
                        {ref.relationship}
                      </p>
                    )}
                    <p className="text-sm">
                      <strong className="text-slate-800">Phone: </strong>{" "}
                      <span className="text-slate-600">
                        {ref.phone}
                      </span>
                    </p>
                    <p className="text-sm">
                      <strong className="text-slate-800">Email: </strong>{" "}
                      <span className="text-slate-600">
                        {ref.email}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMinimalist;
