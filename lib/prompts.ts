export type StudyMode = "summary" | "quiz" | "flashcards";

export function buildPrompt(mode: StudyMode, text: string) {
  switch (mode) {
    case "summary":
      return `
You are a helpful study assistant.
Summarize the following notes in a clear, concise way for a student.
Use:
- a short overview
- 5 bullet points
- simple language

Notes:
${text}
      `.trim();

    case "quiz":
      return `
You are a helpful study assistant.
Create 5 quiz questions based on the following notes.
Include a mix of short-answer and conceptual questions.
Do not include answers.

Notes:
${text}
      `.trim();

    case "flashcards":
      return `
You are a helpful study assistant.
Turn the following notes into 5 flashcards.
Format exactly like this:

Q: ...
A: ...

Notes:
${text}
      `.trim();

    default:
      return text;
  }
}