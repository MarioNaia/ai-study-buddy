"use client";

import { useState } from "react";
import ResultCard from "@/components/ResultCard";
import type { StudyMode } from "@/lib/prompts";

const MODE_LABELS: Record<StudyMode, string> = {
  summary: "Summary",
  quiz: "Quiz Questions",
  flashcards: "Flashcards",
};

export default function StudyForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Output");
  const [error, setError] = useState("");

  async function handleGenerate(mode: StudyMode) {
    if (!text.trim()) {
      setError("Please paste some study notes before generating content.");
      setResult("");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setTitle(MODE_LABELS[mode]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data.result);
    } catch {
      setError("Failed to generate study content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function fillSampleText() {
    setText(
      "Photosynthesis is the process by which plants convert sunlight into chemical energy. It occurs in chloroplasts and produces glucose and oxygen."
    );
    setError("");
  }

  const buttonBase =
    "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition outline-none focus-visible:ring-4 focus-visible:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-base";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Your Notes</h2>
            <p
              id="notes-help"
              className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base"
            >
              Paste class notes, textbook excerpts, or revision material. Then
              choose how you want the AI to transform it.
            </p>
          </div>

          <button
            type="button"
            onClick={fillSampleText}
            className="hidden rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 sm:inline-flex"
          >
            Use sample
          </button>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="study-notes"
            className="block text-sm font-medium text-slate-800"
          >
            Study notes
          </label>

          <textarea
            id="study-notes"
            aria-describedby="notes-help"
            aria-invalid={error ? true : false}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your lecture notes here..."
            className="h-[260px] w-full resize-y rounded-2xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-200 sm:h-[320px] sm:p-5 sm:text-base lg:h-[420px]"
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleGenerate("summary")}
              disabled={loading}
              className={`${buttonBase} bg-slate-900 text-white hover:bg-slate-800`}
            >
              Summarize
            </button>

            <button
              type="button"
              onClick={() => handleGenerate("quiz")}
              disabled={loading}
              className={`${buttonBase} border border-slate-300 bg-white text-slate-900 hover:bg-slate-50`}
            >
              Generate Quiz
            </button>

            <button
              type="button"
              onClick={() => handleGenerate("flashcards")}
              disabled={loading}
              className={`${buttonBase} border border-slate-300 bg-white text-slate-900 hover:bg-slate-50`}
            >
              Generate Flashcards
            </button>

            <button
              type="button"
              onClick={fillSampleText}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 sm:hidden"
            >
              Use sample
            </button>
          </div>
        </div>
      </section>

      <section className="lg:sticky lg:top-6">
        <div
          aria-live="polite"
          aria-busy={loading}
          className="min-h-[220px] rounded-3xl"
        >
          {loading && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold sm:text-2xl">Generating</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                The AI is preparing your {title.toLowerCase()}...
              </p>

              <div className="mt-5 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-10/12 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-8/12 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          )}

          {!loading && error && (
            <div
              role="alert"
              className="rounded-3xl border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm sm:p-6"
            >
              <h2 className="text-lg font-semibold sm:text-xl">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm leading-6 sm:text-base">{error}</p>
            </div>
          )}

          {!loading && !error && result && (
            <ResultCard title={title} content={result} />
          )}

          {!loading && !error && !result && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold sm:text-2xl">
                Generated content
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                Your summary, quiz, or flashcards will appear here after you
                choose an action.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-slate-700 sm:text-base">
                <li>• Summary mode gives you a quick overview and key points.</li>
                <li>• Quiz mode creates revision questions from your notes.</li>
                <li>
                  • Flashcards mode turns concepts into question-answer pairs.
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}