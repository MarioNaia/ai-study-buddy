type ResultCardProps = {
  title: string;
  content: string;
};

export default function ResultCard({ title, content }: ResultCardProps) {
  return (
    <section
      aria-labelledby="result-heading"
      className="h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="result-heading" className="text-xl font-semibold sm:text-2xl">
          {title}
        </h2>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-800 sm:text-base">
          {content}
        </pre>
      </div>
    </section>
  );
}