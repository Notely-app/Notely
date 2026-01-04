import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import AuthCard from "@/pages/AuthCard.tsx";

export default function Auth() {
    const [mode, setMode] = useState<"signin" | "signup">("signin")

    return (
        <div className={"mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2"}>
            <div className={"space-y-5"}>
                <div className={"inline-flex items-center rounded-full border border-white/10 bg-background/40 px-3 py-1 text-xs text-muted-foreground"}>
                    Secure, fast, and functional
                </div>

                <h1 className={"text-4xl font-semibold tracking-tight"}>
                    Sign into{" "}
                    <span className={"bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent"}>
                        Notely
                    </span>
                </h1>

                <p className={"text-muted-foreground"}>
                    Why would you need anything else when you have Notely?
                </p>

                <div className={"grid gap-3 sm:grid-cols-2"}>
                    <div className={"rounded-xl border border-white/10 bg-background/40 p-4"}>
                        <div className={"text-sm font-medium"}>Private, secure notes</div>
                        <div className={"mt-1 text-sm text-muted-foreground"}>At Notely your privacy is our main priority</div>
                    </div>
                    <div className={"rounded-xl border border-white/10 bg-background/40 p-4"}>
                        <div className={"text-sm font-medium"}>Importing</div>
                        <div className={"mt-1 text-sm text-muted-foreground"}>We make it easy to import notes from another app</div>
                    </div>
                </div>
            </div>

            <div className={"rounded-2xl border border-white/10 bg-background/60 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/40"}>
                <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
                    <TabsList className={"grid w-full grid-cols-2"}>
                        <TabsTrigger value={"signin"}>Sign in</TabsTrigger>
                        <TabsTrigger value={"signup"}>Sign up</TabsTrigger>
                    </TabsList>

                    <TabsContent value={"signin"} className={"mt-2"}>
                        <AuthCard mode={"signin"} />
                    </TabsContent>
                    <TabsContent value={"signup"} className={"mt-2"}>
                        <AuthCard mode={"signup"} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}