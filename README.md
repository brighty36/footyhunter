# FootyHunter (prototype)

A React + TypeScript + Vite web game inspired by GeoHunter's low-score loop, focused on football players.

## Core prototype rules

- Players appear one-by-one.
- For each shown player, choose exactly one category.
- The score for that choice is the player's **true global rank** in that category (rank 1 is best / lowest points).
- Once a category is used, it is blocked for the rest of the round.
- A round ends when all categories are filled.
- You can skip exactly one player per round and draw a new one.
- Best score is saved in localStorage.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL.

## Build

```bash
npm run build
npm run preview
```

## How to swap the hardcoded dataset with an API later

1. Replace `src/data/players.ts` with an async fetch layer (for example `src/data/playersApi.ts`).
2. Keep the same `Player` type shape so ranking logic still works.
3. In `App.tsx`, load players with `useEffect` + `useState` instead of importing static data.
4. Handle loading/error states before rendering the active round.
5. Optionally cache API responses in localStorage/sessionStorage.

Because ranks are computed at runtime from the loaded dataset, no ranking endpoint is required.
