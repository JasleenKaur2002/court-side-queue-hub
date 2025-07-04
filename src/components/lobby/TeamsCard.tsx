import React from 'react';
import SectionCard from './SectionCard';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLeague } from '@/contexts/LeagueContext';

const TeamsCard = () => {
  const { settings } = useLeague();
  
  return (
    <SectionCard
      title={`Teams (${settings.teams.length}/${settings.numberOfTeams}) *`}
      action={
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Invite
        </Button>
      }
    >
      <div className="mb-3">
        <p className="text-xs text-gray-400">Required: All teams must be ready before starting the draft. Invite friends using the league code.</p>
      </div>
      <div className="space-y-3">
        {settings.teams.map((team) => (
          <div key={team.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{team.name}</span>
              {team.host && <Badge variant="outline">Host</Badge>}
            </div>
            {team.ready ? (
              <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Ready</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400 text-sm font-medium">
                <XCircle className="h-4 w-4" />
                <span>Not Ready</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default TeamsCard;
