import React, { useState } from 'react';
import { Zap, ChevronRight, ChevronLeft, Users, X } from 'lucide-react';
import { phaseList } from '../data/mockData';

const DemoControl = ({ tripPhase, setTripPhase, isOrganizer, setIsOrganizer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const phaseIds = phaseList.map(p => p.id);
  const currentIdx = phaseIds.indexOf(tripPhase);

  const goNext = () => {
    if (currentIdx < phaseIds.length - 1) setTripPhase(phaseIds[currentIdx + 1]);
  };
  const goPrev = () => {
    if (currentIdx > 0) setTripPhase(phaseIds[currentIdx - 1]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-4 z-[200] w-12 h-12 bg-navy text-gold rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all border-2 border-gold/30"
      >
        <Zap size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-36 right-4 z-[200] bg-navy rounded-3xl shadow-2xl border-2 border-gold/30 p-4 w-64 animate-zoom-in">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black text-gold tracking-widest uppercase">Demo Control</span>
        <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white"><X size={16} /></button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <button onClick={goPrev} disabled={currentIdx === 0} className="p-1.5 bg-white/10 rounded-lg text-white disabled:opacity-20"><ChevronLeft size={14} /></button>
          <div className="flex-1 text-center">
            <p className="text-[9px] text-white/40 font-black">Phase {currentIdx + 1}/{phaseIds.length}</p>
            <p className="text-xs font-black text-gold">{phaseList[currentIdx]?.label}</p>
          </div>
          <button onClick={goNext} disabled={currentIdx === phaseIds.length - 1} className="p-1.5 bg-white/10 rounded-lg text-white disabled:opacity-20"><ChevronRight size={14} /></button>
        </div>

        <button
          onClick={() => setIsOrganizer(!isOrganizer)}
          className={`w-full py-2.5 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all ${
            isOrganizer ? 'bg-coral text-white' : 'bg-gold/20 text-gold'
          }`}
        >
          <Users size={14} />
          {isOrganizer ? '幹事モード' : '参加者モード'}
        </button>

        <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
          {phaseList.map((phase, idx) => (
            <button
              key={phase.id}
              onClick={() => setTripPhase(phase.id)}
              className={`px-2 py-1.5 rounded-lg text-[8px] font-black transition-all ${
                tripPhase === phase.id ? 'bg-coral text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {phase.short}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoControl;
