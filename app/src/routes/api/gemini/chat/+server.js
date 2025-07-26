import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-2.5-flash";
const ai = new GoogleGenAI({});

export async function POST({ request }) {
    const { prompt, b64Image } = await request.json();
    var contents;

    if (b64Image) {
        contents = [
            {
                inlineData: {
                    mimeType: b64Image.mimeType,
                    data: b64Image.data,
                },
            },
            { text: prompt },
        ];
    } else {
        contents = prompt;
    }

    const response = await ai.models.generateContent({
        model: MODEL,
        contents: contents,
    });

    return new Response(response.text, {
        headers: {
            "Content-Type": "plain/text",
        },
    });
}