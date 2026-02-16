from __future__ import annotations

import random
from pathlib import Path

from etl.clients import google_ads_client, google_trends_client, instagram_client, x_client, youtube_client
from etl.config import Settings
from etl.utils.http import HttpClient
from etl.utils.io import read_csv, write_csv


def _mock_metric(qid: str, floor: int, span: int) -> float:
    rnd = random.Random(qid)
    return float(floor + rnd.randint(0, span))


def run(settings: Settings, http: HttpClient, identity_map_path: Path, use_mock_metrics: bool = False) -> Path:
    rows = read_csv(identity_map_path)
    out_rows: list[dict[str, str | float | None]] = []

    for row in rows:
        qid = row['wikidata_qid']
        club_query = row['club_name']

        if use_mock_metrics:
            yt, yt_url, yt_as_of = _mock_metric(qid, 100_000, 50_000_000), 'mock://youtube', 'mock'
            ig, ig_url, ig_as_of = _mock_metric(qid + 'i', 80_000, 60_000_000), 'mock://instagram', 'mock'
            x_followers, x_url, x_as_of = _mock_metric(qid + 'x', 20_000, 30_000_000), 'mock://x', 'mock'
            gads, gads_url, gads_as_of = _mock_metric(qid + 'g', 1_000, 2_000_000), 'mock://google-ads', 'mock'
            gtr, gtr_url, gtr_as_of = _mock_metric(qid + 't', 1, 99), 'mock://google-trends', 'mock'
        else:
            yt, yt_url, yt_as_of = youtube_client.fetch(settings, http, qid)
            ig, ig_url, ig_as_of = instagram_client.fetch(settings, http, qid)
            x_followers, x_url, x_as_of = x_client.fetch(settings, http, qid)
            gads, gads_url, gads_as_of = google_ads_client.fetch(settings, http, club_query)
            gtr, gtr_url, gtr_as_of = google_trends_client.fetch(settings, http, club_query)

        out_rows.append(
            {
                **row,
                'youtube_subscriber_count': yt,
                'youtube_subscriber_count_source_url': yt_url,
                'youtube_subscriber_count_as_of': yt_as_of,
                'instagram_followers_count': ig,
                'instagram_followers_count_source_url': ig_url,
                'instagram_followers_count_as_of': ig_as_of,
                'x_followers_count': x_followers,
                'x_followers_count_source_url': x_url,
                'x_followers_count_as_of': x_as_of,
                'google_ads_avg_monthly_searches': gads,
                'google_ads_avg_monthly_searches_source_url': gads_url,
                'google_ads_avg_monthly_searches_as_of': gads_as_of,
                'google_trends_index_12m': gtr,
                'google_trends_index_12m_source_url': gtr_url,
                'google_trends_index_12m_as_of': gtr_as_of,
            }
        )

    out_path = settings.data_dir / 'processed' / 'club_metrics.csv'
    write_csv(out_path, out_rows)
    return out_path
