import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { errorMessage,HTTP_STATUS } from "@/enums/enums";
import { sendEmail } from "@/helpers/Email";
import User from "@/models/user.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;

        const user = await User.findOne({ email: email });
        if (!user) return NextResponse.json({ error: errorMessage.USER_NOT_EXIST }, { status: HTTP_STATUS.NOT_FOUND });

        const emailSentStatus = await sendEmail({
            email,
            emailType: "RESET_PASSWORD_USER",
            userId: user._id,
        });
        if (emailSentStatus) {
            return NextResponse.json(
                { message: "Reset Password Email Sent.", success: true },
                {
                    status: HTTP_STATUS.OK,
                },
            );
        }
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
    }
}
