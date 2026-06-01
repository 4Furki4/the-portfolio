import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { defineConfig, env } from "prisma/config";

if (existsSync(".env.local")) {
  loadEnvFile(".env.local");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
