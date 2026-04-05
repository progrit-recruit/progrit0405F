import React, { useState } from 'react';
import { 
  Users, 
  CalendarDays,
  Heart,
  Map as MapIcon,
  Wallet,
  BookOpen,
  Home,
  Sparkles,
  Check,
  ChevronRight,
  Bell,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  ChevronLeft,
  ArrowRight,
  Clock,
  Coins,
  Bed,
  Palmtree,
  MapPin,
  Train,
  Car,
  RotateCcw,
  Info,
  PieChart,
  PartyPopper,
  MessageCircle,
  ShieldCheck,
  Copy,
  Share2,
  Calendar as CalendarIcon,
  Timer,
  ExternalLink,
  SendHorizontal,
  QrCode,
  Building2,
  Apple,
  Store,
  Waves,
  Mountain,
  UtensilsCrossed,
  Coffee,
  Zap,
  Moon,
  FileText,
  Download,
  Phone,
  Backpack,
  Sun,
  Camera,
  LogOut,
  Settings,
  User
} from 'lucide-react';

// カラーパレット
// Primary (Nav/Main): #F96167 (Coral Pink)
// Secondary (Highlights/Dot/Text): #1A1F3A (Navy)
// Accent (Borders/Details): #F9E795 (Gold)
// Background: #FFFDF0 (Cream)

const App = () => {
  // --- 共通ステート ---
  const [activeTab, setActiveTab] = useState('invite'); 
  const [isOrganizer, setIsOrganizer] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // 旅行の基本情報
  const tripInfo = {
    title: "春の卒業旅行 2026 🌸",
    organizer: "たかし",
    date: "2026年 5月10日(日) 〜 11日(月)",
    memberCount: 15,
    joinedCount: 15,
    selectedPlan: {
      name: "南伊豆・オーシャンビュー満喫プラン",
      stayName: "赤沢温泉ホテル",
      stayAddress: "静岡県伊東市赤沢対馬170-2",
      stayPhone: "0557-53-5555",
      pricePerPerson: 28000,
      totalPrice: 420000,
      deadline: "完了",
    }
  };

  const navItems = [
    { id: 'invite', label: 'ホーム', icon: Home },
    { id: 'schedule', label: '日程', icon: CalendarDays },
    { id: 'wish', label: '希望', icon: Heart },
    { id: 'plan', label: 'プラン', icon: MapIcon },
    { id: 'pay', label: '集金', icon: Wallet },
    { id: 'guide', label: 'しおり', icon: BookOpen },
  ];

  // --- ステート管理 ---
  const [userStatus, setUserStatus] = useState({ schedule: true, wish: false, payment: false });
  const [viewMode, setViewMode] = useState('personal'); 
  const [dateStates, setDateStates] = useState({}); 
  const [isCalendarImported, setIsCalendarImported] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWishFinished, setIsWishFinished] = useState(false);
  const [isWishSubmitted, setIsWishSubmitted] = useState(false);
  const [wishes, setWishes] = useState({ 1: null, 2: null, 3: null });
  const [planPhase, setPlanPhase] = useState('organizer_select'); 
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [viewingDetailPlanId, setViewingDetailPlanId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('paypay');

  // --- データ定義 ---
  const announcements = [
    { id: 1, date: "2時間前", text: "たかし：希望調査の締め切りは今週末までです！お早めに〜", type: "important" },
    { id: 2, date: "昨日", text: "しおりのベースを作成しました 📘", type: "normal" }
  ];

  const aiProposals = [
    {
      id: 'A',
      name: "南伊豆・オーシャンビュー満喫プラン",
      stay: "赤沢温泉ホテル",
      match: "95%",
      cost: "28,000円",
      timeline: [
        { time: "09:00", spot: "品川駅 集合", desc: "港南口の広場に集合！", icon: MapPin },
        { time: "11:30", spot: "伊豆高原駅 着", desc: "レンタカー移動", icon: Car },
        { time: "15:00", spot: "城ヶ崎海岸", desc: "絶景の吊り橋", icon: Palmtree },
        { time: "17:30", spot: "ホテルチェックイン", desc: "温泉タイム", icon: Bed }
      ]
    },
    {
      id: 'B',
      name: "修善寺・チル旅 & 陶芸体験プラン",
      stay: "宙 SORA 渡月荘金龍",
      match: "80%",
      cost: "32,000円",
      timeline: [
        { time: "10:00", spot: "三島駅 集合", desc: "踊り子号で修善寺へ", icon: Train },
        { time: "11:00", spot: "修善寺駅 着", desc: "温泉街ランチ", icon: UtensilsCrossed }
      ]
    }
  ];

  const participants = [
    { id: 1, name: "たかし", paid: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Takashi" },
    { id: 2, name: "みずき", paid: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mizuki" },
    { id: 3, name: "あなた", paid: userStatus.payment, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Takashi" },
  ];

  const wishQuestions = [
    { id: 1, title: "どっちの気分？", options: [{ key: 'sea', label: '開放的な海！', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600' }, { key: 'mountain', label: '癒やしの山！', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600' }] },
    { id: 2, title: "夕食スタイル", options: [{ key: 'bbq', label: 'みんなでBBQ', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600' }, { key: 'indoor', label: 'お店でゆっくり', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600' }] },
    { id: 3, title: "過ごし方", options: [{ key: 'active', label: '遊び尽くす！', img: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?q=80&w=600' }, { key: 'chill', label: 'ゆったり', img: 'https://images.unsplash.com/photo-1526491109672-7474bd61c41f?q=80&w=600' }] },
  ];

  const wishStats = [
    { id: 1, title: "気分", options: [{ label: "海", p: 75, icon: Waves }, { label: "山", p: 25, icon: Mountain }] },
    { id: 2, title: "夕食", options: [{ label: "BBQ", p: 85, icon: UtensilsCrossed }, { label: "屋内", p: 15, icon: Coffee }] },
  ];

  const heatmapDataCounts = { 11: 15, 12: 15, 4: 12, 5: 14, 18: 10 };

  // --- 1. ホーム画面 ---
  const renderHomeContent = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-3">
        <h3 className="font-black text-[#1A1F3A] flex items-center gap-2 px-1 text-sm"><Megaphone size={18} className="text-[#F96167]" />お知らせ</h3>
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#F9E795]/30">
          {announcements.map(ann => (
            <div key={ann.id} className={`p-4 border-b border-[#F9E795]/10 last:border-0 ${ann.type === 'important' ? 'bg-[#F96167]/5' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded bg-[#1A1F3A] text-[#F9E795]`}>{ann.type.toUpperCase()}</span>
                <span className="text-[10px] text-[#1A1F3A]/40 font-medium">{ann.date}</span>
              </div>
              <p className="text-sm font-bold text-[#1A1F3A] leading-snug">{ann.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-black text-[#1A1F3A] flex items-center gap-2 px-1 text-sm"><Sparkles size={18} className="text-[#F9E795]" />あなたの進捗</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 'schedule', label: '日程調整', status: userStatus.schedule, tab: 'schedule' },
            { id: 'wish', label: '希望回答', status: userStatus.wish, tab: 'wish' },
            { id: 'payment', label: '支払い完了', status: userStatus.payment, tab: 'pay' }
          ].map((item) => (
            <div key={item.id} onClick={() => setActiveTab(item.tab)} className={`bg-white rounded-[1.8rem] p-4 flex items-center justify-between shadow-sm border-2 transition-all active:scale-[0.98] ${item.status ? 'border-[#F9E795] bg-[#F9E795]/5' : 'border-white'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.status ? 'bg-[#1A1F3A] text-[#F9E795]' : 'bg-slate-100 text-slate-400'}`}>
                  {item.status ? <Check size={20} strokeWidth={3} /> : <AlertCircle size={20} />}
                </div>
                <div><p className="text-sm font-bold text-[#1A1F3A]">{item.label}</p><p className="text-[10px] text-[#1A1F3A]/40 font-medium">{item.status ? '完了済み' : '未対応'}</p></div>
              </div>
              {!item.status && <ChevronRight size={18} className="text-[#F96167]" />}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1A1F3A] rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden border-2 border-[#F9E795]/20">
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-black mb-1 text-[#F9E795]">友達を招待しよう！</h3>
          <p className="text-xs text-white/70 font-medium">現在 {tripInfo.joinedCount} / {tripInfo.memberCount} 人が参加中</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#F96167] text-white font-black py-3 rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 shadow-lg"><Share2 size={16} /> LINEで送る</button>
            <button className="p-3 bg-white/10 rounded-2xl border border-white/20 active:scale-95 transition-all text-[#F9E795]"><Copy size={20} /></button>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F96167]/30 rounded-full blur-2xl"></div>
      </div>
    </div>
  );

  // --- 2. 日程調整画面 ---
  const renderScheduleContent = () => {
    const handleDateClick = (day) => {
      if (viewMode === 'heatmap') return;
      const current = dateStates[day] || 'unanswered';
      const next = current === 'available' ? 'maybe' : current === 'maybe' ? 'unavailable' : current === 'unavailable' ? 'unanswered' : 'available';
      setDateStates({ ...dateStates, [day]: next });
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white p-1.5 rounded-2xl flex shadow-sm border border-[#F9E795]">
          <button onClick={() => setViewMode('personal')} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'personal' ? 'bg-[#1A1F3A] text-[#F9E795]' : 'text-slate-400'}`}>自分の回答</button>
          <button onClick={() => setViewMode('heatmap')} className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'heatmap' ? 'bg-[#1A1F3A] text-[#F9E795]' : 'text-slate-400'}`}>みんなの状況</button>
        </div>
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border-4 border-white ring-1 ring-[#F9E795]/30">
          <div className="p-4 bg-[#1A1F3A] font-black text-center text-[#F9E795] border-b border-[#F9E795]/20 tracking-widest italic uppercase">2026 April</div>
          <div className="grid grid-cols-7 text-[9px] text-center font-black text-slate-300 p-2 tracking-widest">{['SUN','MON','TUE','WED','THU','FRI','SAT'].map(v => <div key={v}>{v}</div>)}</div>
          <div className="grid grid-cols-7 p-2 gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const d = i + 1;
              const state = dateStates[d] || 'unanswered';
              const count = heatmapDataCounts[d] || 0;
              return (
                <div key={i} onClick={() => handleDateClick(d)} className={`h-12 rounded-xl flex flex-col items-center justify-center font-black text-xs transition-all active:scale-90 border ${viewMode === 'personal' ? (state === 'available' ? 'bg-emerald-400 text-white border-emerald-500' : state === 'maybe' ? 'bg-[#F9E795] text-[#1A1F3A] border-amber-300' : state === 'unavailable' ? 'bg-[#F96167] text-white border-rose-500' : 'bg-white border-slate-100 text-slate-700') : (count >= 14 ? 'bg-emerald-500 text-white border-emerald-600' : count > 0 ? 'bg-[#F9E795]/20 text-[#1A1F3A] border-[#F9E795]/30' : 'bg-white border-slate-100 text-slate-300')}`}>
                  <span>{d}</span>
                  {viewMode === 'heatmap' && count > 0 && <span className="text-[7px] opacity-80 mt-0.5">{count}人</span>}
                </div>
              );
            })}
          </div>
          <div className="p-4 bg-[#FFFDF0] flex justify-center gap-4 text-[10px] font-black text-[#1A1F3A]/60 border-t border-[#F9E795]/30">
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />行ける</div>
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-[#F9E795] rounded-sm" />微妙</div>
            <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-[#F96167] rounded-sm" />無理</div>
          </div>
        </div>
        <button onClick={() => setIsCalendarImported(!isCalendarImported)} className="w-full py-4 bg-white border-2 border-dashed border-[#F9E795] rounded-2xl text-[#1A1F3A]/40 text-sm font-black flex items-center justify-center gap-2 active:bg-[#F9E795]/10">
          <CalendarIcon size={18} /> Google連携: {isCalendarImported ? 'ON' : 'OFF'}
        </button>
        <button className="w-full py-4 bg-[#F96167] text-white rounded-2xl font-black shadow-lg shadow-[#F96167]/20">回答を保存する</button>
      </div>
    );
  };

  // --- 3. 希望調査画面 ---
  const renderWishContent = () => {
    const handleSelect = (qId, key) => {
      setWishes({ ...wishes, [qId]: key });
      setTimeout(() => {
        if (currentStep < wishQuestions.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsWishFinished(true);
        }
      }, 400);
    };

    if (isWishSubmitted) return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center py-6 space-y-4">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-100 relative">
            <CheckCircle2 size={48} className="text-white" />
            <PartyPopper className="absolute -top-2 -right-2 text-[#F9E795] animate-bounce" size={28} />
          </div>
          <h2 className="text-2xl font-black text-[#1A1F3A]">回答ありがとうございました！</h2>
        </div>
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-[#F9E795] space-y-8">
          <h4 className="font-black text-sm text-[#1A1F3A] flex items-center gap-2 uppercase tracking-widest"><PieChart size={18} className="text-[#F96167]"/> Group Trends</h4>
          {wishStats.map((s, i) => {
            const IconA = s.options[0].icon;
            const IconB = s.options[1].icon;
            return (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end"><h5 className="text-xs font-black text-[#1A1F3A]/70">{s.title}</h5><span className="text-[10px] font-black text-[#1A1F3A]/30">集計済み</span></div>
                <div className="h-10 bg-[#1A1F3A]/5 rounded-2xl overflow-hidden flex relative shadow-inner">
                  <div style={{ width: `${s.options[0].p}%` }} className="bg-[#F96167] flex items-center justify-center text-white text-[10px] font-black px-2 overflow-hidden whitespace-nowrap">
                    <IconA size={14} className="mr-1 shrink-0" /> {s.options[0].label} {s.options[0].p}%
                  </div>
                  <div style={{ width: `${s.options[1].p}%` }} className="bg-[#F9E795] flex items-center justify-center text-[#1A1F3A] text-[10px] font-black px-2 overflow-hidden whitespace-nowrap">
                    <IconB size={14} className="mr-1 shrink-0" /> {s.options[1].label} {s.options[1].p}%
                  </div>
                </div>
              </div>
            );
          })}
          <div className="p-4 bg-[#F96167]/5 rounded-2xl border border-[#F96167]/20 flex items-start gap-3 italic">
            <Sparkles size={16} className="text-[#F96167] mt-1 shrink-0" />
            <p className="text-[11px] text-[#1A1F3A]/60 font-black leading-relaxed">AIがこれらのトレンドを元に、プラン案を生成しています。幹事の発表を待とう！</p>
          </div>
        </div>
        <button onClick={() => setActiveTab('invite')} className="w-full py-4 bg-[#1A1F3A] text-[#F9E795] rounded-2xl font-black shadow-xl">ホームへ戻る</button>
      </div>
    );

    if (isWishFinished) return (
      <div className="space-y-6 animate-in zoom-in px-2 py-6 text-center">
        <h3 className="text-2xl font-black text-[#1A1F3A]">この内容でOK？</h3>
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-[#F9E795]/20 space-y-4 text-left">
           {wishQuestions.map(q => (<div key={q.id} className="flex justify-between items-center border-b border-[#F9E795]/10 pb-3 last:border-0 last:pb-0"><span className="text-sm font-bold text-[#1A1F3A]/40">{q.title}</span><span className="font-black text-[#1A1F3A] flex items-center gap-1.5"><Check size={14} strokeWidth={4} className="text-emerald-500" />{q.options.find(o => o.key === wishes[q.id])?.label}</span></div>))}
        </div>
        <div className="flex flex-col gap-3 pt-4">
           <button onClick={() => { setIsWishSubmitted(true); setUserStatus({...userStatus, wish: true}); }} className="w-full py-4 bg-[#F96167] text-white rounded-2xl font-black shadow-lg shadow-[#F96167]/20 active:scale-95 transition-all">この内容で送信する</button>
           <button onClick={() => { setIsWishFinished(false); setCurrentStep(0); }} className="text-sm font-bold text-[#1A1F3A]/40 hover:text-[#1A1F3A] transition-colors">やり直す</button>
        </div>
      </div>
    );

    const q = wishQuestions[currentStep];
    const progress = ((currentStep + 1) / wishQuestions.length) * 100;

    return (
      <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
        <div className="space-y-2">
          <div className="flex justify-between px-1"><span className="text-[10px] font-black text-[#F96167] uppercase tracking-[0.3em] italic">Step {currentStep + 1} of {wishQuestions.length}</span><span className="text-xs font-black text-[#1A1F3A]/30">{Math.round(progress)}%</span></div>
          <div className="h-1.5 w-full bg-[#1A1F3A]/5 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-[#F96167] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="flex items-center gap-4">
           {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep-1)} className="p-2 bg-white rounded-full text-[#1A1F3A]/40 border border-[#F9E795]/30 shadow-sm"><ChevronLeft size={20} /></button>}
           <h3 className="font-black text-2xl text-center text-[#1A1F3A] flex-1 pr-8">{q.title}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 h-[45vh] min-h-[300px]">
          {q.options.map((opt) => (
            <div key={opt.key} onClick={() => handleSelect(q.id, opt.key)} className={`relative rounded-[2.5rem] overflow-hidden border-4 active:scale-[0.96] transition-all duration-300 shadow-xl ${wishes[q.id] === opt.key ? 'border-[#F96167] scale-[1.02]' : 'border-transparent opacity-90'}`}>
              <img src={opt.img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F3A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 text-center text-white text-sm font-black px-2 drop-shadow-lg leading-tight uppercase tracking-wider">{opt.label}</div>
              {wishes[q.id] === opt.key && <div className="absolute inset-0 bg-[#F96167]/10 flex items-center justify-center animate-in zoom-in"><div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl"><Check size={32} className="text-[#F96167]" strokeWidth={5} /></div></div>}
            </div>
          ))}
        </div>
        <div className="text-center pt-4"><p className="text-[10px] font-black text-[#1A1F3A]/40 uppercase tracking-widest flex items-center justify-center gap-2"><Sparkles size={12} className="text-[#F9E795]" /> Tap your favorite!</p></div>
      </div>
    );
  };

  // --- 4. プラン提案画面 ---
  const renderPlanContent = () => {
    if (viewingDetailPlanId) {
      const plan = aiProposals.find(p => p.id === viewingDetailPlanId);
      return (
        <div className="fixed inset-0 z-[150] bg-[#FFFDF0] flex flex-col overflow-y-auto pb-10 animate-in slide-in-from-bottom-10">
          <header className="sticky top-0 bg-[#FFFDF0]/80 backdrop-blur-md border-b border-[#F9E795]/30 px-4 py-4 flex items-center justify-between">
            <button onClick={() => setViewingDetailPlanId(null)} className="p-2 bg-[#1A1F3A]/5 rounded-full text-[#1A1F3A]"><ChevronLeft size={20} /></button>
            <h2 className="font-black text-sm text-[#1A1F3A]">プラン詳細</h2>
            <button onClick={() => setViewingDetailPlanId(null)} className="text-[#F96167] font-black text-xs px-3">閉じる</button>
          </header>
          <main className="p-5 space-y-6">
             <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-[#F9E795] space-y-6">
                <div className="aspect-video bg-[#1A1F3A]/5 rounded-2xl flex items-center justify-center text-[#F96167]/40 font-black italic tracking-widest border border-dashed border-[#F9E795]">MAP PREVIEW</div>
                <div className="space-y-4">
                  <h3 className="font-black text-sm text-[#1A1F3A] flex items-center gap-2 underline decoration-[#F9E795] decoration-4 underline-offset-4"><Clock size={18} className="text-[#F96167]" /> タイムライン</h3>
                  <div className="relative ml-4 pl-6 border-l-2 border-dashed border-[#F9E795] space-y-6">
                     {plan.timeline.map((t, i) => (<div key={i} className="relative"><div className="absolute -left-[35px] top-0 w-4 h-4 bg-white border-2 border-[#F96167] rounded-full"></div><p className="text-[10px] font-black text-[#F96167]">{t.time}</p><p className="text-sm font-bold text-[#1A1F3A]">{t.spot}</p></div>))}
                  </div>
                </div>
             </div>
          </main>
        </div>
      );
    }

    if (planPhase === 'aggregating') return (
      <div className="py-20 text-center space-y-6 animate-in fade-in"><div className="w-16 h-16 border-4 border-[#F9E795] border-t-[#F96167] rounded-full animate-spin mx-auto"></div><h3 className="font-black text-lg text-[#1A1F3A]">AIが最適なプランを提案中...</h3></div>
    );

    if (planPhase === 'voting' || planPhase === 'finalized') {
      return (
        <div className="space-y-6 animate-in slide-in-from-right-4 pb-10 text-center">
          <div className="space-y-1"><h3 className="text-2xl font-black text-[#1A1F3A] tracking-tight">プラン最終投票！</h3><p className="text-[10px] text-[#1A1F3A]/40 font-black tracking-widest uppercase">Vote for the best trip</p></div>
          <div className="relative space-y-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white shadow-xl border-4 border-[#F9E795] w-12 h-12 rounded-full flex items-center justify-center font-black italic text-[#F96167]">VS</div>
            {aiProposals.map((p, idx) => (
              <div key={p.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl border-2 border-[#F9E795]/20 space-y-3 text-left">
                <div className="flex justify-between items-end"><span className={`text-[10px] font-black px-3 py-1 rounded-full ${idx === 0 ? 'bg-[#F96167] text-white shadow-md' : 'bg-[#1A1F3A] text-[#F9E795]'}`}>PLAN {p.id}</span><span className="text-[10px] font-black text-[#1A1F3A]/30 tracking-widest">8 VOTES</span></div>
                <h4 className="font-black text-lg text-[#1A1F3A] leading-tight">{p.name}</h4>
                <div className="h-2 bg-[#1A1F3A]/5 rounded-full overflow-hidden"><div className={`h-full ${idx === 0 ? 'bg-[#F96167]' : 'bg-[#1A1F3A]'}`} style={{ width: `${idx === 0 ? 70 : 30}%` }}></div></div>
                <button className={`w-full py-3 rounded-2xl font-black text-xs border-2 transition-all active:scale-95 ${idx === 0 ? 'border-[#F96167] text-[#F96167]' : 'border-[#1A1F3A] text-[#1A1F3A]'}`}>このプランに投票する</button>
              </div>
            ))}
          </div>
          {isOrganizer && planPhase !== 'finalized' && <button onClick={() => setPlanPhase('finalized')} className="w-full py-5 bg-emerald-500 text-white rounded-[2.5rem] font-black shadow-xl flex items-center justify-center gap-2 animate-bounce mt-4"><Check size={24} strokeWidth={4} /> プランAで確定して進める</button>}
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4">
        <div className="bg-[#1A1F3A] border-4 border-[#F9E795]/20 rounded-[2.5rem] p-6 flex items-start gap-4 shadow-xl">
          <ShieldCheck className="text-[#F9E795] shrink-0" size={32} />
          <div><p className="text-[10px] font-black text-[#F9E795] tracking-[0.2em] uppercase mb-1 italic underline">Organizer Dashboard</p><p className="text-[11px] text-white/70 leading-relaxed font-bold">AI提案の中から投票に出す案を2つ選んでください。</p></div>
        </div>
        {aiProposals.map((p, i) => {
          const isSelected = selectedPlans.includes(p.id);
          return (
            <div key={p.id} className={`bg-white rounded-[2.5rem] p-5 border-4 transition-all shadow-lg ${isSelected ? 'border-[#F96167] scale-[1.02]' : 'border-white opacity-90'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#FFFDF0] text-[#F96167] px-3 py-1 rounded-full text-[10px] font-black border border-[#F9E795] italic tracking-widest shadow-sm">MATCH {p.match}</div>
                <button onClick={() => { if (isSelected) setSelectedPlans(selectedPlans.filter(id => id !== p.id)); else if (selectedPlans.length < 2) setSelectedPlans([...selectedPlans, p.id]); }} className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-[#F96167] text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}><Check size={20} strokeWidth={4}/></button>
              </div>
              <h4 className="text-xl font-black text-[#1A1F3A] leading-tight mb-4">{p.name}</h4>
              <div className="flex gap-4 mb-6"><div className="flex items-center gap-1.5 text-[10px] font-black text-[#1A1F3A]/40"><Bed size={14} className="text-[#F9E795]"/> {p.stay}</div><div className="flex items-center gap-1.5 text-[10px] font-black text-[#1A1F3A]/40"><Coins size={14} className="text-[#F9E795]"/> {p.cost}</div></div>
              <button onClick={() => setViewingDetailPlanId(p.id)} className="w-full py-3.5 bg-[#1A1F3A] text-[#F9E795] rounded-2xl text-[10px] font-black flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"><Info size={16} /> 詳細を確認・編集</button>
            </div>
          );
        })}
        <button disabled={selectedPlans.length !== 2} onClick={() => setPlanPhase('voting')} className={`w-full py-5 rounded-[2.5rem] font-black shadow-xl transition-all flex items-center justify-center gap-2 ${selectedPlans.length === 2 ? 'bg-[#F96167] text-white active:scale-95 shadow-[#F96167]/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>投票を開始する <ArrowRight size={20}/></button>
      </div>
    );
  };

  // --- 5. 集金画面 ---
  const renderPaymentContent = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-10">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-[#F9E795] text-center space-y-6">
        <div className="w-24 h-24 bg-[#1A1F3A] rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3 shadow-[#1A1F3A]/20">
           <Wallet size={48} className="text-[#F9E795]" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-[#1A1F3A]">集金は完了しました！</h2>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between"><span className="text-xs font-black text-emerald-700 italic flex items-center gap-2"><Sparkles size={14} /> 全員の支払いが正常に完了 ✨</span><CheckCircle2 size={18} className="text-emerald-500" /></div>
      </div>
      <div className="bg-white rounded-[2rem] p-6 border-2 border-white shadow-sm ring-1 ring-[#F9E795]/30">
         <h4 className="font-black text-sm mb-5 text-[#1A1F3A] flex items-center gap-2"><Users size={18} className="text-[#F96167]" /> 支払い完了メンバー</h4>
         <div className="grid grid-cols-1 gap-2">
            {participants.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-[#FFFDF0] rounded-2xl border border-[#F9E795]/20">
                 <div className="flex items-center gap-3"><img src={p.img} className="w-9 h-9 rounded-full bg-white border border-[#F9E795]/50" alt="" /><span className="text-xs font-black text-[#1A1F3A]">{p.name}</span></div>
                 <span className="text-[9px] font-black text-white bg-emerald-500 px-3 py-1 rounded-full uppercase shadow-sm">Paid</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  // --- 6. しおり画面 ---
  const renderGuideContent = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-10">
      <div className="bg-[#1A1F3A] rounded-[2.5rem] p-7 shadow-xl border-4 border-[#F9E795] space-y-4 relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div className="bg-[#F96167] text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 shadow-lg"><Camera size={14} /> Travel Guide</div>
          <button className="p-2.5 bg-white/10 text-[#F9E795] rounded-full border border-white/10"><Download size={20} /></button>
        </div>
        <div className="relative z-10 pt-2"><h2 className="text-3xl font-black text-white leading-tight mb-3 tracking-tighter">{tripInfo.title}</h2><p className="flex items-center gap-2 text-xs font-black text-[#F9E795]/70 italic tracking-wider"><CalendarDays size={16} /> {tripInfo.date}</p></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#F96167]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-5">
        <h3 className="font-black text-[#1A1F3A] text-lg flex items-center gap-2 px-1"><Sun size={22} className="text-[#F96167]" /> 行程表 - DAY 1</h3>
        <div className="relative ml-5 pl-7 border-l-4 border-dashed border-[#F9E795]">
          {aiProposals[0].timeline.map((item, idx) => {
            const TIcon = item.icon;
            return (
              <div key={idx} className="relative mb-10 last:mb-0 animate-in slide-in-from-left duration-500" style={{animationDelay: `${idx * 150}ms`}}>
                <div className="absolute -left-[43px] top-0 w-8 h-8 bg-white border-4 border-[#1A1F3A] rounded-2xl flex items-center justify-center text-[11px] text-[#1A1F3A] font-black shadow-lg rotate-3">{idx + 1}</div>
                <div className="bg-white rounded-[2rem] p-5 shadow-xl border border-[#F9E795]/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-[11px] font-black text-[#F96167] tracking-widest uppercase">{item.time}</p>
                    <TIcon size={12} className="text-[#1A1F3A]/40" />
                  </div>
                  <p className="text-base font-black text-[#1A1F3A] mb-1.5 leading-tight">{item.spot}</p>
                  <p className="text-[11px] text-[#1A1F3A]/40 font-bold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 pt-4 pb-12">
        <button className="flex-1 bg-[#F96167] text-white font-black py-5 rounded-[2rem] text-sm flex items-center justify-center gap-2 shadow-2xl shadow-[#F96167]/30 active:scale-95 transition-all"><Share2 size={20} /> しおりをシェア</button>
        <button className="w-20 bg-white border-2 border-[#F9E795] text-[#1A1F3A] rounded-[2rem] flex items-center justify-center shadow-xl active:scale-95 transition-all"><FileText size={24} /></button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'invite': return renderHomeContent();
      case 'schedule': return renderScheduleContent();
      case 'wish': return renderWishContent();
      case 'plan': return renderPlanContent();
      case 'pay': return renderPaymentContent();
      case 'guide': return renderGuideContent();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#1A1F3A] font-sans pb-44">
      <div className="h-1.5 opacity-30" style={{ backgroundImage: 'radial-gradient(#F9E795 25%, transparent 25%)', backgroundSize: '12px 12px' }} />

      <header className="sticky top-0 z-50 bg-[#FFFDF0]/90 backdrop-blur-md border-b border-[#F9E795]/40 px-5 py-5">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex flex-col"><span className="text-[10px] font-black text-[#F96167] tracking-[0.3em] uppercase italic">TABIMARU!</span><h1 className="font-black text-xl truncate tracking-tighter text-[#1A1F3A]">{tripInfo.title}</h1></div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl text-[#1A1F3A] relative shadow-sm border border-[#F9E795]/50 active:scale-90 transition-all">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#F96167] border-2 border-white rounded-full animate-pulse"></span>
            </div>
            
            {/* ユーザーメニューアイコンセクション */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-11 h-11 rounded-2xl border-2 border-[#F9E795] overflow-hidden shadow-sm active:scale-90 transition-all relative"
              >
                <img src={participants[0].img} alt="User" className="w-full h-full object-cover bg-white" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
              </button>

              {/* ログイン・設定メニュー */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-[#1A1F3A] rounded-3xl shadow-2xl border border-[#F9E795]/20 p-2 z-[200] animate-in slide-in-from-top-2">
                  <div className="p-3 border-b border-[#F9E795]/10 mb-1">
                    <p className="text-[10px] font-black text-[#F9E795] uppercase tracking-widest italic mb-0.5">Admin Account</p>
                    <p className="text-xs font-black text-white">{tripInfo.organizer}</p>
                  </div>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white hover:bg-white/10 active:bg-white/20 transition-all text-xs font-black">
                    <User size={16} className="text-[#F96167]" /> ログイン
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white hover:bg-white/10 active:bg-white/20 transition-all text-xs font-black">
                    <Settings size={16} className="text-[#F9E795]" /> 設定
                  </button>
                  <div className="h-px bg-[#F9E795]/10 my-1 mx-2" />
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#F96167] hover:bg-[#F96167]/10 transition-all text-xs font-black">
                    <LogOut size={16} /> ログアウト
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-5 min-h-[60vh]">{renderContent()}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#F96167] pt-3 pb-12 px-3 z-[100] shadow-[0_-15px_40px_rgba(249,97,103,0.3)] rounded-t-[3rem] border-t border-white/20">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setViewingDetailPlanId(null); setIsUserMenuOpen(false); }} className="flex flex-col items-center flex-1 relative transition-all duration-300">
                <div className={`w-1.5 h-1.5 rounded-full mb-1 transition-all duration-300 ${isActive ? 'bg-[#1A1F3A] opacity-100' : 'bg-transparent opacity-0'}`} />
                <div className={`transition-all duration-300 ${isActive ? 'text-[#1A1F3A] scale-110' : 'text-white/70 opacity-70'}`}><Icon size={isActive ? 26 : 22} strokeWidth={isActive ? 3 : 2} /></div>
                <span className={`text-[9px] mt-1.5 font-black tracking-tight transition-all duration-300 ${isActive ? 'text-[#1A1F3A]' : 'text-white/70'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default App;