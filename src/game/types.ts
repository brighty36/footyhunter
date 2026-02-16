import type { Club } from '../data/clubs';
import type { Player } from '../data/players';

export type GameMode = 'players' | 'clubs';

export type PlayerCategoryKey = 'goals_2024' | 'assists_2024' | 'market_value_eur' | 'caps';
export type ClubCategoryKey =
  | 'youtube_subscriber_count'
  | 'instagram_followers_count'
  | 'x_followers_count'
  | 'google_ads_avg_monthly_searches';

export type CategoryKey = PlayerCategoryKey | ClubCategoryKey;

export type Category = {
  key: CategoryKey;
  label: string;
};

export type Entity = Player | Club;

export type PickedRow = {
  id: string;
  name: string;
  meta: string;
  category: CategoryKey;
  rank: number;
};

export type Assignment = {
  category?: CategoryKey;
  guessedRank?: number;
  skipped?: boolean;
};
