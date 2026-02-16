import type { Category, ClubCategoryKey, GameMode, PlayerCategoryKey } from './types';

export const PLAYER_CATEGORIES: Category[] = [
  { key: 'goals_2024', label: 'Goals (2024)' },
  { key: 'assists_2024', label: 'Assists (2024)' },
  { key: 'market_value_eur', label: 'Market Value (€)' },
  { key: 'caps', label: 'International Caps' }
];

export const CLUB_CATEGORIES: Category[] = [
  { key: 'youtube_subscriber_count', label: 'YouTube Subscribers' },
  { key: 'instagram_followers_count', label: 'Instagram Followers' },
  { key: 'x_followers_count', label: 'X Followers' },
  { key: 'google_ads_avg_monthly_searches', label: 'Google Ads Avg Monthly Searches' }
];

export const BEST_SCORE_KEY_BY_MODE: Record<GameMode, string> = {
  players: 'footyhunter-best-score-players',
  clubs: 'footyhunter-best-score-clubs'
};

export const getCategoriesForMode = (mode: GameMode): Category[] =>
  mode === 'players' ? PLAYER_CATEGORIES : CLUB_CATEGORIES;

export const isPlayerCategoryKey = (key: string): key is PlayerCategoryKey =>
  ['goals_2024', 'assists_2024', 'market_value_eur', 'caps'].includes(key);

export const isClubCategoryKey = (key: string): key is ClubCategoryKey =>
  ['youtube_subscriber_count', 'instagram_followers_count', 'x_followers_count', 'google_ads_avg_monthly_searches'].includes(
    key
  );
