import { CVData } from "./cv";

export interface EditResumeTypeProps {
    resumeData: CVData;
    setResumeData: React.Dispatch<React.SetStateAction<CVData>>;
}

export interface ResumePreviewProps {
    templateName: string;
    resumeData: CVData;
    containerWidth: number;
}