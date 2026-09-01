export const portfolioLocales = ["en", "tr"] as const;
export type PortfolioLocale = (typeof portfolioLocales)[number];

export type CmsImage = {
  src: string;
  alt: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: CmsImage[];
  repoLink: string;
  demoLink?: string;
  techStack: { name: string; url?: string }[];
  status: "completed" | "in-progress" | "planned";
  contributors?: { name: string; github: string }[];
};

export type ProjectPreview = {
  title: string;
  src: string;
  alt: string;
  endpoint: string;
  description: string;
};

export type HomeContent = {
  title: string;
  subtitle: string;
  role: string;
  codeName: string;
  codeRole: string;
  codePassion: string;
  seoTitle: string;
  seoDescription: string;
  skills: { name: string; icon: string }[];
  socialLinks: {
    kind: "github" | "linkedin" | "email";
    href: string;
    label: string;
  }[];
};

export type EducationItem = {
  id: string;
  title: string;
  institution: string;
  description: string;
  startDate: string;
  endDate?: string;
};

export type CourseItem = {
  id: string;
  courseTitle: string;
  tutor: string;
  courseLink: string;
  image: string;
  tags: string[];
  summarize: string;
};

export type AboutContent = {
  profileImage: string;
  profileImageAlt: string;
  adventureTitle: string;
  adventureBody: string;
  educationTitle: string;
  coursesTitle: string;
  githubTitle: string;
  seoTitle: string;
  seoDescription: string;
  education: EducationItem[];
  courses: CourseItem[];
};

export type ProjectsPageContent = {
  heading: string;
  seoTitle: string;
  seoDescription: string;
};
