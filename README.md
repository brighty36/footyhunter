# FootyHunter (prototype)

A React + TypeScript + Vite web game inspired by GeoHunter's classify/rank/low-score loop, focused on football players.

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
2. Keep the same `Player` type shape so ranking/scoring logic still works.
3. In `App.tsx`, load players with `useEffect` + `useState` instead of importing static data.
4. Handle loading/error UI states before rendering the board.
5. Optionally cache API responses in localStorage/sessionStorage for faster rematches.

Because the ranking logic computes ranks at runtime from the full loaded dataset, no server-side ranking endpoint is required.
