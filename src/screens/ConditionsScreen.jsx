import React, { useState } from 'react';
import { ShieldCheck, MapPin, Car, Train, Sparkles, ArrowRight } from 'lucide-react';
import { fixedConditionsDefault } from '../data/mockData';

const amenityOptions = [
  "温泉", "BBQ", "カラオケ", "プール", "花火可",
  "大部屋", "Wi-Fi", "送迎", "貸切風呂", "ペット可"
];

const ConditionsScreen = ({ onComplete }) => {
  const [conditions, setConditions] = useState(fixedConditionsDefault);
  const [selectedAmenities, setSelectedAmenities] = useState(fixedConditionsDefault.amenities);

  const toggleAmenity = (a) => {
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-navy border-4 border-gold/20 rounded-[2.5rem] p-6 flex items-start gap-4 shadow-xl">
        <ShieldCheck className="text-gold shrink-0" size={32} />
        <div>
          <p className="text-[10px] font-black text-gold tracking-[0.2em] uppercase mb-1 italic underline">Organizer</p>
          <p className="text-[11px] text-white/70 leading-relaxed font-bold">旅行の前提条件を設定してください。ここで決めた内容はアンケートに含まれません。</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-5">
        <label className="block">
          <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12} className="text-coral" /> エリア</span>
          <input value={conditions.area} onChange={e => setConditions({...conditions, area: e.target.value})} className="w-full mt-2 font-black text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none" />
        </label>

        <div>
          <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest">宿の条件</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {amenityOptions.map(a => (
              <button key={a} onClick={() => toggleAmenity(a)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${selectedAmenities.includes(a) ? 'bg-coral text-white shadow-md' : 'bg-cream text-navy/40 border border-gold/30'}`}
              >{a}</button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5"><Car size={12} className="text-coral" /> 移動手段</span>
          <div className="flex gap-2 mt-2">
            {[{ label: 'レンタカー', icon: Car }, { label: '電車', icon: Train }].map(t => (
              <button key={t.label} onClick={() => setConditions({...conditions, transport: t.label})}
                className={`flex-1 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${conditions.transport === t.label ? 'bg-navy text-gold' : 'bg-cream text-navy/40 border border-gold/30'}`}
              ><t.icon size={14} /> {t.label}</button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest">予算レンジ</span>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-black text-navy/40">{(conditions.budgetMin / 1000).toFixed(0)}k</span>
            <input type="range" min={10000} max={50000} step={5000} value={conditions.budgetMax}
              onChange={e => setConditions({...conditions, budgetMax: Number(e.target.value)})}
              className="flex-1 accent-coral"
            />
            <span className="text-xs font-black text-navy">{(conditions.budgetMax / 1000).toFixed(0)}k円</span>
          </div>
        </div>

        <label className="block">
          <span className="text-[10px] font-black text-navy/40 uppercase tracking-widest">その他メモ</span>
          <input value={conditions.notes} onChange={e => setConditions({...conditions, notes: e.target.value})} className="w-full mt-2 font-bold text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none text-sm" />
        </label>
      </div>

      <button onClick={onComplete} className="w-full py-5 bg-coral text-white rounded-[2rem] font-black shadow-xl shadow-coral/30 active:scale-95 transition-all flex items-center justify-center gap-3">
        <Sparkles size={20} /> AIでアンケートを作成 <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default ConditionsScreen;
