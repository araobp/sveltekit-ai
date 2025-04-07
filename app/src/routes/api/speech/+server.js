import OpenAI from "openai";
import { playAudio } from "openai/helpers/audio";

// Text to Speech API
export async function POST({ url }) {

    const text = url.searchParams.get('text')
    const voice = url.searchParams.get('voice')

    const openai = new OpenAI();
    const response = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: voice,
    input: text,
    instructions: "Speak in a cheerful and positive tone.",
    response_format: "wav",
    });

    await playAudio(response);

    return new Response(JSON.stringify({ text: text }), { status: 200 })
}
