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
  title: string;
  endpoint: string;
  images: CardImageProps[];
  description: string;
  repoLink: string;
  demoLink?: string;
  techStack: TechStack[];
  status: "completed" | "in-progress" | "planned";
  contributors?: {
    name: string;
    github: string;
  }[];
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
