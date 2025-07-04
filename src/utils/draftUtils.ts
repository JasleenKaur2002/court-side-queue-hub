
import { TEAMS, CATEGORIES } from "../lib/draft-data";

// Generate randomized draft order for each category with proper sequential pick numbers
export const generateRandomizedPicks = () => {
  return CATEGORIES.map((category, rowIdx) => {
    // Create array of team indices and shuffle them
    const teamIndices = Array.from({ length: TEAMS.length }, (_, i) => i);
    
    // Fisher-Yates shuffle algorithm
    for (let i = teamIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [teamIndices[i], teamIndices[j]] = [teamIndices[j], teamIndices[i]];
    }
    
    return TEAMS.map((team, colIdx) => {
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

// Create a mapping of overall pick numbers to grid positions based on actual pick order
export const createPickOrderMapping = (picks: any[][]) => {
  const mapping: { [key: number]: { row: number; col: number } } = {};
  let overallPick = 1;
  
  // For each category (round)
  for (let round = 0; round < CATEGORIES.length; round++) {
    // Sort teams by their pick number in this category
    const sortedTeamIndices = Array.from({ length: TEAMS.length }, (_, i) => i)
      .sort((a, b) => picks[round][a].pickNumber - picks[round][b].pickNumber);
    
    // Assign overall pick numbers based on sorted order
    sortedTeamIndices.forEach(teamIndex => {
      mapping[overallPick] = { row: round, col: teamIndex };
      overallPick++;
    });
  }
  
  return mapping;
};

// Determine if a category is team-based or player-based
export const isTeamBasedCategory = (category: string): boolean => {
  const teamCategories = [
    "NBA East Champ",
    "NBA West Champ", 
    "Western Conference No. 1 Seed",
    "Eastern Conference No. 1 Seed",
    "Regular Season Fewest Wins",
    "In-Season Tournament Champion"
  ];
  return teamCategories.includes(category);
};
