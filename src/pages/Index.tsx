import React from "react";
import DraftHeader from "../components/draft/DraftHeader";
import CategoryBanner from "../components/draft/CategoryBanner";
import DraftBoard from "../components/draft/DraftBoard";
import ChatFeed from "../components/draft/ChatFeed";
import SelectionTable from "../components/draft/SelectionTable";
import QueueSidebar from "../components/draft/QueueSidebar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/ui/resizable";
import { useDraft } from "../hooks/useDraft";

// Checks screen size, returns true if mobile. (used for layout switching)
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const Index = () => {
  const isMobile = useIsMobile();

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
  } = useDraft();

  const handleSearch = (term: string) => {
    // This will be handled in SelectionTable component
    console.log("Search term:", term);
  };

  // On mobile, arrange layout vertically for best fit; enforce good minSize and allow scroll
  if (isMobile) {
    return (
      <div className="h-screen w-full bg-[#131325] overflow-hidden flex flex-col">
        <DraftHeader 
          currentCategory={currentCategoryFromPick}
          currentTeamOnClock={currentTeamOnClock}
          timeLeft={timeLeft}
          currentPickNumber={currentPickNumber}
          leagueName={leagueSettings.leagueName}
        />
        <CategoryBanner 
          currentCategory={currentCategoryFromPick} 
          onSearch={handleSearch} 
        />
        <div className="flex-1 min-h-0 overflow-hidden">
          <ResizablePanelGroup direction="vertical" className="h-full w-full">
            <ResizablePanel defaultSize={40} minSize={5} maxSize={95}>
                <div className="h-full overflow-y-auto">
                    <ChatFeed messages={messages} recentPicks={recentPicks} />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} minSize={5} maxSize={95}>
              <div className="h-full">
                <DraftBoard picks={draftPicks} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={56} minSize={5} maxSize={95}>
              <div className="h-full overflow-y-auto">
                <SelectionTable 
                  rows={players} 
                  onToggleQueue={handleToggleQueue} 
                  onDraftPlayer={handleDraftPlayer}
                  currentCategory={currentCategory}
                  onCategoryChange={setCurrentCategory}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={5} maxSize={95}>
              <div className="h-full overflow-y-auto">
                <QueueSidebar 
                  queuedPlayers={queuedPlayers} 
                  onRemoveFromQueue={handleToggleQueue} 
                  onReorderQueue={reorderQueue} 
                  currentCategory={currentCategory}
                  onCategoryChange={setCurrentCategory}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    );
  }

  // Desktop/tablet: Main content split vertically with better drag functionality
  return (
    <div className="h-screen w-full bg-[#131325] overflow-hidden flex flex-col">
      <DraftHeader 
        currentCategory={currentCategoryFromPick}
        currentTeamOnClock={currentTeamOnClock}
        timeLeft={timeLeft}
        currentPickNumber={currentPickNumber}
        leagueName={leagueSettings.leagueName}
      />
      <CategoryBanner 
        currentCategory={currentCategoryFromPick} 
        onSearch={handleSearch} 
      />
      <div className="flex-1 min-h-0 overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full w-full">
          <ResizablePanel defaultSize={60} minSize={5} maxSize={95}>
            <div className="h-full">
              <DraftBoard picks={draftPicks} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={5} maxSize={95}>
            <ResizablePanelGroup direction="horizontal" className="h-full min-h-0">
              <ResizablePanel defaultSize={25} minSize={5}>
                <div className="h-full overflow-y-auto">
                    <QueueSidebar 
                      queuedPlayers={queuedPlayers} 
                      onRemoveFromQueue={handleToggleQueue} 
                      onReorderQueue={reorderQueue} 
                      currentCategory={currentCategory}
                      onCategoryChange={setCurrentCategory}
                    />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={15}>
                <div className="h-full overflow-y-auto">
                  <SelectionTable 
                    rows={players} 
                    onToggleQueue={handleToggleQueue} 
                    onDraftPlayer={handleDraftPlayer}
                    currentCategory={currentCategory}
                    onCategoryChange={setCurrentCategory}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={5}>
                <div className="h-full overflow-y-auto">
                  <ChatFeed messages={messages} recentPicks={recentPicks} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
