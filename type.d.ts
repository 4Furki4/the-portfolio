type GlowingButtonProps = {
  onClick?: () => void;
  className?: string;
  selectedPath?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type CardHeaderProps = {
  title: string;
};

type CardImageProps = {
  src: string;
  alt: string;
};
type CardDescriptionProps = {
  description: string;
};

type CardFooterProps = {
  repoLink: string;
  demoLink?: string;
};

type CardBodyProps = CardDescriptionProps & {
  images: CardImageProps[];
};

type CardProps = CardHeaderProps & CardBodyProps & CardFooterProps;

type TechStack = {
  name: string;
  url?: string;
};

type Project = {
  title: {
    en: string;
    tr: string;
  };
  endpoint: string;
  images: CardImageProps[];
  description: {
    en: string;
    tr: string;
  };
  repoLink: string;
  demoLink?: string;
  techStack: TechStack[];
  status: "completed" | "in-progress" | "planned";
  contributors?: {
    name: string;
    github: string;
  }[];
};

type ProjectPreview = {
  title: string;
  src: string;
  alt: string;
  endpoint: string;
  description: string;
};

type Year = {
  year?: string;
  total?: number;
  range?: {
    start?: string;
    end?: string;
  };
};

type contribution = {
  date: string;
  count: number;
  color: string;
  intensity: string;
};

type GithubContributionResponse = {
  years: Year[];
  contributions: contribution[];
};

type TakenCourses = Record<"courseTitle" | "courseLink" | "summarize" | "image" | "tutor", string> & { tags: string[] }