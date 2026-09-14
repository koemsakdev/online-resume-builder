import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const singUpFormSchema = z.object({
  profileImage: z
    .any()
    .optional()
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file.length === 1;
    }, "Only one file can be uploaded.")
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return ["image/png", "image/jpeg", "image/jpg"].includes(file[0]?.type);
    }, "Only PNG, JPEG, or JPG files are allowed.")
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file[0]?.size <= 5 * 1024 * 1024;
    }, "File size must be less than 5MB."),
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const personalInfoSchema = z.object({
  profileImage: z.string().optional(),
  fullName: z.string().trim().min(1, "Full name is required"),
  title: z.string().trim().min(1, "Job title is required"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().trim().min(1, "Phone is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  summary: z.string().optional(),
});

export const educationSchema = z.object({
  degree: z.string().trim().min(1, "Degree is required"),
  institution: z.string().trim().min(1, "Institution is required"),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isCurrent: z.boolean().optional(),
  gpa: z.string().optional(),
});

export const experienceSchema = z.object({
  position: z.string().trim().min(1, "Position/Title is required"),
  companyName: z.string().trim().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isCurrent: z.boolean().optional(),
  responsibilities: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Project title is required"),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  link: z.string().optional(),
  githubLink: z.string().optional(),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required"),
  proficiency: z.string().default("Intermediate"),
  category: z.string().default("General"),
});