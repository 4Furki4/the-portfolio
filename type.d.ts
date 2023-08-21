type GlowingButtonProps = {
    text: string;
    onClick?: () => void;
    bgColor?: string;
    theme: 'light' | 'dark';
    className?: string;
    selectedPath?: boolean;
}