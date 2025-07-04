import React from "react";
import {CATEGORIES, TEAMS} from "../lib/draft-data";
import {Message, PickMessageDef, Player, RecentPick} from "../lib/types";
import {initialPlayers} from "../data/initialPlayers";
import {initialMessages} from "../data/initialMessages";
import {
  createDynamicPickOrderMapping,
  generateDynamicCategories,
  generateDynamicDraftPicks,
  generateDynamicTeams
} from "../lib/dynamic-draft-data";
import {useLeague} from "../contexts/LeagueContext";
import {useTimer} from "./useTimer";
import {useQueue} from "./useQueue";

export const useDraft = () => {
    const {settings} = useLeague();

    // Fallback to default settings if context is not available
    const safeSettings = settings || {
        leagueName: "Draft League",
        leagueCode: "DL123",
        numberOfTeams: 4,
        teams: [],
        timePerPick: 2,
        draftType: 'balanced',
        selectedCategories: ["NBA East Champ", "NBA West Champ", "MVP"],
        userRankings: {}
    };

    // Use actual settings for the final return, but safeSettings for internal calculations
    const finalSettings = settings ? settings : safeSettings;

    // Generate dynamic data based on league settings
    const dynamicTeams = React.useMemo(() => generateDynamicTeams(safeSettings), [safeSettings]);
    const dynamicCategories = React.useMemo(() => generateDynamicCategories(safeSettings), [safeSettings]);
    const initialDraftPicks = React.useMemo(() => generateDynamicDraftPicks(dynamicTeams, dynamicCategories), [dynamicTeams, dynamicCategories]);

    const getRankedPlayers = React.useCallback(() => {
        const userRankings = safeSettings.userRankings || {};

        // Create a map for faster lookup of ranked players
        const rankedPlayerMap = new Map<string, Player[]>();
        for (const category in userRankings) {
            rankedPlayerMap.set(category, userRankings[category]);
        }

        // Process all players
        const processedPlayers = initialPlayers.map(player => {
            const rankedPlayers = rankedPlayerMap.get(player.category);
            if (rankedPlayers) {
                const rankIndex = rankedPlayers.findIndex(p => p.id === player.id);
                if (rankIndex !== -1) {
                    return {...player, myrank: rankIndex + 1};
                }
            }
            return player; // Return original player if not in user rankings for the category
        });

        return processedPlayers;
    }, [safeSettings.userRankings]);

    const [players, setPlayers] = React.useState<Player[]>(getRankedPlayers());
    const [draftPicks, setDraftPicks] = React.useState(initialDraftPicks);
    const [currentPickNumber, setCurrentPickNumber] = React.useState(1);
    const [messages, setMessages] = React.useState<Message[]>(initialMessages);
    const [recentPicks, setRecentPicks] = React.useState<RecentPick[]>([]);
    const [currentCategory, setCurrentCategory] = React.useState(dynamicCategories[0] || CATEGORIES[0]);

    const {timeLeft, resetTimer} = useTimer(safeSettings.timePerPick * 60); // Convert minutes to seconds
    const {queue, setQueue, handleToggleQueue, handleReorderQueue, reorderQueue} = useQueue(getRankedPlayers());

    // Create pick order mapping when component mounts or picks change
    const pickOrderMapping = React.useMemo(() => createDynamicPickOrderMapping(draftPicks), [draftPicks]);

    // Update draft picks when settings change
    React.useEffect(() => {
        const newDraftPicks = generateDynamicDraftPicks(dynamicTeams, dynamicCategories);
        setDraftPicks(newDraftPicks);
    }, [dynamicTeams, dynamicCategories]);

    // Update players when rankings change
    React.useEffect(() => {
        setPlayers(getRankedPlayers());
    }, [getRankedPlayers]);

    // Reset timer when pick changes
    React.useEffect(() => {
        resetTimer();
    }, [currentPickNumber, resetTimer]);

    const handleToggleQueueWrapper = (playerId: string) => {
        handleToggleQueue(playerId, players, setPlayers, currentCategory);
    };

    const handleDraftPlayer = (playerId: string) => {
        const playerToDraft = players.find(p => p.id === playerId);
        if (!playerToDraft || currentPickNumber > TEAMS.length * CATEGORIES.length) return;

        // Use the pick order mapping to find the correct grid position
        const gridPosition = pickOrderMapping[currentPickNumber];
        if (!gridPosition) return;

        const {row: roundIndex, col: pickIndexInRound} = gridPosition;

        setDraftPicks(prevPicks => {
            const newPicks = JSON.parse(JSON.stringify(prevPicks));
            newPicks[roundIndex][pickIndexInRound] = {
                ...newPicks[roundIndex][pickIndexInRound],
                player: playerToDraft.player.name,
                face: playerToDraft.player.face,
            };
            return newPicks;
        });

        const teamName = dynamicTeams[pickIndexInRound].name;
        const categoryName = dynamicCategories[roundIndex];

        const newRecentPick: RecentPick = {
            id: currentPickNumber,
            user: teamName,
            pick: playerToDraft.player.name,
            overall: currentPickNumber,
            time: "Just now",
        };
        setRecentPicks(prev => [newRecentPick, ...prev].slice(0, 5));

        const newPickMessage: PickMessageDef = {
            id: `pick-${currentPickNumber}`,
            type: 'pick',
            pick: playerToDraft.player.name,
            team: teamName,
            details: `drafted - Pick ${draftPicks[roundIndex][pickIndexInRound].pickNumber} in ${categoryName} [Overall: ${currentPickNumber}]`,
        };
        setMessages(prev => [...prev, newPickMessage]);

        // Remove player from all players and from all queues for this category
        setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== playerId));
        setQueue(prevQueue => prevQueue.filter(id => id !== playerId));
        setCurrentPickNumber(prev => prev + 1);
    };

    const queuedPlayers = queue.map(id => players.find(p => p.id === id)).filter((p): p is Player => !!p);

    // Get current team on the clock - Fixed to properly identify the team with the current pick
    const getCurrentTeamOnClock = () => {
        if (currentPickNumber > dynamicTeams.length * dynamicCategories.length) return "Draft Complete";

        // Find the grid position for the current pick
        const gridPosition = pickOrderMapping[currentPickNumber];
        if (!gridPosition) return dynamicTeams[0]?.name || "Team 1";

        // Return the team name for the column (team index) at this position
        return dynamicTeams[gridPosition.col]?.name || "Team";
    };

    // Get current category from the current pick
    const getCurrentCategoryFromPick = () => {
        const currentRound = Math.floor((currentPickNumber - 1) / dynamicTeams.length);
        return dynamicCategories[currentRound] || dynamicCategories[0];
    };

    return {
        players,
        draftPicks,
        currentPickNumber,
        messages,
        recentPicks,
        handleToggleQueue: handleToggleQueueWrapper,
        handleReorderQueue,
        reorderQueue,
        handleDraftPlayer,
        queuedPlayers,
        currentCategory,
        setCurrentCategory,
        currentCategoryFromPick: getCurrentCategoryFromPick(),
        currentTeamOnClock: getCurrentTeamOnClock(),
        timeLeft,
        isTimerActive: true,
        pickOrderMapping,
        // Dynamic data from league settings
        dynamicTeams,
        dynamicCategories,
        leagueSettings: finalSettings,
    };
};
