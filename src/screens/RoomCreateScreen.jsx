import React, { useState } from 'react';
import { Sparkles, MapPin, Users, Wallet, CalendarDays, Car, ArrowRight } from 'lucide-react';

const RoomCreateScreen = ({ onComplete }) => {
  const [form, setForm] = useState({
    title: "春の卒業旅行 2026",
    memberCount: 15,
    area: "南伊豆エリア",
    budget: "25,000〜30,000円",
    purpose: "卒業記念・思い出作り",
    transport: "レンタカー",
    dateFrom: "2026-05-10",
    dateTo: "2026-05-11",
    organizer: "たかし"
  });

  return (
    <div className="min-h-screen bg-cream">
      <div className="h-1.5 opacity-30" style={{ backgroundImage: 'radial-gradient(#F9E795 25%, transparent 25%)', backgroundSize: '12px 12px' }} />

      <div className="max-w-md mx-auto p-5 space-y-6 animate-fade-in pb-10">
        <div className="text-center pt-6 pb-4">
          <span className="text-[10px] font-black text-coral tracking-[0.3em] uppercase italic">TABIMARU!</span>
          <h1 className="text-3xl font-black text-navy tracking-tighter mt-1">旅行ルームを作成</h1>
          <p className="text-xs text-navy/40 font-bold mt-2">みんなの旅行を、ここから始めよう</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
            <label className="block">
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><Sparkles size={12} className="text-gold" /> 旅行名</span>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full mt-2 text-lg font-black text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none transition-colors" />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><Users size={12} className="text-coral" /> 人数</span>
                <input type="number" value={form.memberCount} onChange={e => setForm({...form, memberCount: e.target.value})} className="w-full mt-2 font-black text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none" />
              </label>
              <label className="block">
                <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12} className="text-coral" /> エリア</span>
                <input value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="w-full mt-2 font-black text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none" />
              </label>
            </div>

            <label className="block">
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><Wallet size={12} className="text-gold" /> 予算帯</span>
              <input value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} className="w-full mt-2 font-black text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none" />
            </label>

            <label className="block">
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest">旅行目的</span>
              <input value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})} className="w-full mt-2 font-black text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none" />
            </label>

            <label className="block">
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><Car size={12} className="text-coral" /> 移動手段</span>
              <div className="flex gap-2 mt-2">
                {['レンタカー', '電車', 'バス'].map(t => (
                  <button key={t} onClick={() => setForm({...form, transport: t})} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${form.transport === t ? 'bg-navy text-gold' : 'bg-cream/50 text-navy/40 border border-gold/30'}`}>{t}</button>
                ))}
              </div>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><CalendarDays size={12} className="text-coral" /> 開始日</span>
                <input type="date" value={form.dateFrom} onChange={e => setForm({...form, dateFrom: e.target.value})} className="w-full mt-2 font-bold text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none text-sm" />
              </label>
              <label className="block">
                <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest">終了日</span>
                <input type="date" value={form.dateTo} onChange={e => setForm({...form, dateTo: e.target.value})} className="w-full mt-2 font-bold text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none text-sm" />
              </label>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-5 bg-coral text-white rounded-[2rem] font-black text-lg shadow-xl shadow-coral/30 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            ルームを作成する <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCreateScreen;
