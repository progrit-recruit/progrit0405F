import React from 'react';
import { ShieldCheck, Sparkles, Bell, ArrowRight, Users } from 'lucide-react';
import { surveyAggregation, participants } from '../data/mockData';

const WishDashboard = ({ onComplete }) => {
  const unanswered = participants.filter(p => !p.wishAnswered);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-navy border-4 border-gold/20 rounded-[2.5rem] p-6 flex items-start gap-4 shadow-xl">
        <ShieldCheck className="text-gold shrink-0" size={32} />
        <div>
          <p className="text-[10px] font-black text-gold tracking-[0.2em] uppercase mb-1 italic underline">Organizer Dashboard</p>
          <p className="text-[11px] text-white/70 leading-relaxed font-bold">回答の集計状況を確認できます。</p>
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

      {/* Activity Ranking */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
        <h4 className="text-xs font-black text-navy flex items-center gap-2"><Sparkles size={16} className="text-gold" /> アクティビティ人気ランキング</h4>
        {surveyAggregation.topActivities.map((act, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${idx === 0 ? 'bg-coral text-white' : idx === 1 ? 'bg-gold text-navy' : 'bg-navy/10 text-navy/40'}`}>{idx + 1}</span>
            <span className="text-sm font-bold text-navy flex-1">{act.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-navy/5 rounded-full overflow-hidden">
                <div className="h-full bg-coral rounded-full" style={{ width: `${(act.count / surveyAggregation.totalCount) * 100}%` }}></div>
              </div>
              <span className="text-[10px] font-black text-navy/40">{act.count}票</span>
            </div>
          </div>
        ))}
      </div>

      {/* Budget */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-2">
        <h4 className="text-xs font-black text-navy">予算傾向</h4>
        <p className="text-2xl font-black text-coral">平均 {surveyAggregation.budgetAvg.toLocaleString()}円</p>
        <p className="text-[10px] font-black text-navy/40">レンジ: {surveyAggregation.budgetRange}</p>
      </div>

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
