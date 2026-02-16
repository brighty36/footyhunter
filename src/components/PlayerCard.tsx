import type { Player } from '../data/players';
import type { Assignment } from '../game/types';

type PlayerCardProps = {
  player: Player;
  assignment?: Assignment;
  onDragStart: (playerId: string) => void;
  onRankChange: (playerId: string, rank: number) => void;
  onToggleSkip: (playerId: string) => void;
  skipLocked: boolean;
};

export const PlayerCard = ({
  player,
  assignment,
  onDragStart,
  onRankChange,
  onToggleSkip,
  skipLocked
}: PlayerCardProps) => {
  const isSkipped = Boolean(assignment?.skipped);

  return (
    <article
      className={`card ${isSkipped ? 'card--skipped' : ''}`}
      draggable
      onDragStart={() => onDragStart(player.id)}
    >
      <header>
        <strong>{player.name}</strong>
        <p>{player.club}</p>
      </header>
      <p>
        {player.nationality} · {player.position}
      </p>
      <div className="card__actions">
        <label>
          Rank
          <input
            type="number"
            min={1}
            max={60}
            value={assignment?.guessedRank ?? ''}
            onChange={(event) => onRankChange(player.id, Number(event.target.value))}
            disabled={isSkipped}
          />
        </label>
        <button
          type="button"
          onClick={() => onToggleSkip(player.id)}
          disabled={!isSkipped && skipLocked}
        >
          {isSkipped ? 'Undo Skip' : 'Skip'}
        </button>
      </div>
    </article>
  );
};
