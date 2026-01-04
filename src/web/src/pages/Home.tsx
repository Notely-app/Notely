import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import {authClient} from "@/lib/auth-client.ts";

export default function Home() {
    const { data: session, isPending } = authClient.useSession
    const [text, setText] = useState<string>("Loading..")

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/hello`, {
            credentials: "include",
        })
            .then((r) => r.json())
            .then((d) => setText(d.message ?? JSON.stringify(d)))
            .catch(() => setText("Failed to reach API"))
    }, [session?.user?.id])

    if(isPending) return <div>Loading session..</div>

    return (
        <div className={"min-h-svh p-6 flex items-center justify-center"}>
            <Card className={"p-6 w-full max-w-md"}>
                <div className={"text-sm text-muted-foreground"}>Backend:</div>
                <div className={"mt-2 text-2xl font-semibold"}>{text}</div>
            </Card>
        </div>
    )
}