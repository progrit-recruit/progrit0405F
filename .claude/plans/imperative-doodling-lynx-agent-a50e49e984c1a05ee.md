# TABIMARU! Demo App - Implementation Plan

## Overview

Transform the existing 573-line single-file React prototype into a complete demo walkthrough covering the full trip planning lifecycle: room creation -> participant joining -> schedule coordination -> wish survey -> AI plan generation -> voting -> payment -> guide sharing.

The app remains a demo with hard-coded data and no backend. The goal is a convincing presentation flow.

---

## Architecture Decisions

### File Structure
Keep a single-file approach but refactor into clearly separated sections within the file:
- **Constants/Data** at the top (trip info, mock participants, mock survey data, etc.)
- **Sub-components** as inner functions or small component definitions
- **Screen renderers** as they exist now, but expanded
- **Main App component** with routing state

This avoids build tooling complexity while keeping the code navigable.

### State Machine for Trip Phases
Add a top-level `tripPhase` state that drives which screens are accessible and what each screen shows:

```
'room_create' -> 'inviting' -> 'scheduling' -> 'wish_survey' -> 'plan_generation' -> 'voting' -> 'provisional_booking' -> 'payment_collection' -> 'confirmed' -> 'guide_ready'
```

For demo purposes, use a "phase override" mechanism: clicking a "Demo: Next Phase" floating button advances the phase, or screens auto-advance when the user completes actions.

### Role Switching
The existing `isOrganizer` toggle stays. Each screen checks this flag to render organizer vs participant views. Add a visible toggle in the header (for demo presentation purposes).

---

## Implementation Phases (Priority Order)

### Phase 1: Room Creation & Participant Join (HIGH IMPACT - New screens)
**Estimated scope: ~150 lines**
**Why first:** This is the entry point of the entire flow. Without it, the demo starts in the middle.

#### 1A. Room Creation Screen (Organizer View)
- New screen ID: `'room_create'`
- Form fields (all pre-filled for demo):
  - Trip name (旅行名): "春の卒業旅行 2026"
  - Headcount (想定人数): 15
  - Area preference (エリア): "伊豆・箱根" dropdown
  - Budget range (予算): "25,000〜35,000円" slider or dropdown
  - Purpose (目的): "卒業旅行" tag selection
  - Transport (交通手段): "電車 + レンタカー" toggle chips
  - Date range (候補期間): "2026年4月〜5月" date pickers (visual only)
- Bottom CTA: "ルームを作成する" -> animates to success state showing invite URL/QR code
- On create: transition to `'inviting'` phase, switch to Home tab

#### 1B. Participant Join Screen
- New screen ID: `'participant_join'`
- Triggered by a "参加者として見る" demo button
- Shows trip summary card (name, organizer, dates, area, member count)
- Name input field
- "参加する" button -> animation -> redirect to Home as participant
- Visual: invite URL display at top, trip info card, simple form

#### Implementation approach:
- Add `'room_create'` and `'participant_join'` to the `renderContent()` switch
- Add them as conditional first screens (shown when `tripPhase === 'room_create'`)
- The nav bar is hidden during these pre-room screens

---

### Phase 2: Trip Phase Progression System (HIGH IMPACT - Framework)
**Estimated scope: ~80 lines**
**Why second:** This provides the backbone that makes the demo flow feel connected.

#### 2A. Phase State & Progress Bar
- Add `tripPhase` state with defined phases
- Add a horizontal progress indicator below the header showing current phase
- Each phase has: icon, label, completion status
- Phases: ルーム作成 -> 招待中 -> 日程調整 -> 希望調査 -> プラン生成 -> 投票 -> 仮予約 -> 集金 -> 確定 -> しおり

#### 2B. Phase-Aware Navigation
- Nav items show lock/check icons based on phase progression
- Tapping a locked tab shows a toast "まだこのステップには進めません"
- Completed tabs show a small checkmark badge

#### 2C. Demo Control
- Floating "Demo" button (bottom-right, above nav) that opens a phase selector
- Allows jumping to any phase for presentation flexibility
- Also allows toggling organizer/participant role from here

---

### Phase 3: Enhanced Home Screen (MEDIUM IMPACT - Improves existing)
**Estimated scope: ~60 lines of changes**

#### Changes:
- Add trip info card at the top (area, dates, budget, member count, organizer name)
- Show current phase prominently with a status badge
- Make the progress checklist dynamic based on `tripPhase`
- Add phase-appropriate CTA button:
  - During scheduling: "日程を回答する"
  - During wish survey: "希望を回答する"  
  - During voting: "投票する"
  - During payment: "支払いをする"
- Announcements become phase-aware (different messages per phase)

---

### Phase 4: Fixed Conditions & AI Questionnaire (MEDIUM IMPACT - New organizer screens)
**Estimated scope: ~180 lines**

#### 4A. Fixed Conditions Input (Organizer)
- New sub-screen within the Wish tab (organizer view, before survey is published)
- Displays conditions the organizer sets before AI generates the survey:
  - Area: tag/chip selector (海, 山, 温泉, 都市)
  - Budget: range slider display
  - Transport: icon toggles (電車, レンタカー, バス)
  - Amenity requirements: toggleable chips (カラオケ, BBQ, 温泉, プール, 卓球)
  - Special requests: text area
- "AIにアンケートを作ってもらう" button

#### 4B. AI Questionnaire Generation (Organizer)
- Loading animation: "AIが条件を分析中..." with sparkle animation
- After "generation": show list of 5-6 questions with:
  - Question text (editable inline)
  - Question type indicator (2択, スライダー, 複数選択)
  - Delete button (X) per question
  - "質問を追加" button at bottom
- Pre-filled with sensible demo questions based on fixed conditions
- "アンケートを公開する" CTA -> advances phase to `'wish_survey'`

---

### Phase 5: Enhanced Wish Survey (MEDIUM IMPACT - Improves existing)
**Estimated scope: ~100 lines of changes**

#### Participant View Enhancements:
- Show fixed conditions summary at the top (read-only card)
- Add question variety beyond binary image choices:
  - Keep existing image-based 2-choice for 2 questions
  - Add a slider question (e.g., "予算の重視度: 安さ <-> 豪華さ")
  - Add a multi-select question (e.g., "やりたいこと: BBQ, 温泉, 観光, アクティビティ, ショッピング")
  - Add a free-text question (e.g., "その他リクエスト")
- Progress bar already exists - keep it

#### Organizer View (Response Dashboard):
- New sub-view toggled when `isOrganizer` and survey is active
- Response count: "12 / 15 人回答済み"
- Per-question aggregated results (bar charts using div widths)
- Unanswered member list with "リマインド送信" buttons
- AI summary box: "みんなの傾向: 海派が多数、BBQが人気、予算は控えめ希望"
- "回答を締め切る" button -> advances to plan generation

---

### Phase 6: Enhanced Plan & Voting (MEDIUM IMPACT - Improves existing)
**Estimated scope: ~120 lines of changes**

#### Plan Generation Enhancement:
- Add AI reasoning display: "希望調査の結果、海×BBQ×控えめ予算の組み合わせから..."
- Per-plan: add match explanation ("BBQあり, オーシャンビューで海派に対応, 予算内")
- Per-plan: add concern points ("移動距離がやや長め", "雨天時の代替プランが限定的")
- Per-plan: add cost breakdown card (宿泊, 交通, 食事, アクティビティ)
- Plan editing: make plan name and spots editable (visual only)

#### Voting Enhancement (2-Choice Comparison):
- Side-by-side comparison table for the two selected plans:
  - Row: 予算 (28,000 vs 32,000)
  - Row: アクティビティ (海・温泉 vs 陶芸・温泉街)
  - Row: 移動負担 (★★☆ vs ★☆☆)
  - Row: 雰囲気 (開放的・リゾート vs 落ち着き・和風)
- Keep existing vote bars and buttons
- Add deadline countdown display

---

### Phase 7: Payment Flow (MEDIUM IMPACT - Replaces placeholder)
**Estimated scope: ~150 lines**

#### 7A. Participant Payment Screen
Replace the current "completed" only view with a proper flow:
- **Pre-payment state:**
  - Amount card: "お一人様 ¥28,000"
  - Deadline display: "支払い期限: 2026年4月20日"
  - Payment method selection: PayPay / LINE Pay / 銀行振込 (icon buttons)
  - "支払う" CTA button
- **Processing state:** Loading animation "決済処理中..."
- **Completed state:** Success screen with receipt-style card (keep existing completed UI but enhance)

#### 7B. Organizer Payment Management
- Collection progress: "10 / 15 人支払い済み" with progress ring
- Paid/unpaid member list with avatars
- Per-unpaid-member: "リマインド" button
- Total collected vs target amount
- "仮予約を本予約に進める" button (appears when all paid)
- Provisional booking status card

---

### Phase 8: Enhanced Guide (しおり) (LOWER IMPACT - Improves existing)
**Estimated scope: ~120 lines of changes**

#### Additions:
- **Participant list section:** Grid of avatars + names
- **Car assignments:** "車1: たかし(運転), みずき, あなた, ..." card
- **Room assignments:** "部屋1: たかし, みずき, ..." card  
- **Packing list:** Checklist with toggleable items (着替え, 水着, タオル, カメラ, 充電器, 常備薬)
- **Emergency contacts:** Organizer phone, hotel phone, nearest hospital
- **Weather forecast card:** Mock weather for trip dates (晴れ 24°C)
- Keep existing timeline/itinerary (already good)

---

## Implementation Sequence Summary

| Order | Component | New Lines (est.) | Priority | Reason |
|-------|-----------|-------------------|----------|--------|
| 1 | Room Creation + Join | ~150 | HIGH | Entry point of flow |
| 2 | Phase Progression System | ~80 | HIGH | Makes demo feel connected |
| 3 | Enhanced Home | ~60 | HIGH | Central hub improvement |
| 4 | Fixed Conditions + AI Questionnaire | ~180 | MEDIUM | Key organizer flow |
| 5 | Enhanced Wish Survey | ~100 | MEDIUM | Richer participant experience |
| 6 | Enhanced Plan & Voting | ~120 | MEDIUM | Core decision-making |
| 7 | Payment Flow | ~150 | MEDIUM | Currently just a placeholder |
| 8 | Enhanced Guide | ~120 | LOWER | Polish, not flow-critical |

**Total estimated new/changed lines: ~960**
**Expected final file size: ~1,400-1,500 lines**

---

## Data Structure Changes

### New State Variables Needed
```
tripPhase: string           // Current phase of the trip
showDemoControl: boolean    // Demo control panel visibility
roomForm: object            // Room creation form data
fixedConditions: object     // Organizer's fixed conditions
aiQuestions: array           // Generated questionnaire
surveyResponses: object     // Aggregated survey responses
paymentState: string        // 'unpaid' | 'processing' | 'paid'
selectedPayMethod: string   // Payment method selection
```

### New Mock Data Needed
```
fullParticipants: array     // 15 members with names, avatars, paid status, schedule status
aiGeneratedQuestions: array // 5-6 survey questions with types
surveyAggregation: object  // Per-question response percentages
carAssignments: array       // Car group assignments
roomAssignments: array      // Room group assignments
packingList: array          // Checklist items
emergencyContacts: array    // Contact info
comparisonTable: array      // Plan A vs B comparison rows
```

---

## Key Technical Considerations

1. **File size management**: At ~1,500 lines the single file is large but manageable for a demo. Use clear section comments (`// === SECTION: Room Creation ===`) for navigation.

2. **Animation consistency**: Current code uses Tailwind's `animate-in` classes. Continue this pattern for all new screens. Key transitions:
   - Screen entry: `slide-in-from-bottom-4` or `slide-in-from-right-4`
   - Success states: `zoom-in`
   - Loading: CSS `animate-spin` on spinner elements

3. **Mobile-first**: Current code targets `max-w-md mx-auto`. All new screens must follow this constraint. Touch targets minimum 44px.

4. **Color palette adherence**:
   - Primary actions: `bg-[#F96167]` (coral pink)
   - Info/dashboard: `bg-[#1A1F3A]` (navy)
   - Accents/borders: `border-[#F9E795]` (gold)
   - Background: `bg-[#FFFDF0]` (cream)
   - Success states: `bg-emerald-500`

5. **Nav bar visibility**: Hide the bottom nav during room creation and participant join screens. Show it once the room is created and user is "inside" the trip.

6. **Conditional rendering pattern**: Continue the existing `switch/case` in `renderContent()` but add sub-phase checks within each case for organizer vs participant views.

---

## Demo Presentation Flow (Expected Walkthrough)

1. **Open app** -> Room creation screen (organizer)
2. **Fill form** (pre-filled) -> Create room -> See invite URL + QR
3. **Switch to participant view** -> Join screen -> Enter name -> Join
4. **Switch back to organizer** -> Home shows trip status, 15/15 joined
5. **Schedule tab** -> Show personal calendar input -> Switch to heatmap -> "この日程で確定"
6. **Wish tab (organizer)** -> Set fixed conditions -> Generate AI questionnaire -> Publish
7. **Wish tab (participant)** -> Answer varied question types -> Submit -> See trends
8. **Wish tab (organizer)** -> Response dashboard -> Close survey
9. **Plan tab (organizer)** -> See AI proposals with reasoning -> Select 2 for voting
10. **Plan tab (participant)** -> Comparison table -> Vote
11. **Plan tab (organizer)** -> Confirm winning plan
12. **Payment tab (participant)** -> See amount -> Select PayPay -> Pay -> Success
13. **Payment tab (organizer)** -> See collection progress -> Confirm booking
14. **Guide tab** -> Full trip guide with timeline, car/room assignments, packing list, contacts
15. **Share guide** -> Complete

---

## Files Involved

Since this is a single-file demo, the only file to modify is:
- `/Users/progrit7/Documents/travel/treavel.jsx`

If project setup is needed for running the demo:
- Create `package.json` with react, react-dom, lucide-react dependencies
- Create `index.html` with CDN-based React + Tailwind setup (or use Vite minimal config)
- Alternatively, paste into a React playground (CodeSandbox, StackBlitz) for zero-config demo

