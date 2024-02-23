import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/database/db";
import { errorMessage, HTTP_STATUS } from "@/enums/enums";
import { sendEmail } from "@/helpers/Email";
import User from "@/models/user.model";
import { Error } from "@/types/ErrorTypes";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return NextResponse.json({ error: errorMessage.USER_ALREADY_EXIST, success: false }, { status: HTTP_STATUS.BAD_REQUEST });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email
        const emailStatus = await sendEmail({
            email,
            emailType: "VERIFY_USER",
            userId: savedUser._id,
        });
        return NextResponse.json(
            {
                message: "Email sent. Please verify your registration",
                success: true,
                emailStatus,
            },
            {
                status: HTTP_STATUS.OK,
            },
        );
    } catch (error: unknown) {
        const Error = error as Error;
        return NextResponse.json({ error: Error.message }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
    }
}
