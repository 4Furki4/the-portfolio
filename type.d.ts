type GlowingButtonProps = {
    text: string;
    onClick?: () => void;
    pathLength?: number;
    strokeWidth?: number;
    borderRadius?: number;
    bgColor?: string;
    theme: 'light' | 'dark';
    className?: string;
}