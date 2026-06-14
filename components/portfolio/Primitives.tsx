import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "relative z-20 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8",
        className,
      )}
    >
      {children}
    </main>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl space-y-3", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h1 className="text-4xl font-semibold leading-[0.95] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-300">
      {children}
    </p>
  );
}

export function Surface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-background/62 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusBadge({
  status,
  children,
}: {
  status: Project["status"];
  children: ReactNode;
}) {
  const tone = {
    completed: "border-emerald-300/40 bg-emerald-300/10 text-emerald-200",
    "in-progress": "border-amber-300/40 bg-amber-300/10 text-amber-200",
    planned: "border-rose-300/40 bg-rose-300/10 text-rose-200",
  }[status];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        tone,
      )}
    >
      {children}
    </span>
  );
}

export function TechPill({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  const className =
    "inline-flex rounded-md border border-white/10 bg-white/[0.045] px-3 py-1.5 text-sm font-medium text-foreground/88 transition-colors hover:border-teal-300/50 hover:text-teal-100";

  if (!href) return <span className={className}>{children}</span>;

  return (
    <Link className={className} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  );
}

export function ActionLink({
  children,
  href,
  external,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300",
        variant === "primary"
          ? "border border-teal-300/50 bg-teal-300 text-slate-950 hover:bg-teal-200"
          : "border border-white/12 bg-white/[0.045] text-foreground hover:border-rose-300/50 hover:text-rose-100",
        className,
      )}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
      <ArrowUpRight aria-hidden size={16} />
    </Link>
  );
}
