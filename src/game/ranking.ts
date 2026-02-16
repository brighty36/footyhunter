import type { Entity, CategoryKey } from './types';

export const createRankMap = (entities: Entity[], category: CategoryKey): Map<string, number> => {
  const sorted = [...entities].sort(
    (a, b) =>
      Number((b as Record<string, unknown>)[category] ?? 0) - Number((a as Record<string, unknown>)[category] ?? 0)
  );
  return new Map(sorted.map((entity, index) => [entity.id, index + 1]));
};
