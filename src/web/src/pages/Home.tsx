import {useEffect, useMemo, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {authClient} from "@/lib/auth-client.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export default function Home() {
    const { data: session, isPending } = authClient.useSession
    const [text, setText] = useState<string>("Loading..")
    const [ping, setPing] = useState<"idle" | "ok" | "fail">("idle")

    const subtitle = useMemo(() => {
        if(isPending) return "Checking your session.."
        if(session?.user) return `Signed in as ${session.user.email ?? session.user.name ?? "user"}`
        return "You're not signed in yet"
    }, [isPending, session?.user])

    async function testAPI() {
        setPing("idle")
        try {
            const r = await fetch(`${import.meta.env.VITE_API_URL}/api/hello`, {
                credentials: "include",
            })
            const d = await r.json()
            setText(d.message ?? JSON.stringify(d))
            setPing("ok")
        } catch {
            setText("Failed to reach API")
            setPing("fail")
        }
    }

    useEffect(() => {
        testAPI()
    }, [session?.user?.id]);

    return (
        <div className={"grid gap-6 lg:grid-cols-3"}>
            <Card className={"lg:col-span-2 border-white/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40"}>
                <CardHeader>
                    <div className={"flex items-start justify-between gap-4"}>
                        <div>
                            <CardTitle className={"text-2xl tracking-tight"}>Welcome to Notely</CardTitle>
                            <p className={"mt-1 text-sm text-muted-foreground"}>{subtitle}</p>
                        </div>

                        <Badge
                            variant={"secondary"}
                            className={[
                                "rounded-full",
                                ping === "ok" ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "",
                                ping === "fail" ? "border border-red-500/30 bg-red-500/10 text-red-200" : "",
                            ].join(" ")}
                        >
                            API: {ping === "ok" ? "online" : ping === "fail" ? "offline" : "checking"}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className={"rounded-xl border border-white/10 bg-muted/20 p-5"}>
                        <div className={"text-xs text-muted-foreground"}>Backend:</div>
                        <div className={"mt-2 text-2xl font-semibold"}>{text}</div>
                    </div>

                    <div className={"mt-6 flex flex-wrap items-center gap-3"}>
                        <Button onClick={testAPI}>Ping API</Button>
                        <Button variant={"secondary"} onClick={() => (window.location.href = "/auth")}>
                            Open Auth
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={async () => {
                                await authClient.signOut()
                                window.location.reload()
                            }}
                        >Sign out</Button>
                    </div>

                    <Separator className={"my-6"} />

                    <div className={"grid gap-4 sm:grid-cols-2"}>
                        <div className={"rounded-xl border border-white/10 bg-background/40 p-4"}>
                            <div className={"text-sm font-medium"}>Session</div>
                            <div className={"mt-1 text-sm text-muted-foreground"}>
                                {session?.user ? "Active" : "None"}
                            </div>
                        </div>
                        <div className={"rounded-xl border border-white/10 bg-background/40 p-4"}>
                            <div className={"text-sm font-medium"}>Environment</div>
                            <div className={"mt-1 text-sm text-muted-foreground"}>
                                {import.meta.env.VITE_API_URL}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}