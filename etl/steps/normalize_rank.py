from __future__ import annotations

import math
from pathlib import Path

from etl.config import Settings
from etl.utils.io import read_csv, write_csv

METRICS = [
    'youtube_subscriber_count',
    'instagram_followers_count',
    'x_followers_count',
    'google_ads_avg_monthly_searches',
    'google_trends_index_12m',
]


def _f(value: str) -> float | None:
    if value in ('', 'None', None):
        return None
    try:
        return float(value)
    except ValueError:
        return None


def _log1p_or_none(v: float | None) -> float | None:
    return math.log1p(v) if v is not None and v >= 0 else None


def run(settings: Settings, metrics_path: Path) -> Path:
    rows = read_csv(metrics_path)

    transformed: dict[str, list[float]] = {m: [] for m in METRICS}
    for row in rows:
        for m in METRICS:
            v = _f(row.get(m, ''))
            if v is not None:
                transformed[m].append(_log1p_or_none(v) if m != 'google_trends_index_12m' else v)

    mins_maxes: dict[str, tuple[float, float]] = {}
    for m, values in transformed.items():
        mins_maxes[m] = (min(values), max(values)) if values else (0.0, 0.0)

    scored_rows = []
    for row in rows:
        score = 0.0
        components = 0
        for m in METRICS:
            raw_v = _f(row.get(m, ''))
            t_v = _log1p_or_none(raw_v) if m != 'google_trends_index_12m' else raw_v
            min_v, max_v = mins_maxes[m]
            if t_v is None or max_v == min_v:
                continue
            norm_high_better = (t_v - min_v) / (max_v - min_v)
            component_score = 1.0 - norm_high_better
            row[f'{m}_normalized'] = f'{norm_high_better:.6f}'
            row[f'{m}_score_component'] = f'{component_score:.6f}'
            score += component_score
            components += 1

        row['composite_score'] = f'{(score / components) if components else 1.0:.6f}'
        scored_rows.append(row)

    scored_rows.sort(key=lambda r: float(r['composite_score']))
    for idx, row in enumerate(scored_rows[:250], start=1):
        row['rank'] = str(idx)

    top_rows = scored_rows[:250]
    out_path = settings.data_dir / 'processed' / 'club_scores.csv'
    write_csv(out_path, top_rows)
    return out_path
