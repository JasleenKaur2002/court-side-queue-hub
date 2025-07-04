export interface Player {
  id: string;
  player: { name: string; face: string };
  category: string;
  vegas: number;
  rankls: number;
  "4castrk": number | string;
  myrank: number;
  adp: number;
  queue: boolean;
}

export type ChatMessageDef = {
  id: string;
  type: 'chat';
  user: string;
  time: string;
  text: string;
  face: string;
};

export type PickMessageDef = {
  id: string;
  type: 'pick';
  pick: string;
  team: string;
  details: string;
};

export type Message = ChatMessageDef | PickMessageDef;

export interface RecentPick {
  id: number;
  user: string;
  pick: string;
  overall: number;
  time: string;
}

export interface Tier {
  name: string;
  description: string;
}

export interface CategoryDetails {
  id: string;
  name: string;
  description: string;
  tiers: Tier[];
  resultMethod: string;
  scoringPlotSource: string;
}
