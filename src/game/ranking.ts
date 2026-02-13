import type { Player } from '../data/players';
import type { Assignment, CategoryKey, RoundResult } from './types';

export const createRankMap = (players: Player[], category: CategoryKey): Map<string, number> => {
  const sorted = [...players].sort((a, b) => b[category] - a[category]);
  return new Map(sorted.map((player, index) => [player.id, index + 1]));
};

export const getBestCategoryForPlayer = (
  player: Player,
  rankMaps: Record<CategoryKey, Map<string, number>>
): { category: CategoryKey; rank: number } => {
  const categories = Object.keys(rankMaps) as CategoryKey[];
  const best = categories
    .map((category) => ({ category, rank: rankMaps[category].get(player.id) ?? Number.MAX_SAFE_INTEGER }))
    .sort((a, b) => a.rank - b.rank)[0];

  return best;
};

export const scoreRound = (
  players: Player[],
  assignments: Record<string, Assignment>,
  rankMaps: Record<CategoryKey, Map<string, number>>
): { results: RoundResult[]; total: number } => {
  const results = players.map((player) => {
    const assignment = assignments[player.id];
    const truth = getBestCategoryForPlayer(player, rankMaps);

    if (assignment?.skipped) {
      return {
        player,
        chosenCategory: 'Skipped',
        correctCategory: truth.category,
        guessedRank: null,
        correctRank: truth.rank,
        points: 0
      } as RoundResult;
    }

    const guessedRank = assignment?.guessedRank ?? null;
    const points = guessedRank === null ? truth.rank : Math.abs(guessedRank - truth.rank);

    return {
      player,
      chosenCategory: assignment?.category ?? 'Unassigned',
      correctCategory: truth.category,
      guessedRank,
      correctRank: truth.rank,
      points
    } as RoundResult;
  });

  const total = results.reduce((sum, item) => sum + item.points, 0);
  return { results, total };
};
