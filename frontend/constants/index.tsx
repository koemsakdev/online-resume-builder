import {
  BrainCircuit,
  Download,
  NotepadTextDashed,
  Radio,
  Gauge,
  LibraryBig,
  Cog,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import imgStep1 from "@/assets/step-1.png";
import imgStep2 from "@/assets/step-2.png";
import imgStep3 from "@/assets/step-3.png";

export const keyFeatures = [
  {
    id: 1,
    title: "AI-Powered Optimization",
    description:
      "Craft tailored summaries, bullet points, and keywords engineered to beat applicant tracking systems (ATS).",
    icon: BrainCircuit,
    iconColor: "text-cyan-400",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    borderGlow: "hover:border-cyan-500/40",
  },
  {
    id: 2,
    title: "ATS-Approved Templates",
    description:
      "Modern, recruiter-tested templates guaranteed to pass automated parsing and land on the hiring manager's desk.",
    icon: NotepadTextDashed,
    iconColor: "text-sky-400",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    borderGlow: "hover:border-sky-500/40",
  },
  {
    id: 3,
    title: "Real-Time Visual Editor",
    description:
      "See every change as you type with instant live rendering, smart section reordering, and custom color palettes.",
    icon: Zap,
    iconColor: "text-purple-400",
    gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
    borderGlow: "hover:border-purple-500/40",
  },
  {
    id: 4,
    title: "One-Click PDF Export",
    description:
      "Instantly export print-ready, high-resolution vector PDFs formatted cleanly to standard A4/US Letter dimensions.",
    icon: Download,
    iconColor: "text-fuchsia-400",
    gradient: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    borderGlow: "hover:border-fuchsia-500/40",
  },
];

export const workingSteps = [
  {
    id: "01",
    title: "Choose Your Professional Template",
    description:
      "Select from proven designs crafted for tech, finance, design, engineering, and creative roles.",
    image: imgStep1,
    imageAlt: "Pick a template",
  },
  {
    id: "02",
    title: "Fill Info or Let AI Assist",
    description:
      "Input your experience, education, skills, projects, and let AI enhance your bullet points with metrics.",
    image: imgStep2,
    imageAlt: "Customize content",
  },
  {
    id: "03",
    title: "Export, Share & Get Hired",
    description:
      "Download ATS-friendly PDF instantly, share your personalized link, and track your applications.",
    image: imgStep3,
    imageAlt: "Download resume",
  },
];

export const templateList = [
  {
    id: "black_white_minimalist",
    name: "Minimalist Modern",
    description: "Sleek dual-column layout with dark accent sidebar. Ideal for software engineers and technical roles.",
    badge: "Popular",
    category: "Technical",
  },
  {
    id: "professional_modern",
    name: "Executive Split",
    description: "Refined two-column structure with profile emphasis, crisp typography, and high readability.",
    badge: "Executive",
    category: "Leadership",
  },
  {
    id: "professional_minimalist",
    name: "Classic Corporate",
    description: "Clean, traditional single-column layout strictly formatted for standard ATS systems.",
    badge: "ATS Optimal",
    category: "Corporate",
  },
  {
    id: "white_simple_college_and_fresh_graduate",
    name: "Graduate & Entry-Level",
    description: "Education and project-focused layout designed to highlight early career achievements.",
    badge: "Freshers",
    category: "Academic",
  },
  {
    id: "tech_lead_dark_accent",
    name: "Tech Lead Dark Accent",
    description: "Executive slate header with dual-column technical skills matrix and milestone-focused experience.",
    badge: "Staff / Lead",
    category: "Technical",
  },
  {
    id: "modern_split_emerald",
    name: "Modern Split Emerald",
    description: "Fresh forest emerald split layout emphasizing candidate credentials, projects, and career timeline.",
    badge: "Modern",
    category: "Creative",
  },
  {
    id: "executive_corporate",
    name: "Executive Corporate",
    description: "Wall Street serif typography with high-authority competencies grid and traditional corporate decorum.",
    badge: "C-Level",
    category: "Corporate",
  },
  {
    id: "creative_designer_violet",
    name: "Creative Designer",
    description: "Rich violet & purple aesthetic with visual skill tags, case study project callouts, and design philosophy.",
    badge: "Portfolio",
    category: "Creative",
  },
  {
    id: "academic_cv_classic",
    name: "Academic Scholar",
    description: "Research scholar layout with education prioritized, publications, grant history, and referee details.",
    badge: "Scholar",
    category: "Academic",
  },
  {
    id: "clean_compact_one_page",
    name: "Compact ATS Direct",
    description: "Ultra-dense, space-efficient single page resume engineered for maximum scanability and ATS parsing.",
    badge: "High Density",
    category: "Corporate",
  },
  {
    id: "nordic_minimalist",
    name: "Nordic Minimalist",
    description: "Scandinavian minimalist design with airy spacing, light charcoal typography, and subtle dividing rules.",
    badge: "Minimalist",
    category: "Creative",
  },
  {
    id: "startup_innovator",
    name: "Startup Innovator",
    description: "Vibrant sky blue tech accents with product builder metrics, live prototype links, and shipped milestones.",
    badge: "Innovator",
    category: "Technical",
  },
  {
    id: "bold_header_crimson",
    name: "Bold Crimson Header",
    description: "Striking burgundy top header with executive presence, crisp typography, and balanced dual columns.",
    badge: "Distinctive",
    category: "Leadership",
  },
  {
    id: "two_column_slate",
    name: "Slate Columnist",
    description: "Balanced 35/65 column ratio with clean slate cards, circular profile avatar, and chronological nodes.",
    badge: "Clean",
    category: "Corporate",
  },
  {
    id: "metro_infographic",
    name: "Metro Infographic",
    description: "Structured section tiles with warm amber accents, skill pills, and organized modular readability.",
    badge: "Visual",
    category: "Creative",
  },
  {
    id: "swiss_international",
    name: "Swiss International",
    description: "Classic modernist typographic hierarchy with heavy black structural rules and asymmetric grid precision.",
    badge: "Modernist",
    category: "Creative",
  },
  {
    id: "engineering_technical",
    name: "Engineering & Systems",
    description: "Specialized for backend, DevOps, and systems architects with terminal hints and technical matrix.",
    badge: "Systems",
    category: "Technical",
  },
  {
    id: "healthcare_medical",
    name: "Healthcare & Medical",
    description: "Serene clinical teal palette structured for clinical practice, medical licensure, and hospital appointments.",
    badge: "Clinical",
    category: "Medical",
  },
  {
    id: "legal_executive",
    name: "Legal Counsel & Governance",
    description: "Dignified serif styling tailored for general counsels, compliance officers, and bar-admitted attorneys.",
    badge: "Legal",
    category: "Corporate",
  },
];

export const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Software Engineer",
    company: "Google",
    content:
      "ResumeRise completely changed my interview rate. The AI suggestions helped quantify my achievements, and the ATS-friendly formatting got me past the initial filters.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "Stripe",
    content:
      "The clean, electric aesthetics and real-time preview made designing my CV effortless. Within two weeks of updating my resume, I secured 4 interviews!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Marcus Davies",
    role: "DevOps & Cloud Architect",
    company: "Amazon Web Services",
    content:
      "I love how fast I can tailor my resume for different contracts. The projects and certifications sections are designed brilliantly.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Templates",
    url: "/resume-templates",
    icon: LibraryBig,
  },
];
