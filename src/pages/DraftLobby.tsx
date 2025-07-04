import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DraftLobby = () => {
  const navigate = useNavigate();

  const handleConfirmDraft = () => {
    navigate('/post-draft'); 
  };


  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Draft Lobby</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Review league settings and prepare for the draft</p>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    className="bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    Done with Draft
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-gray-900">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-900 dark:text-gray-100">Confirm Draft Completion</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                      Are you sure you want to complete the draft? This action will redirect you to the post-draft page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleConfirmDraft}
                      className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                      Yes, Complete Draft
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            <RoomManagementCard isCommissioner={false} />
            <RoomSettingsCard isCommissioner={false} />
            <DraftCategoriesCard isCommissioner={false} />
          </div>
          
          {/* Middle Column */}
          <div className="space-y-8">
            <TeamsCard />
            <DraftOrderCard />
            <ActionLinks isCommissioner={false} />
          </div>

          {/* Right Column */}
          <div className="space-y-8 md:col-span-2 lg:col-span-1">
            <PreDraftChatCard />
            <DraftStatus isCommissioner={false} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DraftLobby;
