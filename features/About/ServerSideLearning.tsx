import React from "react";
import { CloudCog, Server, ShieldCheck } from "lucide-react";
import {
  SectionHeader,
  Surface,
  TechPill,
} from "@/components/portfolio/Primitives";
import Reveal from "@/components/portfolio/Reveal";

type ServerSideCard = {
  label: string;
  title: string;
  description: string;
};

type ServerSideLearningProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: ServerSideCard[];
  note: string;
};

const stack = [
  "Docker",
  "Caddy",
  "PostgreSQL",
  "LLDAP",
  "Cloudflare Tunnel",
  "Komodo",
  "Backups",
];

const icons = [Server, CloudCog, ShieldCheck];

export default function ServerSideLearning({
  eyebrow,
  title,
  description,
  cards,
  note,
}: ServerSideLearningProps) {
  return (
    <section className="grid gap-6">
      <SectionHeader
        description={description}
        eyebrow={eyebrow}
        title={title}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = icons[index] ?? Server;

          return (
            <Reveal delay={index * 0.06} key={card.title}>
              <Surface className="flex h-full flex-col gap-5 p-5 transition-colors hover:border-teal-300/40 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {card.label}
                  </span>
                  <span className="grid size-10 place-items-center rounded-lg border border-teal-300/30 bg-teal-300/10 text-teal-100">
                    <Icon aria-hidden size={19} />
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold leading-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                    {card.description}
                  </p>
                </div>
              </Surface>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.12}>
        <Surface className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            {note}
          </p>
          <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {stack.map((item) => (
              <TechPill key={item}>{item}</TechPill>
            ))}
          </div>
        </Surface>
      </Reveal>
    </section>
  );
}
