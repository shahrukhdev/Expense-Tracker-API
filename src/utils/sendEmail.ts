import nodemailer from "nodemailer";
import env from "../config/env.js";

interface EmailOptions {
    to: string,
    subject: string,
    text: string,
    html?: string
}

const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            host: env.MAIL_HOST,
            port: Number(env.MAIL_PORT),
            auth: {
                user: env.MAIL_USER,
                pass: env.MAIL_PASS
            },
        });

        await transporter.sendMail({
            from: env.MAIL_FROM,
            to,
            subject,
            text,
            html
        });

        // console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent.');
    }
};

export default sendEmail;