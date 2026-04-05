import React, { useState } from 'react';
import {
  Check, ChevronLeft, Sparkles, CheckCircle2, PartyPopper,
  PieChart, Waves, Mountain, UtensilsCrossed, Coffee
} from 'lucide-react';
import { wishQuestions, wishStats, fixedConditionsDefault } from '../data/mockData';

const WishScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleImageSelect = (qId, key) => {
    setAnswers({ ...answers, [qId]: key });
    setTimeout(() => {
      if (currentStep < wishQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }, 400);
  };

  const handleSliderChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleMultiToggle = (qId, key) => {
    const current = answers[qId] || [];
    setAnswers({ ...answers, [qId]: current.includes(key) ? current.filter(k => k !== key) : [...current, key] });
  };

  const handleTextChange = (qId, text) => {
    setAnswers({ ...answers, [qId]: text });
  };

  const goNext = () => {
    if (currentStep < wishQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isSubmitted) return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-6 space-y-4">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-100 relative">
          <CheckCircle2 size={48} className="text-white" />
          <PartyPopper className="absolute -top-2 -right-2 text-gold animate-bounce" size={28} />
        </div>
        <h2 className="text-2xl font-black text-navy">回答ありがとうございました！</h2>
      </div>
      <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-gold space-y-8">
        <h4 className="font-black text-sm text-navy flex items-center gap-2 uppercase tracking-widest"><PieChart size={18} className="text-coral"/> Group Trends</h4>
        {wishStats.map((s, i) => {
          const IconA = s.options[0].icon;
          const IconB = s.options[1].icon;
          return (
            <div key={i} className="space-y-3">
              <div className="flex justify-between items-end"><h5 className="text-xs font-black text-navy/70">{s.title}</h5><span className="text-[10px] font-black text-navy/30">集計済み</span></div>
              <div className="h-10 bg-navy/5 rounded-2xl overflow-hidden flex relative shadow-inner">
                <div style={{ width: `${s.options[0].p}%` }} className="bg-coral flex items-center justify-center text-white text-[10px] font-black px-2 overflow-hidden whitespace-nowrap">
                  <IconA size={14} className="mr-1 shrink-0" /> {s.options[0].label} {s.options[0].p}%
                </div>
                <div style={{ width: `${s.options[1].p}%` }} className="bg-gold flex items-center justify-center text-navy text-[10px] font-black px-2 overflow-hidden whitespace-nowrap">
                  <IconB size={14} className="mr-1 shrink-0" /> {s.options[1].label} {s.options[1].p}%
                </div>
              </div>
            </div>
          );
        })}
        <div className="p-4 bg-coral/5 rounded-2xl border border-coral/20 flex items-start gap-3 italic">
          <Sparkles size={16} className="text-coral mt-1 shrink-0" />
          <p className="text-[11px] text-navy/60 font-black leading-relaxed">AIがこれらのトレンドを元に、プラン案を生成しています。幹事の発表を待とう！</p>
        </div>
      </div>
    </div>
  );

  if (isFinished) return (
    <div className="space-y-6 animate-zoom-in px-2 py-6 text-center">
      <h3 className="text-2xl font-black text-navy">この内容でOK？</h3>
      <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-gold/20 space-y-4 text-left">
        {wishQuestions.map(q => {
          let answerDisplay = '';
          if (q.type === 'image') {
            answerDisplay = q.options.find(o => o.key === answers[q.id])?.label || '未回答';
          } else if (q.type === 'slider') {
            answerDisplay = answers[q.id] ? `${Number(answers[q.id]).toLocaleString()}${q.unit}` : '未回答';
          } else if (q.type === 'multi') {
            const selected = answers[q.id] || [];
            answerDisplay = selected.length > 0 ? q.options.filter(o => selected.includes(o.key)).map(o => o.label).join(', ') : '未回答';
          } else {
            answerDisplay = answers[q.id] || '未回答';
          }
          return (
            <div key={q.id} className="flex justify-between items-center border-b border-gold/10 pb-3 last:border-0 last:pb-0">
              <span className="text-sm font-bold text-navy/40">{q.title}</span>
              <span className="font-black text-navy text-xs flex items-center gap-1.5"><Check size={14} strokeWidth={4} className="text-emerald-500" />{answerDisplay}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <button onClick={() => { setIsSubmitted(true); onComplete?.(); }} className="w-full py-4 bg-coral text-white rounded-2xl font-black shadow-lg shadow-coral/20 active:scale-95 transition-all">この内容で送信する</button>
        <button onClick={() => { setIsFinished(false); setCurrentStep(0); }} className="text-sm font-bold text-navy/40 hover:text-navy transition-colors">やり直す</button>
      </div>
    </div>
  );

  const q = wishQuestions[currentStep];
  const progress = ((currentStep + 1) / wishQuestions.length) * 100;

  const renderQuestion = () => {
    switch (q.type) {
      case 'image':
        return (
          <div className="grid grid-cols-2 gap-3 h-[45vh] min-h-[300px]">
            {q.options.map((opt) => (
              <div key={opt.key} onClick={() => handleImageSelect(q.id, opt.key)} className={`relative rounded-[2.5rem] overflow-hidden border-4 active:scale-[0.96] transition-all duration-300 shadow-xl ${answers[q.id] === opt.key ? 'border-coral scale-[1.02]' : 'border-transparent opacity-90'}`}>
                <img src={opt.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 text-center text-white text-sm font-black px-2 drop-shadow-lg leading-tight uppercase tracking-wider">{opt.label}</div>
                {answers[q.id] === opt.key && <div className="absolute inset-0 bg-coral/10 flex items-center justify-center animate-zoom-in"><div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl"><Check size={32} className="text-coral" strokeWidth={5} /></div></div>}
              </div>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gold/20 space-y-6">
            <div className="text-center">
              <span className="text-4xl font-black text-coral">{(answers[q.id] || q.defaultValue).toLocaleString()}</span>
              <span className="text-lg font-black text-navy/40 ml-1">{q.unit}</span>
            </div>
            <input type="range" min={q.min} max={q.max} step={q.step} value={answers[q.id] || q.defaultValue}
              onChange={e => handleSliderChange(q.id, Number(e.target.value))}
              className="w-full accent-coral h-2"
            />
            <div className="flex justify-between text-[10px] font-black text-navy/30">
              <span>{q.min.toLocaleString()}{q.unit}</span>
              <span>{q.max.toLocaleString()}{q.unit}</span>
            </div>
            <button onClick={goNext} className="w-full py-4 bg-coral text-white rounded-2xl font-black shadow-lg active:scale-95 transition-all">次へ</button>
          </div>
        );

      case 'multi':
        return (
          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gold/20 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(opt => {
                const selected = (answers[q.id] || []).includes(opt.key);
                return (
                  <button key={opt.key} onClick={() => handleMultiToggle(q.id, opt.key)}
                    className={`py-4 px-3 rounded-2xl font-black text-sm transition-all border-2 ${selected ? 'bg-coral text-white border-coral shadow-lg' : 'bg-cream text-navy/60 border-gold/30'}`}>
                    {selected && <Check size={14} className="inline mr-1" />}{opt.label}
                  </button>
                );
              })}
            </div>
            <button onClick={goNext} className="w-full py-4 bg-coral text-white rounded-2xl font-black shadow-lg active:scale-95 transition-all">次へ</button>
          </div>
        );

      case 'text':
        return (
          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gold/20 space-y-4">
            <textarea value={answers[q.id] || ''} onChange={e => handleTextChange(q.id, e.target.value)} placeholder={q.placeholder}
              rows={4}
              className="w-full font-bold text-navy bg-cream/50 rounded-xl px-4 py-3 border border-gold/30 focus:border-coral focus:outline-none resize-none text-sm placeholder:text-navy/20"
            />
            <button onClick={goNext} className="w-full py-4 bg-coral text-white rounded-2xl font-black shadow-lg active:scale-95 transition-all">次へ</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-slide-right">
      {/* Fixed conditions summary */}
      <div className="bg-navy/5 rounded-2xl p-3 border border-gold/20">
        <p className="text-[9px] font-black text-navy/30 uppercase tracking-widest mb-1">固定条件</p>
        <div className="flex flex-wrap gap-1.5">
          {[fixedConditionsDefault.area, fixedConditionsDefault.transport, ...fixedConditionsDefault.amenities].map((tag, i) => (
            <span key={i} className="text-[9px] font-black text-navy/50 bg-white px-2 py-0.5 rounded-full border border-gold/20">{tag}</span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between px-1">
          <span className="text-[10px] font-black text-coral uppercase tracking-[0.3em] italic">Step {currentStep + 1} of {wishQuestions.length}</span>
          <span className="text-xs font-black text-navy/30">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-navy/5 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-coral transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)} className="p-2 bg-white rounded-full text-navy/40 border border-gold/30 shadow-sm"><ChevronLeft size={20} /></button>}
        <h3 className="font-black text-2xl text-center text-navy flex-1 pr-8">{q.title}</h3>
      </div>

      {renderQuestion()}

      <div className="text-center pt-4">
        <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles size={12} className="text-gold" /> {q.type === 'image' ? 'Tap your favorite!' : 'Answer & continue'}
        </p>
      </div>
    </div>
  );
};

export default WishScreen;
