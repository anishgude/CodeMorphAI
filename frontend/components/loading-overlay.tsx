export function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[30px] border border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="glass-panel flex items-center gap-4 rounded-full border border-cyan-400/20 px-5 py-3 text-sm text-cyan-100">
        <div className="relative h-3 w-3">
          <div className="absolute inset-0 animate-ping rounded-full bg-cyan-300/70" />
          <div className="absolute inset-[2px] rounded-full bg-cyan-200" />
        </div>
        <span className="tracking-[0.08em]">{label}</span>
      </div>
    </div>
  );
}
