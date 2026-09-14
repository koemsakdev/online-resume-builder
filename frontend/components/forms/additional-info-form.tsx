import React from "react";
import { CVData, CertificationItem, LanguageItem, ReferenceItem } from "@/types/cv";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Plus, Trash2, Award, Globe2, Users } from "lucide-react";

interface AdditionalInfoFormProps {
  resumeData: CVData;
  setResumeData: React.Dispatch<React.SetStateAction<CVData>>;
}

const AdditionalInfoForm = ({ resumeData, setResumeData }: AdditionalInfoFormProps) => {

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
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Certifications & Languages</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add formal credentials, licenses, and spoken languages to enhance credibility.
        </p>
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
          <p className="text-xs text-muted-foreground italic bg-muted/20 p-4 rounded-xl text-center">
            No certifications added. Click &quot;Add Certificate&quot; above if you have AWS, GCP, PMP, etc.
          </p>
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
                  <div className="space-y-1">
                    <Label className="text-xs">Certificate Name</Label>
                    <Input
                      type="text"
                      value={cert.name || ""}
                      onChange={(e) => handleUpdateCertification(index, "name", e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Issuing Organization</Label>
                    <Input
                      type="text"
                      value={cert.issuer || ""}
                      onChange={(e) => handleUpdateCertification(index, "issuer", e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Issue Date / Year</Label>
                    <Input
                      type="text"
                      value={typeof cert.issueDate === "string" ? cert.issueDate : ""}
                      onChange={(e) => handleUpdateCertification(index, "issueDate", e.target.value)}
                      placeholder="e.g. 2023"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Credential Link</Label>
                    <Input
                      type="url"
                      value={cert.credentialUrl || ""}
                      onChange={(e) => handleUpdateCertification(index, "credentialUrl", e.target.value)}
                      placeholder="https://credly.com/..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(resumeData.languages || []).map((lang, index) => (
              <div key={index} className="p-3 rounded-xl border border-border/70 bg-card/40 flex items-center gap-2">
                <Input
                  type="text"
                  value={lang.language || ""}
                  onChange={(e) => handleUpdateLanguage(index, "language", e.target.value)}
                  placeholder="e.g. English, Spanish"
                  className="flex-1 text-sm"
                />
                <Input
                  type="text"
                  value={lang.proficiency || ""}
                  onChange={(e) => handleUpdateLanguage(index, "proficiency", e.target.value)}
                  placeholder="Native, Fluent, etc."
                  className="w-28 text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveLanguage(index)}
                  className="text-muted-foreground hover:text-red-400 h-8 w-8 p-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfoForm;

