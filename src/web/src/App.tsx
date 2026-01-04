import React, { useMemo, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { authClient } from "@/lib/auth-client.ts"
import { Badge } from "@/components/ui/badge.tsx"
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx"
import { Button } from "@/components/ui/button.tsx"

function NavItem({ to, label }: { to: string; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "text-sm font-medium transition-colors",
                    isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    )
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n))
}

export default function App() {
    const { data: session } = authClient.useSession
    const location = useLocation()

    const headerRef = useRef<HTMLElement | null>(null)
    const [hoveringHeader, setHoveringHeader] = useState(false)
    const [blob, setBlob] = useState({ x: 120, y: 24 })

    const initials = useMemo(() => {
        return (session?.user?.name ?? session?.user?.email ?? "U")
            .split(" ")
            .map((s) => s[0]?.toUpperCase())
            .slice(0, 2)
            .join("")
    }, [session?.user?.name, session?.user?.email])

    async function signOut() {
        await authClient.signOut()
        if (location.pathname !== "/") window.location.href = "/"
    }

    function onHeaderMove(e: React.MouseEvent) {
        const el = headerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()

        const x = clamp(e.clientX - rect.left, 24, rect.width - 24)
        const y = clamp(e.clientY - rect.top, 10, rect.height - 10)
        setBlob({ x, y })
    }

    return (
        <div className="min-h-svh bg-background text-foreground">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl" />
                <div className="absolute -bottom-48 left-12 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-sky-500/10 to-violet-500/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <header
                    ref={(n) => {
                        headerRef.current = n
                    }}
                    onMouseEnter={() => setHoveringHeader(true)}
                    onMouseLeave={() => setHoveringHeader(false)}
                    onMouseMove={onHeaderMove}
                    className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-background/35 px-4 py-3 backdrop-blur-xl sm:px-5"
                >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                        <div
                            className={[
                                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-200",
                                hoveringHeader ? "opacity-100" : "opacity-0",
                            ].join(" ")}
                            style={{
                                left: blob.x,
                                top: blob.y,
                                width: 220,
                                height: 220,
                                background:
                                    "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), rgba(168,85,247,0.22) 45%, rgba(34,211,238,0.18) 70%, rgba(0,0,0,0) 75%)",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
                    </div>

                    <Link to="/" className="relative flex items-center gap-3">
                        <div
                            className={[
                                "relative grid place-items-center rounded-xl transition-transform duration-200",
                                hoveringHeader ? "scale-[0.92]" : "scale-100",
                            ].join(" ")}
                        >
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_40px_rgba(168,85,247,0.18)]" />
                            <div className="pointer-events-none absolute inset-[2px] rounded-[10px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.30),transparent_45%)]" />
                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
                        </div>

                        <div className="leading-tight">
                            <div className="font-semibold tracking-tight">Notely</div>
                            <div className="text-xs text-muted-foreground">
                                There's nothing better
                            </div>
                        </div>
                    </Link>

                    <nav className="relative hidden items-center gap-6 sm:flex">
                        <NavItem to="/" label="Home" />
                    </nav>

                    <div className="relative flex items-center gap-3">
                        {session?.user ? (
                            <>
                                <div className="hidden text-right sm:block">
                                    <div className="text-sm font-medium">
                                        {session.user.name ?? "Signed in"}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {session.user.email}
                                    </div>
                                </div>

                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="bg-muted">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                <Button variant="secondary" onClick={signOut}>
                                    Sign out
                                </Button>
                            </>
                        ) : (
                            <Button asChild>
                                <Link to="/auth">Sign in</Link>
                            </Button>
                        )}
                    </div>
                </header>

                <main className="mt-8">
                    <Outlet />
                </main>

                <footer className="mt-14 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                        <span>© {new Date().getFullYear()} Notely</span>
                        <span className="hidden sm:block">Made with ❤️ by Aznos</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}