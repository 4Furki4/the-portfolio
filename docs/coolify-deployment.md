# Coolify production and branch previews

The live portfolio runs in the **Portfolio / production** environment in [Coolify](https://coolify.furkan-cengiz.com). Its public URL is [furkan-cengiz.com](https://furkan-cengiz.com). The migration kept the existing published image, CMS, database, uploads, Cloudflare Tunnel, and loopback port `3004`. Local unpublished changes were not released.

Production is pinned to `furki4/the-portfolio@sha256:fcd0977102b6621a0e91183081367b66b8180f922b7ac8eae21ed1decf777fc1`. Updating `main`, publishing `latest`, or pushing a feature branch does not replace this digest. Promote a tested image deliberately in the `portfolio-production` service, deploy it, then verify the public site and CMS before considering the release complete.

## Test a branch on your phone

1. Create a feature branch from an updated `main`, commit the changes you want to test, and push it to `4Furki4/the-portfolio`.
2. Open **Actions → Branch previews → the latest run**. After the ARM64 image builds and the deployment passes readiness, the summary contains **Open on your phone**.
3. The URL has the form `https://portfolio-<branch-slug>-<12-character-hash>.furkan-cengiz.com`. Subsequent pushes update that same URL. `main` and `develop` are excluded.

Previews are public, marked `noindex, nofollow`, and identify their exact commit in `X-Preview-Commit`. They use published CMS content through a GET/HEAD-only gateway. The asset credential can only read files; previews receive a separate revalidation secret and no database or CMS administration credentials. Previews share published content, so content changes made in the real CMS are visible there too. Each preview has a 768 MiB / 1 CPU limit.

Only pushed commits are deployed. Existing branches created before the workflow was added must receive the deployment files first, for example by merging current `main`. The workflow can also be dispatched manually with a branch and `deploy` or `delete`. Deleting a feature branch queues removal of its owned preview; shared CMS networks and volumes are retained. A recreated branch is protected from stale cleanup runs.

## Host and repository configuration

The Portfolio project has separate `production` and `previews` environments. The preview workflow uses these repository variables:

| Variable | Value |
| --- | --- |
| `COOLIFY_URL` | `https://coolify.furkan-cengiz.com` |
| `COOLIFY_PROJECT_UUID` | `a5qlvsngqywwqkolbwu9wwzl` |
| `COOLIFY_PREVIEW_ENVIRONMENT_UUID` | `3ukidffhsmfhiitlvv8fbwfp` |
| `COOLIFY_SERVER_UUID` | `j9mx0il3ssszkyapfszfzovg` |

Repository secrets are `COOLIFY_TOKEN`, `DOCKERHUB_USERNAME`, and `DOCKERHUB_TOKEN`. The Coolify token has `read`, `write`, and `deploy` abilities and is used only for this repository's previews. It is a team token: keep repository write access limited to trusted contributors and rotate it in Coolify/GitHub when needed. No pull-request-from-fork event receives these secrets.

The Coolify `previews` environment supplies `PREVIEW_DIRECTUS_URL`, `PREVIEW_DIRECTUS_ASSET_TOKEN`, and `PREVIEW_REVALIDATION_SECRET`. Values are kept in Coolify, not Git or build arguments. Runtime settings remain editable in each service. Images are pinned to the immutable digest returned by the successful ARM64 publication.

The shared CMS gateway runs from `/data/coolify/portfolio-preview-gateway` on the Pi. Its source is `scripts/preview/cms-gateway.compose.yml` and `cms-gateway.cfg`. It connects `portfolio-preview-cms` to the existing `the-portfolio_default` network without publishing a host port. Preview app containers join only the preview network and their own Coolify network. The existing wildcard Cloudflare route reaches the Coolify proxy at `127.0.0.1:8088`; preview apps publish no host ports.

## Rollback and maintenance

The stopped `portfolio-app-production` container remains available with restart policy `no`. The migration snapshot, including private original settings, is root-only at `/data/coolify/backups/portfolio-migration-20261018`. To roll back, stop the Coolify `portfolio-production` service, restore `unless-stopped` on the legacy container, start it, and verify port `3004` and the public site. Both containers must never bind that port together.

The legacy `app-production` Compose service requires the explicit `legacy-production` profile and has Watchtower disabled. Running the production Compose file normally maintains the CMS/database without starting the legacy app. Leave their volumes intact. The separate existing development container on port `3005` is unchanged.

Validate deployment tooling with `node --test scripts/preview/*.test.mjs`. API operations check exact repository, branch head, environment, and ownership before mutating resources. A deployment is successful only after fresh public responses show the expected commit, indexing policy, and HTML at least eight seconds apart. API dispatch alone is not a readiness result.
