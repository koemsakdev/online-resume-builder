"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import AiDescriptionAssistant from "./ai-description-modal";

interface AiAssistantButtonProps {
  section: "summary" | "experience" | "project";
  roleTitle?: string;
  currentText?: string;
  onApply: (generatedText: string) => void;
  label?: string;
  className?: string;
}

export const AiAssistantButton: React.FC<AiAssistantButtonProps> = ({
  section,
  roleTitle = "",
  currentText = "",
  onApply,
  label = "Write with AI",
  className = "",
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => setModalOpen(true)}
        className={`h-7 px-2.5 text-xs font-semibold rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/30 shadow-sm transition-all duration-200 ${className}`}
      >
        <Sparkles className="w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse" />
        <span>{label}</span>
      </Button>

      <AiDescriptionAssistant
        open={modalOpen}
        onOpenChange={setModalOpen}
        section={section}
        roleTitle={roleTitle}
        currentText={currentText}
        onApply={onApply}
      />
    </>
  );
};

export default AiAssistantButton;

