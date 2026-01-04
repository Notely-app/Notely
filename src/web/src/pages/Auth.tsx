import {useState} from "react";
import {authClient} from "@/lib/auth-client.ts";

export default function Auth() {
    const [mode, setMode] = useState<"signin" | "signup">("signin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [status, setStatus] = useState<string>("")

    async function doEmailAuth() {
        const webOrigin = window.location.origin

        setStatus("Working..")
        if(mode === "signup") {
            const { error } = await authClient.signUp.email(
                { email, password, name, callbackURL: `${webOrigin}/` },
                {
                    onSuccess: () => setStatus("Signed up, check your email to verify"),
                    onError: (ctx) => setStatus(ctx.error.message)
                }
            )
            if(error) { // @ts-ignore
                setStatus(error.message)
            }
        } else {
            const { error } = await authClient.signIn.email(
                { email, password, callbackURL: `${webOrigin}/` },
                {
                    onSuccess: () => setStatus("Signed in"),
                    onError: (ctx) => setStatus(ctx.error.message)
                }
            )
            if(error) { // @ts-ignore
                setStatus(error.message)
            }
        }
    }

    async function doSocial(provider: "google" | "github") {
        const webOrigin = window.location.origin

        setStatus(`Redirecting to ${provider}..`)
        await authClient.signIn.social({
            provider,
            callbackURL: `${webOrigin}/`,
            errorCallbackURL: `${webOrigin}/auth`
        })
    }

    return (
        <div className="max-w-lg">
            <h1>{mode === "signup" ? "Sign Up" : "Sign In"}</h1>

            <div className={"flex gap-8 mb-12"}>
                <button onClick={() => setMode("signin")}>Sign in</button>
                <button onClick={() => setMode("signup")}>Sign up</button>
            </div>

            {mode === "signup" && (
                <div className={"mb-8"}>
                    <label>Name</label>
                    <input className={"w-full"} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            )}

            <div className={"mb-8"}>
                <label>Email</label>
                <input className={"w-full"} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={"mb-8"}>
                <label>Password</label>
                <input className={"w-full"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button onClick={doEmailAuth} className={"w-full mb-12"}>
                {mode === "signup" ? "Create account" : "Login"}
            </button>

            <div className={"flex gap-8"}>
                <button onClick={() => doSocial("google")} className={"flex-1"}>
                    Continue with Google
                </button>
                <button onClick={() => doSocial("github")} className={"flex-1"}>
                    Continue with Github
                </button>
            </div>

            <p className={"mt-12"}>{status}</p>
        </div>
    )
}