import "server-only";

import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import type {
  AboutContent,
  HomeContent,
  PortfolioLocale,
  PortfolioProject,
  ProjectsPageContent,
} from "./types";

const directusUrl = (process.env.DIRECTUS_URL ?? "http://127.0.0.1:8055").replace(
  /\/$/,
  "",
);
const directusToken = process.env.DIRECTUS_TOKEN;

type DirectusResponse<T> = { data: T };

export class DirectusRequestError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "DirectusRequestError";
  }
}

const directusFetch = async <T>(path: string): Promise<T> => {
  const headers = new Headers({ accept: "application/json" });
  if (directusToken) headers.set("authorization", `Bearer ${directusToken}`);
  const response = await fetch(`${directusUrl}${path}`, {
    headers,
    cache: "force-cache",
    next: { tags: ["portfolio-content"] },
  });
  if (!response.ok) {
    throw new DirectusRequestError(
      `Directus request failed (${response.status}) for ${path}`,
      response.status,
    );
  }
  return ((await response.json()) as DirectusResponse<T>).data;
};

const translationBaseSchema = z.object({ languages_code: z.string() });
type Translation = z.infer<typeof translationBaseSchema> & Record<string, unknown>;

export const selectTranslation = <T extends Translation>(
  translations: T[],
  locale: PortfolioLocale,
) => {
  const selected =
    translations.find((translation) => translation.languages_code === locale) ??
    translations.find((translation) => translation.languages_code === "en") ??
    translations[0];
  if (!selected) throw new Error(`Directus item has no ${locale} or English translation.`);
  return selected;
};

const fileSchema = z.union([
  z.string().uuid().transform((id) => ({ id })),
  z.object({ id: z.string().uuid() }),
]);

type DirectusFile = z.infer<typeof fileSchema>;

const assetUrl = (file: DirectusFile) => `/api/assets/${file.id}`;

export const getCvUrl = async () => {
  const raw = await directusFetch<unknown>("/items/home_page?fields=cv_file");
  const page = z.object({ cv_file: fileSchema.nullable() }).parse(raw);
  return page.cv_file ? assetUrl(page.cv_file) : "/CV.pdf";
};

const pageTranslationSchema = translationBaseSchema.extend({
  hero_title: z.string(),
  hero_subtitle: z.string(),
  role: z.string(),
  code_name: z.string(),
  code_role: z.string(),
  code_passion: z.string(),
  seo_title: z.string(),
  seo_description: z.string(),
});

const homePageSchema = z.object({
  translations: z.array(pageTranslationSchema),
  skills: z
    .array(
      z.object({
        name: z.string(),
        sort: z.number().nullable().optional(),
        icon: fileSchema,
      }),
    )
    .default([]),
  social_links: z
    .array(
      z.object({
        kind: z.enum(["github", "linkedin", "email"]),
        url: z.string(),
        label: z.string(),
        sort: z.number().nullable().optional(),
      }),
    )
    .default([]),
});

const sortByDirectusOrder = <T extends { sort?: number | null }>(items: T[]) =>
  items.toSorted(
    (left, right) =>
      (left.sort ?? Number.MAX_SAFE_INTEGER) -
      (right.sort ?? Number.MAX_SAFE_INTEGER),
  );

export const getHomePage = async (
  locale: PortfolioLocale,
): Promise<HomeContent> => {
  const fields = [
    "translations.languages_code",
    "translations.hero_title",
    "translations.hero_subtitle",
    "translations.role",
    "translations.code_name",
    "translations.code_role",
    "translations.code_passion",
    "translations.seo_title",
    "translations.seo_description",
    "skills.name",
    "skills.sort",
    "skills.icon",
    "social_links.kind",
    "social_links.url",
    "social_links.label",
    "social_links.sort",
  ].join(",");
  const raw = await directusFetch<unknown>(
    `/items/home_page?fields=${encodeURIComponent(fields)}`,
  );
  const page = homePageSchema.parse(raw);
  const translation = selectTranslation(page.translations, locale);
  return {
    title: translation.hero_title,
    subtitle: translation.hero_subtitle,
    role: translation.role,
    codeName: translation.code_name,
    codeRole: translation.code_role,
    codePassion: translation.code_passion,
    seoTitle: translation.seo_title,
    seoDescription: translation.seo_description,
    skills: sortByDirectusOrder(page.skills).map((skill) => ({
      name: skill.name,
      icon: assetUrl(skill.icon),
    })),
    socialLinks: sortByDirectusOrder(page.social_links).map((link) => ({
      kind: link.kind,
      href: link.url,
      label: link.label,
    })),
  };
};

const aboutTranslationSchema = translationBaseSchema.extend({
  profile_image_alt: z.string(),
  adventure_title: z.string(),
  adventure_body: z.string(),
  education_title: z.string(),
  courses_title: z.string(),
  github_title: z.string(),
  seo_title: z.string(),
  seo_description: z.string(),
});

const localizedEducationSchema = translationBaseSchema.extend({
  title: z.string(),
  institution: z.string(),
  description: z.string(),
});

const localizedCourseSchema = translationBaseSchema.extend({
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).nullable().default([]),
});

const aboutPageSchema = z.object({
  profile_image: fileSchema,
  translations: z.array(aboutTranslationSchema),
  education: z
    .array(
      z.object({
        id: z.string(),
        start_date: z.string(),
        end_date: z.string().nullable().optional(),
        sort: z.number().nullable().optional(),
        translations: z.array(localizedEducationSchema),
      }),
    )
    .default([]),
  courses: z
    .array(
      z.object({
        id: z.string(),
        instructor: z.string(),
        url: z.string(),
        image: fileSchema,
        sort: z.number().nullable().optional(),
        translations: z.array(localizedCourseSchema),
      }),
    )
    .default([]),
});

export const sanitizeCmsHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "blockquote",
      "strong",
      "em",
      "code",
      "pre",
      "a",
    ],
    allowedAttributes: { a: ["href", "title", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attributes) => ({
        tagName: "a",
        attribs: {
          ...attributes,
          rel: "noopener noreferrer",
        },
      }),
    },
  });

export const getAboutPage = async (
  locale: PortfolioLocale,
): Promise<AboutContent> => {
  const fields = [
    "profile_image",
    "translations.*",
    "education.id",
    "education.start_date",
    "education.end_date",
    "education.sort",
    "education.translations.*",
    "courses.id",
    "courses.instructor",
    "courses.url",
    "courses.sort",
    "courses.image",
    "courses.translations.*",
  ].join(",");
  const raw = await directusFetch<unknown>(
    `/items/about_page?fields=${encodeURIComponent(fields)}`,
  );
  const page = aboutPageSchema.parse(raw);
  const translation = selectTranslation(page.translations, locale);
  return {
    profileImage: assetUrl(page.profile_image),
    profileImageAlt: translation.profile_image_alt,
    adventureTitle: translation.adventure_title,
    adventureBody: sanitizeCmsHtml(translation.adventure_body),
    educationTitle: translation.education_title,
    coursesTitle: translation.courses_title,
    githubTitle: translation.github_title,
    seoTitle: translation.seo_title,
    seoDescription: translation.seo_description,
    education: sortByDirectusOrder(page.education).map((item) => {
      const localized = selectTranslation(item.translations, locale);
      return {
        id: item.id,
        title: localized.title,
        institution: localized.institution,
        description: localized.description,
        startDate: item.start_date,
        endDate: item.end_date ?? undefined,
      };
    }),
    courses: sortByDirectusOrder(page.courses).map((item) => {
      const localized = selectTranslation(item.translations, locale);
      return {
        id: item.id,
        courseTitle: localized.title,
        tutor: item.instructor,
        courseLink: item.url,
        image: assetUrl(item.image),
        tags: localized.tags ?? [],
        summarize: localized.summary,
      };
    }),
  };
};

const projectsPageSchema = z.object({
  translations: z.array(
    translationBaseSchema.extend({
      heading: z.string(),
      seo_title: z.string(),
      seo_description: z.string(),
    }),
  ),
});

export const getProjectsPage = async (
  locale: PortfolioLocale,
): Promise<ProjectsPageContent> => {
  const raw = await directusFetch<unknown>(
    "/items/projects_page?fields=translations.*",
  );
  const page = projectsPageSchema.parse(raw);
  const translation = selectTranslation(page.translations, locale);
  return {
    heading: translation.heading,
    seoTitle: translation.seo_title,
    seoDescription: translation.seo_description,
  };
};

const projectTranslationSchema = translationBaseSchema.extend({
  title: z.string(),
  description: z.string(),
});
const projectImageTranslationSchema = translationBaseSchema.extend({
  alt: z.string(),
});
const projectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  completion_status: z.enum(["completed", "in-progress", "planned"]),
  repo_url: z.string(),
  demo_url: z.string().nullable().optional(),
  sort: z.number().nullable().optional(),
  translations: z.array(projectTranslationSchema),
  images: z
    .array(
      z.object({
        sort: z.number().nullable().optional(),
        file: fileSchema,
        translations: z.array(projectImageTranslationSchema),
      }),
    )
    .default([]),
  technologies: z
    .array(
      z.object({
        sort: z.number().nullable().optional(),
        technology_id: z.object({
          name: z.string(),
          url: z.string().nullable().optional(),
        }),
      }),
    )
    .default([]),
  contributors: z
    .array(
      z.object({
        name: z.string(),
        github_url: z.string(),
        sort: z.number().nullable().optional(),
      }),
    )
    .default([]),
});

const projectFields = [
  "id",
  "slug",
  "completion_status",
  "repo_url",
  "demo_url",
  "sort",
  "translations.*",
  "images.sort",
  "images.file",
  "images.translations.*",
  "technologies.sort",
  "technologies.technology_id.name",
  "technologies.technology_id.url",
  "contributors.name",
  "contributors.github_url",
  "contributors.sort",
].join(",");

const localizeProject = (
  rawProject: z.infer<typeof projectSchema>,
  locale: PortfolioLocale,
): PortfolioProject | null => {
  const translation = selectTranslation(rawProject.translations, locale);
  const images = sortByDirectusOrder(rawProject.images).map((image) => ({
    src: assetUrl(image.file),
    alt: selectTranslation(image.translations, locale).alt,
  }));
  if (!images.length) return null;
  const contributors = sortByDirectusOrder(rawProject.contributors).map(
    (contributor) => ({
      name: contributor.name,
      github: contributor.github_url,
    }),
  );
  return {
    id: rawProject.id,
    slug: rawProject.slug,
    title: translation.title,
    description: translation.description,
    images,
    repoLink: rawProject.repo_url,
    demoLink: rawProject.demo_url ?? undefined,
    techStack: sortByDirectusOrder(rawProject.technologies).map(
      ({ technology_id: technology }) => ({
        name: technology.name,
        url: technology.url ?? undefined,
      }),
    ),
    status: rawProject.completion_status,
    contributors: contributors.length ? contributors : undefined,
  };
};

export const getProjects = async (
  locale: PortfolioLocale,
): Promise<PortfolioProject[]> => {
  const raw = await directusFetch<unknown>(
    `/items/projects?limit=-1&sort=sort&fields=${encodeURIComponent(projectFields)}`,
  );
  return z
    .array(projectSchema)
    .parse(raw)
    .map((project) => localizeProject(project, locale))
    .filter((project): project is PortfolioProject => project !== null);
};

export const getProjectBySlug = async (
  slug: string,
  locale: PortfolioLocale,
): Promise<PortfolioProject | null> => {
  const raw = await directusFetch<unknown>(
    `/items/projects?limit=1&filter[slug][_eq]=${encodeURIComponent(slug)}&fields=${encodeURIComponent(projectFields)}`,
  );
  const projects = z.array(projectSchema).parse(raw);
  return projects[0] ? localizeProject(projects[0], locale) : null;
};

export const getProjectSlugs = async () => {
  const raw = await directusFetch<unknown>(
    "/items/projects?limit=-1&sort=sort&fields=slug",
  );
  return z.array(z.object({ slug: z.string() })).parse(raw).map(({ slug }) => slug);
};
