"use client";

import { CVData } from "@/types/cv";
import { ResumePreviewProps } from "@/types/editResumeType";
import React from "react";
import BlackWhiteMinimalist from "../templates/black_white_minimalist";
import ProfessionalMinimalist from "../templates/professionalMinimalList";
import ProfessionalModern from "../templates/professionalModern";
import WhiteSimpleCollegeAndFreshGraduate from "../templates/WhiteSimpleCollegeAndFreshGraduate";
import TechLeadDarkAccent from "../templates/tech_lead_dark_accent";
import ModernSplitEmerald from "../templates/modern_split_emerald";
import ExecutiveCorporate from "../templates/executive_corporate";
import CreativeDesignerViolet from "../templates/creative_designer_violet";
import AcademicCvClassic from "../templates/academic_cv_classic";
import CleanCompactOnePage from "../templates/clean_compact_one_page";
import NordicMinimalist from "../templates/nordic_minimalist";
import StartupInnovator from "../templates/startup_innovator";
import BoldHeaderCrimson from "../templates/bold_header_crimson";
import TwoColumnSlate from "../templates/two_column_slate";
import MetroInfographic from "../templates/metro_infographic";
import SwissInternational from "../templates/swiss_international";
import EngineeringTechnical from "../templates/engineering_technical";
import HealthcareMedical from "../templates/healthcare_medical";
import LegalExecutive from "../templates/legal_executive";

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
    case "tech_lead_dark_accent":
      return (
        <TechLeadDarkAccent
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "modern_split_emerald":
      return (
        <ModernSplitEmerald
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "executive_corporate":
      return (
        <ExecutiveCorporate
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "creative_designer_violet":
      return (
        <CreativeDesignerViolet
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "academic_cv_classic":
      return (
        <AcademicCvClassic
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "clean_compact_one_page":
      return (
        <CleanCompactOnePage
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "nordic_minimalist":
      return (
        <NordicMinimalist
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "startup_innovator":
      return (
        <StartupInnovator
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "bold_header_crimson":
      return (
        <BoldHeaderCrimson
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "two_column_slate":
      return (
        <TwoColumnSlate
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "metro_infographic":
      return (
        <MetroInfographic
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "swiss_international":
      return (
        <SwissInternational
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "engineering_technical":
      return (
        <EngineeringTechnical
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "healthcare_medical":
      return (
        <HealthcareMedical
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    case "legal_executive":
      return (
        <LegalExecutive
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
