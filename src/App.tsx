import { useMemo, useState } from 'react';
import { playersData } from './data/players';
import { BEST_SCORE_KEY, CATEGORIES } from './game/constants';
import { createRankMap } from './game/ranking';
import type { CategoryKey } from './game/types';
import './styles.css';

type PickedPlayer = {
  id: string;
  name: string;
  club: string;
  nationality: string;
  position: string;
  category: CategoryKey;
  rank: number;
};

const shufflePlayers = () => [...playersData].sort(() => Math.random() - 0.5);

const initialBestScore = Number(localStorage.getItem(BEST_SCORE_KEY));

function App() {
  const [deck, setDeck] = useState(shufflePlayers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipUsed, setSkipUsed] = useState(false);
  const [pickedPlayers, setPickedPlayers] = useState<PickedPlayer[]>([]);
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

  const usedCategories = new Set(pickedPlayers.map((pick) => pick.category));
  const gameFinished = usedCategories.size === CATEGORIES.length;
  const currentPlayer = !gameFinished ? deck[currentIndex] : null;
  const totalScore = pickedPlayers.reduce((sum, row) => sum + row.rank, 0);

  const assignCategory = (category: CategoryKey) => {
    if (!currentPlayer || usedCategories.has(category)) {
      return;
    }

    const rank = rankMaps[category].get(currentPlayer.id);
    if (!rank) {
      return;
    }

    const nextPicks = [
      ...pickedPlayers,
      {
        id: currentPlayer.id,
        name: currentPlayer.name,
        club: currentPlayer.club,
        nationality: currentPlayer.nationality,
        position: currentPlayer.position,
        category,
        rank
      }
    ];

    setPickedPlayers(nextPicks);
    setCurrentIndex((prev) => prev + 1);

    if (nextPicks.length === CATEGORIES.length) {
      const nextTotal = nextPicks.reduce((sum, row) => sum + row.rank, 0);
      if (bestScore === null || nextTotal < bestScore) {
        setBestScore(nextTotal);
        localStorage.setItem(BEST_SCORE_KEY, String(nextTotal));
      }
    }
  };

  const skipPlayer = () => {
    if (skipUsed || gameFinished) {
      return;
    }
    setSkipUsed(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const newRound = () => {
    setDeck(shufflePlayers());
    setCurrentIndex(0);
    setSkipUsed(false);
    setPickedPlayers([]);
  };

  return (
    <main className="app">
      <header>
        <h1>FootyHunter</h1>
        <p>Players appear one-by-one. Pick one category per player. Category locks after use.</p>
        <div className="scorebar">
          <span>Categories left: {CATEGORIES.length - usedCategories.size}</span>
          <span>Skip used: {skipUsed ? 'Yes' : 'No'}</span>
          <span>Best score: {bestScore ?? '—'}</span>
        </div>
      </header>

      {!gameFinished && currentPlayer && (
        <section className="current-player">
          <h2>Current Player</h2>
          <article className="card">
            <strong>{currentPlayer.name}</strong>
            <p>{currentPlayer.club}</p>
            <p>
              {currentPlayer.nationality} · {currentPlayer.position}
            </p>
          </article>

          <h3>Choose a category</h3>
          <div className="category-buttons">
            {CATEGORIES.map((category) => {
              const blocked = usedCategories.has(category.key);
              return (
                <button
                  key={category.key}
                  type="button"
                  className={blocked ? 'btn-blocked' : ''}
                  onClick={() => assignCategory(category.key)}
                  disabled={blocked}
                >
                  {category.label} {blocked ? '(blocked)' : ''}
                </button>
              );
            })}
          </div>

          <button type="button" onClick={skipPlayer} disabled={skipUsed}>
            {skipUsed ? 'Skip already used' : 'Skip this player'}
          </button>
        </section>
      )}

      {gameFinished && (
        <section className="results">
          <h2>Round Complete</h2>
          <p>Total score: {totalScore} (lower is better)</p>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Category</th>
                <th>Rank (Score)</th>
              </tr>
            </thead>
            <tbody>
              {pickedPlayers.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.category}</td>
                  <td>{row.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="results">
        <h2>Current Picks</h2>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Club</th>
              <th>Category</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {pickedPlayers.map((row) => (
              <tr key={`live-${row.id}`}>
                <td>{row.name}</td>
                <td>{row.club}</td>
                <td>{row.category}</td>
                <td>{row.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="actions">
        <button type="button" onClick={newRound}>
          New Round
        </button>
      </div>
    </main>
  );
}

export default App;
