import nodemailer from "nodemailer"
import { env } from "./env"

export const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    }
})

export async function sendMail(opts: { to: string; subject: string; html: string }) {
    await transporter.sendMail({
        from: env.FROM_EMAIL,
        to: opts.to,
        subject: opts.subject,
        html: opts.html
    })
}