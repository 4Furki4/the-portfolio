type GlowingButtonProps = {
    text: string;
    onClick?: () => void;
    bgColor?: string;
    theme: 'light' | 'dark';
    className?: string;
    selectedPath?: boolean;
}

type CardHeaderProps = {
    title: string
}

type CardImageProps = {
    src: string,
    alt: string,
}
type CardDescriptionProps = {
    description: string
}

type CardBodyProps = CardImageProps & CardDescriptionProps

type CardProps = CardHeaderProps & CardBodyProps