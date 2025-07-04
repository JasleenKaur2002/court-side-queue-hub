import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Player} from '@/lib/types';

// Types for league settings
export interface Team {
    id: string;
    name: string;
    ready: boolean;
    host?: boolean;
}

export interface LeagueSettings {
    // A1: League Name
    leagueName: string;
    leagueCode: string;

    // A2: Number of Teams
    numberOfTeams: number;
    teams: Team[];

    // A3: Time per Pick
    timePerPick: number; // in minutes

    // A4: Draft Type
    draftType: string;

    // A5: Draft Categories
    selectedCategories: string[];

    // A6: Additional settings
    draftDate?: string;
    spendDeadline?: string;
    userRankings: Record<string, Player[]>;
}

interface LeagueContextType {
    settings: LeagueSettings;
    updateSettings: (newSettings: Partial<LeagueSettings>) => void;
    addTeam: (team: Team) => void;
    updateTeam: (teamId: string, updates: Partial<Team>) => void;
    removeTeam: (teamId: string) => void;
    toggleCategory: (category: string) => void;
    updateUserRankings: (category: string, rankedPlayers: Player[]) => void;
}

// Mock data for initial settings
const mockSettings: LeagueSettings = {
    leagueName: "Epic NBA Draft",
    leagueCode: "ABC123",
    numberOfTeams: 6,
    teams: [
        {id: "1", name: "Demo Mode", ready: true, host: true},
        {id: "2", name: "New Team 2", ready: false},
        {id: "3", name: "New Team 3", ready: true},
        {id: "4", name: "New Team 4", ready: false},
        {id: "5", name: "New Team 5", ready: false},
        {id: "6", name: "New Team 6", ready: false}
    ],
    timePerPick: 2,
    draftType: 'balanced',
    selectedCategories: [
        "NBA East Champ",
        "NBA West Champ",
        "MVP",
        "Western Conference No. 1 Seed",
        "Eastern Conference No. 1 Seed",
        "Leader Points Per Game",
        "Regular Season Fewest Wins",
        "Rookie of the Year"
    ],
    userRankings: {}
};

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const useLeague = () => {
    const context = useContext(LeagueContext);
    if (!context) {
        throw new Error('useLeague must be used within a LeagueProvider');
    }
    return context;
};

interface LeagueProviderProps {
    children: ReactNode;
}

export const LeagueProvider: React.FC<LeagueProviderProps> = ({children}) => {
    const [settings, setSettings] = useState<LeagueSettings>(mockSettings);

    const updateSettings = (newSettings: Partial<LeagueSettings>) => {
        setSettings(prev => ({...prev, ...newSettings}));
    };

    const addTeam = (team: Team) => {
        setSettings(prev => ({
            ...prev,
            teams: [...prev.teams, team],
            numberOfTeams: prev.teams.length + 1
        }));
    };

    const updateTeam = (teamId: string, updates: Partial<Team>) => {
        setSettings(prev => ({
            ...prev,
            teams: prev.teams.map(team =>
                team.id === teamId ? {...team, ...updates} : team
            )
        }));
    };

    const removeTeam = (teamId: string) => {
        setSettings(prev => ({
            ...prev,
            teams: prev.teams.filter(team => team.id !== teamId),
            numberOfTeams: prev.teams.length - 1
        }));
    };

    const toggleCategory = (category: string) => {
        setSettings(prev => ({
            ...prev,
            selectedCategories: prev.selectedCategories.includes(category)
                ? prev.selectedCategories.filter(cat => cat !== category)
                : [...prev.selectedCategories, category]
        }));
    };

    const updateUserRankings = (category: string, rankedPlayers: Player[]) => {
        setSettings(prev => ({
            ...prev,
            userRankings: {
                ...prev.userRankings,
                [category]: rankedPlayers
            }
        }));
    };

    const value = {
        settings,
        updateSettings,
        addTeam,
        updateTeam,
        removeTeam,
        toggleCategory,
        updateUserRankings
    };

    return (
        <LeagueContext.Provider value={value}>
            {children}
        </LeagueContext.Provider>
    );
}; 