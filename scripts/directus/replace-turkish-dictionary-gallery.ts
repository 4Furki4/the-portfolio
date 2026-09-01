import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

type Locale = "en" | "tr";
type Request = <T>(path: string, init?: RequestInit) => Promise<T>;

type GalleryManifestItem = {
  filename: string;
  alt: Record<Locale, string>;
};

type PreparedGalleryItem = GalleryManifestItem & {
  bytes: Buffer;
  fileId: string;
  relationId: string;
  translations: Record<Locale, { id: string; alt: string }>;
  width: number;
  height: number;
  size: number;
  sha256: string;
  sort: number;
};

type ProjectImageTranslation = {
  id: string;
  languages_code: string;
  alt: string;
};

type ProjectImage = {
  id: string;
  project_id: string | { id: string } | null;
  file: string | { id: string };
  sort: number | null;
  translations: ProjectImageTranslation[];
};

type Project = {
  id: string;
  slug: string;
};

type DirectusFile = {
  id: string;
  filename_download: string;
  folder: string | { id: string };
  type: string;
  filesize: number | string;
  width: number;
  height: number;
};

type RecoveryState = {
  files: string[];
  relations: string[];
  translations: string[];
};

const projectId = "38991ba9-0a33-5720-a8eb-aa923d16ffc5";
const projectSlug = "Turkish-Dictionary";
const mediaFolderId = "28716ed4-0fad-5273-b23a-3f32f3af092c";
const defaultSiteUrl = "https://furkan-cengiz.com";
const maxInputBytes = 25 * 1024 * 1024;
const maxInputPixels = 50_000_000;
const oldRelationIds = [
  "2421fe9f-ec0d-512a-9d2b-064a26fc8ed4",
  "a4e66e23-a70a-5856-9106-58c583303341",
  "446862fa-9519-59f9-bc99-e8b4167f7c83",
] as const;
const oldFileIds = [
  "5b0b5b3a-1048-5286-b396-c0da98ef8653",
  "177987e3-4a99-5e20-a657-4c1bcfabce5c",
  "d67bfd27-b49d-5374-ac2a-e8ef4b4ba096",
] as const;
const oldRelationIdSet = new Set<string>(oldRelationIds);
let preparedForFailure: PreparedGalleryItem[] | undefined;
let applyStarted = false;

const manifest: GalleryManifestItem[] = [
  {
    filename: "home-page.png",
    alt: {
      en: "Turkish Dictionary home page",
      tr: "Türkçe Sözlük ana sayfası",
    },
  },
  {
    filename: "word-search-page.png",
    alt: {
      en: "Turkish Dictionary word search results",
      tr: "Türkçe Sözlük kelime arama sonuçları",
    },
  },
  {
    filename: "word-search-compact-page.png",
    alt: {
      en: "Compact Turkish Dictionary word search results",
      tr: "Kompakt Türkçe Sözlük kelime arama sonuçları",
    },
  },
  {
    filename: "word-list-page.png",
    alt: {
      en: "Turkish Dictionary word list",
      tr: "Türkçe Sözlük kelime listesi",
    },
  },
  {
    filename: "contribute-new-word-basic-page.png",
    alt: {
      en: "Simple new word contribution form",
      tr: "Basit yeni kelime katkı formu",
    },
  },
  {
    filename: "contribute-new-word-detailed-page.png",
    alt: {
      en: "Detailed new word contribution form",
      tr: "Ayrıntılı yeni kelime katkı formu",
    },
  },
  {
    filename: "pronunciation-voting-page.png",
    alt: {
      en: "Turkish Dictionary pronunciation voting page",
      tr: "Türkçe Sözlük telaffuz oylama sayfası",
    },
  },
  {
    filename: "foreign-term-suggestions-page.png",
    alt: {
      en: "Turkish Dictionary foreign term suggestions",
      tr: "Türkçe Sözlük yabancı terim önerileri",
    },
  },
  {
    filename: "feedback-page.png",
    alt: {
      en: "Turkish Dictionary feedback page",
      tr: "Türkçe Sözlük geri bildirim sayfası",
    },
  },
  {
    filename: "flashcard-game-page.png",
    alt: {
      en: "Turkish Dictionary flashcard game",
      tr: "Türkçe Sözlük kelime kartları oyunu",
    },
  },
  {
    filename: "word-matching-game-page.png",
    alt: {
      en: "Turkish Dictionary word matching game",
      tr: "Türkçe Sözlük kelime eşleştirme oyunu",
    },
  },
  {
    filename: "word-wizard-page.png",
    alt: {
      en: "Turkish Dictionary word wizard game",
      tr: "Türkçe Sözlük kelime sihirbazı oyunu",
    },
  },
  {
    filename: "profile-page.png",
    alt: {
      en: "Turkish Dictionary user profile",
      tr: "Türkçe Sözlük kullanıcı profili",
    },
  },
  {
    filename: "saved-words-page.png",
    alt: {
      en: "Turkish Dictionary saved words",
      tr: "Türkçe Sözlük kaydedilen kelimeler",
    },
  },
  {
    filename: "search-history.png",
    alt: {
      en: "Turkish Dictionary search history",
      tr: "Türkçe Sözlük arama geçmişi",
    },
  },
  {
    filename: "request-detail-page.png",
    alt: {
      en: "Turkish Dictionary contribution request details",
      tr: "Türkçe Sözlük katkı isteği ayrıntıları",
    },
  },
  {
    filename: "offline-dictionary.png",
    alt: {
      en: "Turkish Dictionary offline dictionary download",
      tr: "Türkçe Sözlük çevrim dışı sözlük indirme sayfası",
    },
  },
];

const stableUuid = (key: string) => {
  const bytes = createHash("sha256")
    .update(`portfolio-directus:${key}`)
    .digest()
    .subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const valueId = (value: string | { id: string } | null) =>
  value === null ? null : typeof value === "string" ? value : value.id;

const getArgument = (name: string) => {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value.`);
  }
  return value;
};

const prepareGallery = async (directory: string) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const pngFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".png"))
    .map((entry) => entry.name)
    .toSorted();
  const expectedFiles = manifest.map((item) => item.filename).toSorted();
  if (JSON.stringify(pngFiles) !== JSON.stringify(expectedFiles)) {
    const expected = new Set(expectedFiles);
    const actual = new Set(pngFiles);
    const missing = expectedFiles.filter((filename) => !actual.has(filename));
    const extra = pngFiles.filter((filename) => !expected.has(filename));
    throw new Error(
      `Input PNG set does not match the 17-file manifest. Missing: ${missing.join(", ") || "none"}. Extra: ${extra.join(", ") || "none"}.`,
    );
  }

  const prepared: PreparedGalleryItem[] = [];
  for (const [index, item] of manifest.entries()) {
    const sourcePath = path.join(directory, item.filename);
    const fileStats = await stat(sourcePath);
    if (fileStats.size > maxInputBytes) {
      throw new Error(
        `${item.filename} exceeds the ${maxInputBytes}-byte safety limit.`,
      );
    }
    const bytes = await readFile(sourcePath);
    const image = sharp(bytes, {
      failOn: "error",
      limitInputPixels: maxInputPixels,
    });
    const metadata = await image.metadata();
    if (
      metadata.format !== "png" ||
      !metadata.width ||
      !metadata.height ||
      metadata.width * metadata.height > maxInputPixels
    ) {
      throw new Error(`${item.filename} is not a valid PNG within safe limits.`);
    }
    await image.stats();
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    const versionedKey = `${projectSlug}:2026-09:${item.filename}`;
    prepared.push({
      ...item,
      bytes,
      width: metadata.width,
      height: metadata.height,
      size: bytes.byteLength,
      sha256,
      sort: index + 1,
      fileId: stableUuid(`gallery-file:${versionedKey}`),
      relationId: stableUuid(`gallery-relation:${versionedKey}`),
      translations: {
        en: {
          id: stableUuid(`gallery-translation:${versionedKey}:en`),
          alt: item.alt.en,
        },
        tr: {
          id: stableUuid(`gallery-translation:${versionedKey}:tr`),
          alt: item.alt.tr,
        },
      },
    });
  }

  const hashes = new Set(prepared.map((item) => item.sha256));
  if (hashes.size !== prepared.length) {
    throw new Error("The input gallery contains duplicate image contents.");
  }
  return prepared;
};

const publicReport = (items: PreparedGalleryItem[]) => ({
  mode: process.argv.includes("--apply") ? "apply" : "check-only",
  project: { id: projectId, slug: projectSlug },
  count: items.length,
  images: items.map((item) => ({
    sort: item.sort,
    filename: item.filename,
    width: item.width,
    height: item.height,
    size: item.size,
    sha256: item.sha256,
    fileId: item.fileId,
    relationId: item.relationId,
    translations: item.translations,
  })),
});

const relationFields =
  "id,project_id,file,sort,translations.id,translations.languages_code,translations.alt";
const fileFields = "id,filename_download,folder,type,filesize,width,height";

const withTimeout = (request: Request): Request => (requestPath, init = {}) =>
  request(requestPath, {
    ...init,
    signal: init.signal ?? AbortSignal.timeout(30_000),
  });

const inFilter = (ids: readonly string[]) => encodeURIComponent(ids.join(","));

const getProjectImages = async (request: Request) =>
  request<ProjectImage[]>(
    `/items/project_images?filter[project_id][_eq]=${projectId}&fields=${relationFields}&sort=sort&limit=-1`,
  );

const getNewImages = async (
  request: Request,
  items: PreparedGalleryItem[],
) =>
  request<ProjectImage[]>(
    `/items/project_images?filter[id][_in]=${inFilter(items.map((item) => item.relationId))}&fields=${relationFields}&sort=sort&limit=-1`,
  );

const getOldFiles = async (request: Request) => {
  const files = await request<DirectusFile[]>(
    `/files?filter[id][_in]=${inFilter(oldFileIds)}&fields=${fileFields}&limit=-1`,
  );
  const actualIds = new Set(files.map((file) => file.id));
  const missing = oldFileIds.filter((id) => !actualIds.has(id));
  if (missing.length) {
    throw new Error(`Required rollback files are missing: ${missing.join(", ")}.`);
  }
  return files;
};

const getRecoveryState = async (
  request: Request,
  items: PreparedGalleryItem[],
): Promise<RecoveryState> => {
  const translationIds = items.flatMap((item) =>
    (["en", "tr"] as const).map((locale) => item.translations[locale].id),
  );
  const [files, relations, translations] = await Promise.all([
    request<{ id: string }[]>(
      `/files?filter[id][_in]=${inFilter(items.map((item) => item.fileId))}&fields=id&limit=-1`,
    ),
    request<{ id: string }[]>(
      `/items/project_images?filter[id][_in]=${inFilter(items.map((item) => item.relationId))}&fields=id&limit=-1`,
    ),
    request<{ id: string }[]>(
      `/items/project_image_translations?filter[id][_in]=${inFilter(translationIds)}&fields=id&limit=-1`,
    ),
  ]);
  return {
    files: files.map((item) => item.id).toSorted(),
    relations: relations.map((item) => item.id).toSorted(),
    translations: translations.map((item) => item.id).toSorted(),
  };
};

const snapshot = async (
  label: "before" | "staged" | "after",
  images: ProjectImage[],
  oldFiles: DirectusFile[],
  snapshotDirectory?: string,
) => {
  const timestamp = new Date().toISOString().replaceAll(/[:.]/g, "-");
  const filename = `directus-gallery-${label}-${timestamp}.json`;
  const destination = path.join(snapshotDirectory ?? "/tmp", filename);
  await writeFile(
    destination,
    `${JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        project: { id: projectId, slug: projectSlug },
        images,
        retainedOldFiles: oldFiles,
      },
      null,
      2,
    )}\n`,
    { flag: "wx" },
  );
  return destination;
};

const verifyGallery = (
  actual: ProjectImage[],
  expected: PreparedGalleryItem[],
  expectedProjectId: string | null,
) => {
  if (actual.length !== expected.length) {
    throw new Error(
      `Expected ${expected.length} gallery relations, found ${actual.length}.`,
    );
  }
  for (const item of expected) {
    const relation = actual.find((candidate) => candidate.id === item.relationId);
    if (!relation) throw new Error(`Missing relation ${item.relationId}.`);
    if (
      valueId(relation.project_id) !== expectedProjectId ||
      valueId(relation.file) !== item.fileId ||
      relation.sort !== item.sort
    ) {
      throw new Error(`Relation ${item.relationId} does not match its manifest.`);
    }
    const expectedTranslationIds = new Set(
      (["en", "tr"] as const).map((locale) => item.translations[locale].id),
    );
    if (
      relation.translations.length !== 2 ||
      relation.translations.some(
        (translation) => !expectedTranslationIds.has(translation.id),
      )
    ) {
      throw new Error(
        `Relation ${item.relationId} has unexpected or duplicate translations.`,
      );
    }
    for (const locale of ["en", "tr"] as const) {
      const expectedTranslation = item.translations[locale];
      const translation = relation.translations.find(
        (candidate) => candidate.id === expectedTranslation.id,
      );
      if (
        !translation ||
        translation.languages_code !== locale ||
        translation.alt !== expectedTranslation.alt
      ) {
        throw new Error(
          `Relation ${item.relationId} is missing its verified ${locale} translation.`,
        );
      }
    }
  }
};

const verifyFile = async (request: Request, item: PreparedGalleryItem) => {
  const file = await request<DirectusFile>(
    `/files/${item.fileId}?fields=${fileFields}`,
  );
  if (
    file.id !== item.fileId ||
    file.filename_download !== item.filename ||
    valueId(file.folder) !== mediaFolderId ||
    file.type !== "image/png" ||
    Number(file.filesize) !== item.size ||
    file.width !== item.width ||
    file.height !== item.height
  ) {
    throw new Error(`Uploaded file ${item.fileId} does not match ${item.filename}.`);
  }
};

const verifyPublicAsset = async (
  siteUrl: string,
  item: PreparedGalleryItem,
) => {
  const response = await fetch(
    `${siteUrl}/api/assets/${item.fileId}?gallery-check=${item.sha256}`,
    {
      cache: "no-store",
      headers: { "cache-control": "no-cache" },
      signal: AbortSignal.timeout(30_000),
    },
  );
  if (!response.ok) {
    throw new Error(
      `Public asset ${item.fileId} failed verification with ${response.status}.`,
    );
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  if (sha256 !== item.sha256) {
    throw new Error(`Public asset ${item.fileId} has stale or incorrect bytes.`);
  }
};

const verifyPublicRoutes = async (
  siteUrl: string,
  items: PreparedGalleryItem[],
) => {
  for (const locale of ["en", "tr"] as const) {
    let lastFailure = "the new asset IDs were absent";
    for (let attempt = 1; attempt <= 6; attempt += 1) {
      const response = await fetch(
        `${siteUrl}/${locale}/projects/${projectSlug}?gallery-check=${Date.now()}-${attempt}`,
        {
          cache: "no-store",
          headers: { "cache-control": "no-cache" },
          signal: AbortSignal.timeout(30_000),
        },
      );
      const html = await response.text();
      if (
        response.ok &&
        items.every(
          (item) => html.includes(item.fileId) && html.includes(item.alt[locale]),
        )
      ) {
        lastFailure = "";
        break;
      }
      lastFailure = response.ok
        ? "the new localized gallery was absent"
        : `the route returned ${response.status}`;
      if (attempt < 6) {
        await new Promise((resolve) => setTimeout(resolve, 2_000));
      }
    }
    if (lastFailure) {
      throw new Error(
        `Public ${locale} project route failed pre-cleanup verification: ${lastFailure}.`,
      );
    }
  }
};

const fileForm = (item: PreparedGalleryItem, includeId: boolean) => {
  const form = new FormData();
  if (includeId) form.set("id", item.fileId);
  form.set("folder", mediaFolderId);
  form.set("title", item.alt.en);
  form.set("filename_download", item.filename);
  form.set("type", "image/png");
  form.set(
    "file",
    new Blob([new Uint8Array(item.bytes)], { type: "image/png" }),
    item.filename,
  );
  return form;
};

const upsertTranslation = async (
  request: Request,
  item: PreparedGalleryItem,
  locale: Locale,
) => {
  const translation = item.translations[locale];
  const existing = await request<{ id: string }[]>(
    `/items/project_image_translations?filter[id][_eq]=${translation.id}&fields=id&limit=1`,
  );
  const data = {
    project_image_id: item.relationId,
    languages_code: locale,
    alt: translation.alt,
  };
  if (existing.length) {
    await request(`/items/project_image_translations/${translation.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } else {
    await request("/items/project_image_translations", {
      method: "POST",
      body: JSON.stringify({ id: translation.id, ...data }),
    });
  }
};

const applyGallery = async (
  items: PreparedGalleryItem[],
  snapshotDirectory: string | undefined,
  siteUrl: string,
) => {
  const api = await import("./api");
  const request = withTimeout(api.request);
  const project = await request<Project>(
    `/items/projects/${projectId}?fields=id,slug`,
  );
  if (project.id !== projectId || project.slug !== projectSlug) {
    throw new Error(
      `Directus project identity mismatch: received ${project.id}/${project.slug}.`,
    );
  }

  const before = await getProjectImages(request);
  const allowedRelationIds = new Set<string>([
    ...oldRelationIds,
    ...items.map((item) => item.relationId),
  ]);
  const unexpected = before.filter(
    (relation) => !allowedRelationIds.has(relation.id),
  );
  if (unexpected.length) {
    throw new Error(
      `Refusing to replace an unexpected gallery relation: ${unexpected.map((item) => item.id).join(", ")}.`,
    );
  }
  const oldRelations = before.filter((relation) => oldRelationIdSet.has(relation.id));
  if (oldRelations.length !== 0 && oldRelations.length !== oldRelationIds.length) {
    throw new Error(
      `Refusing partial legacy cleanup state: found ${oldRelations.length} of ${oldRelationIds.length} old relations.`,
    );
  }
  const oldFilesBefore = await getOldFiles(request);
  const beforeSnapshot = await snapshot(
    "before",
    before,
    oldFilesBefore,
    snapshotDirectory,
  );

  if (oldRelations.length === 0) {
    verifyGallery(before, items, projectId);
    for (const item of items) {
      await verifyFile(request, item);
      await verifyPublicAsset(siteUrl, item);
    }
    const afterSnapshot = await snapshot(
      "after",
      before,
      oldFilesBefore,
      snapshotDirectory,
    );
    return {
      status: "already-complete",
      beforeSnapshot,
      afterSnapshot,
      retainedOldFileIds: oldFileIds,
      createdFileIds: items.map((item) => item.fileId),
      createdRelationIds: items.map((item) => item.relationId),
    };
  }

  for (const item of items) {
    const files = await request<{ id: string; folder: string | null }[]>(
      `/files?filter[id][_eq]=${item.fileId}&fields=id,folder&limit=1`,
    );
    if (files.length && valueId(files[0].folder) !== mediaFolderId) {
      throw new Error(`File ID ${item.fileId} already belongs to another folder.`);
    }
    await request(files.length ? `/files/${item.fileId}` : "/files", {
      method: files.length ? "PATCH" : "POST",
      body: fileForm(item, !files.length),
    });

    const relations = await request<
      { id: string; project_id: string | { id: string } | null }[]
    >(
      `/items/project_images?filter[id][_eq]=${item.relationId}&fields=id,project_id&limit=1`,
    );
    const existingProjectId = relations.length
      ? valueId(relations[0].project_id)
      : null;
    if (
      existingProjectId !== null &&
      existingProjectId !== projectId
    ) {
      throw new Error(
        `Relation ID ${item.relationId} already belongs to another project.`,
      );
    }
    const relationData = {
      project_id: null,
      file: item.fileId,
      sort: item.sort,
    };
    if (relations.length) {
      await request(`/items/project_images/${item.relationId}`, {
        method: "PATCH",
        body: JSON.stringify(relationData),
      });
    } else {
      await request("/items/project_images", {
        method: "POST",
        body: JSON.stringify({ id: item.relationId, ...relationData }),
      });
    }
    await upsertTranslation(request, item, "en");
    await upsertTranslation(request, item, "tr");
  }

  const detached = await getNewImages(request, items);
  verifyGallery(detached, items, null);
  for (const item of items) {
    await verifyFile(request, item);
    await verifyPublicAsset(siteUrl, item);
  }

  await request("/items/project_images", {
    method: "PATCH",
    body: JSON.stringify(
      items.map((item) => ({
        id: item.relationId,
        project_id: projectId,
        file: item.fileId,
        sort: item.sort,
      })),
    ),
  });

  const staged = await getProjectImages(request);
  const stagedNew = staged.filter((relation) => !oldRelationIdSet.has(relation.id));
  if (staged.length !== items.length + oldRelationIds.length) {
    throw new Error(`Unexpected staged gallery size: ${staged.length}.`);
  }
  verifyGallery(stagedNew, items, projectId);
  const stagedSnapshot = await snapshot(
    "staged",
    staged,
    oldFilesBefore,
    snapshotDirectory,
  );
  await verifyPublicRoutes(siteUrl, items);

  const preCleanup = await getProjectImages(request);
  const preCleanupNew = preCleanup.filter(
    (relation) => !oldRelationIdSet.has(relation.id),
  );
  if (
    preCleanup.length !== items.length + oldRelationIds.length ||
    oldRelationIds.some(
      (id) => !preCleanup.some((relation) => relation.id === id),
    )
  ) {
    throw new Error("Gallery changed during staging; refusing legacy cleanup.");
  }
  verifyGallery(preCleanupNew, items, projectId);

  await request("/items/project_images", {
    method: "DELETE",
    body: JSON.stringify(oldRelationIds),
  });

  const after = await getProjectImages(request);
  verifyGallery(after, items, projectId);
  const oldFilesAfter = await getOldFiles(request);
  const afterSnapshot = await snapshot(
    "after",
    after,
    oldFilesAfter,
    snapshotDirectory,
  );
  return {
    status: "replaced",
    beforeSnapshot,
    stagedSnapshot,
    afterSnapshot,
    retainedOldFileIds: oldFileIds,
    createdFileIds: items.map((item) => item.fileId),
    createdRelationIds: items.map((item) => item.relationId),
  };
};

const run = async () => {
  const directory = getArgument("--directory");
  if (!directory) {
    throw new Error(
      "Usage: npm run directus:replace-turkish-dictionary-gallery -- --directory <path> [--snapshot-dir <path>] [--site-url <url>] [--apply]",
    );
  }
  const items = await prepareGallery(path.resolve(directory));
  preparedForFailure = items;
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify(publicReport(items), null, 2));
    return;
  }
  applyStarted = true;
  const siteUrl = (getArgument("--site-url") ?? defaultSiteUrl).replace(/\/$/, "");
  const result = await applyGallery(
    items,
    getArgument("--snapshot-dir"),
    siteUrl,
  );
  console.log(JSON.stringify({ ...publicReport(items), ...result }, null, 2));
};

run().catch(async (error: unknown) => {
  const report: Record<string, unknown> = {
    error: error instanceof Error ? error.message : error,
  };
  if (applyStarted && preparedForFailure) {
    report.expectedFileIds = preparedForFailure.map((item) => item.fileId);
    report.expectedRelationIds = preparedForFailure.map(
      (item) => item.relationId,
    );
    try {
      const api = await import("./api");
      report.discovered = await getRecoveryState(
        withTimeout(api.request),
        preparedForFailure,
      );
    } catch (recoveryError) {
      report.recoveryReadError =
        recoveryError instanceof Error ? recoveryError.message : recoveryError;
    }
  }
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
});
