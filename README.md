# FootyHunter (prototype)

A React + TypeScript + Vite web game inspired by GeoHunter's low-score loop.

## Game modes

- **Players mode**: uses player metrics (`goals_2024`, `assists_2024`, `market_value_eur`, `caps`).
- **Clubs mode**: uses club metrics from the new ETL schema (`youtube_subscriber_count`, `instagram_followers_count`, `x_followers_count`, `google_ads_avg_monthly_searches`).

### Round rules

- Entities appear one-by-one.
- For each shown entity, choose exactly one category.
- The score for that choice is the entity's true global rank in that category (rank 1 is best / lowest points).
- Once a category is used, it is blocked for the rest of the round.
- A round ends when all categories are filled.
- You can skip exactly one entity per round and draw a new one.
- Best score is tracked separately for each mode in localStorage.

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

## Club ETL workflow (separate from the game)

A reproducible Python ETL workflow is under `etl/` and can generate `data/output/top_250_clubs.csv`.
See `docs/etl_workflow.md` for full setup and execution details.
