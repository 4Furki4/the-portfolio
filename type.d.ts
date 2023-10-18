type GlowingButtonProps = {
  text: string;
  onClick?: () => void;
  bgColor?: string;
  className?: string;
  selectedPath?: boolean;
};

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

type Project = {
  title: string;
  endpoint: string;
  images: CardImageProps[];
  description: string;
  repoLink: string;
  demoLink?: string;
};
