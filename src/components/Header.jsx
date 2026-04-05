import React from 'react';
import { Bell, User, Settings, LogOut } from 'lucide-react';
import { tripInfo, participants } from '../data/mockData';

const Header = ({ isUserMenuOpen, setIsUserMenuOpen, isOrganizer, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-gold/40 px-5 py-5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-coral tracking-[0.3em] uppercase italic">TABIMARU!</span>
          <h1 className="font-black text-xl truncate tracking-tighter text-navy">{tripInfo.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white rounded-2xl text-navy relative shadow-sm border border-gold/50 active:scale-90 transition-all">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-coral border-2 border-white rounded-full animate-pulse"></span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-11 h-11 rounded-2xl border-2 border-gold overflow-hidden shadow-sm active:scale-90 transition-all relative"
            >
              <img src={participants[0].img} alt="User" className="w-full h-full object-cover bg-white" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
            </button>
            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-3 w-48 bg-navy rounded-3xl shadow-2xl border border-gold/20 p-2 z-[200] animate-slide-down">
                <div className="p-3 border-b border-gold/10 mb-1">
                  <p className="text-[10px] font-black text-gold uppercase tracking-widest italic mb-0.5">
                    {isOrganizer ? 'Admin Account' : 'Member'}
                  </p>
                  <p className="text-xs font-black text-white">{tripInfo.organizer}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white hover:bg-white/10 active:bg-white/20 transition-all text-xs font-black">
                  <User size={16} className="text-coral" /> ログイン
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white hover:bg-white/10 active:bg-white/20 transition-all text-xs font-black">
                  <Settings size={16} className="text-gold" /> 設定
                </button>
                <div className="h-px bg-gold/10 my-1 mx-2" />
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-coral hover:bg-coral/10 transition-all text-xs font-black">
                  <LogOut size={16} /> ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
