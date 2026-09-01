import { readFile } from "node:fs/promises";
import path from "node:path";
import projects from "../../db/static/projects";
import { getTakenCourses, takenCoursesEn } from "../../db/static/takenCourses";
import messagesEn from "../../messages/en.json";
import messagesTr from "../../messages/tr.json";
import { request, stableUuid } from "./api";

type Locale = "en" | "tr";
type SeedRecord = Record<string, unknown>;

const locales: Locale[] = ["en", "tr"];
const homeId = stableUuid("home-page");
const aboutId = stableUuid("about-page");
const projectsPageId = stableUuid("projects-page");
const mediaFolderId = stableUuid("folder:portfolio-media");
const singletonCollections = new Set([
  "home_page",
  "about_page",
  "projects_page",
]);

const upsert = async (
  collection: string,
  id: string,
  data: SeedRecord,
) => {
  const primaryKey = collection === "languages" ? "code" : "id";
  if (singletonCollections.has(collection)) {
    await request(`/items/${collection}`, {
      method: "PATCH",
      body: JSON.stringify({ id, ...data }),
    });
    return id;
  }
  const existing = await request<SeedRecord[]>(
    `/items/${collection}?filter[${primaryKey}][_eq]=${encodeURIComponent(id)}&fields=${primaryKey}&limit=1`,
  );
  const itemPath = `/items/${collection}/${id}`;
  if (existing.length) {
    await request(itemPath, { method: "PATCH", body: JSON.stringify(data) });
  } else {
    await request(`/items/${collection}`, {
      method: "POST",
      body: JSON.stringify({ [primaryKey]: id, ...data }),
    });
  }
  return id;
};

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const uploadFile = async (relativePath: string, title: string) => {
  const normalizedPath = relativePath.replace(/^\//, "");
  const id = stableUuid(`file:${normalizedPath}`);
  const filename = path.basename(normalizedPath);
  const mimeType =
    mimeTypes[path.extname(filename).toLowerCase()] ??
    "application/octet-stream";
  const existing = await request<{ id: string }[]>(
    `/files?filter[id][_eq]=${id}&fields=id&limit=1`,
  );
  if (existing.length) {
    await request(`/files/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        filename_download: filename,
        folder: mediaFolderId,
        title,
        type: mimeType,
      }),
    });
    return id;
  }

  const bytes = await readFile(path.join(process.cwd(), "public", normalizedPath));
  const form = new FormData();
  form.set("id", id);
  form.set("folder", mediaFolderId);
  form.set("title", title);
  form.set("filename_download", filename);
  form.set(
    "file",
    new Blob([new Uint8Array(bytes)], {
      type: mimeType,
    }),
    filename,
  );
  await request("/files", { method: "POST", body: form });
  return id;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const adventureHtml = (locale: Locale) => {
  const adventure = (locale === "tr" ? messagesTr : messagesEn).About.adventure;
  return [adventure.p1, adventure.p2, adventure.p3, adventure.p4]
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("\n");
};

const mediaFolders = await request<{ id: string }[]>(
  `/folders?filter[id][_eq]=${mediaFolderId}&fields=id&limit=1`,
);
if (!mediaFolders.length) {
  await request("/folders", {
    method: "POST",
    body: JSON.stringify({ id: mediaFolderId, name: "Portfolio Media" }),
  });
}

await upsert("languages", "en", {
  name: "English",
  direction: "ltr",
});
await upsert("languages", "tr", {
  name: "Türkçe",
  direction: "ltr",
});

await upsert("home_page", homeId, {
  cv_file: await uploadFile("CV.pdf", "Furkan Cengiz CV"),
});
await upsert("about_page", aboutId, {
  profile_image: await uploadFile("pics/furkan.png", "Furkan Cengiz"),
});
await upsert("projects_page", projectsPageId, {});

const homeCopy = {
  en: {
    ...messagesEn.Home,
    codeName: "Furkan",
    codePassion: "Building amazing web experiences",
    seoTitle: "Furkan Cengiz",
    seoDescription: messagesEn.metadata.description,
  },
  tr: {
    ...messagesTr.Home,
    codeName: "Furkan",
    codePassion: "Harika web deneyimleri oluşturmak",
    seoTitle: "Furkan Cengiz",
    seoDescription: messagesTr.metadata.description,
  },
};

for (const locale of locales) {
  const copy = homeCopy[locale];
  await upsert(
    "home_page_translations",
    stableUuid(`home-page-translation:${locale}`),
    {
      home_page_id: homeId,
      languages_code: locale,
      hero_title: copy.title,
      hero_subtitle: copy.subtitle,
      role: copy.role,
      code_name: copy.codeName,
      code_role: copy.role,
      code_passion: copy.codePassion,
      seo_title: copy.seoTitle,
      seo_description: copy.seoDescription,
    },
  );
}

const skillSeeds = [
  ["TypeScript", "svgs/ts.svg"],
  ["React", "svgs/react.svg"],
  ["Next.js", "svgs/next.svg"],
  ["tRPC", "svgs/trpc.svg"],
  ["Tailwind CSS", "svgs/tailwind.svg"],
  ["Drizzle ORM", "svgs/drizzle-orm.png"],
  ["PostgreSQL", "svgs/postgres.svg"],
  ["MongoDB", "svgs/mongodb.svg"],
  ["Git", "svgs/git.svg"],
] as const;

for (const [index, [name, iconPath]] of skillSeeds.entries()) {
  await upsert("skills", stableUuid(`skill:${name}`), {
    home_page_id: homeId,
    name,
    icon: await uploadFile(iconPath, `${name} icon`),
    sort: index + 1,
  });
}

const socialSeeds = [
  {
    kind: "github",
    url: "https://github.com/4Furki4",
    label: "GitHub",
  },
  {
    kind: "linkedin",
    url: "https://www.linkedin.com/in/4furkancengiz4/",
    label: "LinkedIn",
  },
  {
    kind: "email",
    url: "mailto:muhammedcengiz1@gmail.com",
    label: "Email",
  },
] as const;

for (const [index, link] of socialSeeds.entries()) {
  await upsert("social_links", stableUuid(`social:${link.kind}`), {
    home_page_id: homeId,
    ...link,
    sort: index + 1,
  });
}

for (const locale of locales) {
  const messages = locale === "tr" ? messagesTr : messagesEn;
  await upsert(
    "about_page_translations",
    stableUuid(`about-page-translation:${locale}`),
    {
      about_page_id: aboutId,
      languages_code: locale,
      profile_image_alt: "Furkan Cengiz",
      adventure_title: messages.About.adventure.title,
      adventure_body: adventureHtml(locale),
      education_title: messages.About.education.title,
      courses_title: messages.About["taken-courses"].title,
      github_title: messages.About["github-contributions"].title,
      seo_title: messages.About.metadata.title,
      seo_description: messages.About.metadata.description,
    },
  );
  await upsert(
    "projects_page_translations",
    stableUuid(`projects-page-translation:${locale}`),
    {
      projects_page_id: projectsPageId,
      languages_code: locale,
      heading: messages.Projects.title,
      seo_title: messages.Projects.metadata.title,
      seo_description: messages.Projects.metadata.description,
    },
  );
}

const educationSeeds = [
  {
    key: "recoded",
    startDate: "2023-03-05",
    endDate: "2023-09-05",
    en: {
      title: "Frontend Web Development BootCamp",
      institution: "Re:Coded",
      description:
        "I learned how to collaborate with teammates, provide feedback, manage time, and more. Furthermore, I honed my self-taught skills since our teachers encouraged us to self-teach.",
    },
    tr: {
      title: "Frontend Web Development BootCamp",
      institution: "Re:Coded",
      description:
        "Takım çalışmasını, geri bildirim sağlamayı, zaman yönetimini ve daha fazlasını öğrendim. Ayrıca, öğretmenlerimiz bizi kendi kendimize öğrenmeye teşvik ettikleri için kendi kendime öğrendiğim becerilerimi geliştirdim.",
    },
  },
  {
    key: "agu",
    startDate: "2021-10-05",
    endDate: "2022-07-15",
    en: {
      title: "Industrial Engineering",
      institution: "Abdullah Gül University",
      description:
        "Completed the prep school and left the university at the end of the first year.",
    },
    tr: {
      title: "Endüstri Mühendisliği",
      institution: "Abdullah Gül Üniversitesi",
      description:
        "Hazırlık okulunu tamamladım ve birinci sınıfın sonunda üniversiteden ayrıldım.",
    },
  },
] as const;

for (const [index, education] of educationSeeds.entries()) {
  const educationId = stableUuid(`education:${education.key}`);
  await upsert("education", educationId, {
    about_page_id: aboutId,
    start_date: education.startDate,
    end_date: education.endDate,
    sort: index + 1,
  });
  for (const locale of locales) {
    await upsert(
      "education_translations",
      stableUuid(`education-translation:${education.key}:${locale}`),
      {
        education_id: educationId,
        languages_code: locale,
        ...education[locale],
      },
    );
  }
}

const coursesTr = getTakenCourses("tr");
for (const [index, courseEn] of takenCoursesEn.entries()) {
  const courseTr = coursesTr[index];
  if (!courseTr || courseTr.courseLink !== courseEn.courseLink) {
    throw new Error(`Course translations are misaligned at index ${index}.`);
  }
  const courseId = stableUuid(`course:${courseEn.courseLink}`);
  await upsert("courses", courseId, {
    about_page_id: aboutId,
    instructor: courseEn.tutor,
    url: courseEn.courseLink,
    image: await uploadFile(courseEn.image, `${courseEn.courseTitle} thumbnail`),
    sort: index + 1,
  });
  for (const [locale, course] of [
    ["en", courseEn],
    ["tr", courseTr],
  ] as const) {
    await upsert(
      "course_translations",
      stableUuid(`course-translation:${courseEn.courseLink}:${locale}`),
      {
        course_id: courseId,
        languages_code: locale,
        title: course.courseTitle,
        summary: course.summarize,
        tags: course.tags,
      },
    );
  }
}

for (const [projectIndex, project] of projects.entries()) {
  const projectId = stableUuid(`project:${project.endpoint}`);
  await upsert("projects", projectId, {
    slug: project.endpoint,
    completion_status: project.status,
    repo_url: project.repoLink,
    demo_url: project.demoLink ?? null,
    sort: projectIndex + 1,
  });

  for (const locale of locales) {
    await upsert(
      "project_translations",
      stableUuid(`project-translation:${project.endpoint}:${locale}`),
      {
        project_id: projectId,
        languages_code: locale,
        title: project.title[locale],
        description: project.description[locale],
      },
    );
  }

  for (const [imageIndex, image] of project.images.entries()) {
    const imageId = stableUuid(`project-image:${project.endpoint}:${imageIndex}`);
    await upsert("project_images", imageId, {
      project_id: projectId,
      file: await uploadFile(image.src, `${project.title.en} image ${imageIndex + 1}`),
      sort: imageIndex + 1,
    });
    for (const locale of locales) {
      await upsert(
        "project_image_translations",
        stableUuid(
          `project-image-translation:${project.endpoint}:${imageIndex}:${locale}`,
        ),
        {
          project_image_id: imageId,
          languages_code: locale,
          alt: image.alt,
        },
      );
    }
  }

  for (const [technologyIndex, technology] of project.techStack.entries()) {
    const technologyId = stableUuid(`technology:${technology.name}`);
    await upsert("technologies", technologyId, {
      name: technology.name,
      url: technology.url ?? null,
    });
    await upsert(
      "project_technologies",
      stableUuid(`project-technology:${project.endpoint}:${technology.name}`),
      {
        project_id: projectId,
        technology_id: technologyId,
        sort: technologyIndex + 1,
      },
    );
  }

  for (const [contributorIndex, contributor] of (
    project.contributors ?? []
  ).entries()) {
    await upsert(
      "project_contributors",
      stableUuid(`project-contributor:${project.endpoint}:${contributor.github}`),
      {
        project_id: projectId,
        name: contributor.name,
        github_url: contributor.github,
        sort: contributorIndex + 1,
      },
    );
  }
}

console.log(
  `Directus seed is up to date (${projects.length} projects, ${takenCoursesEn.length} courses, ${locales.length} locales).`,
);
