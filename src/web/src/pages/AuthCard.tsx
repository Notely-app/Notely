import {useState} from "react";
import {authClient} from "@/lib/auth-client.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

export default function AuthCard({ mode }: { mode: "signin" | "signup" }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [status, setStatus] = useState<string>("")
    const [loading, setLoading] = useState(false)

    async function doEmailAuth() {
        const webOrigin = window.location.origin
        setLoading(true)
        setStatus("")

        try {
            if(mode === "signup") {
                const { error } = await authClient.signUp.email(
                    { email, password, name, callbackURL: `${webOrigin}/` },
                    {
                        onSuccess: () => setStatus("Signed up, check your email to verify"),
                        onError: (ctx) => setStatus(ctx.error.message)
                    }
                )
                if(error) setStatus((error as any).message ?? "Signup failed")
            } else {
                const { error } = await authClient.signIn.email(
                    { email, password, callbackURL: `${webOrigin}/` },
                    {
                        onSuccess: () => setStatus("Signed in"),
                        onError: (ctx) => setStatus(ctx.error.message)
                    }
                )
                if(error) setStatus((error as any).message ?? "Signin failed")
            }
        } finally {
            setLoading(false)
        }
    }

    async function doSocial(provider: "google" | "github") {
        const webOrigin = window.location.origin
        setLoading(true)
        setStatus(`Redirecting to ${provider}..`)

        await authClient.signIn.social({
            provider,
            callbackURL: `${webOrigin}/`,
            errorCallbackURL: `${webOrigin}/auth`
        })
    }

    return (
        <Card className={"border-white/10 bg-background/40"}>
            <CardHeader>
                <CardTitle className={"text-xl tracking-tight"}>
                    {mode === "signup" ? "Create your account" : "Welcome back"}
                </CardTitle>
            </CardHeader>
            <CardContent className={"space-y-5"}>
                <div className={"grid gap-3"}>
                    {mode === "signup" && (
                        <div className={"grid gap-2"}>
                            <Label htmlFor={"name"}>Name</Label>
                            <Input
                                id={"name"}
                                placeholder={"Enter your name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className={"grid gap-2"}>
                        <Label htmlFor={"email"}>Email</Label>
                        <Input
                            id={"email"}
                            placeholder={"your@email.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete={"email"}
                        />
                    </div>

                    <div className={"grid gap-2"}>
                        <Label htmlFor={"password"}>Password</Label>
                        <Input
                            id={"password"}
                            type={"password"}
                            placeholder={"••••••••"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        />
                    </div>
                </div>

                <Button className={"w-full"} onClick={doEmailAuth} disabled={loading}>
                    {loading ? "Working.." : mode === "signup" ? "Create account" : "Sign in"}
                </Button>

                <div className={"relative"}>
                    <div className={"absolute inset-0 flex items-center"}>
                        <Separator />
                    </div>
                    <div className={"relative flex justify-center text-xs"}>
                        <span className={"bg-background px-3 text-muted-foreground"}>or continue with</span>
                    </div>
                </div>

                <div className={"grid gap-3 sm:grid-cols-2"}>
                    <Button variant="secondary" onClick={() => doSocial("google")} disabled={loading}>
                        Google
                    </Button>
                    <Button variant="secondary" onClick={() => doSocial("github")} disabled={loading}>
                        GitHub
                    </Button>
                </div>

                {status && (
                    <Alert className={"border-white/10 bg-background/30"}>
                        <AlertDescription className={"text-sm"}>{status}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}