import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { heatmapDataCounts } from '../data/mockData';

const ScheduleScreen = ({ viewMode, setViewMode, dateStates, setDateStates, isCalendarImported, setIsCalendarImported, isOrganizer, setTripPhase }) => {
  const handleDateClick = (day) => {
    if (viewMode === 'heatmap') return;
    const current = dateStates[day] || 'unanswered';
    const next = current === 'available' ? 'maybe' : current === 'maybe' ? 'unavailable' : current === 'unavailable' ? 'unanswered' : 'available';
    setDateStates({ ...dateStates, [day]: next });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-1.5 rounded-2xl flex shadow-sm border border-gold">
        <button onClick={() => setViewMode('personal')} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'personal' ? 'bg-navy text-gold' : 'text-slate-400'}`}>自分の回答</button>
        <button onClick={() => setViewMode('heatmap')} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'heatmap' ? 'bg-navy text-gold' : 'text-slate-400'}`}>みんなの状況</button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border-4 border-white ring-1 ring-gold/30">
        <div className="p-4 bg-navy font-black text-center text-gold border-b border-gold/20 tracking-widest italic uppercase">2026 May</div>
        <div className="grid grid-cols-7 text-[9px] text-center font-black text-slate-300 p-2 tracking-widest">
          {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(v => <div key={v}>{v}</div>)}
        </div>
        <div className="grid grid-cols-7 p-2 gap-1">
          {Array.from({ length: 31 }).map((_, i) => {
            const d = i + 1;
            const state = dateStates[d] || 'unanswered';
            const count = heatmapDataCounts[d] || 0;
            return (
              <div key={i} onClick={() => handleDateClick(d)}
                className={`h-12 rounded-xl flex flex-col items-center justify-center font-black text-xs transition-all active:scale-90 border ${
                  viewMode === 'personal'
                    ? (state === 'available' ? 'bg-emerald-400 text-white border-emerald-500' : state === 'maybe' ? 'bg-gold text-navy border-amber-300' : state === 'unavailable' ? 'bg-coral text-white border-rose-500' : 'bg-white border-slate-100 text-slate-700')
                    : (count >= 14 ? 'bg-emerald-500 text-white border-emerald-600' : count > 0 ? 'bg-gold/20 text-navy border-gold/30' : 'bg-white border-slate-100 text-slate-300')
                }`}>
                <span>{d}</span>
                {viewMode === 'heatmap' && count > 0 && <span className="text-[7px] opacity-80 mt-0.5">{count}人</span>}
              </div>
            );
          })}
        </div>
        <div className="p-4 bg-cream flex justify-center gap-4 text-[10px] font-black text-navy/60 border-t border-gold/30">
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />行ける</div>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-gold rounded-sm" />微妙</div>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-coral rounded-sm" />無理</div>
        </div>
      </div>

      {viewMode === 'heatmap' && isOrganizer && (
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
          <p className="text-xs font-black text-emerald-700">おすすめ: 5月10日〜11日（15人全員参加可能）</p>
          <button onClick={() => setTripPhase('wish_survey')} className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm active:scale-95 transition-all">この日程で進める</button>
        </div>
      )}

      <button onClick={() => setIsCalendarImported(!isCalendarImported)} className="w-full py-4 bg-white border-2 border-dashed border-gold rounded-2xl text-navy/40 text-sm font-black flex items-center justify-center gap-2 active:bg-gold/10">
        <CalendarIcon size={18} /> Google連携: {isCalendarImported ? 'ON' : 'OFF'}
      </button>
      <button className="w-full py-4 bg-coral text-white rounded-2xl font-black shadow-lg shadow-coral/20">回答を保存する</button>
    </div>
  );
};

export default ScheduleScreen;
