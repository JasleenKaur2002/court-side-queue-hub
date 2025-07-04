import { CategoryDetails } from "./types";

export const CATEGORY_DETAILS: { [key: string]: CategoryDetails } = {
  "NBA East Champ": {
    id: "NBA East Champ",
    name: "NBA East Champ",
    description: "Select the team that will win the NBA Eastern Conference Championship.",
    tiers: [
      { name: "Tier 1", description: "East Conference Champion (1 team)" },
      { name: "Tier 2", description: "East Conference Finals Loser (1 team)" },
      { name: "Tier 3", description: "East Conference Semifinals Losers (2 teams)" },
      { name: "Tier 4", description: "East Conference First Round Losers (4 teams)" },
    ],
    resultMethod: "Manually input final playoff standings or scrape from sources like NBA.com or ESPN.",
    scoringPlotSource: "Scrape betting odds for conference winner from sites like Bet365 or FanDuel."
  },
  "NBA West Champ": {
    id: "NBA West Champ",
    name: "NBA West Champ",
    description: "Select the team that will win the NBA Western Conference Championship.",
    tiers: [
      { name: "Tier 1", description: "West Conference Champion (1 team)" },
      { name: "Tier 2", description: "West Conference Finals Loser (1 team)" },
      { name: "Tier 3", description: "West Conference Semifinals Losers (2 teams)" },
      { name: "Tier 4", description: "West Conference First Round Losers (4 teams)" },
    ],
    resultMethod: "Manually input final playoff standings or scrape from sources like NBA.com or ESPN.",
    scoringPlotSource: "Scrape betting odds for conference winner from sites like Bet365 or FanDuel."
  },
  "MVP": {
    id: "MVP",
    name: "NBA MVP",
    description: "Select the player who will be named the NBA's Most Valuable Player.",
    tiers: [
      { name: "Tier 1", description: "MVP Winner" },
      { name: "Tier 2", description: "2nd in Voting" },
      { name: "Tier 3", description: "3rd in Voting" },
      { name: "Tier 4", description: "4th in Voting" },
    ],
    resultMethod: "Manually input results from NBA.com. Scraping is an option but may be unnecessary.",
    scoringPlotSource: "Scrape regular season MVP betting odds for implied probabilities. Alternatively, replicate betting markets to derive implied chance metrics."
  },
  "Western Conference No. 1 Seed": {
    id: "Western Conference No. 1 Seed",
    name: "Western Conference No. 1 Seed",
    description: "Select the team that will finish the regular season with the best record in the Western Conference.",
    tiers: [
      { name: "Tier 1", description: "1st in Conference" },
      { name: "Tier 2", description: "2nd in Conference" },
      { name: "Tier 3", description: "3rd in Conference" },
      { name: "Tier 4", description: "4th in Conference" },
    ],
    resultMethod: "Manually input final regular season standings or scrape from NBA.com or ESPN. API may provide win-loss data.",
    scoringPlotSource: "Scrape season win total odds from betting sites, group teams by conference, and rank by projected wins."
  },
  "Eastern Conference No. 1 Seed": {
    id: "Eastern Conference No. 1 Seed",
    name: "Eastern Conference No. 1 Seed",
    description: "Select the team that will finish the regular season with the best record in the Eastern Conference.",
    tiers: [
      { name: "Tier 1", description: "1st in Conference" },
      { name: "Tier 2", description: "2nd in Conference" },
      { name: "Tier 3", description: "3rd in Conference" },
      { name: "Tier 4", description: "4th in Conference" },
    ],
    resultMethod: "Manually input final regular season standings or scrape from NBA.com or ESPN. API may provide win-loss data.",
    scoringPlotSource: "Scrape season win total odds from betting sites, group teams by conference, and rank by projected wins."
  },
  "Leader Points Per Game": {
    id: "Leader Points Per Game",
    name: "Leader Points Per Game",
    description: "Select the player who will lead the league in points per game.",
    tiers: [
      { name: "Tier 1", description: "PPG Leader" },
      { name: "Tier 2", description: "2nd in PPG" },
      { name: "Tier 3", description: "3rd in PPG" },
      { name: "Tier 4", description: "4th in PPG" },
    ],
    resultMethod: "Use API to pull player points per game and calculate averages or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season PPG standings from API or NBA.com. Graph shows standings-based rankings."
  },
  "Regular Season Fewest Wins": {
    id: "Regular Season Fewest Wins",
    name: "Regular Season Fewest Wins",
    description: "Select the team that will have the fewest wins in the regular season.",
    tiers: [
      { name: "Tier 1", description: "Fewest Wins" },
      { name: "Tier 2", description: "2nd Fewest Wins" },
      { name: "Tier 3", description: "3rd Fewest Wins" },
      { name: "Tier 4", description: "4th Fewest Wins" },
    ],
    resultMethod: "Manually input final standings or scrape from NBA.com. API may provide win-loss data.",
    scoringPlotSource: "Scrape season win total odds, rank teams by lowest projected wins. Direct 'fewest wins' betting markets are unlikely."
  },
  "Rookie of the Year": {
    id: "Rookie of the Year",
    name: "Rookie of the Year",
    description: "Select the player who will win Rookie of the Year.",
    tiers: [
      { name: "Tier 1", description: "Winner" },
      { name: "Tier 2", description: "2nd in Voting" },
      { name: "Tier 3", description: "3rd in Voting" },
      { name: "Tier 4", description: "4th in Voting" },
    ],
    resultMethod: "Manually input or scrape media-voted results from NBA.com.",
    scoringPlotSource: "Scrape regular season Rookie of the Year betting odds for implied probabilities."
  },
  "Coach of the Year": {
    id: "Coach of the Year",
    name: "Coach of the Year",
    description: "Select the coach who will win Coach of the Year.",
    tiers: [
      { name: "Tier 1", description: "Winner" },
      { name: "Tier 2", description: "2nd in Voting" },
      { name: "Tier 3", description: "3rd in Voting" },
      { name: "Tier 4", description: "4th in Voting" },
    ],
    resultMethod: "Manually input or scrape media-voted results from NBA.com.",
    scoringPlotSource: "Scrape regular season Coach of the Year betting odds for implied probabilities."
  },
  "In-Season Tournament Champion": {
    id: "In-Season Tournament Champion",
    name: "In-Season Tournament Champion",
    description: "Select the team that will win the In-Season Tournament.",
    tiers: [
      { name: "Tier 1", description: "Winner" },
      { name: "Tier 2", description: "Runner-Up" },
      { name: "Tier 3", description: "Semifinal Losers" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Manually input final standings or scrape from NBA.com or ESPN.",
    scoringPlotSource: "Scrape tournament betting odds from betting sites."
  },
  "Defensive Player of the Year": {
    id: "Defensive Player of the Year",
    name: "Defensive Player of the Year",
    description: "Select the player who will win Defensive Player of the Year.",
    tiers: [
      { name: "Tier 1", description: "Winner" },
      { name: "Tier 2", description: "2nd in Voting" },
      { name: "Tier 3", description: "3rd in Voting" },
      { name: "Tier 4", description: "4th in Voting" },
    ],
    resultMethod: "Manually input results from NBA.com. Scraping is an option but may be unnecessary.",
    scoringPlotSource: "Scrape regular season Defensive Player odds for implied probabilities."
  },
  "Leader Blocks Per Game": {
    id: "Leader Blocks Per Game",
    name: "Leader Blocks Per Game",
    description: "Select the player who will lead the league in blocks per game.",
    tiers: [
      { name: "Tier 1", description: "Blocks Leader" },
      { name: "Tier 2", description: "2nd in Blocks" },
      { name: "Tier 3", description: "3rd in Blocks" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player blocks per game or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season blocks standings from API or NBA.com."
  },
  "Leader Assists Per Game": {
    id: "Leader Assists Per Game",
    name: "Leader Assists Per Game",
    description: "Select the player who will lead the league in assists per game.",
    tiers: [
      { name: "Tier 1", description: "Assists Leader" },
      { name: "Tier 2", description: "2nd in Assists" },
      { name: "Tier 3", description: "3rd in Assists" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player assists per game or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season assists standings from API or NBA.com."
  },
  "All-NBA First Team": {
    id: "All-NBA First Team",
    name: "All-NBA First Team",
    description: "Select players who will be named to the All-NBA First Team.",
    tiers: [
      { name: "Tier 1", description: "All-NBA First Team" },
      { name: "Tier 2", description: "All-NBA Second Team" },
      { name: "Tier 3", description: "All-NBA Third Team" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Manually input results from NBA.com.",
    scoringPlotSource: "No direct betting market exists. Adapt NBA MVP betting odds by multiplying probabilities by 5 to create a 500% market for implied metrics."
  },
  "All-NBA Defensive First Team": {
    id: "All-NBA Defensive First Team",
    name: "All-NBA Defensive First Team",
    description: "Select players who will be named to the All-NBA Defensive First Team.",
    tiers: [
      { name: "Tier 1", description: "All-NBA Defensive First Team" },
      { name: "Tier 2", description: "All-NBA Defensive Second Team" },
      { name: "Tier 3", description: "N/A" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Manually input results from NBA.com.",
    scoringPlotSource: "No direct betting market exists. Adapt Defensive Player of the Year betting odds by multiplying probabilities by 5 to create a 500% market for implied metrics."
  },
  "Leader Box Score Plus Minus": {
    id: "Leader Box Score Plus Minus",
    name: "Leader Box Score Plus Minus",
    description: "Select the player who will lead the league in Box Score Plus-Minus (BPM).",
    tiers: [
      { name: "Tier 1", description: "BPM Leader" },
      { name: "Tier 2", description: "2nd in BPM" },
      { name: "Tier 3", description: "3rd in BPM" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player BPM or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season BPM standings from API or NBA.com."
  },
  "Leader Rebounds Per Game": {
    id: "Leader Rebounds Per Game",
    name: "Leader Rebounds Per Game",
    description: "Select the player who will lead the league in rebounds per game (Minimum 55 games).",
    tiers: [
      { name: "Tier 1", description: "Rebounds Leader" },
      { name: "Tier 2", description: "2nd in Rebounds" },
      { name: "Tier 3", description: "3rd in Rebounds" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player rebounds per game or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season rebounds standings from API or NBA.com."
  },
  "Leader Steals Per Game": {
    id: "Leader Steals Per Game",
    name: "Leader Steals Per Game",
    description: "Select the player who will lead the league in steals per game (Minimum 55 games).",
    tiers: [
      { name: "Tier 1", description: "Steals Leader" },
      { name: "Tier 2", description: "2nd in Steals" },
      { name: "Tier 3", description: "3rd in Steals" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player steals per game or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season steals standings from API or NBA.com."
  },
  "Leader 3-Pointers Made Per Game": {
    id: "Leader 3-Pointers Made Per Game",
    name: "Leader 3-Pointers Made Per Game",
    description: "Select the player who will lead the league in 3-pointers made per game (Minimum 55 games).",
    tiers: [
      { name: "Tier 1", description: "3-Pointers Made Leader" },
      { name: "Tier 2", description: "2nd in 3-Pointers Made" },
      { name: "Tier 3", description: "3rd in 3-Pointers Made" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player 3-pointers made or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season 3-pointers made standings from API or NBA.com."
  },
  "Leader 3-Point %": {
    id: "Leader 3-Point %",
    name: "Leader 3-Point %",
    description: "Select the player who will lead the league in 3-point percentage (Minimum 100 makes).",
    tiers: [
      { name: "Tier 1", description: "3-Point % Leader" },
      { name: "Tier 2", description: "2nd in 3-Point %" },
      { name: "Tier 3", description: "3rd in 3-Point %" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player 3-point percentage or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season 3-point percentage standings from API or NBA.com."
  },
  "Leader Field Goal %": {
    id: "Leader Field Goal %",
    name: "Leader Field Goal %",
    description: "Select the player who will lead the league in field goal percentage (Minimum 500 makes).",
    tiers: [
      { name: "Tier 1", description: "FG% Leader" },
      { name: "Tier 2", description: "2nd in FG%" },
      { name: "Tier 3", description: "3rd in FG%" },
      { name: "Tier 4", description: "N/A" },
    ],
    resultMethod: "Use API to pull player field goal percentage or manually input at season's end from NBA.com.",
    scoringPlotSource: "Use regular season field goal percentage standings from API or NBA.com."
  },
};
