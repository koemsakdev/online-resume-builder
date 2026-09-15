import React from "react";
import { CVData, CertificationItem, LanguageItem, ReferenceItem } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Plus, Trash2, Award, Globe2, Users, Calendar, Link as LinkIcon, SkipForward } from "lucide-react";
import Combobox from "@/components/ui/combobox";
import DatePicker from "@/components/ui/date-picker";

interface AdditionalInfoFormProps {
  resumeData: CVData;
  setResumeData: React.Dispatch<React.SetStateAction<CVData>>;
  onSkipSection?: () => void;
}

const AdditionalInfoForm = ({ resumeData, setResumeData, onSkipSection }: AdditionalInfoFormProps) => {

  // Certifications handlers
  const handleAddCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        { name: "", issuer: "", issueDate: "", credentialUrl: "" },
      ],
    }));
  };

  const handleUpdateCertification = (index: number, key: string, value: string) => {
    setResumeData((prev) => {
      const certs = [...(prev.certifications || [])];
      certs[index] = { ...certs[index], [key]: value };
      return { ...prev, certifications: certs };
    });
  };

  const handleRemoveCertification = (index: number) => {
    setResumeData((prev) => {
      const certs = [...(prev.certifications || [])];
      certs.splice(index, 1);
      return { ...prev, certifications: certs };
    });
  };

  // Languages handlers
  const handleAddLanguage = () => {
    setResumeData((prev) => ({
      ...prev,
      languages: [
        ...(prev.languages || []),
        { language: "", proficiency: "Fluent" },
      ],
    }));
  };

  const handleUpdateLanguage = (index: number, key: string, value: string) => {
    setResumeData((prev) => {
      const langs = [...(prev.languages || [])];
      langs[index] = { ...langs[index], [key]: value };
      return { ...prev, languages: langs };
    });
  };

  const handleRemoveLanguage = (index: number) => {
    setResumeData((prev) => {
      const langs = [...(prev.languages || [])];
      langs.splice(index, 1);
      return { ...prev, languages: langs };
    });
  };

  return (
    <div className="px-5 pt-5 pb-8 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Certifications & Languages</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium border border-border">
              Optional
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Add formal credentials, licenses, and spoken languages to enhance credibility.
          </p>
        </div>
        {onSkipSection && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSkipSection}
            className="text-xs text-muted-foreground hover:text-foreground shrink-0 rounded-xl"
          >
            <span>Skip Section</span>
            <SkipForward className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>
      <Separator />

      {/* Section 1: Certifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-foreground">Certifications & Licenses</h3>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddCertification}
            className="text-cyan-400 hover:text-cyan-300 text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Certificate
          </Button>
        </div>

        {(resumeData.certifications || []).length === 0 ? (
          <div className="text-xs text-muted-foreground bg-muted/20 p-5 rounded-xl text-center space-y-3 border border-dashed border-border/80">
            <p>
              No certifications added yet. If you have credentials (AWS, GCP, PMP, Scrums), click below to add.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCertification}
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-xl text-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Certificate
              </Button>
              {onSkipSection && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onSkipSection}
                  className="text-xs text-muted-foreground hover:text-cyan-300 rounded-xl"
                >
                  Skip Certifications
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {(resumeData.certifications || []).map((cert, index) => (
              <div key={index} className="p-4 rounded-xl border border-border/70 bg-card/40 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-400">Certification #{index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCertification(index)}
                    className="text-muted-foreground hover:text-red-400 h-7 w-7 p-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold flex items-center gap-1.5 h-5 whitespace-nowrap">
                      <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Certificate Name *
                    </Label>
                    <Input
                      type="text"
                      value={cert.name || ""}
                      onChange={(e) => handleUpdateCertification(index, "name", e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold flex items-center gap-1.5 h-5 whitespace-nowrap">
                      <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Issuing Organization *
                    </Label>
                    <Input
                      type="text"
                      value={cert.issuer || ""}
                      onChange={(e) => handleUpdateCertification(index, "issuer", e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium flex items-center gap-1.5 h-5 whitespace-nowrap text-foreground/90">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Issue Date
                    </Label>
                    <DatePicker
                      mode="month-year"
                      value={typeof cert.issueDate === "string" ? cert.issueDate : ""}
                      onChange={(val) => handleUpdateCertification(index, "issueDate", val)}
                      placeholder="Pick issue date..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium flex items-center gap-1.5 h-5 whitespace-nowrap text-foreground/90">
                      <LinkIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Credential URL (optional)
                    </Label>
                    <Input
                      type="url"
                      value={cert.credentialUrl || ""}
                      onChange={(e) => handleUpdateCertification(index, "credentialUrl", e.target.value)}
                      placeholder="https://credly.com/..."
                      className="rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Section 2: Languages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-foreground">Languages</h3>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddLanguage}
            className="text-purple-400 hover:text-purple-300 text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Language
          </Button>
        </div>

        {(resumeData.languages || []).length === 0 ? (
          <p className="text-xs text-muted-foreground italic bg-muted/20 p-4 rounded-xl text-center">
            No languages specified yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(resumeData.languages || []).map((lang, index) => (
              <div key={index} className="p-3.5 rounded-2xl border border-border/70 bg-card/40 space-y-2 relative shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                    Language #{index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLanguage(index)}
                    className="text-muted-foreground hover:text-red-400 h-7 w-7 p-0 rounded-lg"
                    title="Remove language"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px] font-medium text-foreground/90 h-4 whitespace-nowrap block">Language</Label>
                    <Input
                      type="text"
                      value={lang.language || ""}
                      onChange={(e) => handleUpdateLanguage(index, "language", e.target.value)}
                      placeholder="e.g. English, Khmer"
                      className="rounded-xl text-xs h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] font-medium text-foreground/90 h-4 whitespace-nowrap block">Proficiency</Label>
                    <Combobox
                      options={[
                        "Native / Bilingual",
                        "Fluent",
                        "Professional Working",
                        "Intermediate",
                        "Elementary",
                      ]}
                      value={lang.proficiency || ""}
                      onChange={(val) => handleUpdateLanguage(index, "proficiency", val)}
                      placeholder="Select level..."
                      searchPlaceholder="Search level..."
                      allowCustom={true}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfoForm;

