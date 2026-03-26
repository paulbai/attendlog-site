export default function Footer() {
  return (
    <footer className="w-full py-10 border-t border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 md:px-8 gap-4">
        <div className="text-xl font-bold text-on-background font-headline tracking-[-0.04em]">
          Attend<span className="gradient-text">Log</span>
        </div>
        <div className="text-sm text-on-surface-variant opacity-60">
          © 2026 AttendLog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
