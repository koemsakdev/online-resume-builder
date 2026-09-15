"use client";

import { CVData } from "@/types/cv";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatSafeDate } from "@/lib/utils";
import { Separator } from "../ui/separator";

import imgUser from "@/assets/person.png";
import { Globe, MailOpen, Smartphone } from "lucide-react";

interface WhiteSimpleCollegeAndFreshGraduateProps {
  resumeData: CVData;
  containerWidth: number;
}

const WhiteSimpleCollegeAndFreshGraduate = ({
  resumeData,
  containerWidth,
}: WhiteSimpleCollegeAndFreshGraduateProps) => {
  const scale = containerWidth > 0 && containerWidth !== 800 ? containerWidth / 800 : 1;

  return (
    <div
      className="flex flex-col bg-white text-slate-900 p-8 w-[800px] min-h-[1131px]"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      }}
    >
      {/* Header Profile Picture, Title, Name, and Summary */}
      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex items-center gap-x-5">
          {resumeData?.contact?.profile && (
            <div className="size-[120px]">
              <Image
                src={resumeData?.contact?.profile || imgUser}
                alt="profile"
                width={120}
                height={120}
                className="rounded-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          <div className="flex flex-col gap-2 text-gray-700 dark:text-slate-200 uppercase">
            <h2 className="text-6xl font-bold">{resumeData.name}</h2>
            <p className="text-2xl font-base">{resumeData.title}</p>
          </div>
        </div>
        <Separator className="mt-4" />
        <div className="px-5">
          <p className="text-base text-gray-600 dark:text-slate-400">
            {resumeData.summary}
          </p>
        </div>
        <Separator className="mb-4 mt-2" />
      </div>

      {/* Body: Contact, Work Experience, Education, Skill, Reference, and Language */}
      <div className="flex">
        {/* Left side */}
        <div className="w-1/2 px-4 py-4">
          {/* Contact */}
          <section className="mb-6 w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold px-3 py-1 bg-neutral-200 dark:bg-neutral-800 dark:text-slate-200 rounded-sm">
              Contact
            </h2>
            <div className="space-y-3 px-3 py-3">
              {resumeData.contact.phone && (
                <div className="flex gap-3 items-center text-base">
                  <Smartphone className="size-5" />
                  <span>{resumeData.contact.phone}</span>
                </div>
              )}
              {resumeData.contact.email && (
                <div className="flex gap-3 items-center text-base">
                  <MailOpen className="size-5" />
                  <span>{resumeData.contact.email}</span>
                </div>
              )}

              {resumeData.contact.location && (
                <div className="flex gap-3 items-center text-base">
                  <Globe className="size-5" />
                  <span>{resumeData.contact.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Personal Details */}
          {(resumeData.contact.dateOfBirth || resumeData.contact.maritalStatus || resumeData.contact.nationality || resumeData.contact.visaStatus || resumeData.contact.drivingLicense || resumeData.contact.gender) && (
            <section className="mb-6 w-full">
              <h2 className="uppercase text-xl tracking-wider font-extrabold px-3 py-1 bg-slate-100 text-slate-800 rounded-sm">
                Personal Details
              </h2>
              <div className="space-y-2 px-3 py-3 text-xs text-slate-700">
                {resumeData.contact.dateOfBirth && (
                  <div>
                    <span className="font-bold block text-[10px] uppercase text-gray-500">Date of Birth:</span>
                    <span>{resumeData.contact.dateOfBirth}</span>
                  </div>
                )}
                {resumeData.contact.maritalStatus && (
                  <div>
                    <span className="font-bold block text-[10px] uppercase text-gray-500">Marital Status:</span>
                    <span>{resumeData.contact.maritalStatus}</span>
                  </div>
                )}
                {resumeData.contact.nationality && (
                  <div>
                    <span className="font-bold block text-[10px] uppercase text-gray-500">Nationality:</span>
                    <span>{resumeData.contact.nationality}</span>
                  </div>
                )}
                {resumeData.contact.gender && (
                  <div>
                    <span className="font-bold block text-[10px] uppercase text-gray-500">Gender:</span>
                    <span>{resumeData.contact.gender}</span>
                  </div>
                )}
                {resumeData.contact.visaStatus && (
                  <div>
                    <span className="font-bold block text-[10px] uppercase text-gray-500">Work Authorization:</span>
                    <span>{resumeData.contact.visaStatus}</span>
                  </div>
                )}
                {resumeData.contact.drivingLicense && (
                  <div>
                    <span className="font-bold block text-[10px] uppercase text-gray-500">Driving License:</span>
                    <span>{resumeData.contact.drivingLicense}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Education */}
          <section className="mb-6 w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold px-3 py-1 bg-slate-100 text-slate-800 rounded-sm">
              Education
            </h2>
            <div className="space-y-3 px-3 py-3">
              <div className="flex flex-wrap gap-3">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-lg font-bold text-slate-800">
                      {edu.university}
                    </span>
                    <span className="text-base text-slate-600 font-bold">
                      {edu.degree}
                    </span>
                    <span className="text-sm text-slate-700">
                      {formatSafeDate(edu.startDate, "yyyy")} -{" "}
                      {formatSafeDate(edu.endDate, "yyyy")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6 w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold px-3 py-1 bg-slate-100 text-slate-800 rounded-sm">
              Skills
            </h2>
            <div className="px-2 py-3">
              <ul className="list-disc list-outside ml-5 text-slate-700 space-y-1">
                {resumeData.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-slate-700 text-sm"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
        {/* Right side*/}
        <div className="w-2/3 px-4 py-4">
          {/* Experience */}
          <section className="w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold px-3 py-1 bg-slate-100 text-slate-800 rounded-sm">
              Experience
            </h2>
            <div className="px-2 mt-2">
              <div className="relative border-l-2 border-slate-300">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-10 relative">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-1 border-white z-10"></div>
                    <div className="flex flex-col gap-y-1 ml-6">
                      <span className="text-lg mt-[-7px] font-semibold text-slate-800">
                        {exp.title}
                      </span>
                      <div className="flex items-center justify-between">
                        <div className="text-base text-slate-600">
                          <span>{exp.company}</span>
                        </div>
                        <div className="text-sm text-slate-500">
                          {formatSafeDate(exp.startDate, "yyyy")} - {formatSafeDate(exp.endDate, "yyyy")}
                        </div>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-sm text-slate-600 space-y-1">
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
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Language  */}
      {resumeData.languages && resumeData.languages.length > 0 && (
        <div className="px-5">
          <div className="flex flex-col w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold px-3 py-1">
              Languages
            </h2>
            <div className="space-y-3 px-3 py-3">
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-base mb-1">
                    <span className="text-base">{lang.language}</span>
                    <span className="text-base">{lang.proficiency}</span>
                  </div>
                  <div className="w-full bg-gray-700 dark:bg-gray-900 rounded-full h-1.5">
                    <div
                      className="bg-slate-400 dark:bg-slate-700 h-1.5 rounded-full"
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
            </div>
          </div>
        </div>
      )}
      {/* Footer Reference  */}
      <div className="flex flex-col w-full">
        <Separator className="my-4" />
        <div className="px-5">
          {/* References - Hidden by default, shown on request */}
          {resumeData.references && resumeData.references.length > 0 && (
            <section className="w-full">
              <h2 className="uppercase text-xl tracking-wider font-extrabold px-3 py-1">
                References
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-2 lg:text-left gap-4 px-2 py-3">
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

export default WhiteSimpleCollegeAndFreshGraduate;
