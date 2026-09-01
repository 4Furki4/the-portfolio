---
title: 'Publish the latest Turkish Dictionary gallery and finalize recovery on main'
type: 'chore'
created: '2026-09-02T00:00:00+03:00'
status: 'done'
review_loop_iteration: 0
baseline_commit: '1568c858b4a709be46bc708febeb945d9c86e2bd'
context:
  - '{project-root}/spec-restore-redesign-directus.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The live Turkish Dictionary portfolio entry still shows three screenshots from the older product design, and the deployed recovery commits have not yet been integrated into GitHub `main`.

**Approach:** Upload the 17 supplied PNG screenshots into the existing Directus media folder, attach a fully translated ordered gallery to the existing `Turkish-Dictionary` project, verify it, then remove only the three old gallery relations while retaining their files for rollback. After live verification, fast-forward remote `main` directly to the reviewed recovery branch without a PR or force-push.

## Boundaries & Constraints

**Always:** Use every PNG from `/Users/muhammedfurkancengiz/Downloads/untitled folder/`; keep `home-page.png` first because it is the project thumbnail; create English and Turkish alt text for every image; snapshot existing relation/file IDs before mutation; upload and verify new files and translated relations before removing old relations; retain old Directus files; fetch GitHub immediately before pushing; require `origin/main` to remain an ancestor of `codex/restore-redesign-directus`; use a dry-run before the direct push.

**Ask First:** Any unreadable or duplicate input image, unexpected project ID/slug, failed upload or missing translation, inability to verify all 17 assets, remote `main` divergence, branch-protection rejection requiring a different integration method, or proposed deletion of Directus files.

**Never:** Run Directus schema/setup/seed commands, delete old uploaded files, modify or clean the dirty original `main` checkout, rewrite history, force-push, create a PR, rebuild/redeploy the app image, or change unrelated CMS fields.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Normal gallery swap | 17 readable PNGs and project `38991ba9-0a33-5720-a8eb-aa923d16ffc5` | 17 ordered bilingual gallery relations; home image first; old three relations removed | Verify uploads/relations before cleanup and keep a rollback snapshot |
| Partial upload/relation failure | Any new file, relation, translation, or asset check fails | Existing three-image gallery remains usable; old files and relations are not removed | Stop, report created IDs, and do not proceed to Git push |
| Remote branch moved | Fresh `origin/main` is not an ancestor of recovery tip | No push occurs | Stop and request direction; never force |

</frozen-after-approval>

## Code Map

- `scripts/directus/api.ts` -- authenticated Directus request and stable UUID helpers reused by the one-time gallery operator.
- `lib/directus/data.ts` -- live ordered project-image and translation read contract used for verification.
- `spec-restore-redesign-directus.md` -- approved recovery boundaries and production evidence.
- `/tmp/directus-gallery-*.json` -- secret-free before/after relation snapshots and rollback evidence.

## Tasks & Acceptance

**Execution:**
- [x] `scripts/directus/replace-turkish-dictionary-gallery.ts` -- implement an offline-check-by-default, explicitly applied, idempotent gallery operator with snapshots and cleanup guards.
- [x] `package.json` -- expose the guarded gallery operator through the existing Directus script namespace.
- [x] Offline validation -- verify exactly 17 unique valid PNGs, deterministic ordering/IDs, bilingual alt text, lint, and production build without contacting or mutating Directus.
- [x] Cutover preparation -- document the post-review Directus apply/live verification and ordinary fast-forward push sequence without performing remote mutations.

**Acceptance Criteria:**
- Given the supplied folder, when the operator runs without `--apply`, then it validates exactly 17 unique PNGs and reports the final order, dimensions, hashes, and bilingual alternative text without loading credentials.
- Given a partial or failed apply, when cleanup is evaluated, then the operator refuses to delete old relations unless all 17 new files, relations, and translations verify.
- Given a successful apply, when cleanup executes, then only the three known old gallery relations are deleted and no Directus file deletion endpoint is called.
- Given Git integration preparation, when the final commands are reviewed, then they require a fresh fetch, ancestry check, dry-run, and ordinary non-force refspec while leaving the dirty local `main` checkout unused.

## Post-review Execution

- Apply the reviewed operator to production Directus and retain its before/after snapshots.
- Verify 17 proxied assets plus English/Turkish home and project routes, then confirm the old three file records remain.
- Fresh-fetch GitHub, prove the fast-forward, dry-run, push the recovery ref directly to `main`, and verify the remote OID.

## Design Notes

Gallery order: home, full search, compact search, word list, basic contribution, detailed contribution, pronunciation voting, foreign-term suggestions, feedback, flashcards, word matching, word wizard, profile, saved words, search history, request detail, offline dictionary.

## Verification

**Commands:**
- Authenticated Directus before/after queries -- expected: project ID unchanged, 17 new translated relations, three old file records retained.
- Public asset and locale smoke requests -- expected: all relevant routes and 17 assets return `200`.
- `git fetch origin`, ancestry/count checks, and `git push --dry-run` -- expected: recovery is zero behind and fast-forwardable.
- `git push origin refs/heads/codex/restore-redesign-directus:refs/heads/main` -- expected: remote `main` resolves to the recovery tip without force.

## Post-review Runbook

1. From `/tmp/the-portfolio-directus-recovery`, apply the reviewed operator with the local production credential file while keeping secret-free snapshots in `/tmp`:
   `DIRECTUS_ENV_FILE=/Users/muhammedfurkancengiz/Development/the-portfolio/.env.directus.production.pi DIRECTUS_URL=https://cms.furkan-cengiz.com npm run directus:replace-turkish-dictionary-gallery -- --directory '/Users/muhammedfurkancengiz/Downloads/untitled folder' --snapshot-dir /tmp --apply`
   The operator fully decodes the source PNGs, replaces bytes on retry, stages relations detached from the project until both translations exist, compares every live proxied asset byte-for-byte by SHA-256, attaches the new relations in one batch, and requires both localized public project routes to expose all 17 new assets before its single-request legacy cleanup.
2. Query the project and retained file records through authenticated Directus reads; require 17 ordered relations, both `en` and `tr` translations for each, and all three old file IDs still present. Request every new `/api/assets/{id}` URL and both locale project routes again, then inspect the live gallery in a browser.
3. Commit the reviewed operator/spec locally, then integrate without touching the dirty original checkout:
   `git fetch origin`
   `git merge-base --is-ancestor origin/main codex/restore-redesign-directus`
   `git rev-list --left-right --count origin/main...codex/restore-redesign-directus`
   `git push --dry-run origin refs/heads/codex/restore-redesign-directus:refs/heads/main`
   `git push origin refs/heads/codex/restore-redesign-directus:refs/heads/main`
   `git ls-remote --exit-code --heads origin main`
   `git rev-parse codex/restore-redesign-directus`
   Require the OID printed by `git ls-remote` to equal the recovery OID printed by `git rev-parse` exactly.
4. Stop before the Directus relation cleanup or Git push if any expected identity, count, translation, asset response, ancestry, or zero-behind check fails. Never force-push or delete Directus files.

## Implementation Evidence

- Offline operator check: 17 valid, content-unique PNGs; deterministic positions 1-17; `home-page.png` first; English and Turkish alt text present for each image.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `DIRECTUS_URL=https://cms.furkan-cengiz.com npm run build`: passed; public CMS reads only, no Directus mutation.
- `git diff --check`: passed.
- Independent review patches: exact byte replacement/hash verification, detached bilingual relation staging, rollback-file preflight, exact translation-set validation, bounded requests, pre-cleanup localized route checks, batch attach/delete, partial-state reporting, and exact remote-OID verification.

## Suggested Review Order

**Safe gallery cutover**

- Start with the guarded staging, verification, batch attachment, and cleanup sequence.
  [`replace-turkish-dictionary-gallery.ts:579`](scripts/directus/replace-turkish-dictionary-gallery.ts#L579)

- Require exact relation identity and exactly two localized translations per image.
  [`replace-turkish-dictionary-gallery.ts:405`](scripts/directus/replace-turkish-dictionary-gallery.ts#L405)

- Preflight rollback files before any production mutation begins.
  [`replace-turkish-dictionary-gallery.ts:342`](scripts/directus/replace-turkish-dictionary-gallery.ts#L342)

**Asset integrity and live readiness**

- Decode every bounded input PNG before accepting its deterministic manifest entry.
  [`replace-turkish-dictionary-gallery.ts:227`](scripts/directus/replace-turkish-dictionary-gallery.ts#L227)

- Compare live proxied bytes against each source SHA-256 before cleanup.
  [`replace-turkish-dictionary-gallery.ts:473`](scripts/directus/replace-turkish-dictionary-gallery.ts#L473)

- Confirm both localized public routes expose every new image and alt.
  [`replace-turkish-dictionary-gallery.ts:497`](scripts/directus/replace-turkish-dictionary-gallery.ts#L497)

**Recovery and entry points**

- Report discovered partial objects alongside deterministic IDs after failed applies.
  [`replace-turkish-dictionary-gallery.ts:354`](scripts/directus/replace-turkish-dictionary-gallery.ts#L354)

- Keep offline validation default and require explicit production apply mode.
  [`replace-turkish-dictionary-gallery.ts:764`](scripts/directus/replace-turkish-dictionary-gallery.ts#L764)

- Expose the operator consistently within the existing Directus script namespace.
  [`package.json:14`](package.json#L14)
