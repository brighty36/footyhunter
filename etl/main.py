from __future__ import annotations

import argparse

from etl.config import load_settings
from etl.steps import export, fetch_metrics, ingest_clubelo, normalize_rank, resolve_wikidata, validate
from etl.utils.http import HttpClient


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Build top_250_clubs.csv via reproducible ETL.')
    parser.add_argument('--max-clubs', type=int, default=None, help='Optional cap for faster test runs')
    parser.add_argument('--use-mock-metrics', action='store_true', help='Use deterministic mock metrics')
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    settings = load_settings()

    http = HttpClient(
        cache_dir=settings.cache_dir,
        timeout_s=settings.request_timeout_s,
        max_retries=settings.max_retries,
        backoff_s=settings.retry_backoff_s,
        rate_limit_per_sec=settings.rate_limit_per_sec,
    )

    clubelo_csv = ingest_clubelo.run(settings, http, max_clubs=args.max_clubs)
    identity_map_csv = resolve_wikidata.run(settings, http, clubelo_csv, allow_network=not args.use_mock_metrics)
    metrics_csv = fetch_metrics.run(settings, http, identity_map_csv, use_mock_metrics=args.use_mock_metrics)
    scores_csv = normalize_rank.run(settings, metrics_csv)
    validate.run(scores_csv)
    out_path = export.run(settings, scores_csv)

    print(f'ETL complete: {out_path}')


if __name__ == '__main__':
    main()
