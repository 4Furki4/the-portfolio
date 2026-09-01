import {
  configuration,
  directusUrl,
  publicRequest,
  request,
  stableUuid,
} from "./api";

const projectCollections = [
  "languages",
  "home_page",
  "home_page_translations",
  "about_page",
  "about_page_translations",
  "projects_page",
  "projects_page_translations",
  "projects",
  "project_translations",
  "project_images",
  "project_image_translations",
  "technologies",
  "project_technologies",
  "project_contributors",
  "education",
  "education_translations",
  "courses",
  "course_translations",
  "skills",
  "social_links",
] as const;

const translationDefinitions = [
  ["home_page", "home_page_translations", "home_page_id"],
  ["about_page", "about_page_translations", "about_page_id"],
  ["projects_page", "projects_page_translations", "projects_page_id"],
  ["projects", "project_translations", "project_id"],
  ["project_images", "project_image_translations", "project_image_id"],
  ["education", "education_translations", "education_id"],
  ["courses", "course_translations", "course_id"],
] as const;

type Field = {
  field: string;
  schema: { is_nullable?: boolean } | null;
  meta: {
    hidden?: boolean;
    interface?: string | null;
    special?: string[] | null;
  } | null;
};
type Relation = {
  collection: string;
  field: string;
  related_collection: string;
  schema: {
    foreign_key_table?: string;
    foreign_key_column?: string;
    on_delete?: string;
  } | null;
  meta: { one_field?: string; junction_field?: string } | null;
};

const collectionRecords = await request<{ collection: string }[]>(
  "/collections?limit=-1",
);
const collectionNames = new Set(
  collectionRecords.map((collection) => collection.collection),
);
for (const collection of projectCollections) {
  if (!collectionNames.has(collection)) {
    throw new Error(`Missing portfolio collection: ${collection}`);
  }
}
if (projectCollections.length > 25) {
  throw new Error(
    `Portfolio schema uses ${projectCollections.length} collections, exceeding Directus Core's 25-collection allowance.`,
  );
}

const relations = await request<Relation[]>("/relations?limit=-1");
for (const [parent, translations, parentKey] of translationDefinitions) {
  const [parentFields, translationFields] = await Promise.all([
    request<Field[]>(`/fields/${parent}`),
    request<Field[]>(`/fields/${translations}`),
  ]);
  const alias = parentFields.find((field) => field.field === "translations");
  if (
    alias?.meta?.interface !== "translations" ||
    !alias.meta.special?.includes("translations")
  ) {
    throw new Error(`${parent}.translations is not a native Translations alias.`);
  }

  for (const key of [parentKey, "languages_code"]) {
    const field = translationFields.find((candidate) => candidate.field === key);
    if (!field?.meta?.hidden || field.schema?.is_nullable !== true) {
      throw new Error(
        `${translations}.${key} must be a hidden nullable native translation key.`,
      );
    }
  }

  const parentRelation = relations.find(
    (relation) =>
      relation.collection === translations && relation.field === parentKey,
  );
  const languageRelation = relations.find(
    (relation) =>
      relation.collection === translations &&
      relation.field === "languages_code",
  );
  if (
    parentRelation?.related_collection !== parent ||
    parentRelation.meta?.one_field !== "translations" ||
    parentRelation.meta?.junction_field !== "languages_code" ||
    parentRelation.schema?.on_delete !== "SET NULL"
  ) {
    throw new Error(`${translations}.${parentKey} relation is not native.`);
  }
  if (
    languageRelation?.related_collection !== "languages" ||
    languageRelation.meta?.junction_field !== parentKey ||
    languageRelation.schema?.on_delete !== "SET NULL"
  ) {
    throw new Error(`${translations}.languages_code relation is not native.`);
  }
}

const languages = await publicRequest<{ code: string }[]>(
  "/items/languages?sort=code&fields=code",
);
if (languages.map(({ code }) => code).join(",") !== "en,tr") {
  throw new Error("Public language data does not contain exactly en and tr.");
}

const home = await publicRequest<{
  cv_file: string | null;
  translations: { languages_code: string }[];
  skills: { id: string }[];
}>(
  "/items/home_page?fields=cv_file,translations.languages_code,skills.id",
);
if (!home.cv_file || home.translations.length !== 2 || home.skills.length !== 9) {
  throw new Error("Home singleton seed, CV, or its public relations are incomplete.");
}

const projects = await publicRequest<
  {
    slug: string;
    translations: { languages_code: string }[];
    images: { file: string }[];
  }[]
>(
  "/items/projects?limit=-1&fields=slug,translations.languages_code,images.file",
);
if (projects.length !== 5) {
  throw new Error(`Expected 5 seeded projects, found ${projects.length}.`);
}
for (const project of projects) {
  if (project.translations.length !== 2 || !project.images.length) {
    throw new Error(`Project ${project.slug} is missing translations or images.`);
  }
}

const firstFileId = projects[0]?.images[0]?.file;
if (!firstFileId) throw new Error("No public project asset was found.");
const publicAssetResponse = await fetch(`${directusUrl}/assets/${firstFileId}`);
if (publicAssetResponse.ok) {
  throw new Error("Directus files are unexpectedly available anonymously.");
}
const privateAssetResponse = await fetch(`${directusUrl}/assets/${firstFileId}`, {
  headers: {
    authorization: `Bearer ${configuration.DIRECTUS_ASSET_TOKEN}`,
  },
});
if (
  !privateAssetResponse.ok ||
  !privateAssetResponse.headers.get("content-type")?.startsWith("image/")
) {
  throw new Error(
    `Private asset reader request failed (${privateAssetResponse.status}).`,
  );
}

const privateCvResponse = await fetch(`${directusUrl}/assets/${home.cv_file}`, {
  headers: {
    authorization: `Bearer ${configuration.DIRECTUS_ASSET_TOKEN}`,
  },
});
if (
  !privateCvResponse.ok ||
  privateCvResponse.headers.get("content-type") !== "application/pdf"
) {
  throw new Error(
    `Private CV asset request failed (${privateCvResponse.status}).`,
  );
}

const publicUsersResponse = await fetch(`${directusUrl}/users?limit=1`);
if (publicUsersResponse.ok) {
  throw new Error("The public policy can unexpectedly read Directus users.");
}

const publicPolicy = (
  await request<{ id: string; name: string }[]>(
    "/policies?filter[admin_access][_eq]=false&filter[app_access][_eq]=false&limit=-1",
  )
).find((policy) => policy.name === "$t:public_label");
if (!publicPolicy) throw new Error("Directus public policy was not found.");
const unsafePublicPermissions = await request<
  { action: string; collection: string }[]
>(
  `/permissions?filter[policy][_eq]=${publicPolicy.id}&filter[action][_neq]=read&limit=-1&fields=action,collection`,
);
if (unsafePublicPermissions.length) {
  throw new Error("The public policy has one or more non-read permissions.");
}
const publicFilePermissions = await request<{ id: string }[]>(
  `/permissions?filter[policy][_eq]=${publicPolicy.id}&filter[collection][_eq]=directus_files&limit=1&fields=id`,
);
if (publicFilePermissions.length) {
  throw new Error("The public policy can read Directus file records.");
}

const flowId = stableUuid("flow:revalidate-portfolio");
const operationId = stableUuid("operation:revalidate-portfolio");
const flow = await request<{
  status: string;
  trigger: string;
  operation: string;
}>(`/flows/${flowId}`);
if (
  flow.status !== "active" ||
  flow.trigger !== "event" ||
  flow.operation !== operationId
) {
  throw new Error("Portfolio revalidation Flow is not active or connected.");
}
const operation = await request<{ type: string; flow: string }>(
  `/operations/${operationId}`,
);
if (operation.type !== "request" || operation.flow !== flowId) {
  throw new Error("Portfolio revalidation request operation is misconfigured.");
}

console.log(
  `Directus verification passed: ${projectCollections.length} collections, ${translationDefinitions.length} native translation relationships, ${projects.length} public bilingual projects, private asset delivery, read-only public content, and one active revalidation Flow.`,
);
