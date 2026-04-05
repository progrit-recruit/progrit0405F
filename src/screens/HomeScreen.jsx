import React from 'react';
import {
  Megaphone, Sparkles, Check, AlertCircle, ChevronRight,
  Share2, Copy, MapPin, CalendarDays, Users, Wallet
} from 'lucide-react';
import { tripInfo, announcements } from '../data/mockData';

const HomeScreen = ({ userStatus, setActiveTab, tripPhase, isOrganizer }) => {
  const phaseAnnouncements = {
    scheduling: [
      { id: 10, date: "今", text: "日程調整が始まりました！カレンダーで回答してね \u{1F4C5}", type: "important" },
    ],
    wish_survey: [
      { id: 11, date: "2時間前", text: "たかし：希望調査の締め切りは今週末までです！お早めに\u301C", type: "important" },
    ],
    voting: [
      { id: 12, date: "今", text: "投票が始まりました！A案 vs B案、どっちがいい？ \u{1F5F3}\uFE0F", type: "important" },
    ],
    payment_collection: [
      { id: 13, date: "今", text: "プラン確定！お支払いをお願いします \u{1F4B0}", type: "important" },
    ],
    confirmed: [
      { id: 14, date: "今", text: "全員の支払い完了！予約が確定しました \u{1F389}", type: "important" },
    ],
    guide_ready: [
      { id: 15, date: "今", text: "しおりが完成しました！旅行楽しもう！ \u{1F338}", type: "important" },
    ],
  };

  const currentAnnouncements = phaseAnnouncements[tripPhase] || announcements;

  const progressItems = [
    { id: 'schedule', label: '日程調整', status: userStatus.schedule, tab: 'schedule', phase: 'scheduling' },
    { id: 'wish', label: '希望回答', status: userStatus.wish, tab: 'wish', phase: 'wish_survey' },
    { id: 'vote', label: 'プラン投票', status: userStatus.vote, tab: 'plan', phase: 'voting' },
    { id: 'payment', label: '支払い完了', status: userStatus.payment, tab: 'pay', phase: 'payment_collection' },
  ];

  const phaseOrder = ['room_create', 'inviting', 'scheduling', 'wish_survey', 'plan_generation', 'voting', 'provisional_booking', 'payment_collection', 'confirmed', 'guide_ready'];
  const currentPhaseIdx = phaseOrder.indexOf(tripPhase);

  const nextAction = progressItems.find(item => {
    const itemPhaseIdx = phaseOrder.indexOf(item.phase);
    return !item.status && itemPhaseIdx <= currentPhaseIdx;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Trip Info Card */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: tripInfo.area, color: 'text-coral' },
            { icon: CalendarDays, label: tripInfo.date, color: 'text-navy' },
            { icon: Users, label: `${tripInfo.joinedCount}/${tripInfo.memberCount}人`, color: 'text-coral' },
            { icon: Wallet, label: tripInfo.budget, color: 'text-navy' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cream flex items-center justify-center">
                  <Icon size={14} className={item.color} />
                </div>
                <span className="text-[10px] font-black text-navy/60 leading-tight">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Announcements */}
      <div className="space-y-3">
        <h3 className="font-black text-navy flex items-center gap-2 px-1 text-sm">
          <Megaphone size={18} className="text-coral" />お知らせ
        </h3>
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gold/30">
          {currentAnnouncements.map(ann => (
            <div key={ann.id} className={`p-4 border-b border-gold/10 last:border-0 ${ann.type === 'important' ? 'bg-coral/5' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-navy text-gold">{ann.type.toUpperCase()}</span>
                <span className="text-[10px] text-navy/40 font-medium">{ann.date}</span>
              </div>
              <p className="text-sm font-bold text-navy leading-snug">{ann.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <h3 className="font-black text-navy flex items-center gap-2 px-1 text-sm">
          <Sparkles size={18} className="text-gold" />あなたの進捗
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {progressItems.map((item) => {
            const itemPhaseIdx = phaseOrder.indexOf(item.phase);
            const isRelevant = itemPhaseIdx <= currentPhaseIdx;
            if (!isRelevant) return null;
            return (
              <div key={item.id} onClick={() => setActiveTab(item.tab)}
                className={`bg-white rounded-[1.8rem] p-4 flex items-center justify-between shadow-sm border-2 transition-all active:scale-[0.98] ${item.status ? 'border-gold bg-gold/5' : 'border-white'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.status ? 'bg-navy text-gold' : 'bg-slate-100 text-slate-400'}`}>
                    {item.status ? <Check size={20} strokeWidth={3} /> : <AlertCircle size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">{item.label}</p>
                    <p className="text-[10px] text-navy/40 font-medium">{item.status ? '完了済み' : '未対応'}</p>
                  </div>
                </div>
                {!item.status && <ChevronRight size={18} className="text-coral" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Action CTA */}
      {nextAction && (
        <button
          onClick={() => setActiveTab(nextAction.tab)}
          className="w-full py-4 bg-coral text-white rounded-2xl font-black shadow-lg shadow-coral/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {nextAction.label}に進む <ChevronRight size={18} />
        </button>
      )}

      {/* Invite Card */}
      <div className="bg-navy rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden border-2 border-gold/20">
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-black mb-1 text-gold">友達を招待しよう！</h3>
          <p className="text-xs text-white/70 font-medium">現在 {tripInfo.joinedCount} / {tripInfo.memberCount} 人が参加中</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-coral text-white font-black py-3 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 shadow-lg"><Share2 size={16} /> LINEで送る</button>
            <button className="p-3 bg-white/10 rounded-2xl border border-white/20 active:scale-95 transition-all text-gold"><Copy size={20} /></button>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coral/30 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default HomeScreen;
