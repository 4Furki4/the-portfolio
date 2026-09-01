---
title: 'Restore redesigned portfolio with Directus content'
type: 'bugfix'
created: '2026-09-01T13:25:00+03:00'
status: 'done'
review_loop_iteration: 0
baseline_commit: '62b3eb0018ca2540583542d2d15ace6704a6f6c1'
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The Directus production deployment was built from stale commit `7edfcd2`, replacing the redesigned portfolio from `origin/main` (`62b3eb0`) with the older interface. The Git history and CMS data remain intact, but production combines the wrong visual base with the new CMS integration.

**Approach:** Port the existing Directus data, translation, asset, CV, schema, and revalidation contracts onto an isolated branch based on the redesigned `origin/main`. Preserve the redesigned components and interaction patterns, verify CMS behavior locally, and only then build and deploy the corrected image to the Pi.

## Boundaries & Constraints

**Always:** Leave the original dirty checkout untouched; preserve the existing Directus collections, translations, file UUIDs, CV relation, database volumes, public routes, localized paths, and asset proxy contract. Treat the redesigned `origin/main` components as the visual source of truth. Keep CMS-derived HTML sanitized and make empty featured-project data render safely.

**Ask First:** Any destructive Directus schema/data operation, force-push or history rewrite, production database reset, deletion of existing files/volumes, or redesign change beyond adapting data props.

**Never:** Apply the old UI patch wholesale, replace the redesigned primitives with legacy HeroUI cards, overwrite the dirty source checkout, expose secrets, remove the development container as an orphan, or deploy before lint, build, and visual checks pass.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Normal CMS content | English or Turkish Directus records exist | Redesigned home, about, projects, metadata, images, and CV use localized CMS values | N/A |
| Missing requested translation | Locale record absent but English exists | English Directus translation is used without breaking layout | Existing fallback contract remains |
| No featured projects | Directus project list is empty | Home renders redesigned hero and CTAs without indexing an undefined project | Omit featured-project surface |
| Asset or blur lookup fails | CMS asset is unavailable | Page keeps layout and uses the existing blur fallback where applicable | Do not crash solely on blur generation |
| Revalidation webhook | Valid secret and Directus update | Content tag and localized layout paths are invalidated | Invalid secret remains unauthorized |

</frozen-after-approval>

## Code Map

- `app/[locale]/**` -- redesigned route, metadata, and localized page boundaries that will fetch Directus content.
- `features/Home/Home.tsx` -- redesigned hero and featured-project layout; accepts CMS content without legacy code-block UI.
- `features/About/**` -- redesigned about surfaces adapted to CMS profile, rich text, education, and courses.
- `features/Projects/Cards/**` -- redesigned listing/detail cards adapted to localized Directus project types.
- `components/Footer.tsx` -- redesigned footer with the Directus-managed CV URL.
- `lib/directus/**` -- validated Directus fetch, localization, sanitization, asset, and content types.
- `app/api/**`, `scripts/directus/**`, `docker-compose*.yml` -- asset proxy, revalidation, CMS management, and Pi deployment contracts.

## Tasks & Acceptance

**Execution:**
- [x] Directus support/configuration files -- copy the proven CMS contracts into the recovery branch without copying legacy presentation files.
- [x] `app/[locale]/**` -- replace static content sources with Directus getters while retaining redesigned metadata, paths, and page structure.
- [x] `features/**` and `components/Footer.tsx` -- adapt redesigned component props to localized CMS types, including safe empty states and the CV URL.
- [x] Dependency/config files -- merge only the packages and runtime settings required by Directus and Pi deployment.
- [x] Production deployment preparation -- validate the compose/image contracts and a reversible cutover sequence; execute the Pi cutover only after review.

**Acceptance Criteria:**
- Given the corrected branch, when the app is rendered in English and Turkish, then the visual hierarchy uses the redesigned `Surface`, `Reveal`, typography, navigation, project cards, and about sections while content comes from Directus.
- Given the current production Directus database, when the corrected image starts, then existing content, translations, images, and CV UUID work without migration or reseeding.
- Given a valid Directus revalidation request, when it completes, then the response is successful and both tagged content and localized layouts are invalidated.
- Given the local production preview, when clean English and Turkish pages are fetched at desktop and mobile widths, then both locales show the redesigned UI, reference the current CV UUID, and the PDF returns HTTP 200.

## Post-review Production Cutover

- Build and push the reviewed image while retaining the current image as rollback evidence.
- Recreate only `app-production`; do not remove the development container or Directus services/volumes.
- Restore Watchtower and verify it does not replace the reviewed image.
- Fetch clean public English/Turkish home, projects, about, and CV routes and confirm the redesigned UI and current CMS content.

## Design Notes

The redesigned `origin/main` presentation is authoritative. Port CMS values into its component contracts; do not port the old component markup. New design-only labels or explanatory sections that have no existing Directus fields may remain in `next-intl`, while the content already modeled in Directus stays CMS-owned.

## Verification

**Commands:**
- `npm install --legacy-peer-deps` -- expected: dependencies resolve with the merged package manifest.
- `npm run lint` -- expected: no ESLint errors.
- `npm run build` -- expected: Next.js production compilation and type checking succeed.
- Production smoke requests -- expected: `/`, `/tr`, projects, about, revalidation, and current CV asset return expected statuses/content.

**Manual checks (if no CLI):**
- Compare recovery pages with the redesigned `origin/main` layout at desktop and mobile widths before deployment.
- Confirm Cloudflare continues bypassing HTML page caching while static-asset cache rules remain active.

## Implementation Evidence

- `npm install --legacy-peer-deps` completed with the merged manifest.
- `npm run lint` passed.
- `DIRECTUS_URL=https://cms.furkan-cengiz.com npm run build` passed with Next.js 16.2.7.
- Local production preview verified English and Turkish home, about, projects, project detail, responsive navigation, CMS images, and redesigned surfaces with no browser warnings.
- Current CV asset `ea4d3fa6-9cd7-484a-afa6-c73fd2177acb` returned `200 application/pdf` with 83,401 bytes.
- Directus revalidation returned `401` without the secret and `200` with the configured secret.
- `git diff --check` passed; the original dirty checkout was not edited by the recovery worktree.

## Review Evidence

- Two independent adversarial reviews covered every tracked and untracked file against baseline `62b3eb0018ca2540583542d2d15ace6704a6f6c1`.
- Fixed the production Docker build-time CMS URL and removed Compose secret interpolation that bypassed service `env_file` values.
- Fixed relative Directus blur-image loading, image-less project crashes, unsorted records taking priority, hard-coded contact links, asset transport failures, and stale same-UUID asset caching.
- Added `directus_files` to the revalidation trigger collection set.
- Re-ran lint, Next.js build, a clean Docker build, Docker Compose config validation, English/Turkish browser checks, current CV delivery, authorized revalidation, and a forced upstream asset failure returning `502`.
- Broader pre-existing Directus management-script hardening is recorded in `deferred-work.md` and is not required for this production recovery.

## Suggested Review Order

**Redesigned CMS entry points**

- Starts at the redesigned home route and maps localized CMS projects into its existing composition.
  [`page.tsx:7`](./app/[locale]/page.tsx#L7)

- Centralizes Directus fetching, localization, sanitization, ordering, and safe project filtering.
  [`data.ts:119`](./lib/directus/data.ts#L119)

- Preserves the redesigned hero, surfaces, CTAs, and empty featured-project behavior.
  [`Home.tsx:28`](./features/Home/Home.tsx#L28)

**Localized portfolio surfaces**

- Binds CMS biography, education, courses, and profile media into redesigned About sections.
  [`page.tsx:33`](./app/[locale]/about/page.tsx#L33)

- Builds the redesigned CMS project index with resilient Directus image placeholders.
  [`page.tsx:33`](./app/[locale]/projects/page.tsx#L33)

- Resolves localized Directus project detail while keeping the redesigned detail card.
  [`page.tsx:45`](./app/[locale]/projects/[endpoint]/page.tsx#L45)

**Assets, CV, and content freshness**

- Proxies private Directus files with UUID validation, timeout handling, and no stale browser cache.
  [`route.ts:8`](./app/api/assets/[id]/route.ts#L8)

- Loads Directus assets directly when generating redesigned blur placeholders.
  [`getBase64ImageUrl.ts:9`](./lib/getBase64ImageUrl.ts#L9)

- Keeps the redesigned footer while sourcing CV and social links from Directus.
  [`Footer.tsx:8`](./components/Footer.tsx#L8)

- Authenticates Directus webhook requests and invalidates tagged localized content.
  [`route.ts:16`](./app/api/revalidate/directus/route.ts#L16)

**Pi deployment contract**

- Gives clean Docker builds an explicit public CMS source during static generation.
  [`Dockerfile:10`](./Dockerfile#L10)

- Runs app, database, and Directus without host-side secret interpolation leaks.
  [`docker-compose.production.yml:2`](./docker-compose.production.yml#L2)

- Revalidates page references when Directus file records change.
  [`configure.ts:26`](./scripts/directus/configure.ts#L26)

**Supporting metadata and operations**

- Uses CMS metadata while preserving localized navigation, typography, particles, and footer composition.
  [`layout.tsx:16`](./app/[locale]/layout.tsx#L16)

- Replaces generated legacy sitemap files with runtime Directus-aware route discovery.
  [`sitemap.ts:8`](./app/sitemap.ts#L8)

- Records non-blocking Directus management-script hardening outside this recovery scope.
  [`deferred-work.md:1`](./deferred-work.md#L1)
