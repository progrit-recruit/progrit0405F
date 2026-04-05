import React, { useState } from 'react';
import {
  Check, ChevronLeft, Sparkles, CheckCircle2, PartyPopper,
  PieChart, Home, UtensilsCrossed, Compass, Users, Minus, Plus, ArrowRight
} from 'lucide-react';
import { wishQuestions, wishStats } from '../data/mockData';

const categoryIcons = { '宿': Home, '食事': UtensilsCrossed, 'レジャー': Compass };
const categoryColors = { '宿': 'bg-coral', '食事': 'bg-gold', 'レジャー': 'bg-navy' };

const WishScreen = ({ onComplete }) => {
  const [showPeopleSelect, setShowPeopleSelect] = useState(true);
  const [peopleCount, setPeopleCount] = useState(15);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleSelect = (qId, key) => {
    setAnswers({ ...answers, [qId]: key });
    setTimeout(() => {
      if (currentStep < wishQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }, 400);
  };

  // Submitted: show group trends
  if (isSubmitted) {
    const categories = ['宿', '食事', 'レジャー'];
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-6 space-y-4">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-100 relative">
            <CheckCircle2 size={48} className="text-white" />
            <PartyPopper className="absolute -top-2 -right-2 text-gold animate-bounce" size={28} />
          </div>
          <h2 className="text-2xl font-black text-navy">回答ありがとうございました！</h2>
        </div>
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-gold space-y-6">
          <h4 className="font-black text-sm text-navy flex items-center gap-2 uppercase tracking-widest"><PieChart size={18} className="text-coral"/> Group Trends</h4>
          {categories.map(cat => (
            <div key={cat} className="space-y-3">
              <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest">{cat}</p>
              {wishStats.filter(s => s.category === cat).map(s => {
                const total = s.optionA.count + s.optionB.count;
                const pA = total > 0 ? Math.round((s.optionA.count / total) * 100) : 50;
                const pB = 100 - pA;
                return (
                  <div key={s.id} className="space-y-1">
                    <p className="text-[10px] font-black text-navy/50">{s.title}</p>
                    <div className="h-8 bg-navy/5 rounded-xl overflow-hidden flex shadow-inner">
                      <div style={{ width: `${pA}%` }} className="bg-coral flex items-center justify-center text-white text-[9px] font-black px-1 overflow-hidden whitespace-nowrap">
                        {pA > 20 && `${s.optionA.label} ${pA}%`}
                      </div>
                      <div style={{ width: `${pB}%` }} className="bg-gold flex items-center justify-center text-navy text-[9px] font-black px-1 overflow-hidden whitespace-nowrap">
                        {pB > 20 && `${s.optionB.label} ${pB}%`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="p-4 bg-coral/5 rounded-2xl border border-coral/20 flex items-start gap-3 italic">
            <Sparkles size={16} className="text-coral mt-1 shrink-0" />
            <p className="text-[11px] text-navy/60 font-black leading-relaxed">AIがこれらのトレンドを元に、10個のプラン案を生成しています。幹事の発表を待とう！</p>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation
  if (isFinished) {
    const categories = ['宿', '食事', 'レジャー'];
    return (
      <div className="space-y-6 animate-zoom-in px-2 py-6">
        <h3 className="text-2xl font-black text-navy text-center">この内容でOK？</h3>
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-gold/20 space-y-5 text-left">
          <div className="flex justify-between items-center border-b border-gold/10 pb-3">
            <span className="text-sm font-bold text-navy/40 flex items-center gap-1.5"><Users size={14} className="text-coral" /> 参加人数</span>
            <span className="font-black text-navy text-xs flex items-center gap-1.5"><Check size={12} strokeWidth={4} className="text-emerald-500" />{peopleCount}人</span>
          </div>
          {categories.map(cat => (
            <div key={cat} className="space-y-2">
              <p className="text-[10px] font-black text-navy/30 uppercase tracking-widest">{cat}</p>
              {wishQuestions.filter(q => q.category === cat).map(q => {
                const answer = answers[q.id];
                const label = answer === q.optionA.key ? q.optionA.label : answer === q.optionB.key ? q.optionB.label : '未回答';
                return (
                  <div key={q.id} className="flex justify-between items-center border-b border-gold/10 pb-2 last:border-0 last:pb-0">
                    <span className="text-xs font-bold text-navy/40">{q.title}</span>
                    <span className="font-black text-navy text-xs flex items-center gap-1">
                      <Check size={12} strokeWidth={4} className="text-emerald-500" />{label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <button onClick={() => { setIsSubmitted(true); onComplete?.(); }} className="w-full py-4 bg-coral text-white rounded-2xl font-black shadow-lg shadow-coral/20 active:scale-95 transition-all">この内容で送信する</button>
          <button onClick={() => { setIsFinished(false); setCurrentStep(0); }} className="text-sm font-bold text-navy/40 hover:text-navy transition-colors">やり直す</button>
        </div>
      </div>
    );
  }

  // People count selection
  if (showPeopleSelect) {
    return (
      <div className="space-y-8 animate-fade-in py-4">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Users size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-black text-navy">参加人数は？</h3>
          <p className="text-xs text-navy/40 font-bold">旅行に参加する人数を選んでね</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-gold/20 space-y-6">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setPeopleCount(Math.max(2, peopleCount - 1))}
              className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center border border-gold/30 active:scale-90 transition-all"
            >
              <Minus size={24} className="text-navy" />
            </button>
            <div className="text-center">
              <span className="text-6xl font-black text-coral">{peopleCount}</span>
              <p className="text-xs font-black text-navy/40 mt-1">人</p>
            </div>
            <button
              onClick={() => setPeopleCount(Math.min(50, peopleCount + 1))}
              className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center border border-gold/30 active:scale-90 transition-all"
            >
              <Plus size={24} className="text-navy" />
            </button>
          </div>

          {/* Quick select */}
          <div className="flex flex-wrap justify-center gap-2">
            {[5, 10, 15, 20, 30, 40].map(n => (
              <button
                key={n}
                onClick={() => setPeopleCount(n)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  peopleCount === n ? 'bg-coral text-white shadow-md' : 'bg-cream text-navy/40 border border-gold/30'
                }`}
              >
                {n}人
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowPeopleSelect(false)}
          className="w-full py-5 bg-coral text-white rounded-[2rem] font-black shadow-xl shadow-coral/30 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
        >
          次へ進む <ArrowRight size={22} />
        </button>
      </div>
    );
  }

  // Question display
  const q = wishQuestions[currentStep];
  const progress = ((currentStep + 1) / wishQuestions.length) * 100;
  const CatIcon = categoryIcons[q.category] || Sparkles;
  const prevCategory = currentStep > 0 ? wishQuestions[currentStep - 1].category : null;
  const showCategoryHeader = q.category !== prevCategory;

  return (
    <div className="space-y-6 animate-slide-right">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between px-1">
          <span className="text-[10px] font-black text-coral uppercase tracking-[0.3em] italic">Q{currentStep + 1} / {wishQuestions.length}</span>
          <span className="text-xs font-black text-navy/30">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-navy/5 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-coral transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Category Header */}
      {showCategoryHeader && (
        <div className={`${categoryColors[q.category]} rounded-2xl px-4 py-3 flex items-center gap-3`}>
          <CatIcon size={18} className="text-white" />
          <span className="text-sm font-black text-white uppercase tracking-widest">{q.category}</span>
        </div>
      )}

      {/* Question */}
      <div className="flex items-center gap-4">
        {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)} className="p-2 bg-white rounded-full text-navy/40 border border-gold/30 shadow-sm"><ChevronLeft size={20} /></button>}
        <h3 className="font-black text-2xl text-center text-navy flex-1">{q.title}</h3>
      </div>

      {/* Binary Choice with Images */}
      <div className="grid grid-cols-2 gap-3 h-[45vh] min-h-[300px]">
        {[q.optionA, q.optionB].map((opt) => {
          const isSelected = answers[q.id] === opt.key;
          return (
            <div
              key={opt.key}
              onClick={() => handleSelect(q.id, opt.key)}
              className={`relative rounded-[2.5rem] overflow-hidden border-4 active:scale-[0.96] transition-all duration-300 shadow-xl cursor-pointer ${
                isSelected ? 'border-coral scale-[1.02]' : 'border-transparent opacity-90'
              }`}
            >
              <img src={opt.img} className="w-full h-full object-cover" alt={opt.label} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 text-center text-white text-sm font-black px-2 drop-shadow-lg leading-tight uppercase tracking-wider">
                {opt.label}
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-coral/10 flex items-center justify-center animate-zoom-in">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Check size={32} className="text-coral" strokeWidth={5} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles size={12} className="text-gold" /> タップして選択！
        </p>
      </div>
    </div>
  );
};

export default WishScreen;
