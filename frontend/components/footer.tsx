export function Footer() {
  return (
    <footer className="section-divider mt-20 border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="surface-label">CodeMorph AI</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            Production-style AI migration tooling with premium UX, validation artifacts, and a modern developer workflow.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="font-medium text-slate-200">Next.js, FastAPI, SQLite, OpenAI, Monaco</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">Built for AI engineering portfolios</p>
        </div>
      </div>
    </footer>
  );
}
