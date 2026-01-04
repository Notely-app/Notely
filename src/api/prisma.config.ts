import "dotenv/config"
import { defineConfig, env } from "prisma/config"

// @ts-ignore
export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: "prisma/migrations",
    datasource: {
        url: env("DATABASE_URL"),
    },
})