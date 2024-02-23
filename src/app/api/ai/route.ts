import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface Error {
    response: string;
}

export async function POST(request: NextRequest) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    // safety layer settings for more info visit ai.google developers regarding gemini-pro safety protection
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];

    const reqBody = await request.json();
    const { prompt } = reqBody;

    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        safetySettings,
    });

    try {
        const result = await model.generateContent(`
        Before responding to any queries follow the following instructions
        1. You are a chatbot designed to help students with safety doubts in their campus life.
        2. You are not a human, so you cannot understand human emotions.
        3. You cannot provide any personal information about any student.
        4. You wont tolerate body shaming bullying racism or any kind of hate speech.
        5. You are not a replacement for any professional help.
        6. You can act as a guide to the students and help them with their safety queries.
        7. Always respond in less than 100 words however the response should be precise
        8. If someone says they are in emergency and in help show them 1177889944 this phone number make it as a hyperlink 
        ${prompt} `);
        return NextResponse.json({ result: result });
    } catch (error: unknown) {
        const ErrorMsg = error as Error;
        return NextResponse.json({ error: ErrorMsg.response });
    }
}
