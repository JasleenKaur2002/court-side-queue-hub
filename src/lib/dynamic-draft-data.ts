import { LeagueSettings } from "../contexts/LeagueContext";

// Generate dynamic teams based on league settings
export const generateDynamicTeams = (settings: LeagueSettings) => {
  return settings.teams.map((team, index) => ({
    name: team.name,
    id: team.id,
    ready: team.ready,
    host: team.host || false
  }));
};

// Generate dynamic categories based on league settings
export const generateDynamicCategories = (settings: LeagueSettings) => {
  return settings.selectedCategories;
};

// All available categories that can be selected
export const ALL_AVAILABLE_CATEGORIES = [
  "NBA East Champ",
  "NBA West Champ",
  "MVP",
  "Western Conference No. 1 Seed",
  "Eastern Conference No. 1 Seed",
  "Leader Points Per Game",
  "Regular Season Fewest Wins",
  "Rookie of the Year",
  "Coach of the Year",
  "In-Season Tournament Champion",
  "Defensive Player of the Year",
  "Leader Blocks Per Game",
  "Leader Assists Per Game",
  "All-NBA First Team",
  "All-NBA Defensive First Team",
  "Leader Box Score Plus Minus",
  "Leader Rebounds Per Game",
  "Leader Steals Per Game",
  "Leader 3-Pointers Made Per Game",
  "Leader 3-Point %",
  "Leader Field Goal %",
];

// Generate draft picks based on dynamic teams and categories
export const generateDynamicDraftPicks = (teams: any[], categories: string[]) => {
  return categories.map((category, rowIdx) => {
    // Create array of team indices and shuffle them
    const teamIndices = Array.from({ length: teams.length }, (_, i) => i);
    
    // Fisher-Yates shuffle algorithm
    for (let i = teamIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [teamIndices[i], teamIndices[j]] = [teamIndices[j], teamIndices[i]];
    }
    
    return teams.map((team, colIdx) => {
      // Find which pick number this team gets (their position in the shuffled array + 1)
      const pickNumber = teamIndices.indexOf(colIdx) + 1;
      
      return {
        player: null,
        face: null,
        label: `${rowIdx + 1}-${colIdx + 1}`,
        pickNumber: pickNumber,
        color: "grey",
      };
    });
  });
};

// Create pick order mapping for dynamic data
export const createDynamicPickOrderMapping = (picks: any[][]) => {
  const mapping: { [key: number]: { row: number; col: number } } = {};
  let overallPick = 1;
  
  // For each category (round)
  for (let round = 0; round < picks.length; round++) {
    // Sort teams by their pick number in this category
    const sortedTeamIndices = Array.from({ length: picks[round].length }, (_, i) => i)
      .sort((a, b) => picks[round][a].pickNumber - picks[round][b].pickNumber);
    
    // Assign overall pick numbers based on sorted order
    sortedTeamIndices.forEach(teamIndex => {
      mapping[overallPick] = { row: round, col: teamIndex };
      overallPick++;
    });
  }
  
  return mapping;
}; 