import { betterAuth} from "better-auth"
import { Pool } from "pg"
import { env } from "./env"
import { sendMail } from "./mailer";

const pool = new Pool({ connectionString: env.DATABASE_URL })

export const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.WEB_ORIGIN],
    database: pool as any,

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async({user, url}) => {
            await sendMail({
                to: user.email,
                subject: "Reset your password",
                html: `
                    <p>Reset your password by clicking the link below:</p>
                    <p><a href="${url}">${url}</a></p>
                `
            })
        }
    },

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async({user, url}) => {
            await sendMail({
                to: user.email,
                subject: "Verify your email",
                html: `
                  <p>Verify your email by clicking the link below:</p>
                  <p><a href="${url}">${url}</a></p>
                `
            })
        }
    },

    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            redirectURI: `${env.PUBLIC_API_URL}/api/auth/callback/google`
        },
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
            redirectURI: `${env.PUBLIC_API_URL}/api/auth/callback/github`
        }
    }
})