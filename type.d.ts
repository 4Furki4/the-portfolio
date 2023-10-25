type GlowingButtonProps = {
  text: string;
  onClick?: () => void;
  bgColor?: string;
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
