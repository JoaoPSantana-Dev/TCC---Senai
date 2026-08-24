import "dotenv/config";
import { env } from "prisma/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "database/prisma/schema.prisma",

  migrations: {
    path: "database/prisma/migrations",
  },

  datasource: {
    url:  env("DATABASE_URL"),
  },
});
