import { configuration, request, stableUuid } from "./api";

export const contentCollections = [
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

const revalidationCollections = [...contentCollections, "directus_files"];

const publicPolicy = (
  await request<{ id: string; name: string }[]>(
    "/policies?filter[admin_access][_eq]=false&filter[app_access][_eq]=false&limit=-1",
  )
).find((policy) => policy.name === "$t:public_label");

if (!publicPolicy) throw new Error("Directus public policy was not found.");

type Permission = {
  id: string;
  policy: string;
  collection: string;
  action: string;
};

const permissions = await request<Permission[]>("/permissions?limit=-1");
const ensureReadPermission = async (
  collection: string,
  data: Record<string, unknown>,
) => {
  const existing = permissions.find(
    (permission) =>
      permission.policy === publicPolicy.id &&
      permission.collection === collection &&
      permission.action === "read",
  );
  if (existing) {
    await request(`/permissions/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } else {
    await request("/permissions", {
      method: "POST",
      body: JSON.stringify({
        policy: publicPolicy.id,
        collection,
        action: "read",
        ...data,
      }),
    });
  }
};

for (const collection of contentCollections) {
  await ensureReadPermission(collection, {
    permissions: {},
    validation: {},
    presets: null,
    fields: ["*"],
  });
}

const publicFilePermission = permissions.find(
  (permission) =>
    permission.policy === publicPolicy.id &&
    permission.collection === "directus_files" &&
    permission.action === "read",
);
if (publicFilePermission) {
  await request(`/permissions/${publicFilePermission.id}`, { method: "DELETE" });
}

const findByName = async (endpoint: "/roles" | "/policies", name: string) => {
  const records = await request<{ id: string; name: string }[]>(
    `${endpoint}?filter[name][_eq]=${encodeURIComponent(name)}&limit=1`,
  );
  return records[0];
};
const ensureNamed = async (
  endpoint: "/roles" | "/policies",
  name: string,
  data: Record<string, unknown>,
) => {
  const existing = await findByName(endpoint, name);
  if (existing) {
    await request(`${endpoint}/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return existing.id;
  }
  const created = await request<{ id: string }>(endpoint, {
    method: "POST",
    body: JSON.stringify({
      id: stableUuid(`${endpoint}:portfolio-asset-reader`),
      name,
      ...data,
    }),
  });
  return created.id;
};

const assetRole = await ensureNamed("/roles", "Portfolio Asset Reader", {
  icon: "image",
  description: "Non-interactive image delivery for the portfolio website.",
});
const assetPolicy = await ensureNamed("/policies", "Portfolio Asset Reader", {
  icon: "image",
  app_access: false,
  admin_access: false,
  description: "Read-only access to Directus file bytes for the Next.js proxy.",
});
const assetAccess = await request<{ id: string }[]>(
  `/access?filter[role][_eq]=${assetRole}&filter[policy][_eq]=${assetPolicy}&limit=1`,
);
if (!assetAccess.length) {
  await request("/access", {
    method: "POST",
    body: JSON.stringify({ role: assetRole, policy: assetPolicy }),
  });
}

const assetPermission = permissions.find(
  (permission) =>
    permission.policy === assetPolicy &&
    permission.collection === "directus_files" &&
    permission.action === "read",
);
const assetPermissionData = {
  permissions: {},
  validation: {},
  presets: null,
  fields: ["*"],
};
if (assetPermission) {
  await request(`/permissions/${assetPermission.id}`, {
    method: "PATCH",
    body: JSON.stringify(assetPermissionData),
  });
} else {
  await request("/permissions", {
    method: "POST",
    body: JSON.stringify({
      policy: assetPolicy,
      collection: "directus_files",
      action: "read",
      ...assetPermissionData,
    }),
  });
}

const assetUsers = await request<{ id: string }[]>(
  "/users?filter[email][_eq]=portfolio-assets%40example.com&limit=1",
);
const assetUserData = {
  email: "portfolio-assets@example.com",
  first_name: "Portfolio",
  last_name: "Assets",
  role: assetRole,
  status: "active",
  token: configuration.DIRECTUS_ASSET_TOKEN,
};
if (assetUsers[0]) {
  await request(`/users/${assetUsers[0].id}`, {
    method: "PATCH",
    body: JSON.stringify(assetUserData),
  });
} else {
  await request("/users", {
    method: "POST",
    body: JSON.stringify(assetUserData),
  });
}

await request("/settings", {
  method: "PATCH",
  body: JSON.stringify({
    project_name: "Furkan Cengiz Portfolio",
    project_descriptor: "Bilingual portfolio editorial CMS",
  }),
});

const flowId = stableUuid("flow:revalidate-portfolio");
const operationId = stableUuid("operation:revalidate-portfolio");
const flowData = {
  name: "Revalidate portfolio website",
  icon: "published_with_changes",
  color: "#6644FF",
  description:
    "Notifies Next.js whenever published portfolio content changes.",
  status: "active",
  trigger: "event",
  accountability: "$full",
  options: {
    type: "action",
    scope: ["items.create", "items.update", "items.delete"],
    collections: revalidationCollections,
  },
};

const existingFlows = await request<{ id: string }[]>(
  `/flows?filter[id][_eq]=${flowId}&fields=id&limit=1`,
);
if (existingFlows.length) {
  await request(`/flows/${flowId}`, {
    method: "PATCH",
    body: JSON.stringify(flowData),
  });
} else {
  await request("/flows", {
    method: "POST",
    body: JSON.stringify({ id: flowId, ...flowData }),
  });
}

const operationData = {
  name: "Call Next.js revalidation endpoint",
  key: "revalidate_portfolio",
  type: "request",
  position_x: 19,
  position_y: 1,
  options: {
    method: "POST",
    url: "{{ $env.PORTFOLIO_REVALIDATE_URL }}",
    headers: [
      {
        header: "x-revalidation-secret",
        value: "{{ $env.PORTFOLIO_REVALIDATE_SECRET }}",
      },
      { header: "content-type", value: "application/json" },
    ],
    body: {
      collection: "{{ $trigger.collection }}",
      event: "{{ $trigger.event }}",
      keys: "{{ $trigger.keys }}",
    },
  },
  flow: flowId,
  resolve: null,
  reject: null,
};

const existingOperations = await request<{ id: string }[]>(
  `/operations?filter[id][_eq]=${operationId}&fields=id&limit=1`,
);

if (existingOperations.length) {
  await request(`/operations/${operationId}`, {
    method: "PATCH",
    body: JSON.stringify(operationData),
  });
} else {
  await request("/operations", {
    method: "POST",
    body: JSON.stringify({ id: operationId, ...operationData }),
  });
}

await request(`/flows/${flowId}`, {
  method: "PATCH",
  body: JSON.stringify({ operation: operationId }),
});

console.log(
  `Directus public content access, private asset reader, and one revalidation Flow are up to date (${contentCollections.length} content collections).`,
);
