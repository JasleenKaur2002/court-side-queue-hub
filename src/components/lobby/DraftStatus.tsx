import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLeague } from '@/contexts/LeagueContext';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface DraftStatusProps {
  isCommissioner: boolean;
}

const DraftStatus: React.FC<DraftStatusProps> = ({ isCommissioner }) => {
  const { settings } = useLeague();
  const [draftDate, setDraftDate] = useState('');
  const [spendDeadline, setSpendDeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Calculate teams that are not ready from actual data
  const notReadyTeams = settings.teams.filter(team => !team.ready).map(team => team.name);
  const spendNotAllocated = settings.teams.filter(team => !team.ready).map(team => team.name); // Using ready status as proxy for spend allocation

  const handleSaveSettings = async () => {
    if (!draftDate || !spendDeadline) {
      toast({
        title: "Error",
        description: "Please fill in both draft date and spend deadline",
        variant: "destructive",
      });
      return;
    }

    const draftDateTime = new Date(draftDate);
    const spendDateTime = new Date(spendDeadline);

    if (spendDateTime >= draftDateTime) {
      toast({
        title: "Error", 
        description: "Spend deadline must be before draft start time",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Draft settings saved successfully!",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Ready to Start?</h3>
        </div>
        
        {isCommissioner && (
          <div className="space-y-6">
            {/* Draft Date & Time */}
            <div className="space-y-3">
              <Label htmlFor="draft-date" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Draft Date & Time *
              </Label>
              <div className="relative">
                <Input 
                  id="draft-date" 
                  type="datetime-local" 
                  value={draftDate}
                  onChange={(e) => setDraftDate(e.target.value)}
                  className="pl-4 pr-4 py-3 text-base border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 bg-white dark:bg-gray-800"
                  placeholder="Select draft start time"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Required: Set when your draft will begin. Commissioner can push this back if needed.
                </p>
              </div>
            </div>

            {/* Spend Deadline */}
            {settings.draftType === 'auction' && (
              <div className="space-y-3">
                <Label htmlFor="spend-deadline" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Spend Deadline *
                </Label>
                <div className="relative">
                  <Input 
                    id="spend-deadline" 
                    type="datetime-local" 
                    value={spendDeadline}
                    onChange={(e) => setSpendDeadline(e.target.value)}
                    className="pl-4 pr-4 py-3 text-base border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all duration-200 bg-white dark:bg-gray-800"
                    placeholder="Set spend allocation deadline"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-700">
                  <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Required: Must be before draft start. When teams must finalize their spending allocations.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            {settings.draftType === 'auction' && spendNotAllocated.length > 0 ? (
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                      {spendNotAllocated.length} team(s) have not allocated spend
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Not allocated: {spendNotAllocated.join(', ')}
                  </p>
                </div>
              </div>
            ) : notReadyTeams.length > 0 ? (
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">Some teams are not ready</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Not ready: {notReadyTeams.join(', ')}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">All teams are ready!</p>
              </div>
            )}
        </div>

        {isCommissioner && (
          <Button 
            className="mt-6 w-full py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl" 
            onClick={handleSaveSettings}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              "Save Settings"
            )}
          </Button>
        )}
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white dark:bg-zinc-900 text-center p-6 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{settings.teams.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Teams Joined</p>
        </Card>
        <Card className="bg-white dark:bg-zinc-900 text-center p-6 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{settings.selectedCategories.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Categories</p>
        </Card>
      </div>
    </div>
  );
};

export default DraftStatus;
