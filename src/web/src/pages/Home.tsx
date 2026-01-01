import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card.tsx";

export default function Home() {
    const [text, setText] = useState<string>("Loading..")

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/`)
            .then((r) => r.text())
            .then(setText)
            .catch(() => setText("Failed to reach API"))
    }, []);

    return (
        <div className={"min-h-svh p-6 flex items-center justify-center"}>
            <Card className={"p-6 w-full max-w-md"}>
                <div className={"text-sm text-muted-foreground"}>Backend:</div>
                <div className={"mt-2 text-2xl font-semibold"}>{text}</div>
            </Card>
        </div>
    )
}