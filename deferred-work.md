- source_spec: `spec-restore-redesign-directus.md`
  summary: Harden Directus schema reconciliation so non-alias field drift and stale native-translation relation metadata fail explicitly or reconcile safely.
  evidence: `scripts/directus/schema.ts` currently skips most existing-field differences and accepts an existing translation foreign key without checking the remaining relation metadata.
- source_spec: `spec-restore-redesign-directus.md`
  summary: Expand the Directus verifier to check every referenced asset and the full revalidation flow configuration.
  evidence: `scripts/directus/verify.ts` samples only the CV and first project image and verifies flow linkage without validating URL, secret header, trigger collections, or a signed probe.
- source_spec: `spec-restore-redesign-directus.md`
  summary: Make Directus security verification distinguish expected authorization denial from upstream or server failures.
  evidence: `scripts/directus/verify.ts` currently treats every non-success response as proof that anonymous asset and user access is denied.
- source_spec: `spec-restore-redesign-directus.md`
  summary: Add explicit CMS slug validation and resilient long-running admin authentication for management scripts.
  evidence: Project slugs are unrestricted in `scripts/directus/schema.ts`, and `scripts/directus/api.ts` does not retry once when a cached admin access token expires mid-run.
