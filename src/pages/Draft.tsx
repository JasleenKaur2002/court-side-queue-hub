import React, { useEffect } from 'react';
import { useDraft } from '../hooks/useDraft';
import DraftHeader from '../components/draft/DraftHeader';
import DraftBoard from '../components/draft/DraftBoard';
import SelectionTable from '../components/draft/SelectionTable';
import QueueSidebar from '../components/draft/QueueSidebar';
import ChatFeed from '../components/draft/ChatFeed';

const Draft = () => {
  const {
    players,
    draftPicks,
    currentPickNumber,
    messages,
    recentPicks,
    handleToggleQueue,
    reorderQueue,
    handleDraftPlayer,
    queuedPlayers,
    currentCategory,
    setCurrentCategory,
    currentCategoryFromPick,
    currentTeamOnClock,
    timeLeft,
    leagueSettings,
    dynamicTeams,
    dynamicCategories,
  } = useDraft();


  return (
    <div className="h-screen bg-[#191a24] flex flex-col">
      {/* Draft Header */}
      <DraftHeader 
        currentCategory={currentCategoryFromPick}
        currentTeamOnClock={currentTeamOnClock}
        timeLeft={timeLeft}
        currentPickNumber={currentPickNumber}
        leagueName={leagueSettings.leagueName}
      />

      {/* Main Draft Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Queue */}
        <div className="w-80 flex-shrink-0 border-r border-[#232440]">
          <QueueSidebar
            queuedPlayers={queuedPlayers}
            onRemoveFromQueue={handleToggleQueue}
            onReorderQueue={reorderQueue}
            currentCategory={currentCategory}
            onCategoryChange={setCurrentCategory}
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col">
          {/* Draft Board */}
          <div className="flex-1">
            <DraftBoard 
              picks={draftPicks}
            />
          </div>

          {/* Selection Table */}
          <div className="h-80 border-t border-[#232440]">
            <SelectionTable
              rows={players}
              onToggleQueue={handleToggleQueue}
              onDraftPlayer={handleDraftPlayer}
              currentCategory={currentCategory}
              onCategoryChange={setCurrentCategory}
            />
          </div>
        </div>

        {/* Right Sidebar - Chat */}
        <div className="w-80 flex-shrink-0 border-l border-[#232440]">
          <ChatFeed 
            messages={messages}
            recentPicks={recentPicks}
          />
        </div>
      </div>
    </div>
  );
};

export default Draft;
