import React, { useState } from 'react';
import RoomManagementCard from '@/components/lobby/RoomManagementCard';
import RoomSettingsCard from '@/components/lobby/RoomSettingsCard';
import DraftCategoriesCard from '@/components/lobby/DraftCategoriesCard';
import TeamsCard from '@/components/lobby/TeamsCard';
import DraftOrderCard from '@/components/lobby/DraftOrderCard';
import PreDraftChatCard from '@/components/lobby/PreDraftChatCard';
import DraftStatus from '@/components/lobby/DraftStatus';
import ActionLinks from '@/components/lobby/ActionLinks';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLoading } from '@/contexts/LoadingContext';

const CommissionerLobby = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setLoading, setLoadingMessage, hideLoading } = useLoading();

  const handleSaveAllSettings = async () => {
    setLoading(true, "Saving league settings...");
    
    // Simulate loading for each step
    setLoadingMessage("Saving room settings...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    setLoadingMessage("Updating teams...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    setLoadingMessage("Finalizing categories...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    setLoadingMessage("Almost there...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Redirect to draft lobby
    navigate('/commissioner-draft');

    // Hide loader
    hideLoading();

    toast({
      title: "All Settings Saved",
      description: "All league settings have been saved successfully!",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div>
                  <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Commissioner Dashboard</h1>
                  <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Manage your league settings and configure the draft</p>
              </div>
              <div className="flex items-center space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/lobby">View as Player</Link>
                  </Button>
                  <Button 
                    onClick={handleSaveAllSettings}
                  >
                    Save All Settings
                  </Button>
              </div>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            <RoomManagementCard isCommissioner={true} />
            <RoomSettingsCard isCommissioner={true} />
            <DraftCategoriesCard isCommissioner={true} />
          </div>
          
          {/* Middle Column */}
          <div className="space-y-8">
            <TeamsCard />
            <DraftOrderCard />
            <ActionLinks isCommissioner={true} />
          </div>

          {/* Right Column */}
          <div className="space-y-8 md:col-span-2 lg:col-span-1">
            <PreDraftChatCard />
            <DraftStatus isCommissioner={true} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommissionerLobby;
