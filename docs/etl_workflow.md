# Club data workflow (`top_250_clubs.csv`)

## Folder structure

- `etl/main.py` - pipeline orchestrator
- `etl/config.py` - environment config loader
- `etl/utils/http.py` - HTTP client with retries, backoff, rate limiting, and cache
- `etl/steps/ingest_clubelo.py` - ClubElo snapshot ingestion (raw + parsed)
- `etl/steps/resolve_wikidata.py` - Wikidata QID resolution + alias metadata
- `etl/steps/fetch_metrics.py` - official API metrics stage
- `etl/steps/normalize_rank.py` - normalization and composite score
- `etl/steps/validate.py` - schema/data integrity checks
- `etl/steps/export.py` - exports `data/output/top_250_clubs.csv`

## Run

```bash
python -m etl.main --max-clubs 250
```

For local/dev validation without external API credentials:

```bash
python -m etl.main --max-clubs 50 --use-mock-metrics
```

## Reproducibility

- ClubElo raw artifacts are stored at `data/raw/clubelo/<timestamp>/`.
- Parsed stage tables are stored under `data/processed/`.
- HTTP responses are cached under `data/cache/`.

## API-source constraints

This workflow uses official APIs only and avoids Transfermarkt/similar prohibited scraping.

## Output schema example

See `docs/examples/top_250_clubs.schema.csv` for expected output columns.
