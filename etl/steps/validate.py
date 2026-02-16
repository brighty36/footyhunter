from __future__ import annotations

from pathlib import Path

from etl.utils.io import read_csv

REQUIRED_COLUMNS = [
    'club_name',
    'wikidata_qid',
    'youtube_subscriber_count_source_url',
    'youtube_subscriber_count_as_of',
    'instagram_followers_count_source_url',
    'instagram_followers_count_as_of',
    'x_followers_count_source_url',
    'x_followers_count_as_of',
    'google_ads_avg_monthly_searches_source_url',
    'google_ads_avg_monthly_searches_as_of',
    'google_trends_index_12m_source_url',
    'google_trends_index_12m_as_of',
    'composite_score',
    'rank',
]


def run(scores_path: Path) -> None:
    rows = read_csv(scores_path)
    if not rows:
        raise ValueError('Validation failed: no rows in score dataset')

    cols = set(rows[0].keys())
    missing = [c for c in REQUIRED_COLUMNS if c not in cols]
    if missing:
        raise ValueError(f'Validation failed: missing columns {missing}')

    qids = [r['wikidata_qid'] for r in rows if r.get('wikidata_qid')]
    if len(set(qids)) != len(qids):
        raise ValueError('Validation failed: duplicate wikidata_qid values in top_250 output')

    ranks = [int(r['rank']) for r in rows if r.get('rank')]
    if ranks != list(range(1, len(ranks) + 1)):
        raise ValueError('Validation failed: ranks are not contiguous starting from 1')
