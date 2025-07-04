import React, { useState } from 'react';
import SectionCard from './SectionCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLeague } from '@/contexts/LeagueContext';

interface RoomSettingsCardProps {
  isCommissioner: boolean;
}

const RoomSettingsCard: React.FC<RoomSettingsCardProps> = ({ isCommissioner }) => {
  const { settings, updateSettings } = useLeague();
  const { toast } = useToast();

  const handleSettingChange = (value: string, type: string) => {
    if (!isCommissioner) return;
    
    switch (type) {
      case 'teams':
        const newNumberOfTeams = parseInt(value);
        // Generate the right number of teams
        const existingTeams = settings.teams.slice(0, newNumberOfTeams);
        const teamsToAdd = newNumberOfTeams - existingTeams.length;
        
        const newTeams = [...existingTeams];
        for (let i = 0; i < teamsToAdd; i++) {
          newTeams.push({
            id: `${existingTeams.length + i + 1}`,
            name: `New Team ${existingTeams.length + i + 1}`,
            ready: false
          });
        }
        
        updateSettings({ 
          numberOfTeams: newNumberOfTeams,
          teams: newTeams
        });
        toast({
          title: "Setting Updated",
          description: `Number of teams changed to ${value}`,
        });
        break;
      case 'time':
        updateSettings({ timePerPick: parseInt(value) });
        toast({
          title: "Setting Updated", 
          description: `Time per pick changed to ${value} minute${value === '1' ? '' : 's'}`,
        });
        break;
      case 'draft':
        updateSettings({ draftType: value });
        toast({
          title: "Setting Updated",
          description: `Draft type changed to ${value}`,
        });
        break;
    }
  };

  return (
    <SectionCard title="Draft Settings">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Number of Teams *</Label>
          <Select 
            value={settings.numberOfTeams.toString()} 
            onValueChange={(value) => handleSettingChange(value, 'teams')}
            disabled={!isCommissioner}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select number of teams" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 6).map(num => (
                <SelectItem key={num} value={num.toString()}>{num} Teams</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">Required: Choose how many teams will participate in your draft</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Time per Pick *</Label>
          <Select 
            value={settings.timePerPick.toString()} 
            onValueChange={(value) => handleSettingChange(value, 'time')}
            disabled={!isCommissioner}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select time per pick" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 minute</SelectItem>
              <SelectItem value="2">2 minutes</SelectItem>
              <SelectItem value="3">3 minutes</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">Required: Set how long each team has to make their pick</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Draft Type *</Label>
          <Select 
            value={settings.draftType}
            onValueChange={(value) => handleSettingChange(value, 'draft')}
            disabled={!isCommissioner}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select draft type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auction">Auction Draft</SelectItem>
              <SelectItem value="balanced">Balanced Draft</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">Required: Choose your draft format (Balanced recommended for beginners)</p>
        </div>
      </div>
    </SectionCard>
  );
};

export default RoomSettingsCard;
