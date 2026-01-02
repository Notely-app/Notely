import { Hono } from "hono"
import { cors } from "hono/cors"
import { auth} from "./auth"
import { env } from "./env"

const app = new Hono()

app.use(
    "/api/*",
    cors({
        origin: env.WEB_ORIGIN,
        credentials: true,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
)

app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw))

app.get("/api/hello", async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })
    if(!session?.user) {
        return c.json({message: "hello stranger "})
    }

    const name = session.user.name ?? session.user.email
    return c.json({ message: `hello ${name}` })
})

app.get("/api/health", (c) => c.json({ ok: true }))

Bun.serve({
    hostname: "0.0.0.0",
    port: 3000,
    fetch: app.fetch,
})

console.log("API running at http://localhost:3000")