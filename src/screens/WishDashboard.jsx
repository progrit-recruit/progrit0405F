import React from 'react';
import { ShieldCheck, Sparkles, Bell, ArrowRight, Users, Home, UtensilsCrossed, Compass } from 'lucide-react';
import { surveyAggregation, participants, wishStats } from '../data/mockData';

const categoryIcons = { '宿': Home, '食事': UtensilsCrossed, 'レジャー': Compass };

const WishDashboard = ({ onComplete }) => {
  const unanswered = participants.filter(p => !p.wishAnswered);
  const categories = ['宿', '食事', 'レジャー'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-navy border-4 border-gold/20 rounded-[2.5rem] p-6 flex items-start gap-4 shadow-xl">
        <ShieldCheck className="text-gold shrink-0" size={32} />
        <div>
          <p className="text-[10px] font-black text-gold tracking-[0.2em] uppercase mb-1 italic underline">Organizer Dashboard</p>
          <p className="text-[11px] text-white/70 leading-relaxed font-bold">15問の回答集計状況を確認できます。</p>
        </div>
      </div>

      {/* Response Count */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gold/20 text-center space-y-3">
        <p className="text-[10px] font-black text-navy/30 uppercase tracking-widest">回答状況</p>
        <div className="flex items-end justify-center gap-1">
          <span className="text-5xl font-black text-coral">{surveyAggregation.responseCount}</span>
          <span className="text-lg font-black text-navy/30 pb-1">/ {surveyAggregation.totalCount}</span>
        </div>
        <div className="h-3 bg-navy/5 rounded-full overflow-hidden">
          <div className="h-full bg-coral rounded-full transition-all" style={{ width: `${(surveyAggregation.responseCount / surveyAggregation.totalCount) * 100}%` }}></div>
        </div>
      </div>

      {/* Results by Category */}
      {categories.map(cat => {
        const CatIcon = categoryIcons[cat];
        return (
          <div key={cat} className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
            <h4 className="text-xs font-black text-navy flex items-center gap-2">
              <CatIcon size={16} className="text-coral" /> {cat}
            </h4>
            {wishStats.filter(s => s.category === cat).map(s => {
              const total = s.optionA.count + s.optionB.count;
              const pA = total > 0 ? Math.round((s.optionA.count / total) * 100) : 50;
              const pB = 100 - pA;
              const winner = pA >= pB ? 'A' : 'B';
              return (
                <div key={s.id} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-navy/50">{s.title}</p>
                    <span className="text-[9px] font-black text-emerald-600">{winner === 'A' ? s.optionA.label : s.optionB.label} 優勢</span>
                  </div>
                  <div className="h-8 bg-navy/5 rounded-xl overflow-hidden flex shadow-inner">
                    <div style={{ width: `${pA}%` }} className="bg-coral flex items-center justify-center text-white text-[9px] font-black px-1 overflow-hidden whitespace-nowrap">
                      {pA > 25 && `${s.optionA.label} ${pA}%`}
                    </div>
                    <div style={{ width: `${pB}%` }} className="bg-gold flex items-center justify-center text-navy text-[9px] font-black px-1 overflow-hidden whitespace-nowrap">
                      {pB > 25 && `${s.optionB.label} ${pB}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* AI Summary */}
      <div className="bg-coral/5 rounded-[2rem] p-5 border border-coral/20 space-y-2">
        <h4 className="text-xs font-black text-coral flex items-center gap-2"><Sparkles size={16} /> AI分析サマリー</h4>
        <p className="text-sm font-bold text-navy/70 leading-relaxed">{surveyAggregation.aiSummary}</p>
      </div>

      {/* Unanswered */}
      {unanswered.length > 0 && (
        <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-3">
          <h4 className="text-xs font-black text-navy flex items-center gap-2"><Users size={16} className="text-coral" /> 未回答者 ({unanswered.length}人)</h4>
          <div className="flex flex-wrap gap-2">
            {unanswered.map(p => (
              <div key={p.id} className="flex items-center gap-2 bg-cream rounded-xl px-3 py-2 border border-gold/20">
                <img src={p.img} className="w-6 h-6 rounded-full" alt="" />
                <span className="text-xs font-black text-navy/60">{p.name}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-gold/20 text-navy rounded-2xl font-black text-xs flex items-center justify-center gap-2 active:bg-gold/30">
            <Bell size={14} /> 未回答者にリマインド
          </button>
        </div>
      )}

      <button onClick={onComplete} className="w-full py-5 bg-coral text-white rounded-[2rem] font-black shadow-xl shadow-coral/30 active:scale-95 transition-all flex items-center justify-center gap-3">
        回答を締め切ってAI提案へ <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default WishDashboard;
