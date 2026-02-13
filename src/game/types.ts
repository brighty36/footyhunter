import type { Player } from '../data/players';

export type CategoryKey = 'goals_2024' | 'assists_2024' | 'market_value_eur' | 'caps';

export type Category = {
  key: CategoryKey;
  label: string;
};

export type Assignment = {
  category?: CategoryKey;
  guessedRank?: number;
  skipped?: boolean;
};

export type RoundResult = {
  player: Player;
  chosenCategory: CategoryKey | 'Skipped' | 'Unassigned';
  correctCategory: CategoryKey;
  guessedRank: number | null;
  correctRank: number;
  points: number;
};
