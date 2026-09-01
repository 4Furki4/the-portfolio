import { request } from "./api";

type Field = {
  field: string;
  type: string;
  schema?: Record<string, unknown> | null;
  meta?: Record<string, unknown> | null;
  synchronize?: boolean;
};

type CollectionDefinition = {
  collection: string;
  note: string;
  icon?: string;
  hidden?: boolean;
  singleton?: boolean;
  versioning?: boolean;
  fields: Field[];
};

type Relation = {
  collection: string;
  field: string;
  relatedCollection: string;
  relatedField?: string;
  oneField?: string | null;
  junctionField?: string | null;
  onDelete?: "CASCADE" | "RESTRICT" | "SET NULL";
  requireForeignKey?: boolean;
};

const idField: Field = {
  field: "id",
  type: "uuid",
  schema: { is_primary_key: true, is_nullable: false },
  meta: {
    hidden: true,
    readonly: true,
    interface: "input",
    special: ["uuid"],
  },
};

const languageCodeField: Field = {
  field: "code",
  type: "string",
  schema: { is_primary_key: true, is_nullable: false, max_length: 16 },
  meta: { interface: "input", required: true },
};

const sortField: Field = {
  field: "sort",
  type: "integer",
  schema: { is_nullable: true },
  meta: { interface: "input" },
};

const requiredString = (
  field: string,
  maxLength = 255,
  meta: Record<string, unknown> = {},
): Field => ({
  field,
  type: "string",
  schema: { is_nullable: false, max_length: maxLength },
  meta: { interface: "input", required: true, ...meta },
});

const optionalString = (
  field: string,
  maxLength = 255,
  meta: Record<string, unknown> = {},
): Field => ({
  field,
  type: "string",
  schema: { is_nullable: true, max_length: maxLength },
  meta: { interface: "input", ...meta },
});

const uniqueString = (
  field: string,
  maxLength = 255,
  meta: Record<string, unknown> = {},
): Field => ({
  ...requiredString(field, maxLength, meta),
  schema: { is_nullable: false, is_unique: true, max_length: maxLength },
});

const textField = (
  field: string,
  required = false,
  meta: Record<string, unknown> = {},
): Field => ({
  field,
  type: "text",
  schema: { is_nullable: !required },
  meta: {
    interface: "input-rich-text-html",
    required,
    ...meta,
  },
});

const jsonField = (field: string): Field => ({
  field,
  type: "json",
  schema: { is_nullable: true },
  meta: { interface: "tags" },
});

const dateField = (field: string, required = false): Field => ({
  field,
  type: "date",
  schema: { is_nullable: !required },
  meta: { interface: "datetime", required },
});

const foreignKey = (field: string, required = false): Field => ({
  field,
  type: "uuid",
  schema: { is_nullable: !required },
  meta: { interface: "select-dropdown-m2o", required },
});

const fileField = (
  field: string,
  required = false,
  interfaceName = "file-image",
): Field => ({
  field,
  type: "uuid",
  schema: { is_nullable: !required },
  meta: {
    interface: interfaceName,
    special: ["file"],
    required,
    options: { folder: null },
  },
});

const languageKey = (): Field => ({
  field: "languages_code",
  type: "string",
  schema: { is_nullable: true, max_length: 255 },
  meta: { interface: null, options: null, required: false, hidden: true },
  synchronize: true,
});

const translationParentKey = (field: string): Field => ({
  field,
  type: "uuid",
  schema: { is_nullable: true },
  meta: { interface: null, options: null, required: false, hidden: true },
  synchronize: true,
});

const alias = (field: string, interfaceName = "list-o2m"): Field => ({
  field,
  type: "alias",
  schema: null,
  meta: { special: ["o2m"], interface: interfaceName },
});

const translationsAlias = (): Field => ({
  field: "translations",
  type: "alias",
  schema: null,
  meta: {
    special: ["translations"],
    interface: "translations",
    options: null,
  },
});

const collections: CollectionDefinition[] = [
  {
    collection: "languages",
    note: "Locales available to Directus native portfolio translations.",
    icon: "translate",
    fields: [
      languageCodeField,
      requiredString("name", 80),
      requiredString("direction", 3, {
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "Left to right", value: "ltr" },
            { text: "Right to left", value: "rtl" },
          ],
        },
      }),
    ],
  },
  {
    collection: "home_page",
    note: "Localized home-page copy and its ordered skill/social relations.",
    icon: "home",
    singleton: true,
    versioning: true,
    fields: [
      idField,
      fileField("cv_file", false, "file"),
      translationsAlias(),
      alias("skills"),
      alias("social_links"),
    ],
  },
  {
    collection: "home_page_translations",
    note: "Localized home-page and SEO copy.",
    icon: "import_export",
    hidden: true,
    fields: [
      idField,
      translationParentKey("home_page_id"),
      languageKey(),
      requiredString("hero_title", 500),
      requiredString("hero_subtitle", 1000, { interface: "input-multiline" }),
      requiredString("role", 255),
      requiredString("code_name", 255),
      requiredString("code_role", 255),
      requiredString("code_passion", 500),
      requiredString("seo_title", 255),
      requiredString("seo_description", 1000, { interface: "input-multiline" }),
    ],
  },
  {
    collection: "about_page",
    note: "Localized about-page copy, portrait, education and courses.",
    icon: "person",
    singleton: true,
    versioning: true,
    fields: [
      idField,
      fileField("profile_image", true),
      translationsAlias(),
      alias("education"),
      alias("courses"),
    ],
  },
  {
    collection: "about_page_translations",
    note: "Localized biography, section headings and about-page SEO.",
    icon: "import_export",
    hidden: true,
    fields: [
      idField,
      translationParentKey("about_page_id"),
      languageKey(),
      requiredString("profile_image_alt", 500),
      requiredString("adventure_title", 255),
      textField("adventure_body", true),
      requiredString("education_title", 255),
      requiredString("courses_title", 255),
      requiredString("github_title", 255),
      requiredString("seo_title", 255),
      requiredString("seo_description", 1000, { interface: "input-multiline" }),
    ],
  },
  {
    collection: "projects_page",
    note: "Localized projects-index heading and SEO copy.",
    icon: "work",
    singleton: true,
    versioning: true,
    fields: [idField, translationsAlias()],
  },
  {
    collection: "projects_page_translations",
    note: "Localized projects-index copy.",
    icon: "import_export",
    hidden: true,
    fields: [
      idField,
      translationParentKey("projects_page_id"),
      languageKey(),
      requiredString("heading", 255),
      requiredString("seo_title", 255),
      requiredString("seo_description", 1000, { interface: "input-multiline" }),
    ],
  },
  {
    collection: "projects",
    note: "Portfolio projects. Slugs are shared across locales to preserve existing URLs.",
    icon: "workspaces",
    versioning: true,
    fields: [
      idField,
      uniqueString("slug", 160, {
        note: "Stable route segment. Do not change after publication without a redirect.",
      }),
      requiredString("completion_status", 32, {
        interface: "select-dropdown",
        display: "labels",
        options: {
          choices: [
            { text: "Completed", value: "completed", color: "#2ECDA7" },
            { text: "In progress", value: "in-progress", color: "#FFC23B" },
            { text: "Planned", value: "planned", color: "#E35169" },
          ],
        },
      }),
      requiredString("repo_url", 2000),
      optionalString("demo_url", 2000),
      sortField,
      translationsAlias(),
      alias("images"),
      alias("technologies", "list-m2m"),
      alias("contributors"),
    ],
  },
  {
    collection: "project_translations",
    note: "Localized project titles and descriptions.",
    icon: "import_export",
    hidden: true,
    fields: [
      idField,
      translationParentKey("project_id"),
      languageKey(),
      requiredString("title", 500),
      textField("description", true, { interface: "input-multiline" }),
    ],
  },
  {
    collection: "project_images",
    note: "Ordered project screenshots with localized alternative text.",
    icon: "image",
    fields: [
      idField,
      foreignKey("project_id"),
      fileField("file", true),
      sortField,
      translationsAlias(),
    ],
  },
  {
    collection: "project_image_translations",
    note: "Localized project screenshot alternative text.",
    icon: "import_export",
    hidden: true,
    fields: [
      idField,
      translationParentKey("project_image_id"),
      languageKey(),
      requiredString("alt", 500),
    ],
  },
  {
    collection: "technologies",
    note: "Reusable technologies linked to portfolio projects.",
    icon: "code",
    fields: [idField, uniqueString("name", 255), optionalString("url", 2000)],
  },
  {
    collection: "project_technologies",
    note: "Ordered project/technology junction.",
    icon: "link",
    hidden: true,
    fields: [
      idField,
      foreignKey("project_id", true),
      foreignKey("technology_id", true),
      sortField,
    ],
  },
  {
    collection: "project_contributors",
    note: "Ordered contributors shown on project detail pages.",
    icon: "group",
    fields: [
      idField,
      foreignKey("project_id", true),
      requiredString("name", 255),
      requiredString("github_url", 2000),
      sortField,
    ],
  },
  {
    collection: "education",
    note: "Ordered education timeline with localized copy.",
    icon: "school",
    versioning: true,
    fields: [
      idField,
      foreignKey("about_page_id", true),
      dateField("start_date", true),
      dateField("end_date"),
      sortField,
      translationsAlias(),
    ],
  },
  {
    collection: "education_translations",
    note: "Localized education titles, institutions and descriptions.",
    icon: "import_export",
    hidden: true,
    fields: [
      idField,
      translationParentKey("education_id"),
      languageKey(),
      requiredString("title", 500),
      requiredString("institution", 500),
      textField("description", true, { interface: "input-multiline" }),
    ],
  },
  {
    collection: "courses",
    note: "Ordered completed courses with localized summary and tags.",
    icon: "menu_book",
    versioning: true,
    fields: [
      idField,
      foreignKey("about_page_id", true),
      requiredString("instructor", 255),
      requiredString("url", 2000),
      fileField("image", true),
      sortField,
      translationsAlias(),
    ],
  },
  {
    collection: "course_translations",
    note: "Localized course titles, summaries and tag labels.",
    icon: "import_export",
    hidden: true,
    fields: [
      idField,
      translationParentKey("course_id"),
      languageKey(),
      requiredString("title", 500),
      textField("summary", true, { interface: "input-multiline" }),
      jsonField("tags"),
    ],
  },
  {
    collection: "skills",
    note: "Ordered skills displayed in the home-page code panel.",
    icon: "terminal",
    fields: [
      idField,
      foreignKey("home_page_id", true),
      requiredString("name", 255),
      fileField("icon", true),
      sortField,
    ],
  },
  {
    collection: "social_links",
    note: "Ordered home-page social and contact links.",
    icon: "share",
    fields: [
      idField,
      foreignKey("home_page_id", true),
      requiredString("kind", 32, {
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "GitHub", value: "github" },
            { text: "LinkedIn", value: "linkedin" },
            { text: "Email", value: "email" },
          ],
        },
      }),
      requiredString("url", 2000),
      requiredString("label", 255),
      sortField,
    ],
  },
];

const translationRelations = (
  parent: string,
  translations: string,
  parentKey: string,
): Relation[] => [
  {
    collection: translations,
    field: parentKey,
    relatedCollection: parent,
    oneField: "translations",
    junctionField: "languages_code",
    onDelete: "SET NULL",
    requireForeignKey: true,
  },
  {
    collection: translations,
    field: "languages_code",
    relatedCollection: "languages",
    relatedField: "code",
    junctionField: parentKey,
    onDelete: "SET NULL",
    requireForeignKey: true,
  },
];

const relations: Relation[] = [
  ...translationRelations("home_page", "home_page_translations", "home_page_id"),
  ...translationRelations("about_page", "about_page_translations", "about_page_id"),
  ...translationRelations("projects_page", "projects_page_translations", "projects_page_id"),
  ...translationRelations("projects", "project_translations", "project_id"),
  ...translationRelations(
    "project_images",
    "project_image_translations",
    "project_image_id",
  ),
  ...translationRelations("education", "education_translations", "education_id"),
  ...translationRelations("courses", "course_translations", "course_id"),
  {
    collection: "skills",
    field: "home_page_id",
    relatedCollection: "home_page",
    oneField: "skills",
  },
  {
    collection: "social_links",
    field: "home_page_id",
    relatedCollection: "home_page",
    oneField: "social_links",
  },
  {
    collection: "education",
    field: "about_page_id",
    relatedCollection: "about_page",
    oneField: "education",
  },
  {
    collection: "courses",
    field: "about_page_id",
    relatedCollection: "about_page",
    oneField: "courses",
  },
  {
    collection: "project_images",
    field: "project_id",
    relatedCollection: "projects",
    oneField: "images",
  },
  {
    collection: "project_technologies",
    field: "project_id",
    relatedCollection: "projects",
    oneField: "technologies",
  },
  {
    collection: "project_technologies",
    field: "technology_id",
    relatedCollection: "technologies",
    oneField: "projects",
  },
  {
    collection: "project_contributors",
    field: "project_id",
    relatedCollection: "projects",
    oneField: "contributors",
  },
  {
    collection: "home_page",
    field: "cv_file",
    relatedCollection: "directus_files",
    onDelete: "SET NULL",
  },
  {
    collection: "about_page",
    field: "profile_image",
    relatedCollection: "directus_files",
    onDelete: "SET NULL",
  },
  {
    collection: "project_images",
    field: "file",
    relatedCollection: "directus_files",
    onDelete: "SET NULL",
  },
  {
    collection: "courses",
    field: "image",
    relatedCollection: "directus_files",
    onDelete: "SET NULL",
  },
  {
    collection: "skills",
    field: "icon",
    relatedCollection: "directus_files",
    onDelete: "SET NULL",
  },
];

const existingCollections = await request<{ collection: string }[]>("/collections");
const collectionNames = new Set(
  existingCollections.map(({ collection }) => collection),
);

for (const definition of collections) {
  const collectionMeta = {
    icon: definition.icon ?? "folder",
    note: definition.note,
    hidden: definition.hidden ?? false,
    singleton: definition.singleton ?? false,
    versioning: definition.versioning ?? false,
  };
  if (!collectionNames.has(definition.collection)) {
    await request("/collections", {
      method: "POST",
      body: JSON.stringify({
        collection: definition.collection,
        meta: collectionMeta,
        schema: {},
        fields: [
          definition.fields.find(
            (field) => field.schema?.is_primary_key === true,
          ) ?? idField,
        ],
      }),
    });
  } else {
    await request(`/collections/${definition.collection}`, {
      method: "PATCH",
      body: JSON.stringify({ meta: collectionMeta }),
    });
  }

  const existingFields = await request<{ field: string }[]>(
    `/fields/${definition.collection}`,
  );
  const fieldNames = new Set(existingFields.map(({ field }) => field));
  for (const field of definition.fields) {
    const fieldData = {
      field: field.field,
      type: field.type,
      ...(field.schema !== undefined ? { schema: field.schema } : {}),
      ...(field.meta !== undefined ? { meta: field.meta } : {}),
    };
    if (!fieldNames.has(field.field)) {
      await request(`/fields/${definition.collection}`, {
        method: "POST",
        body: JSON.stringify(fieldData),
      });
    } else if (field.type === "alias" || field.synchronize) {
      await request(`/fields/${definition.collection}/${field.field}`, {
        method: "PATCH",
        body: JSON.stringify({ schema: field.schema, meta: field.meta }),
      });
    } else if (field.schema?.is_unique === true) {
      await request(`/fields/${definition.collection}/${field.field}`, {
        method: "PATCH",
        body: JSON.stringify({ schema: { is_unique: true } }),
      });
    }
  }
}

const existingRelations = await request<
  {
    collection: string;
    field: string;
    schema: Record<string, unknown> | null;
  }[]
>("/relations?limit=-1");

for (const relation of relations) {
  const onDelete =
    relation.onDelete ??
    (relation.relatedCollection === "directus_files" ? "SET NULL" : "CASCADE");
  const relatedField = relation.relatedField ?? "id";
  const data = {
    schema: relation.requireForeignKey
      ? {
          table: relation.collection,
          column: relation.field,
          foreign_key_table: relation.relatedCollection,
          foreign_key_column: relatedField,
          constraint_name: `${relation.collection}_${relation.field}_foreign`,
          on_update: "NO ACTION",
          on_delete: onDelete,
        }
      : { on_delete: onDelete },
    meta: {
      ...(relation.oneField !== undefined
        ? { one_field: relation.oneField }
        : {}),
      ...(relation.junctionField !== undefined
        ? { junction_field: relation.junctionField }
        : {}),
    },
  };
  const existing = existingRelations.find(
    (candidate) =>
      candidate.collection === relation.collection &&
      candidate.field === relation.field,
  );
  const hasNativeForeignKey =
    relation.requireForeignKey &&
    existing?.schema?.table === relation.collection &&
    existing.schema.column === relation.field &&
    existing.schema.foreign_key_table === relation.relatedCollection &&
    existing.schema.foreign_key_column === relatedField &&
    existing.schema.on_delete === onDelete;

  if (hasNativeForeignKey) continue;
  if (existing && !relation.requireForeignKey) {
    await request(`/relations/${relation.collection}/${relation.field}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    continue;
  }
  if (existing) {
    await request(`/relations/${relation.collection}/${relation.field}`, {
      method: "DELETE",
    });
  }
  await request("/relations", {
    method: "POST",
    body: JSON.stringify({
      collection: relation.collection,
      field: relation.field,
      related_collection: relation.relatedCollection,
      ...data,
    }),
  });
}

console.log(`Directus schema is up to date (${collections.length} project collections).`);
