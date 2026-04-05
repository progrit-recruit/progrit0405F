import React, { useState } from 'react';
import {
  Camera, Download, CalendarDays, Sun, Share2, FileText,
  Users, Car, Bed, CheckSquare, Square, Phone, Cloud
} from 'lucide-react';
import {
  tripInfo, aiProposals, participants,
  carAssignments, roomAssignments, packingList, emergencyContacts
} from '../data/mockData';

const GuideScreen = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const categoryColors = {
    '必須': 'text-coral bg-coral/10',
    '推奨': 'text-navy bg-navy/10',
    'あると便利': 'text-gold bg-gold/20 text-navy',
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Card */}
      <div className="bg-navy rounded-[2.5rem] p-7 shadow-xl border-4 border-gold space-y-4 relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div className="bg-coral text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 shadow-lg">
            <Camera size={14} /> Travel Guide
          </div>
          <button className="p-2.5 bg-white/10 text-gold rounded-full border border-white/10"><Download size={20} /></button>
        </div>
        <div className="relative z-10 pt-2">
          <h2 className="text-3xl font-black text-white leading-tight mb-3 tracking-tighter">{tripInfo.title}</h2>
          <p className="flex items-center gap-2 text-xs font-black text-gold/70 italic tracking-wider"><CalendarDays size={16} /> {tripInfo.date}</p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-coral/30 rounded-full blur-3xl"></div>
      </div>

      {/* Weather Mock */}
      <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gold/20 flex items-center gap-4">
        <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center">
          <Sun size={24} className="text-gold" />
        </div>
        <div>
          <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest">当日の天気予報</p>
          <p className="text-sm font-black text-navy">快晴 ☀️ 25℃ / 伊豆エリア</p>
          <p className="text-[10px] font-bold text-navy/40">絶好の旅行日和です！</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-5">
        <h3 className="font-black text-navy text-lg flex items-center gap-2 px-1"><Sun size={22} className="text-coral" /> 行程表 - DAY 1</h3>
        <div className="relative ml-5 pl-7 border-l-4 border-dashed border-gold">
          {aiProposals[0].timeline.map((item, idx) => {
            const TIcon = item.icon;
            return (
              <div key={idx} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[43px] top-0 w-8 h-8 bg-white border-4 border-navy rounded-2xl flex items-center justify-center text-[11px] text-navy font-black shadow-lg rotate-3">{idx + 1}</div>
                <div className="bg-white rounded-[2rem] p-5 shadow-xl border border-gold/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-[11px] font-black text-coral tracking-widest uppercase">{item.time}</p>
                    <TIcon size={12} className="text-navy/40" />
                  </div>
                  <p className="text-base font-black text-navy mb-1.5 leading-tight">{item.spot}</p>
                  <p className="text-[11px] text-navy/40 font-bold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
        <h3 className="font-black text-navy flex items-center gap-2"><Users size={18} className="text-coral" /> 参加者一覧（{participants.length}人）</h3>
        <div className="grid grid-cols-4 gap-3">
          {participants.map(p => (
            <div key={p.id} className="flex flex-col items-center gap-1">
              <img src={p.img} className="w-12 h-12 rounded-2xl bg-cream border-2 border-gold/30" alt="" />
              <span className="text-[9px] font-black text-navy/60 text-center leading-tight">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Car Assignments */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
        <h3 className="font-black text-navy flex items-center gap-2"><Car size={18} className="text-coral" /> 車割り</h3>
        <div className="space-y-3">
          {carAssignments.map((car, idx) => (
            <div key={idx} className="bg-cream rounded-2xl p-4 border border-gold/20">
              <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-2">車 {car.car}（ドライバー: {car.driver}）</p>
              <div className="flex flex-wrap gap-1.5">
                {car.members.map((m, i) => (
                  <span key={i} className="text-[10px] font-black text-navy/60 bg-white px-2.5 py-1 rounded-full border border-gold/30">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Assignments */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
        <h3 className="font-black text-navy flex items-center gap-2"><Bed size={18} className="text-coral" /> 部屋割り</h3>
        <div className="space-y-3">
          {roomAssignments.map((room, idx) => (
            <div key={idx} className="bg-cream rounded-2xl p-4 border border-gold/20">
              <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-2">{room.room}</p>
              <div className="flex flex-wrap gap-1.5">
                {room.members.map((m, i) => (
                  <span key={i} className="text-[10px] font-black text-navy/60 bg-white px-2.5 py-1 rounded-full border border-gold/30">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Packing List */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
        <h3 className="font-black text-navy flex items-center gap-2"><CheckSquare size={18} className="text-coral" /> 持ち物チェックリスト</h3>
        <div className="space-y-2">
          {packingList.map(item => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <button key={item.id} onClick={() => toggleCheck(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${isChecked ? 'bg-emerald-50 border-emerald-200' : 'bg-cream border-gold/20'}`}>
                {isChecked ? <CheckSquare size={20} className="text-emerald-500 shrink-0" /> : <Square size={20} className="text-navy/20 shrink-0" />}
                <span className={`flex-1 text-sm font-bold ${isChecked ? 'line-through text-navy/30' : 'text-navy'}`}>{item.item}</span>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${categoryColors[item.category]}`}>{item.category}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] font-black text-navy/30 text-center">{checkedItems.length}/{packingList.length} 完了</p>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-3">
        <h3 className="font-black text-navy flex items-center gap-2"><Phone size={18} className="text-coral" /> 緊急連絡先</h3>
        {emergencyContacts.map((c, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-cream rounded-2xl border border-gold/20">
            <span className="text-xs font-black text-navy/60">{c.label}</span>
            <span className="text-sm font-black text-navy">{c.phone}</span>
          </div>
        ))}
      </div>

      {/* Share Buttons */}
      <div className="flex gap-4 pb-4">
        <button className="flex-1 bg-coral text-white font-black py-5 rounded-[2rem] text-sm flex items-center justify-center gap-2 shadow-2xl shadow-coral/30 active:scale-95 transition-all"><Share2 size={20} /> しおりをシェア</button>
        <button className="w-20 bg-white border-2 border-gold text-navy rounded-[2rem] flex items-center justify-center shadow-xl active:scale-95 transition-all"><FileText size={24} /></button>
      </div>
    </div>
  );
};

export default GuideScreen;
