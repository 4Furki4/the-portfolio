import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="block backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60">
      <CardHeader>
        <CardTitle className="text-fs-600 font-bold text-center">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ContributionSvg data={githubTableData} />
      </CardContent>
    </Card>
  );
}

function ContributionSvg({ data }: { data: GithubContributionResponse }) {
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
  const palette = ["#161b22", "#003820", "#00602d", "#10983d", "#27d545"];

  return (
    <svg
      aria-label="Github Contribution Table"
      className="h-auto w-full rounded-md shadow-md"
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
                fill={palette[Math.max(0, Math.min(4, intensity))]}
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
              {year.year}: {year.total} contributions
            </text>
            {boxes}
          </g>
        );
      })}
      <text fill="#94a3b8" fontSize="12" x={width - 132} y={height - 16}>
        Less
      </text>
      {palette.map((color, index) => (
        <rect
          fill={color}
          height="10"
          key={color}
          rx="2"
          width="10"
          x={width - 96 + index * 14}
          y={height - 25}
        />
      ))}
      <text fill="#94a3b8" fontSize="12" x={width - 48} y={height - 16}>
        More
      </text>
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
