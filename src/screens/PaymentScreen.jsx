import React, { useState } from 'react';
import {
  Wallet, CheckCircle2, Sparkles, Users, Bell, QrCode,
  ShieldCheck, ArrowRight
} from 'lucide-react';
import { participants, tripInfo } from '../data/mockData';

const PaymentScreen = ({ isOrganizer, setTripPhase }) => {
  const [paymentState, setPaymentState] = useState('unpaid'); // unpaid | processing | paid
  const [selectedMethod, setSelectedMethod] = useState('paypay');
  const [reminderSent, setReminderSent] = useState(false);

  const paidCount = participants.filter(p => p.paid).length;
  const unpaidParticipants = participants.filter(p => !p.paid);
  const totalCollected = paidCount * tripInfo.selectedPlan.pricePerPerson;
  const progressPct = Math.round((paidCount / participants.length) * 100);
  const allPaid = paidCount === participants.length;

  const paymentMethods = [
    { id: 'paypay', label: 'PayPay' },
    { id: 'linepay', label: 'LINE Pay' },
    { id: 'bank', label: '銀行振込' },
  ];

  // Organizer View
  if (isOrganizer) {
    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <div className="bg-navy border-4 border-gold/20 rounded-[2.5rem] p-6 flex items-start gap-4 shadow-xl">
          <ShieldCheck className="text-gold shrink-0" size={32} />
          <div>
            <p className="text-[10px] font-black text-gold tracking-[0.2em] uppercase mb-1 italic underline">Organizer Dashboard</p>
            <p className="text-[11px] text-white/70 leading-relaxed font-bold">集金状況を管理してください。全員完了で予約確定へ進めます。</p>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-gold text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F9E795" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F96167" strokeWidth="8"
                strokeDasharray={`${progressPct * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-coral">{paidCount}</span>
              <span className="text-[10px] font-black text-navy/40">/{participants.length}人</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-black text-navy">回収済み</p>
            <p className="text-2xl font-black text-coral">{totalCollected.toLocaleString()}円</p>
            <p className="text-[10px] text-navy/40 font-bold">合計: {tripInfo.selectedPlan.totalPrice.toLocaleString()}円</p>
          </div>
        </div>

        {/* Paid/Unpaid List */}
        <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20">
          <h4 className="font-black text-sm mb-4 text-navy flex items-center gap-2"><Users size={18} className="text-coral" /> 支払い状況</h4>
          <div className="space-y-2">
            {participants.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-cream rounded-2xl border border-gold/20">
                <div className="flex items-center gap-3">
                  <img src={p.img} className="w-9 h-9 rounded-full bg-white border border-gold/50" alt="" />
                  <span className="text-xs font-black text-navy">{p.name}</span>
                </div>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-sm ${p.paid ? 'text-white bg-emerald-500' : 'text-white bg-coral'}`}>
                  {p.paid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder */}
        {unpaidParticipants.length > 0 && (
          <button onClick={() => setReminderSent(true)} className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all ${reminderSent ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gold/20 text-navy border border-gold/30'}`}>
            <Bell size={16} /> {reminderSent ? 'リマインド送信済み ✓' : `未払い${unpaidParticipants.length}人にリマインド`}
          </button>
        )}

        {/* Confirm Button */}
        <button disabled={!allPaid} onClick={() => setTripPhase('confirmed')}
          className={`w-full py-5 rounded-[2rem] font-black shadow-xl transition-all flex items-center justify-center gap-2 ${allPaid ? 'bg-emerald-500 text-white active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
          <CheckCircle2 size={22} /> 予約確定へ進む <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // Participant View
  if (paymentState === 'paid') {
    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-gold text-center space-y-6">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-100">
            <CheckCircle2 size={52} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-navy">支払い完了！</h2>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2 text-left">
            <div className="flex justify-between"><span className="text-xs font-black text-navy/40">金額</span><span className="text-xs font-black text-navy">{tripInfo.selectedPlan.pricePerPerson.toLocaleString()}円</span></div>
            <div className="flex justify-between"><span className="text-xs font-black text-navy/40">支払い方法</span><span className="text-xs font-black text-navy">{paymentMethods.find(m => m.id === selectedMethod)?.label}</span></div>
            <div className="flex justify-between"><span className="text-xs font-black text-navy/40">ステータス</span><span className="text-xs font-black text-emerald-600 flex items-center gap-1"><CheckCircle2 size={12} /> 完了</span></div>
          </div>
          <div className="p-3 bg-coral/5 rounded-2xl border border-coral/10 flex items-center gap-2">
            <Sparkles size={14} className="text-coral" />
            <p className="text-[11px] font-black text-navy/60">幹事が全員の支払いを確認したら予約確定になります！</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Amount */}
      <div className="bg-navy rounded-[2.5rem] p-7 shadow-xl border-4 border-gold/20 text-center space-y-3">
        <Wallet size={40} className="text-gold mx-auto" strokeWidth={2} />
        <div>
          <p className="text-[10px] font-black text-gold/60 uppercase tracking-widest">支払い金額</p>
          <p className="text-4xl font-black text-white mt-1">{tripInfo.selectedPlan.pricePerPerson.toLocaleString()}<span className="text-lg ml-1">円</span></p>
        </div>
        <p className="text-[10px] text-white/40 font-black">期限: 2026年4月30日（木）</p>
      </div>

      {/* Method */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gold/20 space-y-4">
        <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest">支払い方法</p>
        <div className="flex gap-2">
          {paymentMethods.map(m => (
            <button key={m.id} onClick={() => setSelectedMethod(m.id)}
              className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${selectedMethod === m.id ? 'bg-navy text-gold shadow-md' : 'bg-cream text-navy/40 border border-gold/30'}`}>
              {m.label}
            </button>
          ))}
        </div>

        {/* QR Mock */}
        <div className="bg-cream rounded-2xl p-6 border-2 border-dashed border-gold/40 flex flex-col items-center gap-3">
          <QrCode size={64} className="text-navy/20" />
          <p className="text-[10px] font-black text-navy/30">QRコードをスキャンして支払い</p>
        </div>
      </div>

      {paymentState === 'processing' ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold border-t-coral rounded-full animate-spin mx-auto"></div>
          <p className="font-black text-navy">処理中...</p>
        </div>
      ) : (
        <button onClick={() => { setPaymentState('processing'); setTimeout(() => setPaymentState('paid'), 2000); }}
          className="w-full py-5 bg-coral text-white rounded-[2rem] font-black shadow-xl shadow-coral/30 active:scale-95 transition-all text-lg">
          支払う
        </button>
      )}
    </div>
  );
};

export default PaymentScreen;
