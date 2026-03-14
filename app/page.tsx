import StudyForm from "@/components/StudyForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <header className="mb-8 lg:mb-10">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-slate-600 shadow-sm">
              AI-Powered Learning Assistant
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI Study Buddy
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Turn raw study notes into clear summaries, quiz questions, and
              flashcards in seconds.
            </p>
          </div>
        </header>

        <section>
          <StudyForm />
        </section>
      </div>
    </main>
  );
}