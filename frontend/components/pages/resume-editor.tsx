"use client";
import React, { useEffect, useRef, useState } from "react";
import InputTitle from "../inputs/inputTitle";
import { CVData } from "@/types/cv";
import { useParams } from "next/navigation";
import NavbarLayout from "../layouts/navbar-layout";

const ResumeEditor = () => {
  const { resumeId }: { resumeId: string } = useParams();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const baseWidth = useState(800);
  const [openThemSelector, setOpenThemSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState<CVData>({
    name: "",
    title: "",
    thumnailLink: "",
    contact: {
      profile: "",
      email: "",
      phone: "",
      portfolio: "",
      location: "",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    languages: [],
    interests: [],
    references: [],
  });

  const updateBaseWidth = () => { };
  const fetchResumeData = async (id: string) => { };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeData(resumeId);
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);
  return (
    <NavbarLayout>

      <div className="container mx-auto py-10">
        <div className="flex items-center justify-betweengap-5 py-2 px-4 mb-4 rounded-md bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <InputTitle
            title={resumeData.title}
            setTitle={(title) => setResumeData((prev) => ({ ...prev, title }))}
          />
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ResumeEditor;
