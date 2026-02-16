import type { DragEvent } from 'react';
import type { Player } from '../data/players';
import type { Assignment, Category } from '../game/types';
import { PlayerCard } from './PlayerCard';

type CategoryColumnProps = {
  title: string;
  category?: Category;
  players: Player[];
  assignments: Record<string, Assignment>;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (category?: Category['key']) => void;
  onDragStart: (playerId: string) => void;
  onRankChange: (playerId: string, rank: number) => void;
  onToggleSkip: (playerId: string) => void;
  skipLocked: boolean;
};

export const CategoryColumn = ({
  title,
  category,
  players,
  assignments,
  onDragOver,
  onDrop,
  onDragStart,
  onRankChange,
  onToggleSkip,
  skipLocked
}: CategoryColumnProps) => (
  <section className="column" onDragOver={onDragOver} onDrop={() => onDrop(category?.key)}>
    <h3>{title}</h3>
    <div className="column__list">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          assignment={assignments[player.id]}
          onDragStart={onDragStart}
          onRankChange={onRankChange}
          onToggleSkip={onToggleSkip}
          skipLocked={skipLocked}
        />
      ))}
    </div>
  </section>
);
