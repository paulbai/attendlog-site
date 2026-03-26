import { MapPin, Fingerprint, Signal, Wifi, Zap, RefreshCw, LayoutGrid, Settings } from 'lucide-react';

export default function PhoneMockup() {
  return (
    <div className="relative z-20 lg:translate-x-8">
      {/* Phone frame */}
      <div className="bg-surface-container-lowest p-3 rounded-[3rem] cyber-shadow-lg border border-outline-variant/10 max-w-[320px] mx-auto">
        {/* Screen */}
        <div className="rounded-[2.4rem] overflow-hidden bg-[#0a0f14] relative aspect-[9/19]">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(0,242,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.4) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Status bar */}
          <div className="flex justify-between items-center px-7 pt-4 pb-1 relative z-10">
            <div className="flex items-center gap-1">
              <Signal size={11} className="text-white/50" />
              <Wifi size={11} className="text-white/50" />
            </div>
            <div className="w-6 h-3 rounded-sm border border-white/30 flex items-center p-[1px]">
              <div className="w-3/4 h-full bg-primary-container rounded-[1px]" />
            </div>
          </div>

          {/* App Header */}
          <div className="px-6 pt-3 pb-1 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="flex gap-[2px]">
                <div className="w-[3px] h-3 bg-primary-container/60 rounded-full" />
                <div className="w-[3px] h-5 bg-primary-container rounded-full" />
                <div className="w-[3px] h-4 bg-primary-container/80 rounded-full" />
              </div>
              <span className="text-white font-headline font-bold text-sm tracking-wide">ATTENDLOG</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-[10px] text-white/60">👤</span>
            </div>
          </div>

          {/* Time Display */}
          <div className="text-center pt-4 pb-1 relative z-10">
            <p className="text-white font-headline font-black text-5xl tracking-tight leading-none">14:42</p>
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mt-1.5 font-body">Monday, Oct 23</p>
          </div>

          {/* Geofence Status */}
          <div className="flex flex-col items-center pt-4 pb-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a3a2a] border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              <span className="text-green-400 text-[10px] font-bold tracking-[0.15em] uppercase">In Geofence</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin size={10} className="text-white/30" />
              <span className="text-white/40 text-[9px] tracking-wide font-body">OFFICE: EDSA HQ</span>
            </div>
          </div>

          {/* Clock Out Button Area */}
          <div className="mx-5 mt-3 relative z-10">
            <div className="rounded-2xl border border-primary-container/20 bg-[#0d1a1f] p-5 flex flex-col items-center shadow-[inset_0_1px_0_rgba(0,242,255,0.05),0_0_40px_rgba(0,242,255,0.05)]">
              <Fingerprint size={40} className="text-primary-container/70 mb-3" strokeWidth={1.2} />
              <p className="text-white font-headline font-bold text-sm tracking-[0.15em] uppercase">Clock Out</p>
              <p className="text-white/30 text-[9px] mt-1 tracking-wide font-body">Shift ends in 3h 18m</p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="px-5 pt-3 flex gap-2.5 relative z-10">
            <div className="flex-1 bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <RefreshCw size={14} className="text-primary-container mb-1.5" />
              <p className="text-white/30 text-[7px] font-body uppercase tracking-wider">Connectivity</p>
              <p className="text-white font-bold text-[11px] font-body">All events synced</p>
            </div>
            <div className="flex-1 bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <Zap size={14} className="text-green-400 mb-1.5" />
              <p className="text-white/30 text-[7px] font-body uppercase tracking-wider">Device Health</p>
              <p className="text-white font-bold text-[11px] font-body">Optimal • 88%</p>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3 flex justify-around items-center relative z-10">
            <LayoutGrid size={18} className="text-primary-container" />
            <MapPin size={18} className="text-white/20" />
            <RefreshCw size={18} className="text-white/20" />
            <Settings size={18} className="text-white/20" />
          </div>
        </div>
      </div>

      {/* Floating verification card */}
      <div className="absolute -bottom-6 -left-16 glass-card p-5 rounded-2xl cyber-shadow border border-white/40 max-w-[220px]">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin size={14} className="text-primary" />
          </div>
          <span className="font-bold text-xs uppercase tracking-tight text-on-background">Verified</span>
        </div>
        <p className="text-[10px] text-on-surface-variant leading-tight">
          Siaka Stevens St, Freetown. 08:45 AM. Tamper-proof HMAC validated.
        </p>
      </div>

      {/* Floating stats card */}
      <div className="absolute -top-4 -right-12 glass-card p-4 rounded-xl cyber-shadow border border-white/40 animate-float">
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Today</p>
        <p className="font-headline font-bold text-2xl text-on-background">98%</p>
        <p className="text-[9px] text-primary font-semibold">Attendance</p>
      </div>
    </div>
  );
}
