import React from 'react';
import { Home, CalendarDays, Heart, Map as MapIcon, Wallet, BookOpen, Lock } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'ホーム', icon: Home, minPhase: 'inviting' },
  { id: 'schedule', label: '日程', icon: CalendarDays, minPhase: 'scheduling' },
  { id: 'wish', label: '希望', icon: Heart, minPhase: 'wish_survey' },
  { id: 'plan', label: 'プラン', icon: MapIcon, minPhase: 'voting' },
  { id: 'pay', label: '集金', icon: Wallet, minPhase: 'payment_collection' },
  { id: 'guide', label: 'しおり', icon: BookOpen, minPhase: 'guide_ready' },
];

const phaseOrder = [
  'room_create', 'inviting', 'scheduling', 'wish_survey',
  'plan_generation', 'voting', 'provisional_booking',
  'payment_collection', 'confirmed', 'guide_ready'
];

const BottomNav = ({ activeTab, setActiveTab, tripPhase, onTabChange }) => {
  const currentPhaseIdx = phaseOrder.indexOf(tripPhase);

  const isTabUnlocked = (minPhase) => {
    return currentPhaseIdx >= phaseOrder.indexOf(minPhase);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-coral pt-3 pb-12 px-3 z-[100] shadow-[0_-15px_40px_rgba(249,97,103,0.3)] rounded-t-[3rem] border-t border-white/20">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const unlocked = isTabUnlocked(item.minPhase);
          return (
            <button
              key={item.id}
              onClick={() => {
                if (unlocked) {
                  setActiveTab(item.id);
                  onTabChange?.();
                }
              }}
              className={`flex flex-col items-center flex-1 relative transition-all duration-300 ${!unlocked ? 'opacity-30' : ''}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full mb-1 transition-all duration-300 ${isActive ? 'bg-navy opacity-100' : 'bg-transparent opacity-0'}`} />
              <div className={`transition-all duration-300 ${isActive ? 'text-navy scale-110' : 'text-white/70 opacity-70'}`}>
                {unlocked ? <Icon size={isActive ? 26 : 22} strokeWidth={isActive ? 3 : 2} /> : <Lock size={20} />}
              </div>
              <span className={`text-[9px] mt-1.5 font-black tracking-tight transition-all duration-300 ${isActive ? 'text-navy' : 'text-white/70'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
