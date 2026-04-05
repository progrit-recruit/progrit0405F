import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import PhaseProgress from './components/PhaseProgress';
import DemoControl from './components/DemoControl';
import RoomCreateScreen from './screens/RoomCreateScreen';
import JoinScreen from './screens/JoinScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import WishScreen from './screens/WishScreen';
import ConditionsScreen from './screens/ConditionsScreen';
import AiQuestionScreen from './screens/AiQuestionScreen';
import WishDashboard from './screens/WishDashboard';
import PlanScreen from './screens/PlanScreen';
import PaymentScreen from './screens/PaymentScreen';
import GuideScreen from './screens/GuideScreen';

const phaseOrder = [
  'room_create', 'inviting', 'scheduling', 'wish_survey',
  'plan_generation', 'voting', 'provisional_booking',
  'payment_collection', 'confirmed', 'guide_ready'
];

const App = () => {
  const [tripPhase, setTripPhase] = useState('guide_ready');
  const [activeTab, setActiveTab] = useState('home');
  const [isOrganizer, setIsOrganizer] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Schedule screen state
  const [viewMode, setViewMode] = useState('personal');
  const [dateStates, setDateStates] = useState({});
  const [isCalendarImported, setIsCalendarImported] = useState(false);

  // User status
  const [userStatus, setUserStatus] = useState({ schedule: true, wish: false, vote: false, payment: false });

  // Wish / Plan sub-state
  const [wishSubView, setWishSubView] = useState('conditions'); // conditions | ai_questions | survey | dashboard
  const [planPhase, setPlanPhase] = useState('organizer_select');

  const currentPhaseIdx = phaseOrder.indexOf(tripPhase);

  // Phase change: auto-navigate to relevant tab
  const handlePhaseChange = (newPhase) => {
    setTripPhase(newPhase);
    const phaseTabMap = {
      inviting: 'home',
      scheduling: 'schedule',
      wish_survey: 'wish',
      plan_generation: 'plan',
      voting: 'plan',
      provisional_booking: 'plan',
      payment_collection: 'pay',
      confirmed: 'pay',
      guide_ready: 'guide',
    };
    if (phaseTabMap[newPhase]) setActiveTab(phaseTabMap[newPhase]);

    // Update wishSubView based on phase
    if (newPhase === 'wish_survey') {
      setWishSubView(isOrganizer ? 'conditions' : 'survey');
    }
    if (newPhase === 'plan_generation') {
      setPlanPhase('aggregating');
      setTimeout(() => setPlanPhase('organizer_select'), 3000);
    }
    if (newPhase === 'voting') {
      setPlanPhase('voting');
    }
  };

  const showFullscreen = tripPhase === 'room_create' || (tripPhase === 'inviting' && !isOrganizer);

  if (tripPhase === 'room_create') {
    return (
      <RoomCreateScreen onComplete={() => handlePhaseChange('inviting')} />
    );
  }

  if (tripPhase === 'inviting' && !isOrganizer) {
    return (
      <JoinScreen onComplete={() => handlePhaseChange('scheduling')} />
    );
  }

  const renderWishTab = () => {
    if (isOrganizer) {
      if (wishSubView === 'conditions') return <ConditionsScreen onComplete={() => setWishSubView('ai_questions')} />;
      if (wishSubView === 'ai_questions') return <AiQuestionScreen onComplete={() => { setWishSubView('dashboard'); handlePhaseChange('wish_survey'); }} />;
      return <WishDashboard onComplete={() => handlePhaseChange('plan_generation')} />;
    }
    return <WishScreen onComplete={() => setUserStatus({...userStatus, wish: true})} />;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen userStatus={userStatus} setActiveTab={setActiveTab} tripPhase={tripPhase} isOrganizer={isOrganizer} />;
      case 'schedule':
        return (
          <ScheduleScreen
            viewMode={viewMode} setViewMode={setViewMode}
            dateStates={dateStates} setDateStates={setDateStates}
            isCalendarImported={isCalendarImported} setIsCalendarImported={setIsCalendarImported}
            isOrganizer={isOrganizer}
            setTripPhase={handlePhaseChange}
          />
        );
      case 'wish':
        return renderWishTab();
      case 'plan':
        return (
          <PlanScreen
            isOrganizer={isOrganizer}
            planPhase={planPhase}
            setPlanPhase={setPlanPhase}
            setTripPhase={handlePhaseChange}
          />
        );
      case 'pay':
        return (
          <PaymentScreen
            isOrganizer={isOrganizer}
            setTripPhase={handlePhaseChange}
          />
        );
      case 'guide':
        return <GuideScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-navy font-sans pb-44">
      <div className="h-1.5 opacity-30" style={{ backgroundImage: 'radial-gradient(#F9E795 25%, transparent 25%)', backgroundSize: '12px 12px' }} />

      <Header
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        isOrganizer={isOrganizer}
        setIsOrganizer={setIsOrganizer}
        setActiveTab={setActiveTab}
      />

      <PhaseProgress tripPhase={tripPhase} />

      <main className="max-w-md mx-auto p-5 min-h-[60vh]" onClick={() => isUserMenuOpen && setIsUserMenuOpen(false)}>
        {renderContent()}
      </main>

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripPhase={tripPhase}
        onTabChange={() => setIsUserMenuOpen(false)}
      />

      <DemoControl
        tripPhase={tripPhase}
        setTripPhase={handlePhaseChange}
        isOrganizer={isOrganizer}
        setIsOrganizer={setIsOrganizer}
      />
    </div>
  );
};

export default App;
