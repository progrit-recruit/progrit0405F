import React, { useState } from 'react';
import { MapPin, Users, CalendarDays, Wallet, Sparkles, ArrowRight } from 'lucide-react';
import { tripInfo } from '../data/mockData';

const JoinScreen = ({ onComplete }) => {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-cream">
      <div className="h-1.5 opacity-30" style={{ backgroundImage: 'radial-gradient(#F9E795 25%, transparent 25%)', backgroundSize: '12px 12px' }} />

      <div className="max-w-md mx-auto p-5 space-y-6 animate-fade-in pb-10">
        <div className="text-center pt-8 pb-2">
          <span className="text-[10px] font-black text-coral tracking-[0.3em] uppercase italic">TABIMARU!</span>
          <p className="text-xs text-navy/40 font-bold mt-2">招待されました</p>
        </div>

        <div className="bg-navy rounded-[2.5rem] p-7 shadow-xl border-4 border-gold/20 space-y-5 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white leading-tight">{tripInfo.title}</h2>
            <p className="text-xs font-bold text-gold/70 mt-2">幹事: {tripInfo.organizer}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 relative z-10">
            {[
              { icon: CalendarDays, label: tripInfo.date, color: 'text-gold' },
              { icon: MapPin, label: tripInfo.area, color: 'text-coral' },
              { icon: Users, label: `${tripInfo.memberCount}人予定`, color: 'text-gold' },
              { icon: Wallet, label: tripInfo.budget, color: 'text-coral' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <Icon size={14} className={`${item.color} mb-1`} />
                  <p className="text-[10px] font-black text-white/70">{item.label}</p>
                </div>
              );
            })}
          </div>
          <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-coral/30 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gold/20 space-y-4">
          <h3 className="font-black text-navy text-sm flex items-center gap-2">
            <Sparkles size={16} className="text-gold" /> 参加登録
          </h3>
          <label className="block">
            <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest">あなたの名前</span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例: あなた"
              className="w-full mt-2 text-lg font-black text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none transition-colors placeholder:text-navy/20"
            />
          </label>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-5 bg-coral text-white rounded-[2rem] font-black text-lg shadow-xl shadow-coral/30 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          参加する！ <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default JoinScreen;
