import { useMemo, useState } from 'react';
import { CategoryColumn } from './components/CategoryColumn';
import { playersData } from './data/players';
import { BEST_SCORE_KEY, CATEGORIES, ROUND_SIZE } from './game/constants';
import { createRankMap, scoreRound } from './game/ranking';
import type { Assignment, CategoryKey, RoundResult } from './game/types';
import './styles.css';

const getRandomRoundPlayers = () => {
  const shuffled = [...playersData].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, ROUND_SIZE);
};

const initialBestScore = Number(localStorage.getItem(BEST_SCORE_KEY));

function App() {
  const [roundPlayers, setRoundPlayers] = useState(getRandomRoundPlayers);
  const [assignments, setAssignments] = useState<Record<string, Assignment>>({});
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [results, setResults] = useState<RoundResult[] | null>(null);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(Number.isFinite(initialBestScore) ? initialBestScore : null);

  const rankMaps = useMemo(
    () => ({
      goals_2024: createRankMap(playersData, 'goals_2024'),
      assists_2024: createRankMap(playersData, 'assists_2024'),
      market_value_eur: createRankMap(playersData, 'market_value_eur'),
      caps: createRankMap(playersData, 'caps')
    }),
    []
  );

  const hasSkipped = Object.values(assignments).some((item) => item.skipped);

  const grouped = CATEGORIES.reduce<Record<string, typeof roundPlayers>>(
    (acc, category) => {
      acc[category.key] = roundPlayers.filter((player) => assignments[player.id]?.category === category.key);
      return acc;
    },
    {}
  );

  const unassigned = roundPlayers.filter((player) => !assignments[player.id]?.category);

  const setCategoryForPlayer = (playerId: string, category?: CategoryKey) => {
    setAssignments((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        category,
        skipped: prev[playerId]?.skipped && category ? false : prev[playerId]?.skipped
      }
    }));
  };

  const onSubmit = () => {
    const activePlayers = roundPlayers.filter((player) => !assignments[player.id]?.skipped);
    const incomplete = activePlayers.some((player) => {
      const row = assignments[player.id];
      return !row?.category || !row.guessedRank;
    });

    if (incomplete) {
      alert('Assign a category and rank for every non-skipped player.');
      return;
    }

    const scored = scoreRound(roundPlayers, assignments, rankMaps);
    setResults(scored.results);
    setTotalScore(scored.total);

    if (bestScore === null || scored.total < bestScore) {
      setBestScore(scored.total);
      localStorage.setItem(BEST_SCORE_KEY, String(scored.total));
    }
  };

  const resetRound = () => {
    setRoundPlayers(getRandomRoundPlayers());
    setAssignments({});
    setDraggedId(null);
    setResults(null);
    setTotalScore(null);
  };

  return (
    <main className="app">
      <header>
        <h1>FootyHunter</h1>
        <p>Drag players into a category, guess rank, and chase the lowest score.</p>
        <div className="scorebar">
          <span>Round size: {ROUND_SIZE}</span>
          <span>Best score: {bestScore ?? '—'}</span>
          {totalScore !== null && <span>Latest score: {totalScore}</span>}
        </div>
      </header>

      <section className="board">
        <CategoryColumn
          title="Unassigned"
          players={unassigned}
          assignments={assignments}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => draggedId && setCategoryForPlayer(draggedId)}
          onDragStart={setDraggedId}
          onRankChange={(playerId, rank) =>
            setAssignments((prev) => ({ ...prev, [playerId]: { ...prev[playerId], guessedRank: rank } }))
          }
          onToggleSkip={(playerId) =>
            setAssignments((prev) => ({
              ...prev,
              [playerId]: {
                ...prev[playerId],
                skipped: !prev[playerId]?.skipped,
                category: undefined
              }
            }))
          }
          skipLocked={hasSkipped}
        />

        {CATEGORIES.map((category) => (
          <CategoryColumn
            key={category.key}
            title={category.label}
            category={category}
            players={grouped[category.key] ?? []}
            assignments={assignments}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(target) => draggedId && setCategoryForPlayer(draggedId, target)}
            onDragStart={setDraggedId}
            onRankChange={(playerId, rank) =>
              setAssignments((prev) => ({ ...prev, [playerId]: { ...prev[playerId], guessedRank: rank } }))
            }
            onToggleSkip={(playerId) =>
              setAssignments((prev) => ({
                ...prev,
                [playerId]: {
                  ...prev[playerId],
                  skipped: !prev[playerId]?.skipped,
                  category: undefined
                }
              }))
            }
            skipLocked={hasSkipped}
          />
        ))}
      </section>

      <div className="actions">
        <button type="button" onClick={onSubmit}>
          Submit Round
        </button>
        <button type="button" onClick={resetRound}>
          New Round
        </button>
      </div>

      {results && (
        <section className="results">
          <h2>Round Reveal</h2>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Chosen Category</th>
                <th>Correct Category</th>
                <th>Guessed Rank</th>
                <th>Correct Rank</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.player.id}>
                  <td>{row.player.name}</td>
                  <td>{row.chosenCategory}</td>
                  <td>{row.correctCategory}</td>
                  <td>{row.guessedRank ?? '—'}</td>
                  <td>{row.correctRank}</td>
                  <td>{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

export default App;
