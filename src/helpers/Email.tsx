import { render } from "@react-email/render";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

import User from "@/models/user.model";
import { Error } from "@/types/ErrorTypes";
import RegisterEmail from "@/utils/EmailTemplate/RegisterEmail";

type EmailProps = {
    email: string;
    emailType: string;
    userId: string;
};
export const sendEmail = async ({ email, emailType, userId }: EmailProps) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const cleanedHashedToken = hashedToken.replace(/\$|\.|\//g, ""); //to remove special characters
        if (emailType == "VERIFY_USER") {
            await User.findByIdAndUpdate(userId, { verifyToken: cleanedHashedToken, verifyTokenExpiry: Date.now() + 3 * 60 * 60 * 1000 }); //token expiry is 3 hours
        } else if (emailType == "RESET_PASSWORD_USER") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: cleanedHashedToken, forgotPasswordTokenExpiry: Date.now() + 3 * 60 * 60 * 1000 }); //token expiry in 3 hours
        }

        const Email = render(<RegisterEmail username={email} type={emailType} VerifyLink={`${process.env.NEXT_PUBLIC_DOMAIN}/${emailType == "VERIFY_USER" ? "verifyToken" : "verifyResetPassword"}?token=${cleanedHashedToken}`} />);

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "zachariah.hansen@ethereal.email",
                pass: "g195dsUsa8Afm4b1uH",
            },
        });
        const mailOptions = {
            from: "zachariah.hansen@ethereal.email",
            to: email,
            subject: emailType === "VERIFY_USER" ? "Verify your email" : "Reset Your Password and Keep it a Secret! 🤐",
            html: Email,
        };

        await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        return ErrorMsg.message;
    }
};
