import { z } from "zod"

const Env = z.object({
    DATABASE_URL: z.string().min(1),

    WEB_ORIGIN: z.string().url(),
    VITE_API_URL: z.string().url(),

    BETTER_AUTH_SECRET: z.string().min(16),

    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),

    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().int().positive().optional(),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASS: z.string().min(1).optional(),
    FROM_EMAIL: z.string().min(1).optional(),
})

export const env = Env.parse(process.env)