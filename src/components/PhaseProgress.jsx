import React from 'react';
import { Check } from 'lucide-react';
import { phaseList } from '../data/mockData';

const phaseOrder = phaseList.map(p => p.id);

const PhaseProgress = ({ tripPhase }) => {
  const currentIdx = phaseOrder.indexOf(tripPhase);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gold/20 px-4 py-3 overflow-x-auto">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-1 min-w-max">
          {phaseList.map((phase, idx) => {
            const isDone = idx < currentIdx;
            const isCurrent = idx === currentIdx;
            return (
              <React.Fragment key={phase.id}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black transition-all ${
                    isDone ? 'bg-emerald-500 text-white' :
                    isCurrent ? 'bg-coral text-white shadow-lg shadow-coral/30 scale-110' :
                    'bg-navy/10 text-navy/30'
                  }`}>
                    {isDone ? <Check size={12} strokeWidth={4} /> : idx + 1}
                  </div>
                  <span className={`text-[7px] font-black whitespace-nowrap ${
                    isCurrent ? 'text-coral' : isDone ? 'text-emerald-600' : 'text-navy/20'
                  }`}>{phase.short}</span>
                </div>
                {idx < phaseList.length - 1 && (
                  <div className={`h-0.5 w-4 flex-shrink-0 rounded ${isDone ? 'bg-emerald-400' : 'bg-navy/10'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhaseProgress;
