import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt, StudyMode } from "@/lib/prompts";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body?.text as string;
    const mode = body?.mode as StudyMode;

    if (!text || !mode) {
      return NextResponse.json(
        { error: "Missing text or mode." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(mode, text);

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    const output = response.output_text;

    return NextResponse.json({ result: output });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to generate study content." },
      { status: 500 }
    );
  }
}