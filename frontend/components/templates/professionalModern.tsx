"use client";

import { CVData } from "@/types/cv";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import imgUser from "@/assets/person.png";
import { formatSafeDate } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Mail, MapPinned, Phone } from "lucide-react";

interface ProfessionalModernProps {
  resumeData: CVData;
  containerWidth: number;
}
const ProfessionalModern = ({
  resumeData,
  containerWidth,
}: ProfessionalModernProps) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scal, setScal] = useState(1);

  useEffect(() => {
    const actualBaseWidth = (resumeRef.current as unknown as HTMLDivElement)
      ?.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScal(containerWidth / actualBaseWidth);
  }, [containerWidth]);
  return (
    <div
      ref={resumeRef}
      className="flex border rounded-sm"
      style={{
        transform: containerWidth > 0 ? `scale(${scal})` : `none`,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : `auto`,
        height: "auto",
      }}
    >
      <div className="w-1/2 px-4 py-4">
        {/* Profile */}
        <div className="flex flex-col items-center px-4 py-8 border rounded-2xl">
          {resumeData?.contact?.profile && (
            <div className="size-[168px]">
              <Image
                src={resumeData?.contact?.profile || imgUser}
                alt="profile"
                width={168}
                height={168}
                className="rounded-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          <h2 className="text-3xl font-light text-gray-700 dark:text-slate-200 border-gray-300 py-3 text-center">
            {resumeData.name}
          </h2>
          <p className="text-md font-light text-gray-600 dark:text-slate-300 text-center">
            {resumeData.title}
          </p>
        </div>

        <div className="flex flex-col items-center px-4 py-8 border rounded-2xl mt-5">
          {/* Contact */}
          <section className="mb-6 w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold text-center">
              Contacts
            </h2>
            <Separator className="my-4 p-0.5" />
            <div className="space-y-2">
              {resumeData.contact.email && (
                <div className="flex gap-2 items-center text-sm">
                  <Mail className="size-4" />
                  <span>{resumeData.contact.email}</span>
                </div>
              )}
              {resumeData.contact.phone && (
                <div className="flex gap-2 items-center text-sm">
                  <Phone className="size-4" />
                  <span>{resumeData.contact.phone}</span>
                </div>
              )}

              {resumeData.contact.location && (
                <div className="flex gap-2 items-center text-sm">
                  <MapPinned className="size-4" />
                  <span>{resumeData.contact.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Personal Details */}
          {(resumeData.contact.dateOfBirth || resumeData.contact.maritalStatus || resumeData.contact.nationality || resumeData.contact.visaStatus || resumeData.contact.drivingLicense || resumeData.contact.gender) && (
            <section className="mb-6 w-full">
              <h2 className="uppercase text-xl tracking-wider font-extrabold text-center">
                Personal Details
              </h2>
              <Separator className="my-4 p-0.5" />
              <div className="space-y-2 text-xs text-gray-600 dark:text-slate-400">
                {resumeData.contact.dateOfBirth && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 dark:text-slate-300 block">Date of Birth</span>
                    <span>{resumeData.contact.dateOfBirth}</span>
                  </div>
                )}
                {resumeData.contact.maritalStatus && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 dark:text-slate-300 block">Marital Status</span>
                    <span>{resumeData.contact.maritalStatus}</span>
                  </div>
                )}
                {resumeData.contact.nationality && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 dark:text-slate-300 block">Nationality</span>
                    <span>{resumeData.contact.nationality}</span>
                  </div>
                )}
                {resumeData.contact.gender && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 dark:text-slate-300 block">Gender</span>
                    <span>{resumeData.contact.gender}</span>
                  </div>
                )}
                {resumeData.contact.visaStatus && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 dark:text-slate-300 block">Work Authorization</span>
                    <span>{resumeData.contact.visaStatus}</span>
                  </div>
                )}
                {resumeData.contact.drivingLicense && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 dark:text-slate-300 block">Driving License</span>
                    <span>{resumeData.contact.drivingLicense}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* About me */}
          <section className="mb-6 w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold text-center">
              About Me
            </h2>
            <Separator className="my-4 p-0.5" />
            <p className="text-sm text-gray-600 dark:text-slate-400">
              {resumeData.summary}
            </p>
          </section>

          {/* Skills */}
          <section className="mb-6 w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold text-center">
              Skills
            </h2>
            <Separator className="my-4 p-0.5" />
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
            <section className="mb-6 w-full">
              <h2 className="uppercase text-lg tracking-wider font-extrabold mb-3">
                Languages
              </h2>
              <Separator className="my-4 p-0.5" />
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-xs">{lang.language}</span>
                    <span className="text-xs">{lang.proficiency}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-blue-400 dark:bg-sky-700 h-1.5 rounded-full"
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
        </div>
      </div>

      <div className="w-2/3 px-4 py-4">
        {/* Education */}
        <div className="flex flex-col items-center py-11">
          <section className="mb-6 w-full">
            <h2 className="uppercase text-xl tracking-wider font-extrabold text-center">
              Education
            </h2>
            <Separator className="my-4 p-0.5" />
            <div className="relative border-l-2 border-slate-300 dark:border-slate-600">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-5 relative">
                  <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-1 border-white dark:border-slate-800 z-10"></div>

                  <div className="flex flex-col gap-y-1 ml-6">
                    <span className="text-lg mt-[-7px] font-semibold text-slate-800 dark:text-slate-200">
                      {edu.degree}
                    </span>
                    <div className="flex justify-between items-center">
                      <div className="text-base text-slate-600 dark:text-slate-300">
                        <span>{edu.university}</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {formatSafeDate(edu.startDate, "yyyy")} - {formatSafeDate(edu.endDate, "yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col items-center px-4 py-8 mt-6">
          {/* Experience */}
          <div className="flex flex-col items-center">
            <section className="w-full">
              <h2 className="uppercase text-xl tracking-wider font-extrabold text-center">
                Experience
              </h2>
              <Separator className="my-4 p-0.5" />
              <div className="relative border-l-2 border-slate-300 dark:border-slate-600">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-10 relative">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-1 border-white dark:border-slate-800 z-10"></div>

                    <div className="flex flex-col gap-y-1 ml-6">
                      <span className="text-lg mt-[-7px] font-semibold text-slate-800 dark:text-slate-200">
                        {exp.title}
                      </span>
                      <div className="flex items-center justify-between">
                        <div className="text-base text-slate-600 dark:text-slate-300">
                          <span>{exp.company}</span>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {formatSafeDate(exp.startDate, "yyyy")} - {formatSafeDate(exp.endDate, "yyyy")}
                        </div>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-sm text-gray-600 dark:text-slate-200 space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="text-gray-700 dark:text-slate-300 text-sm"
                          >
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* References - Hidden by default, shown on request */}
          {resumeData.references && resumeData.references.length > 0 && (
            <section className="mb-6 w-full">
              <h2 className="uppercase text-xl tracking-wider font-extrabold text-center">
                References
              </h2>
              <Separator className="my-4 p-0.5" />
              <div className="grid grid-cols-2 lg:grid-cols-2 lg:text-left gap-4">
                {resumeData.references.map((ref, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-extrabold text-lg text-gray-900 dark:text-slate-200">
                      {ref.company}
                    </h3>
                    <h3 className="text-base text-gray-800 dark:text-slate-200 mb-1">
                      {ref.name} / {ref.position}
                    </h3>
                    {ref.relationship && (
                      <p className="text-xs text-gray-500 dark:text-slate-400 italic mb-1.5">
                        {ref.relationship}
                      </p>
                    )}
                    <p className="text-sm">
                      <strong>Phone: </strong>{" "}
                      <span className="text-gray-600 dark:text-slate-400">
                        {ref.phone}
                      </span>
                    </p>
                    <p className="text-sm">
                      <strong>Email: </strong>{" "}
                      <span className="text-gray-600 dark:text-slate-400">
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

export default ProfessionalModern;
