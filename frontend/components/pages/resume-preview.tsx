"use client";

import { CVData } from "@/types/cv";
import { ResumePreviewProps } from "@/types/editResumeType";
import React from "react";
import BlackWhiteMinimalist from "../templates/black_white_minimalist";
import ProfessionalMinimalist from "../templates/professionalMinimalList";
import ProfessionalModern from "../templates/professionalModern";
import WhiteSimpleCollegeAndFreshGraduate from "../templates/WhiteSimpleCollegeAndFreshGraduate";

const ResumePreview = ({
  templateName,
  resumeData,
  containerWidth,
}: ResumePreviewProps) => {
  switch (templateName) {
    case "black_white_minimalist":
      return (
        <BlackWhiteMinimalist
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "professional_minimalist":
      return (
        <ProfessionalMinimalist
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "professional_modern":
      return (
        <ProfessionalModern
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "white_simple_college_and_fresh_graduate":
      return (
        <WhiteSimpleCollegeAndFreshGraduate
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    default:
      return (
        <BlackWhiteMinimalist
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
  }
};

export default ResumePreview;
