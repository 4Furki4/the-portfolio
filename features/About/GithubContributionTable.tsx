import { getTranslations } from "next-intl/server";
import { Surface } from "@/components/portfolio/Primitives";

const contributionPalette = ["#161b22", "#003820", "#00602d", "#10983d", "#27d545"];

export default async function GithubContributionTable() {
  const githubTableDataResponse = await fetch(
    "https://github-contributions.vercel.app/api/v1/4furki4",
    {
      next: {
        revalidate: 60 * 60,
        tags: ["github-contributions"],
      },
    }
  );
  const t = await getTranslations("About.github-contributions");
  const githubTableData: GithubContributionResponse =
    await githubTableDataResponse.json();

  return (
    <Surface className="p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-300">
            04 / GitHub
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">
            {t("title")}
          </h2>
        </div>
      </div>
      <ContributionSvg
        data={githubTableData}
        labels={{
          contributions: t("contributions"),
        }}
      />
      <div className="mt-4 flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm text-muted-foreground">
        <span>{t("less")}</span>
        <div className="flex shrink-0 items-center gap-1.5">
          {contributionPalette.map((color) => (
            <span
              aria-hidden
              className="size-3 rounded-[3px]"
              key={color}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span>{t("more")}</span>
      </div>
    </Surface>
  );
}

function ContributionSvg({
  data,
  labels,
}: {
  data: GithubContributionResponse;
  labels: { contributions: string };
}) {
  const years = data.years ?? [];
  const contributions = new Map(
    (data.contributions ?? []).map((contribution) => [
      contribution.date,
      Number(contribution.intensity),
    ])
  );
  const width = 900;
  const rowHeight = 126;
  const padding = 24;
  const headerHeight = 26;
  const height = Math.max(220, padding * 2 + years.length * rowHeight);

  return (
    <svg
      aria-label="Github Contribution Table"
      className="h-auto w-full rounded-lg border border-white/10 bg-slate-950/70"
      role="img"
      viewBox={`0 0 ${width} ${height}`}
    >
      {years.map((year, index) => {
        const top = padding + index * rowHeight;
        const firstDay = startOfWeek(new Date(`${year.year}-01-01T00:00:00`));
        const endDate = year.range?.end ?? `${year.year}-12-31`;
        const lastDay = new Date(`${endDate}T00:00:00`);
        const boxes = [];
        const box = 10;
        const gap = 3;
        const gridTop = top + headerHeight;

        for (let day = new Date(firstDay), column = 0; day <= lastDay; ) {
          for (let row = 0; row < 7; row += 1) {
            const current = new Date(day);
            current.setDate(day.getDate() + row);
            if (current > lastDay) break;
            const date = formatDate(current);
            const intensity = contributions.get(date) ?? 0;
            boxes.push(
              <rect
                fill={contributionPalette[Math.max(0, Math.min(4, intensity))]}
                height={box}
                key={`${year.year}-${date}`}
                rx="2"
                width={box}
                x={padding + column * (box + gap)}
                y={gridTop + row * (box + gap)}
              />
            );
          }
          day.setDate(day.getDate() + 7);
          column += 1;
        }

        return (
          <g key={year.year}>
            <text
              fill="#f8fafc"
              fontSize="14"
              fontWeight="700"
              x={padding}
              y={top + 12}
            >
              {year.year}: {year.total} {labels.contributions}
            </text>
            {boxes}
          </g>
        );
      })}
    </svg>
  );
}

function startOfWeek(date: Date) {
  const firstDay = new Date(date);
  firstDay.setDate(firstDay.getDate() - firstDay.getDay());
  return firstDay;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
