import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()

app.use(
    "*",
    cors({
        origin: ["http://localhost:5173"]
    })
)

app.get("/", (c) => c.text("home page"))

Bun.serve({
    port: 3000,
    hostname: "0.0.0.0",
    fetch: app.fetch
})

console.log("API running at http://localhost:3000")