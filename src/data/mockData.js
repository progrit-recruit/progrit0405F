import {
  MapPin, Car, Palmtree, Bed, Train, UtensilsCrossed,
  Waves, Mountain, Coffee, Plane, Ship
} from 'lucide-react';

export const tripInfo = {
  title: "春の卒業旅行 2026 \u{1F338}",
  organizer: "たかし",
  date: "2026年 5月10日(日) \u301C 11日(月)",
  area: "未定（AI提案）",
  memberCount: 15,
  joinedCount: 15,
  budget: "25,000\u301C35,000円",
  purpose: "卒業記念・思い出作り",
  transport: "未定",
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

// --- 15問2択 希望調査 ---
export const wishQuestions = [
  // 宿（場所の属性）
  { id: 1, category: '宿', title: "宿の雰囲気は？",
    optionA: { key: 'building', label: 'ビル・都会', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600' },
    optionB: { key: 'wood', label: '木・自然素材', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600' } },
  { id: 2, category: '宿', title: "立地は？",
    optionA: { key: 'station', label: '駅近・便利', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600' },
    optionB: { key: 'remote', label: '辺境・秘境', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600' } },
  { id: 3, category: '宿', title: "スタイルは？",
    optionA: { key: 'modern', label: '最新・モダン', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600' },
    optionB: { key: 'traditional', label: '伝統・情緒', img: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=600' } },
  { id: 4, category: '宿', title: "メインは？",
    optionA: { key: 'onsen', label: '温泉', img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600' },
    optionB: { key: 'view', label: '景色・ロケーション', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600' } },
  { id: 5, category: '宿', title: "周辺は？",
    optionA: { key: 'lively', label: '賑やか・観光地', img: 'https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=600' },
    optionB: { key: 'quiet', label: '静か・離れ', img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600' } },
  // 食事（食べ方と内容）
  { id: 6, category: '食事', title: "メイン食材は？",
    optionA: { key: 'meat', label: '肉', img: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600' },
    optionB: { key: 'fish', label: '魚', img: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=600' } },
  { id: 7, category: '食事', title: "楽しみ方は？",
    optionA: { key: 'sake', label: '酒・飲み歩き', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600' },
    optionB: { key: 'rice', label: '飯・白飯おかず', img: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=600' } },
  { id: 8, category: '食事', title: "食事の場所は？",
    optionA: { key: 'inhotel', label: '宿飯・おこもり', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600' },
    optionB: { key: 'outside', label: '外食・街へ', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600' } },
  { id: 9, category: '食事', title: "食べ方は？",
    optionA: { key: 'bbq', label: '自分たちでBBQ', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600' },
    optionB: { key: 'served', label: '給仕・運ばれる', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600' } },
  { id: 10, category: '食事', title: "グレードは？",
    optionA: { key: 'bclass', label: 'B級グルメ', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600' },
    optionB: { key: 'luxury', label: '贅沢・高級', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600' } },
  // レジャー（体験の性質）
  { id: 11, category: 'レジャー', title: "フィールドは？",
    optionA: { key: 'sea', label: '海・港町', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600' },
    optionB: { key: 'mountain', label: '山・高原', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600' } },
  { id: 12, category: 'レジャー', title: "過ごし方は？",
    optionA: { key: 'active', label: 'アクティブ', img: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?q=80&w=600' },
    optionB: { key: 'relax', label: 'リラックス', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?q=80&w=600' } },
  { id: 13, category: 'レジャー', title: "景観は？",
    optionA: { key: 'nature', label: '自然・ありのまま', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600' },
    optionB: { key: 'artificial', label: '人工・街並み', img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=600' } },
  { id: 14, category: 'レジャー', title: "体験は？",
    optionA: { key: 'panorama', label: '景色・パノラマ', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600' },
    optionB: { key: 'appreciate', label: '鑑賞・じっくり', img: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600' } },
  { id: 15, category: 'レジャー', title: "時間帯は？",
    optionA: { key: 'nightowl', label: '夜更かし・バー', img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=600' },
    optionB: { key: 'earlybird', label: '早起き・朝市場', img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=600' } },
];

// --- 10プラン ---
export const aiProposals = [
  {
    id: '1',
    name: "熱海・伊東「五感を研ぎ澄ます絶景・名建築・金目鯛」",
    stay: "老舗温泉旅館",
    days: '1泊2日',
    cost: "28,000円",
    tags: ['traditional', 'onsen', 'fish', 'served', 'relax', 'sea', 'panorama', 'station'],
    costBreakdown: { stay: "18,000円", transport: "3,000円", food: "5,000円", activity: "2,000円" },
    aiReason: "伝統×温泉×魚×給仕×リラックスの組み合わせ。金目鯛の煮付けと名建築、絶景吊橋で五感を刺激。",
    concerns: ["GW直後のため混雑の可能性", "アクティブ派には物足りないかも"],
    matchPoints: ["伝統・温泉重視に対応", "海の幸を堪能", "リラックス派向け"],
    timeline: [
      { day: 1, time: "10:30", spot: "三島スカイウォーク", desc: "日本最長の吊橋から富士山を仰ぐ", icon: Palmtree },
      { day: 1, time: "12:30", spot: "沼津港", desc: "深海魚定食・海鮮丼ランチ", icon: UtensilsCrossed },
      { day: 1, time: "14:30", spot: "来宮神社", desc: "樹齢2100年の大楠でパワーチャージ", icon: Mountain },
      { day: 1, time: "16:00", spot: "老舗旅館チェックイン", desc: "豪華なお湯を堪能", icon: Bed },
      { day: 1, time: "18:30", spot: "大宴会場", desc: "金目鯛の煮付けと本格和食膳", icon: UtensilsCrossed },
      { day: 2, time: "09:30", spot: "MOA美術館", desc: "世界最大級の円形ホールでアート鑑賞", icon: MapPin },
      { day: 2, time: "12:00", spot: "網代の海沿いレストラン", desc: "浜焼きまたは刺身膳", icon: UtensilsCrossed },
      { day: 2, time: "14:00", spot: "城ヶ崎海岸", desc: "断崖絶壁の吊橋散策", icon: Palmtree },
      { day: 2, time: "16:00", spot: "小田原鈴廣", desc: "かまぼこ博物館見学・買い出し→解散", icon: MapPin },
    ]
  },
  {
    id: '2',
    name: "那須高原「空中散歩と1000頭の動物、肉三昧の狂騒」",
    stay: "大型コテージ",
    days: '1泊2日',
    cost: "25,000円",
    tags: ['wood', 'remote', 'meat', 'bbq', 'active', 'mountain', 'nature', 'nightowl'],
    costBreakdown: { stay: "12,000円", transport: "4,000円", food: "6,000円", activity: "3,000円" },
    aiReason: "木×肉×BBQ×アクティブ×山。空中アスレチックで汗を流し、夜はキャンプファイヤーとBBQで大盛り上がり。",
    concerns: ["天候リスク（屋外メイン）", "虫が苦手な人は注意"],
    matchPoints: ["アクティブ派向け", "BBQ・肉三昧", "自然の中でワイルドに"],
    timeline: [
      { day: 1, time: "10:30", spot: "那須ハイランドパーク/NOZARU", desc: "日本最大級の空中アスレチック", icon: Mountain },
      { day: 1, time: "13:00", spot: "チーズガーデン那須本店", desc: "木の温もり空間で肉サンドイッチランチ", icon: UtensilsCrossed },
      { day: 1, time: "15:00", spot: "大型コテージ", desc: "食材運び込み・火起こし", icon: Bed },
      { day: 1, time: "17:00", spot: "40人同時BBQ", desc: "信州牛・栃木産ポークを自分たちで焼く", icon: UtensilsCrossed },
      { day: 1, time: "20:00", spot: "キャンプファイヤー", desc: "酒と音楽で夜更かし", icon: Coffee },
      { day: 2, time: "09:00", spot: "那須ロープウェイ", desc: "茶臼岳の噴煙を間近に短距離登山", icon: Mountain },
      { day: 2, time: "11:30", spot: "那須どうぶつ王国", desc: "ド迫力のバードパフォーマンス鑑賞", icon: Palmtree },
      { day: 2, time: "13:30", spot: "園内レストラン", desc: "BBQグリル料理ランチ", icon: UtensilsCrossed },
      { day: 2, time: "15:30", spot: "那須ステンドグラス美術館", desc: "美術鑑賞→解散", icon: MapPin },
    ]
  },
  {
    id: '3',
    name: "東京・湾岸「没入型アートと空の展望、最新グルメハシゴ」",
    stay: "最新ホテル",
    days: '1泊2日',
    cost: "32,000円",
    tags: ['building', 'station', 'modern', 'lively', 'sake', 'outside', 'artificial', 'nightowl'],
    costBreakdown: { stay: "15,000円", transport: "2,000円", food: "10,000円", activity: "5,000円" },
    aiReason: "最新×ビル×酒×外食×人工×夜更かし。スカイツリー・teamLab・屋形船の贅沢都会旅。",
    concerns: ["予算が若干高め", "移動が多い"],
    matchPoints: ["都会派・最新体験好き向け", "夜更かし・飲み歩き派", "アートと食のハシゴ"],
    timeline: [
      { day: 1, time: "11:00", spot: "東京スカイツリー", desc: "地上450mから東京のビル群を一望", icon: MapPin },
      { day: 1, time: "13:00", spot: "浅草", desc: "老舗店ですき焼き＆下町ランチ", icon: UtensilsCrossed },
      { day: 1, time: "15:00", spot: "すみだ水族館", desc: "クラゲの幻想的な空間を鑑賞", icon: Waves },
      { day: 1, time: "18:30", spot: "貸切大型屋形船", desc: "東京湾夜景×揚げたて天ぷら×酒", icon: Ship },
      { day: 1, time: "21:30", spot: "最新ホテル", desc: "バー・ナイトスポットで夜更かし", icon: Bed },
      { day: 2, time: "10:00", spot: "teamLab Planets", desc: "裸足で水に入る最新アート体験", icon: MapPin },
      { day: 2, time: "12:30", spot: "豊洲 千客万来", desc: "江戸の街並みでB級グルメ食べ歩き", icon: UtensilsCrossed },
      { day: 2, time: "15:00", spot: "日本科学未来館", desc: "最新テクノロジー鑑賞", icon: MapPin },
      { day: 2, time: "17:00", spot: "お台場海浜公園", desc: "レインボーブリッジ夕暮れ→解散", icon: Palmtree },
    ]
  },
  {
    id: '4',
    name: "函館「100万ドルの夜景と市場の熱気、赤レンガ歴史」",
    stay: "函館市内ホテル",
    days: '1泊2日',
    cost: "35,000円",
    tags: ['sea', 'panorama', 'fish', 'bclass', 'earlybird', 'traditional', 'nature'],
    costBreakdown: { stay: "12,000円", transport: "15,000円", food: "5,000円", activity: "3,000円" },
    aiReason: "海×景色×魚×B級×早起き。100万ドルの夜景、朝市のイカ釣り、赤レンガの歴史を満喫。",
    concerns: ["移動コストが高い（航空券）", "天候で夜景が見えない可能性"],
    matchPoints: ["絶景重視", "海の幸・B級グルメ", "朝型派の朝市体験"],
    timeline: [
      { day: 1, time: "11:00", spot: "五稜郭タワー", desc: "星形の歴史的建造物を上空から鑑賞", icon: MapPin },
      { day: 1, time: "12:30", spot: "ラッキーピエロ", desc: "B級グルメ王道チャイニーズチキンバーガー", icon: UtensilsCrossed },
      { day: 1, time: "14:30", spot: "元町・八幡坂", desc: "海へと続く美しい景色を歩く", icon: Palmtree },
      { day: 1, time: "17:00", spot: "函館山", desc: "夕暮れから夜景へ変わる瞬間", icon: Mountain },
      { day: 1, time: "19:00", spot: "大型割烹", desc: "獲れたての魚尽くしの宴会", icon: UtensilsCrossed },
      { day: 2, time: "07:00", spot: "函館朝市", desc: "活イカ釣り体験→その場で食べる", icon: Waves },
      { day: 2, time: "10:00", spot: "金森赤レンガ倉庫", desc: "歴史ある建築を鑑賞しながら買い物", icon: MapPin },
      { day: 2, time: "12:00", spot: "あじさい本店", desc: "黄金色の塩ラーメンランチ", icon: UtensilsCrossed },
      { day: 2, time: "14:00", spot: "トラピスチヌ修道院", desc: "静寂な歴史空間を散策→空港解散", icon: MapPin },
    ]
  },
  {
    id: '5',
    name: "阿蘇「地球の脈動・巨大噴火口とパワースポット」解毒旅",
    stay: "辺境の温泉宿",
    days: '1泊2日',
    cost: "30,000円",
    tags: ['remote', 'onsen', 'meat', 'served', 'nature', 'mountain', 'quiet', 'panorama'],
    costBreakdown: { stay: "15,000円", transport: "8,000円", food: "5,000円", activity: "2,000円" },
    aiReason: "辺境×温泉×肉×給仕×自然。阿蘇の雄大な自然と噴火口のパワーで心身をリセット。",
    concerns: ["火山活動で火口見学が制限される場合あり", "アクセスがやや不便"],
    matchPoints: ["大自然で非日常体験", "温泉×肉の最強コンボ", "静かに過ごしたい派"],
    timeline: [
      { day: 1, time: "11:00", spot: "大観峰", desc: "阿蘇五岳を景色として仰ぐ", icon: Mountain },
      { day: 1, time: "13:00", spot: "内牧温泉", desc: "あか牛丼を団体予約ランチ", icon: UtensilsCrossed },
      { day: 1, time: "15:00", spot: "阿蘇神社", desc: "再建された楼門を鑑賞・参道散策", icon: MapPin },
      { day: 1, time: "16:30", spot: "辺境の温泉宿", desc: "草原を見ながらお湯に浸かる", icon: Bed },
      { day: 1, time: "18:30", spot: "宿の大宴会", desc: "阿蘇の恵みを給仕で楽しむ", icon: UtensilsCrossed },
      { day: 2, time: "09:00", spot: "阿蘇中岳第一火口", desc: "煙を吹く自然のエネルギーを体感", icon: Mountain },
      { day: 2, time: "11:00", spot: "草千里ヶ浜", desc: "広大な草原を散策・乗馬体験", icon: Palmtree },
      { day: 2, time: "13:00", spot: "阿蘇ファームランド", desc: "地元野菜の健康ビュッフェ", icon: UtensilsCrossed },
      { day: 2, time: "15:00", spot: "白川水源", desc: "名水を鑑賞→熊本駅解散", icon: Waves },
    ]
  },
  {
    id: '6',
    name: "金沢「加賀百万石の美学と路地裏ハシゴ酒の狂騒」",
    stay: "金沢市内ホテル",
    days: '1泊2日',
    cost: "30,000円",
    tags: ['traditional', 'sake', 'outside', 'bclass', 'nightowl', 'appreciate', 'lively'],
    costBreakdown: { stay: "12,000円", transport: "10,000円", food: "5,000円", activity: "3,000円" },
    aiReason: "伝統×酒×外食×B級×夜更かし。兼六園と21世紀美術館の文化、夜は片町のハシゴ酒。",
    concerns: ["金沢までの移動時間が長い", "飲み過ぎ注意"],
    matchPoints: ["伝統文化を深く鑑賞", "夜更かし・酒好き向け", "B級グルメ充実"],
    timeline: [
      { day: 1, time: "11:00", spot: "近江町市場", desc: "市場の熱気を鑑賞・魚ランチ自由行動", icon: UtensilsCrossed },
      { day: 1, time: "13:30", spot: "兼六園", desc: "日本三名園を案内人付きで鑑賞", icon: Palmtree },
      { day: 1, time: "15:30", spot: "金箔貼り体験", desc: "自分の手で黄金の作品を作る", icon: MapPin },
      { day: 1, time: "18:30", spot: "片町エリア居酒屋", desc: "金沢おでんと地酒の宴会", icon: UtensilsCrossed },
      { day: 1, time: "21:00", spot: "茶屋街・路地裏バー", desc: "夜の金沢で夜更かし", icon: Coffee },
      { day: 2, time: "09:30", spot: "21世紀美術館", desc: "世界的な現代アートを鑑賞", icon: MapPin },
      { day: 2, time: "12:00", spot: "老舗洋食店", desc: "ハントンライスランチ", icon: UtensilsCrossed },
      { day: 2, time: "14:00", spot: "ひがし茶屋街", desc: "伝統的な街並み散策・金箔ソフト", icon: MapPin },
      { day: 2, time: "16:00", spot: "ヤマト醤油味噌", desc: "発酵文化を学ぶ→解散", icon: MapPin },
    ]
  },
  {
    id: '7',
    name: "大阪「笑いと通天閣、超高層ビル展望台のコテコテ」",
    stay: "ビル型ラグジュアリーホテル",
    days: '1泊2日',
    cost: "28,000円",
    tags: ['building', 'modern', 'lively', 'rice', 'inhotel', 'artificial', 'meat', 'bclass'],
    costBreakdown: { stay: "15,000円", transport: "8,000円", food: "3,000円", activity: "2,000円" },
    aiReason: "最新×賑やか×飯×宿飯×人工。吉本新喜劇で爆笑、たこ焼き・串カツのB級三昧、夜景ビュッフェ。",
    concerns: ["移動が多い", "USJ行きたい勢と分裂する可能性"],
    matchPoints: ["エンタメ・賑やか好き", "B級グルメ天国", "ホテルビュッフェで贅沢"],
    timeline: [
      { day: 1, time: "11:30", spot: "道頓堀", desc: "たこ焼き・お好み焼きランチ", icon: UtensilsCrossed },
      { day: 1, time: "13:30", spot: "なんばグランド花月", desc: "本場の吉本新喜劇で大爆笑", icon: MapPin },
      { day: 1, time: "16:30", spot: "ラグジュアリーホテル", desc: "チェックイン", icon: Bed },
      { day: 1, time: "18:30", spot: "ホテルレストラン", desc: "世界の料理が並ぶビュッフェ", icon: UtensilsCrossed },
      { day: 1, time: "21:00", spot: "最上階ラウンジ", desc: "大阪夜景を鑑賞", icon: Coffee },
      { day: 2, time: "09:30", spot: "あべのハルカス300", desc: "日本屈指の高さから大阪平野一望", icon: MapPin },
      { day: 2, time: "12:00", spot: "新世界", desc: "通天閣の下で串カツ豪快ランチ", icon: UtensilsCrossed },
      { day: 2, time: "14:00", spot: "海遊館", desc: "ジンベエザメの遊泳を鑑賞", icon: Waves },
      { day: 2, time: "16:30", spot: "天保山マーケットプレース", desc: "買い物→新大阪駅解散", icon: MapPin },
    ]
  },
  {
    id: '8',
    name: "沖縄・名護「青のラグジュアリー・リゾート」停滞旅",
    stay: "オーシャンリゾート",
    days: '2泊3日',
    cost: "50,000円",
    tags: ['sea', 'panorama', 'luxury', 'modern', 'relax', 'view'],
    costBreakdown: { stay: "25,000円", transport: "18,000円", food: "5,000円", activity: "2,000円" },
    aiReason: "海×景色×贅沢×最新×リラックス。青い海と空に包まれるラグジュアリーリゾートで完全脱力。",
    concerns: ["予算が高い（航空券含む）", "3日間必要"],
    matchPoints: ["究極のリラックス体験", "海好き・リゾート好き", "贅沢したい派"],
    timeline: [
      { day: 1, time: "12:00", spot: "那覇空港着", desc: "大型バスで名護リゾートへ", icon: Plane },
      { day: 1, time: "15:00", spot: "リゾートチェックイン", desc: "プールサイドでウェルカムドリンク", icon: Bed },
      { day: 1, time: "18:00", spot: "テラスディナー", desc: "海風を感じながらビュッフェ", icon: UtensilsCrossed },
      { day: 2, time: "09:00", spot: "海アクティビティ", desc: "シュノーケリング・バナナボート", icon: Waves },
      { day: 2, time: "13:00", spot: "プールサイドランチ", desc: "ひたすらリラックス", icon: UtensilsCrossed },
      { day: 2, time: "18:00", spot: "ホテル内レストラン", desc: "格式高い給仕ディナー", icon: UtensilsCrossed },
      { day: 3, time: "09:30", spot: "美ら海水族館", desc: "巨大水槽を鑑賞", icon: Waves },
      { day: 3, time: "13:00", spot: "国際通り", desc: "B級グルメ・お土産", icon: UtensilsCrossed },
      { day: 3, time: "16:00", spot: "那覇空港", desc: "解散", icon: Plane },
    ]
  },
  {
    id: '9',
    name: "白馬・北アルプス「連峰を仰ぐキャンプ＆マウンテン」",
    stay: "大型ロッジ",
    days: '2泊3日',
    cost: "30,000円",
    tags: ['mountain', 'wood', 'remote', 'bbq', 'active', 'nature', 'earlybird'],
    costBreakdown: { stay: "12,000円", transport: "8,000円", food: "6,000円", activity: "4,000円" },
    aiReason: "山×木×辺境×BBQ×アクティブ。北アルプスの絶景トレッキングと焚き火・BBQの3日間。",
    concerns: ["天候リスクが高い", "体力が必要"],
    matchPoints: ["アウトドア好き全振り", "山×BBQの王道", "早起きで絶景を堪能"],
    timeline: [
      { day: 1, time: "12:00", spot: "白馬大型ロッジ着", desc: "チェックイン・荷物整理", icon: Bed },
      { day: 1, time: "14:00", spot: "白馬ジャンプ競技場", desc: "五輪の舞台を見学", icon: MapPin },
      { day: 1, time: "17:00", spot: "ロッジ前庭", desc: "焚き火を熾して夜の静寂を楽しむ", icon: Coffee },
      { day: 2, time: "07:00", spot: "八方尾根", desc: "終日トレッキング", icon: Mountain },
      { day: 2, time: "12:00", spot: "絶景ポイント", desc: "お弁当ランチ", icon: UtensilsCrossed },
      { day: 2, time: "17:00", spot: "ロッジ", desc: "巨大BBQコンロで肉を焼く", icon: UtensilsCrossed },
      { day: 3, time: "06:00", spot: "早起き散歩", desc: "山の朝景色を鑑賞", icon: Mountain },
      { day: 3, time: "09:00", spot: "山麓の温泉", desc: "体を癒やす", icon: Bed },
      { day: 3, time: "12:00", spot: "白馬駅", desc: "解散", icon: Train },
    ]
  },
  {
    id: '10',
    name: "松山・道後温泉からしまなみ海道「瀬戸内の凪」巡り",
    stay: "道後温泉旅館 → 今治サイクリング施設",
    days: '2泊3日',
    cost: "35,000円",
    tags: ['traditional', 'onsen', 'fish', 'sake', 'nature', 'sea', 'relax'],
    costBreakdown: { stay: "18,000円", transport: "10,000円", food: "5,000円", activity: "2,000円" },
    aiReason: "伝統×温泉×魚×酒×自然。道後温泉の歴史とし まなみ海道の瀬戸内絶景を3日間で巡る。",
    concerns: ["移動距離が長い", "3日間必要"],
    matchPoints: ["温泉文化を深く味わう", "瀬戸内の魚と地酒", "自然と歴史の融合"],
    timeline: [
      { day: 1, time: "13:00", spot: "松山空港/駅着", desc: "道後温泉旅館へ", icon: Plane },
      { day: 1, time: "15:00", spot: "道後温泉本館", desc: "歴史ある温泉を体験", icon: Bed },
      { day: 1, time: "18:00", spot: "旅館大宴会", desc: "魚と地酒の宴会", icon: UtensilsCrossed },
      { day: 2, time: "09:00", spot: "しまなみ海道へ", desc: "バスで移動", icon: Car },
      { day: 2, time: "12:00", spot: "途中の島", desc: "海鮮B級グルメランチ", icon: UtensilsCrossed },
      { day: 2, time: "15:00", spot: "今治サイクリング施設", desc: "チェックイン", icon: Bed },
      { day: 3, time: "08:00", spot: "しまなみ海道の橋", desc: "瀬戸内海の自然×人工の融合を景色として", icon: Palmtree },
      { day: 3, time: "11:00", spot: "タオル美術館", desc: "今治タオルの文化を鑑賞", icon: MapPin },
      { day: 3, time: "14:00", spot: "松山空港", desc: "解散", icon: Plane },
    ]
  },
];

// 希望調査の集計結果（モック：15問の多数派結果）
export const wishSurveyResults = {
  building: 4, wood: 11,
  station: 6, remote: 9,
  modern: 7, traditional: 8,
  onsen: 10, view: 5,
  lively: 5, quiet: 10,
  meat: 9, fish: 6,
  sake: 8, rice: 7,
  inhotel: 6, outside: 9,
  bbq: 11, served: 4,
  bclass: 10, luxury: 5,
  sea: 8, mountain: 7,
  active: 9, relax: 6,
  nature: 10, artificial: 5,
  panorama: 7, appreciate: 8,
  nightowl: 6, earlybird: 9,
};

// 多数派のキーリスト（マッチング計算用）
export const getMajorityKeys = (results) => {
  const pairs = [
    ['building', 'wood'], ['station', 'remote'], ['modern', 'traditional'],
    ['onsen', 'view'], ['lively', 'quiet'], ['meat', 'fish'],
    ['sake', 'rice'], ['inhotel', 'outside'], ['bbq', 'served'],
    ['bclass', 'luxury'], ['sea', 'mountain'], ['active', 'relax'],
    ['nature', 'artificial'], ['panorama', 'appreciate'], ['nightowl', 'earlybird'],
  ];
  return pairs.map(([a, b]) => (results[a] || 0) >= (results[b] || 0) ? a : b);
};

export const wishStats = wishQuestions.map(q => ({
  id: q.id,
  category: q.category,
  title: q.title,
  optionA: { label: q.optionA.label, count: wishSurveyResults[q.optionA.key] || 0 },
  optionB: { label: q.optionB.label, count: wishSurveyResults[q.optionB.key] || 0 },
}));

export const surveyAggregation = {
  responseCount: 12,
  totalCount: 15,
  aiSummary: "全体的に「自然・温泉・BBQ・アクティブ」の組み合わせが人気。山派がやや多く、B級グルメ志向。早起き派が多数で朝の体験重視。"
};

export const fixedConditionsDefault = {
  area: "未定（AI提案）",
  amenities: ["温泉", "BBQ", "カラオケ"],
  transport: "レンタカー",
  budgetMin: 20000,
  budgetMax: 35000,
  purpose: "卒業旅行",
  notes: "大部屋あり、花火可"
};

export const aiGeneratedQuestions = wishQuestions.map((q, i) => ({
  id: q.id,
  type: "binary",
  text: `${q.optionA.label} vs ${q.optionB.label}`,
  editable: true,
}));

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
