import { useMemo, useState } from 'react';
import { clubsData } from './data/clubs';
import { playersData } from './data/players';
import { BEST_SCORE_KEY_BY_MODE, getCategoriesForMode } from './game/constants';
import { createRankMap } from './game/ranking';
import type { CategoryKey, Entity, GameMode, PickedRow } from './game/types';
import './styles.css';

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

const getDeckForMode = (mode: GameMode): Entity[] => (mode === 'players' ? shuffle(playersData) : shuffle(clubsData));

const getBestScore = (mode: GameMode): number | null => {
  const value = Number(localStorage.getItem(BEST_SCORE_KEY_BY_MODE[mode]));
  return Number.isFinite(value) ? value : null;
};

function App() {
  const [mode, setMode] = useState<GameMode>('players');
  const [deck, setDeck] = useState<Entity[]>(() => getDeckForMode('players'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipUsed, setSkipUsed] = useState(false);
  const [pickedRows, setPickedRows] = useState<PickedRow[]>([]);
  const [bestScore, setBestScore] = useState<number | null>(() => getBestScore('players'));

  const categories = useMemo(() => getCategoriesForMode(mode), [mode]);
  const rankMaps = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.key, createRankMap(deck, category.key)])),
    [categories, deck]
  ) as Record<CategoryKey, Map<string, number>>;

  const usedCategories = new Set(pickedRows.map((pick) => pick.category));
  const gameFinished = usedCategories.size === categories.length;
  const currentEntity = !gameFinished ? deck[currentIndex] : null;
  const totalScore = pickedRows.reduce((sum, row) => sum + row.rank, 0);

  const assignCategory = (category: CategoryKey) => {
    if (!currentEntity || usedCategories.has(category)) {
      return;
    }

    const rank = rankMaps[category]?.get(currentEntity.id);
    if (!rank) {
      return;
    }

    const meta =
      mode === 'players'
        ? `${(currentEntity as typeof playersData[number]).club} · ${(currentEntity as typeof playersData[number]).position}`
        : `${(currentEntity as typeof clubsData[number]).country} · ELO ${(currentEntity as typeof clubsData[number]).elo}`;

    const nextRows = [...pickedRows, { id: currentEntity.id, name: currentEntity.name, meta, category, rank }];
    setPickedRows(nextRows);
    setCurrentIndex((prev) => prev + 1);

    if (nextRows.length === categories.length) {
      const nextTotal = nextRows.reduce((sum, row) => sum + row.rank, 0);
      if (bestScore === null || nextTotal < bestScore) {
        setBestScore(nextTotal);
        localStorage.setItem(BEST_SCORE_KEY_BY_MODE[mode], String(nextTotal));
      }
    }
  };

  const switchMode = (nextMode: GameMode) => {
    setMode(nextMode);
    setDeck(getDeckForMode(nextMode));
    setCurrentIndex(0);
    setSkipUsed(false);
    setPickedRows([]);
    setBestScore(getBestScore(nextMode));
  };

  const skipCurrent = () => {
    if (skipUsed || gameFinished) {
      return;
    }
    setSkipUsed(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const newRound = () => {
    setDeck(getDeckForMode(mode));
    setCurrentIndex(0);
    setSkipUsed(false);
    setPickedRows([]);
  };

  return (
    <main className="app">
      <header>
        <h1>FootyHunter</h1>
        <p>Two game modes: Players and Clubs. Pick one category per reveal; category locks after use.</p>
        <div className="mode-toggle">
          <button type="button" className={mode === 'players' ? 'mode-active' : ''} onClick={() => switchMode('players')}>
            Players Mode
          </button>
          <button type="button" className={mode === 'clubs' ? 'mode-active' : ''} onClick={() => switchMode('clubs')}>
            Clubs Mode
          </button>
        </div>
        <div className="scorebar">
          <span>Mode: {mode}</span>
          <span>Categories left: {categories.length - usedCategories.size}</span>
          <span>Skip used: {skipUsed ? 'Yes' : 'No'}</span>
          <span>Best score: {bestScore ?? '—'}</span>
        </div>
      </header>

      {!gameFinished && currentEntity && (
        <section className="current-player">
          <h2>Current {mode === 'players' ? 'Player' : 'Club'}</h2>
          <article className="card">
            <strong>{currentEntity.name}</strong>
            {mode === 'players' ? (
              <p>
                {(currentEntity as typeof playersData[number]).club} · {(currentEntity as typeof playersData[number]).nationality}
              </p>
            ) : (
              <p>
                {(currentEntity as typeof clubsData[number]).country} · QID {(currentEntity as typeof clubsData[number]).wikidata_qid}
              </p>
            )}
          </article>

          <h3>Choose a category</h3>
          <div className="category-buttons">
            {categories.map((category) => {
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

          <button type="button" onClick={skipCurrent} disabled={skipUsed}>
            {skipUsed ? 'Skip already used' : `Skip this ${mode === 'players' ? 'player' : 'club'}`}
          </button>
        </section>
      )}

      {gameFinished && (
        <section className="results">
          <h2>Round Complete</h2>
          <p>Total score: {totalScore} (lower is better)</p>
        </section>
      )}

      <section className="results">
        <h2>Current Picks</h2>
        <table>
          <thead>
            <tr>
              <th>{mode === 'players' ? 'Player' : 'Club'}</th>
              <th>Meta</th>
              <th>Category</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {pickedRows.map((row) => (
              <tr key={`${mode}-${row.id}`}>
                <td>{row.name}</td>
                <td>{row.meta}</td>
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
