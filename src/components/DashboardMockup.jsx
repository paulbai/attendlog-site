import { Users, MapPin, FileText, Clock, RefreshCw, CheckCircle, Loader, Plus } from 'lucide-react';

export default function DashboardMockup() {
  return (
    <div className="bg-[#0a0f14] rounded-[2.5rem] p-5 md:p-7 relative overflow-hidden" style={{ aspectRatio: '16/11' }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,242,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top nav bar */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-[2px]">
            <div className="w-[3px] h-3 bg-primary-container/60 rounded-full" />
            <div className="w-[3px] h-4 bg-primary-container rounded-full" />
            <div className="w-[3px] h-3.5 bg-primary-container/80 rounded-full" />
          </div>
          <span className="text-white font-headline font-bold text-sm tracking-wide">ATTENDLOG</span>
        </div>
        <div className="flex items-center gap-5">
          {['Dashboard', 'Logs', 'Geofences', 'Settings'].map((item, i) => (
            <span
              key={item}
              className={`text-[9px] tracking-wider uppercase font-body ${
                i === 0 ? 'text-primary-container font-bold' : 'text-white/30'
              }`}
            >
              {item}
            </span>
          ))}
          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10" />
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
        {/* Live Presence Ring */}
        <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
          <p className="text-white/30 text-[8px] tracking-[0.2em] uppercase mb-3">Live Presence</p>
          <div className="flex items-center justify-center mb-3">
            <div className="relative w-28 h-28">
              {/* Ring */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${0.946 * 264} ${264}`}
                />
                <defs>
                  <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2ff" />
                    <stop offset="100%" stopColor="#00696f" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-headline font-bold text-2xl leading-none">142</span>
                <span className="text-white/30 text-[10px] font-body">/150</span>
                <span className="text-primary-container text-[7px] tracking-[0.15em] uppercase mt-1 font-bold">In Zone</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-white/25 text-[7px] uppercase tracking-wider">Active Sites</p>
              <p className="text-white font-headline font-bold text-sm">12</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-white/25 text-[7px] uppercase tracking-wider">Peak Hour</p>
              <p className="text-white font-headline font-bold text-sm">09:14</p>
            </div>
          </div>
        </div>

        {/* Map + Fence Settings */}
        <div className="space-y-3">
          {/* Map area */}
          <div className="bg-white/[0.03] rounded-xl overflow-hidden border border-white/5 relative h-[52%]">
            {/* Fake map */}
            <div className="absolute inset-0 bg-[#111b22]">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 60% 40%, rgba(0,242,255,0.15) 0%, transparent 60%), linear-gradient(rgba(0,242,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.2) 1px, transparent 1px)`,
                  backgroundSize: '100% 100%, 18px 18px, 18px 18px',
                }}
              />
            </div>
            {/* Location pin */}
            <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-lg border-2 border-primary-container/40 flex items-center justify-center bg-primary-container/10">
              <MapPin size={12} className="text-primary-container" />
            </div>
            {/* Label */}
            <div className="absolute bottom-3 left-3 z-10">
              <p className="text-white font-headline font-bold text-xs">Office HQ</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-green-400/80 text-[7px] tracking-wider uppercase font-body">System Nominal</span>
              </div>
            </div>
          </div>

          {/* Fence settings */}
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/30 text-[7px] uppercase tracking-wider font-body">Fence Radius</p>
                <p className="text-white font-headline font-bold text-sm">100 Meters</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg border border-white/10 text-white text-[8px] font-bold tracking-wider uppercase font-body hover:bg-white/5 transition-colors">
                Adjust Range
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
        {[
          { icon: FileText, label: 'Import CSV' },
          { icon: Users, label: 'Manage Team' },
          { icon: Clock, label: 'View Logs' },
        ].map((action) => (
          <div key={action.label} className="bg-white/[0.03] rounded-xl p-3 border border-white/5 flex flex-col items-center gap-2 hover:bg-white/[0.06] transition-colors cursor-pointer">
            <action.icon size={16} className="text-white/40" strokeWidth={1.5} />
            <span className="text-white/40 text-[7px] uppercase tracking-wider font-body">{action.label}</span>
          </div>
        ))}
      </div>

      {/* Sync Activity */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white font-headline font-bold text-sm italic tracking-tight">Sync Activity</p>
            <p className="text-white/25 text-[8px] font-body">Real-time edge device synchronization status</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10">
            <RefreshCw size={8} className="text-primary-container" />
            <span className="text-white/50 text-[7px] font-bold uppercase tracking-wider font-body">Live Feed</span>
          </div>
        </div>

        <div className="space-y-1.5">
          {[
            { name: 'Amara Okafor', action: 'Clock-in', location: 'Freetown HQ', time: '08:42 AM', status: 'synced' },
            { name: 'David Chen', action: 'Clock-in', location: 'Bo Site B', time: '08:39 AM', status: 'pending' },
            { name: 'Sarah Miller', action: 'Clock-out', location: 'Remote Edge', time: '08:15 AM', status: 'synced' },
          ].map((entry) => (
            <div key={entry.name} className="flex items-center justify-between py-2 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                  <Users size={12} className="text-white/30" />
                </div>
                <div>
                  <p className="text-white text-[10px] font-bold font-body">{entry.name}</p>
                  <p className="text-white/30 text-[8px] font-body">{entry.action} • {entry.location} • {entry.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[7px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  entry.status === 'synced'
                    ? 'text-green-400/80 border-green-400/20 bg-green-400/5'
                    : 'text-yellow-400/80 border-yellow-400/20 bg-yellow-400/5'
                }`}>
                  {entry.status}
                </span>
                {entry.status === 'synced' ? (
                  <CheckCircle size={10} className="text-green-400" />
                ) : (
                  <Loader size={10} className="text-yellow-400 animate-spin" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-5 right-5 w-10 h-10 rounded-xl bg-primary-container/20 border border-primary-container/30 flex items-center justify-center z-10">
        <Plus size={16} className="text-primary-container" />
      </div>
    </div>
  );
}
