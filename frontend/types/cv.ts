export interface ContactInfo {
  email: string;
  phone: string;
  portfolio?: string;
  profile?: string;
  profileImageUrl?: string;
  location?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  nationality?: string;
  gender?: string;
  drivingLicense?: string;
  visaStatus?: string;
  photoCrop?: {
    x: number;
    y: number;
    zoom: number;
  };
}

export interface ExperienceItem {
  id?: string;
  title: string;
  position?: string;
  company: string;
  companyName?: string;
  location?: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  isCurrent?: boolean;
  responsibilities: string[];
  description?: string;
}

export interface EducationItem {
  id?: string;
  degree: string;
  university: string;
  institution?: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  isCurrent?: boolean;
  gpa?: string;
  honors?: string[];
}

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
}

export interface CertificationItem {
  id?: string;
  name: string;
  issuer: string;
  issueDate?: Date | string | null;
  expiryDate?: Date | string | null;
  credentialId?: string;
  credentialUrl?: string;
}

export interface AwardItem {
  id?: string;
  title: string;
  issuer: string;
  date?: Date | string | null;
  description?: string;
}

export interface LanguageItem {
  id?: string;
  language: string;
  proficiency: string;
}

export interface ReferenceItem {
  id?: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  relationship?: string;
}

export interface Skills {
  id?: string;
  name: string;
  skillName?: string;
  proficiency: string;
  category?: string;
}

export interface CustomSectionItem {
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id?: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface CVData {
  _id?: string;
  title: string;
  name: string;
  fullName?: string;
  jobTitle?: string;
  thumnailLink?: string;
  thumbnailLink?: string;
  template?: string;
  colorPalette?: string[];
  status?: string;
  contact: ContactInfo;
  summary: string;
  skills: Skills[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  awards?: AwardItem[];
  languages?: LanguageItem[];
  interests?: string[];
  references?: ReferenceItem[];
  customSections?: CustomSection[];
}

export interface TemplateProps {
  resumeData: CVData;
  containerWidth: number;
  isPrinting?: boolean;
}

export interface TemplateInfo {
  id: string;
  name: string;
  thumbnail: string;
  component: React.ComponentType<TemplateProps>;
  color: string;
  description?: string;
}
