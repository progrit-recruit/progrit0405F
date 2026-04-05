import {
  MapPin, Car, Palmtree, Bed, Train, UtensilsCrossed,
  Waves, Mountain, Coffee
} from 'lucide-react';

export const tripInfo = {
  title: "春の卒業旅行 2026 \u{1F338}",
  organizer: "たかし",
  date: "2026年 5月10日(日) \u301C 11日(月)",
  area: "南伊豆エリア",
  memberCount: 15,
  joinedCount: 15,
  budget: "25,000\u301C30,000円",
  purpose: "卒業記念・思い出作り",
  transport: "レンタカー",
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

export const participants = [
  { id: 1, name: "たかし", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Takashi" },
  { id: 2, name: "みずき", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mizuki" },
  { id: 3, name: "ゆうた", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuta" },
  { id: 4, name: "さくら", paid: true, scheduleAnswered: true, wishAnswered: true, voted: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura" },
  { id: 5, name: "けんた", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta" },
  { id: 6, name: "あやか", paid: true, scheduleAnswered: true, wishAnswered: false, voted: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayaka" },
  { id: 7, name: "りょう", paid: false, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryo" },
  { id: 8, name: "まい", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai" },
  { id: 9, name: "こうへい", paid: false, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kohei" },
  { id: 10, name: "はるか", paid: true, scheduleAnswered: false, wishAnswered: false, voted: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haruka" },
  { id: 11, name: "だいき", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daiki" },
  { id: 12, name: "ゆい", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yui" },
  { id: 13, name: "しょうた", paid: true, scheduleAnswered: true, wishAnswered: true, voted: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shota" },
  { id: 14, name: "ななみ", paid: false, scheduleAnswered: true, wishAnswered: true, voted: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nanami" },
  { id: 15, name: "あなた", paid: false, scheduleAnswered: false, wishAnswered: false, voted: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=You" },
];

export const announcements = [
  { id: 1, date: "2時間前", text: "たかし：希望調査の締め切りは今週末までです！お早めに\u301C", type: "important" },
  { id: 2, date: "昨日", text: "しおりのベースを作成しました \u{1F4D8}", type: "normal" }
];

export const aiProposals = [
  {
    id: 'A',
    name: "南伊豆・オーシャンビュー満喫プラン",
    stay: "赤沢温泉ホテル",
    match: "95%",
    cost: "28,000円",
    costBreakdown: { stay: "18,000円", transport: "4,000円", food: "4,000円", activity: "2,000円" },
    aiReason: "アンケート結果から「海」「BBQ」「温泉」の人気が高く、予算内で全て叶えられるプランです。移動時間も適度で、アクティビティと癒しのバランスが取れています。",
    concerns: ["GW直後のため混雑の可能性あり", "天候次第で海アクティビティ変更の可能性"],
    matchPoints: ["海希望 75%に対応", "BBQ希望 85%に対応", "予算帯にぴったり"],
    timeline: [
      { time: "09:00", spot: "品川駅 集合", desc: "港南口の広場に集合！", icon: MapPin },
      { time: "11:30", spot: "伊豆高原駅 着", desc: "レンタカー移動", icon: Car },
      { time: "12:30", spot: "海鮮ランチ", desc: "地元の海鮮丼", icon: UtensilsCrossed },
      { time: "15:00", spot: "城ヶ崎海岸", desc: "絶景の吊り橋", icon: Palmtree },
      { time: "17:30", spot: "ホテルチェックイン", desc: "温泉タイム", icon: Bed },
      { time: "19:00", spot: "BBQディナー", desc: "海を眺めながらBBQ", icon: UtensilsCrossed }
    ]
  },
  {
    id: 'B',
    name: "修善寺・チル旅 & 陶芸体験プラン",
    stay: "宙 SORA 渡月荘金龍",
    match: "80%",
    cost: "32,000円",
    costBreakdown: { stay: "22,000円", transport: "3,000円", food: "4,000円", activity: "3,000円" },
    aiReason: "「ゆったり過ごしたい」派の意見を反映し、温泉街散策と陶芸体験を組み合わせた文化体験型プラン。宿のグレードが高く満足度重視。",
    concerns: ["予算が若干オーバー", "アクティブ派には物足りない可能性"],
    matchPoints: ["ゆったり派 25%に対応", "温泉重視の声に対応", "文化体験の要望あり"],
    timeline: [
      { time: "10:00", spot: "三島駅 集合", desc: "踊り子号で修善寺へ", icon: Train },
      { time: "11:00", spot: "修善寺駅 着", desc: "温泉街ランチ", icon: UtensilsCrossed },
      { time: "13:00", spot: "陶芸体験", desc: "思い出の器づくり", icon: Coffee },
      { time: "16:00", spot: "竹林散策", desc: "修善寺の名所を巡る", icon: Palmtree },
      { time: "17:30", spot: "旅館チェックイン", desc: "露天風呂で癒し", icon: Bed }
    ]
  }
];

export const wishQuestions = [
  { id: 1, type: 'image', title: "どっちの気分？", options: [{ key: 'sea', label: '開放的な海！', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600' }, { key: 'mountain', label: '癒やしの山！', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600' }] },
  { id: 2, type: 'image', title: "夕食スタイル", options: [{ key: 'bbq', label: 'みんなでBBQ', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600' }, { key: 'indoor', label: 'お店でゆっくり', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600' }] },
  { id: 3, type: 'image', title: "過ごし方", options: [{ key: 'active', label: '遊び尽くす！', img: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?q=80&w=600' }, { key: 'chill', label: 'ゆったり', img: 'https://images.unsplash.com/photo-1526491109672-7474bd61c41f?q=80&w=600' }] },
  { id: 4, type: 'slider', title: "予算感はどのくらい？", min: 15000, max: 40000, step: 5000, unit: "円", defaultValue: 25000 },
  { id: 5, type: 'multi', title: "やりたいこと（複数OK）", options: [{ key: 'onsen', label: '温泉' }, { key: 'bbq', label: 'BBQ' }, { key: 'beach', label: '海遊び' }, { key: 'hiking', label: 'ハイキング' }, { key: 'craft', label: '体験・クラフト' }, { key: 'photo', label: '写真映えスポット' }] },
  { id: 6, type: 'text', title: "その他、希望やリクエストがあれば！", placeholder: "例: カラオケしたい！夜は花火したい！" },
];

export const wishStats = [
  { id: 1, title: "気分", options: [{ label: "海", p: 75, icon: Waves }, { label: "山", p: 25, icon: Mountain }] },
  { id: 2, title: "夕食", options: [{ label: "BBQ", p: 85, icon: UtensilsCrossed }, { label: "屋内", p: 15, icon: Coffee }] },
];

export const surveyAggregation = {
  responseCount: 12,
  totalCount: 15,
  budgetAvg: 27000,
  budgetRange: "20,000\u301C35,000円",
  topActivities: [
    { label: "温泉", count: 11 },
    { label: "BBQ", count: 10 },
    { label: "海遊び", count: 8 },
    { label: "写真映え", count: 6 },
    { label: "ハイキング", count: 4 },
    { label: "体験", count: 3 },
  ],
  aiSummary: "全体的に「海 + BBQ + 温泉」の組み合わせが圧倒的人気。予算は平均27,000円で、アクティブ派が多数。車を出せる人は3名確認済み。"
};

export const fixedConditionsDefault = {
  area: "南伊豆",
  amenities: ["温泉", "BBQ", "カラオケ"],
  transport: "レンタカー",
  budgetMin: 20000,
  budgetMax: 35000,
  purpose: "卒業旅行",
  notes: "大部屋あり、花火可"
};

export const aiGeneratedQuestions = [
  { id: 1, type: "image", text: "海 vs 山、どっちの気分？", editable: true },
  { id: 2, type: "image", text: "夕食はBBQ vs お店ディナー？", editable: true },
  { id: 3, type: "image", text: "アクティブ派 vs ゆったり派？", editable: true },
  { id: 4, type: "slider", text: "予算感はどのくらい？（15,000〜40,000円）", editable: true },
  { id: 5, type: "multi", text: "やりたいアクティビティを選んでください（複数OK）", editable: true },
  { id: 6, type: "text", text: "その他、希望やリクエストがあれば自由に書いてください", editable: true },
];

export const heatmapDataCounts = { 11: 15, 12: 15, 4: 12, 5: 14, 18: 10 };

export const carAssignments = [
  { car: 1, driver: "たかし", members: ["みずき", "ゆうた", "さくら"] },
  { car: 2, driver: "けんた", members: ["あやか", "りょう", "まい"] },
  { car: 3, driver: "こうへい", members: ["はるか", "だいき", "ゆい"] },
  { car: 4, driver: "しょうた", members: ["ななみ", "あなた"] },
];

export const roomAssignments = [
  { room: "和室A（8名）", members: ["たかし", "ゆうた", "けんた", "りょう", "こうへい", "だいき", "しょうた", "あなた"] },
  { room: "和室B（7名）", members: ["みずき", "さくら", "あやか", "まい", "はるか", "ゆい", "ななみ"] },
];

export const packingList = [
  { id: 1, item: "着替え（1泊分）", category: "必須" },
  { id: 2, item: "歯ブラシ・洗面用具", category: "必須" },
  { id: 3, item: "タオル", category: "必須" },
  { id: 4, item: "保険証コピー", category: "必須" },
  { id: 5, item: "日焼け止め", category: "推奨" },
  { id: 6, item: "水着", category: "推奨" },
  { id: 7, item: "カメラ・充電器", category: "推奨" },
  { id: 8, item: "サンダル", category: "推奨" },
  { id: 9, item: "酔い止め薬", category: "あると便利" },
  { id: 10, item: "トランプ・UNO", category: "あると便利" },
];

export const emergencyContacts = [
  { label: "幹事（たかし）", phone: "090-1234-5678" },
  { label: "赤沢温泉ホテル", phone: "0557-53-5555" },
  { label: "伊東市消防署", phone: "0557-36-0119" },
];

export const phaseList = [
  { id: 'room_create', label: 'ルーム作成', short: '作成' },
  { id: 'inviting', label: '招待中', short: '招待' },
  { id: 'scheduling', label: '日程調整', short: '日程' },
  { id: 'wish_survey', label: '希望調査', short: '希望' },
  { id: 'plan_generation', label: 'プラン生成', short: 'AI' },
  { id: 'voting', label: '投票中', short: '投票' },
  { id: 'provisional_booking', label: '仮予約', short: '予約' },
  { id: 'payment_collection', label: '集金中', short: '集金' },
  { id: 'confirmed', label: '予約確定', short: '確定' },
  { id: 'guide_ready', label: 'しおり共有', short: 'しおり' },
];
