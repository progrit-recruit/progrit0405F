import React, { useState } from 'react';
import {
  ShieldCheck, Check, Info, ChevronLeft, Clock, Bed, Coins,
  Sparkles, AlertCircle, ArrowRight, MessageCircle, Calendar
} from 'lucide-react';
import { aiProposals, wishSurveyResults, getMajorityKeys } from '../data/mockData';

const PlanScreen = ({ isOrganizer, planPhase, setPlanPhase, setTripPhase }) => {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [viewingDetailId, setViewingDetailId] = useState(null);
  const [myVote, setMyVote] = useState(null);
  const [comment, setComment] = useState('');

  // Calculate match rates
  const majorityKeys = getMajorityKeys(wishSurveyResults);
  const getMatchRate = (plan) => {
    const matchCount = plan.tags.filter(tag => majorityKeys.includes(tag)).length;
    return Math.round((matchCount / majorityKeys.length) * 100);
  };

  const sortedProposals = [...aiProposals].sort((a, b) => getMatchRate(b) - getMatchRate(a));

  // For voting: only show selected 2 plans
  const votingPlans = selectedPlans.length === 2
    ? aiProposals.filter(p => selectedPlans.includes(p.id))
    : sortedProposals.slice(0, 2);

  const votes = { [votingPlans[0]?.id]: 9, [votingPlans[1]?.id]: 6 };

  // Detail View (shared by organizer and participant)
  if (viewingDetailId) {
    const plan = aiProposals.find(p => p.id === viewingDetailId);
    const matchRate = getMatchRate(plan);
    const days = [...new Set(plan.timeline.map(t => t.day))];
    return (
      <div className="fixed inset-0 z-[150] bg-cream flex flex-col overflow-y-auto pb-10 animate-slide-up-lg">
        <header className="sticky top-0 bg-cream/80 backdrop-blur-md border-b border-gold/30 px-4 py-4 flex items-center justify-between">
          <button onClick={() => setViewingDetailId(null)} className="p-2 bg-navy/5 rounded-full text-navy"><ChevronLeft size={20} /></button>
          <h2 className="font-black text-sm text-navy">プラン詳細</h2>
          <button onClick={() => setViewingDetailId(null)} className="text-coral font-black text-xs px-3">閉じる</button>
        </header>
        <main className="p-5 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-gold space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-coral tracking-widest italic">MATCH {matchRate}%</span>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${plan.days === '2泊3日' ? 'bg-navy text-gold' : 'bg-gold/20 text-navy'}`}>{plan.days}</span>
              </div>
              <h3 className="text-lg font-black text-navy mt-1 leading-tight">{plan.name}</h3>
              <p className="text-xs text-navy/40 font-bold mt-1">{plan.stay}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {plan.tags.map((tag, i) => (
                <span key={i} className={`text-[9px] font-black px-2 py-0.5 rounded-full ${majorityKeys.includes(tag) ? 'bg-emerald-100 text-emerald-700' : 'bg-navy/5 text-navy/30'}`}>{tag}</span>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-navy/40 uppercase tracking-widest">コスト内訳</h4>
              {Object.entries(plan.costBreakdown).map(([key, val]) => {
                const labels = { stay: '宿泊', transport: '移動', food: '食事', activity: 'アクティビティ' };
                return (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gold/10 last:border-0">
                    <span className="text-sm font-bold text-navy/60">{labels[key]}</span>
                    <span className="text-sm font-black text-navy">{val}</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-black text-navy">合計（1人あたり）</span>
                <span className="text-lg font-black text-coral">{plan.cost}</span>
              </div>
            </div>

            {/* AI Reason */}
            <div className="bg-coral/5 rounded-2xl p-4 border border-coral/20">
              <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-2">AI提案理由</p>
              <p className="text-xs font-bold text-navy/70 leading-relaxed">{plan.aiReason}</p>
            </div>

            {/* Match Points */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-navy/40 uppercase tracking-widest">希望一致ポイント</h4>
              {plan.matchPoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={3} />
                  <span className="text-xs font-bold text-navy/70">{pt}</span>
                </div>
              ))}
            </div>

            {/* Concerns */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-navy/40 uppercase tracking-widest">懸念点</h4>
              {plan.concerns.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-gold shrink-0" />
                  <span className="text-xs font-bold text-navy/60">{c}</span>
                </div>
              ))}
            </div>

            {/* Timeline by Day */}
            {days.map(dayNum => (
              <div key={dayNum} className="space-y-4">
                <h4 className="text-xs font-black text-navy flex items-center gap-2">
                  <Clock size={16} className="text-coral" /> DAY {dayNum}
                </h4>
                <div className="relative ml-4 pl-6 border-l-2 border-dashed border-gold space-y-5">
                  {plan.timeline.filter(t => t.day === dayNum).map((t, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[35px] top-0 w-4 h-4 bg-white border-2 border-coral rounded-full"></div>
                      <p className="text-[10px] font-black text-coral">{t.time}</p>
                      <p className="text-sm font-bold text-navy">{t.spot}</p>
                      <p className="text-[11px] text-navy/40 font-bold">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Organizer: Select 2 plans from 10
  if (planPhase === 'organizer_select' && isOrganizer) {
    return (
      <div className="space-y-6 animate-slide-right pb-10">
        <div className="bg-navy border-4 border-gold/20 rounded-[2.5rem] p-6 flex items-start gap-4 shadow-xl">
          <ShieldCheck className="text-gold shrink-0" size={32} />
          <div>
            <p className="text-[10px] font-black text-gold tracking-[0.2em] uppercase mb-1 italic underline">Organizer Dashboard</p>
            <p className="text-[11px] text-white/70 leading-relaxed font-bold">AI提案の中から投票に出す案を2つ選んでください。マッチ率順に表示しています。</p>
          </div>
        </div>
        {sortedProposals.map((p) => {
          const isSelected = selectedPlans.includes(p.id);
          const matchRate = getMatchRate(p);
          return (
            <div key={p.id} className={`bg-white rounded-[2.5rem] p-5 border-4 transition-all shadow-lg ${isSelected ? 'border-coral scale-[1.01]' : 'border-white opacity-90'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-cream text-coral px-3 py-1 rounded-full text-[10px] font-black border border-gold italic tracking-widest shadow-sm">MATCH {matchRate}%</div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${p.days === '2泊3日' ? 'bg-navy text-gold' : 'bg-gold/20 text-navy/60'}`}>{p.days}</span>
                </div>
                <button onClick={() => { if (isSelected) setSelectedPlans(selectedPlans.filter(id => id !== p.id)); else if (selectedPlans.length < 2) setSelectedPlans([...selectedPlans, p.id]); }}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-coral text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                  <Check size={20} strokeWidth={4}/>
                </button>
              </div>
              <h4 className="text-base font-black text-navy leading-tight mb-3">{p.name}</h4>
              <div className="flex gap-3 mb-3">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-navy/40"><Bed size={14} className="text-gold"/> {p.stay}</div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-navy/40"><Coins size={14} className="text-gold"/> {p.cost}</div>
              </div>
              {/* Tags preview */}
              <div className="flex flex-wrap gap-1 mb-3">
                {p.tags.slice(0, 5).map((tag, i) => (
                  <span key={i} className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${majorityKeys.includes(tag) ? 'bg-emerald-100 text-emerald-600' : 'bg-navy/5 text-navy/20'}`}>{tag}</span>
                ))}
                {p.tags.length > 5 && <span className="text-[8px] font-black text-navy/20">+{p.tags.length - 5}</span>}
              </div>
              <button onClick={() => setViewingDetailId(p.id)} className="w-full py-3 bg-navy text-gold rounded-2xl text-[10px] font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"><Info size={16} /> 詳細を確認</button>
            </div>
          );
        })}
        <button disabled={selectedPlans.length !== 2} onClick={() => { setPlanPhase('voting'); setTripPhase('voting'); }}
          className={`w-full py-5 rounded-[2.5rem] font-black shadow-xl transition-all flex items-center justify-center gap-2 ${selectedPlans.length === 2 ? 'bg-coral text-white active:scale-95 shadow-coral/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
          この2案で投票を開始する <ArrowRight size={20}/>
        </button>
      </div>
    );
  }

  // Voting phase (both organizer and participant see this)
  if (planPhase === 'voting' || planPhase === 'finalized') {
    const planA = votingPlans[0];
    const planB = votingPlans[1];
    if (!planA || !planB) return null;

    const comparisonRows = [
      { label: '予算', A: planA.cost, B: planB.cost },
      { label: '宿泊', A: planA.stay, B: planB.stay },
      { label: '日数', A: planA.days, B: planB.days },
    ];

    const totalVotes = (votes[planA.id] || 0) + (votes[planB.id] || 0);

    return (
      <div className="space-y-6 animate-slide-right pb-10">
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-black text-navy tracking-tight">プラン最終投票！</h3>
          <p className="text-[10px] text-navy/40 font-black tracking-widest uppercase">Vote for the best trip</p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20">
          <h4 className="text-xs font-black text-navy/40 uppercase tracking-widest mb-4">比較表</h4>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div></div>
            <div className="text-center text-[10px] font-black text-coral bg-coral/10 py-1.5 rounded-xl">PLAN A</div>
            <div className="text-center text-[10px] font-black text-navy bg-navy/10 py-1.5 rounded-xl">PLAN B</div>
          </div>
          {comparisonRows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gold/10 last:border-0">
              <span className="text-[9px] font-black text-navy/30">{row.label}</span>
              <span className="text-[10px] font-black text-navy/70 text-center">{row.A}</span>
              <span className="text-[10px] font-black text-navy/70 text-center">{row.B}</span>
            </div>
          ))}
        </div>

        {/* Vote Cards */}
        <div className="relative space-y-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border-4 border-gold w-12 h-12 rounded-full flex items-center justify-center font-black italic text-coral">VS</div>
          {votingPlans.map((p, idx) => {
            const voteCount = votes[p.id] || 0;
            const pct = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 50;
            const isMyVote = myVote === p.id;
            const matchRate = getMatchRate(p);
            return (
              <div key={p.id} className={`bg-white rounded-[2.5rem] p-6 shadow-xl border-2 space-y-3 text-left transition-all ${isMyVote ? 'border-coral' : 'border-gold/20'}`}>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${idx === 0 ? 'bg-coral text-white shadow-md' : 'bg-navy text-gold'}`}>PLAN {idx === 0 ? 'A' : 'B'}</span>
                    <span className="text-[9px] font-black text-coral/60">MATCH {matchRate}%</span>
                  </div>
                  <span className="text-[10px] font-black text-navy/30 tracking-widest">{voteCount} VOTES</span>
                </div>
                <h4 className="font-black text-base text-navy leading-tight">{p.name}</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-navy/5 rounded-full overflow-hidden">
                    <div className={`h-full ${idx === 0 ? 'bg-coral' : 'bg-navy'} transition-all`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-xs font-black text-navy/40">{pct}%</span>
                </div>
                <button onClick={() => setViewingDetailId(p.id)} className="w-full py-2.5 bg-navy/5 text-navy/60 rounded-2xl text-[10px] font-black flex items-center justify-center gap-2 active:scale-95 mb-1"><Info size={14} /> 詳細を見る</button>
                {planPhase !== 'finalized' && (
                  <button onClick={() => setMyVote(p.id)}
                    className={`w-full py-3 rounded-2xl font-black text-xs border-2 transition-all active:scale-95 ${isMyVote ? (idx === 0 ? 'bg-coral text-white border-coral' : 'bg-navy text-gold border-navy') : (idx === 0 ? 'border-coral text-coral' : 'border-navy text-navy')}`}>
                    {isMyVote ? '✓ 投票済み' : 'このプランに投票する'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Comment */}
        <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gold/20">
          <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-1.5 mb-2"><MessageCircle size={12} className="text-coral"/> コメント</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="ひとことどうぞ！" rows={2} className="w-full font-bold text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none resize-none text-sm placeholder:text-navy/20" />
        </div>

        {isOrganizer && planPhase !== 'finalized' && (
          <button onClick={() => { setPlanPhase('finalized'); setTripPhase('provisional_booking'); }}
            className="w-full py-5 bg-emerald-500 text-white rounded-[2.5rem] font-black shadow-xl flex items-center justify-center gap-2 animate-bounce mt-4">
            <Check size={24} strokeWidth={4} /> プランAで確定して進める
          </button>
        )}
        {planPhase === 'finalized' && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <p className="text-sm font-black text-emerald-700">✓ プランが確定しました！集金フェーズへ移行中...</p>
          </div>
        )}
      </div>
    );
  }

  // Aggregating (loading)
  if (planPhase === 'aggregating') {
    return (
      <div className="py-20 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 border-4 border-gold border-t-coral rounded-full animate-spin mx-auto"></div>
        <h3 className="font-black text-lg text-navy">AIが最適なプランを提案中...</h3>
        <p className="text-xs text-navy/40 font-bold">15問の回答から10プランのマッチ率を計算しています</p>
      </div>
    );
  }

  // Participant: waiting for organizer or seeing voting
  return (
    <div className="py-20 text-center space-y-6 animate-fade-in">
      <Sparkles size={48} className="text-gold mx-auto" />
      <h3 className="font-black text-lg text-navy">幹事がプランを選定中...</h3>
      <p className="text-xs text-navy/40 font-bold">AIが10個のプラン案を提案しました。幹事が2つに絞ったら投票が始まります。</p>
    </div>
  );
};

export default PlanScreen;
