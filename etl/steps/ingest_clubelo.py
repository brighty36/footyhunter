from __future__ import annotations

import csv
from datetime import datetime, timezone
from io import StringIO
from pathlib import Path

from etl.config import Settings
from etl.utils.http import HttpClient
from etl.utils.io import write_csv, write_json


def run(settings: Settings, http: HttpClient, max_clubs: int | None = None) -> Path:
    snapshot_ts = datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')
    raw_dir = settings.data_dir / 'raw' / 'clubelo' / snapshot_ts
    raw_dir.mkdir(parents=True, exist_ok=True)

    if settings.clubelo_snapshot_file:
        text = Path(settings.clubelo_snapshot_file).read_text(encoding='utf-8')
        source_url = f'file://{Path(settings.clubelo_snapshot_file).resolve()}'
    else:
        text = http.get(settings.clubelo_snapshot_url, use_cache=False)
        source_url = settings.clubelo_snapshot_url

    raw_path = raw_dir / 'clubelo_all_snapshot.txt'
    raw_path.write_text(text, encoding='utf-8')

    reader = csv.DictReader(StringIO(text))
    rows = []
    for row in reader:
        club_name = row.get('Club') or row.get('club') or row.get('Name')
        if not club_name:
            continue
        rows.append(
            {
                'clubelo_rank': row.get('Rank') or '',
                'club_name': club_name.strip(),
                'country': (row.get('Country') or '').strip(),
                'level': (row.get('Level') or '').strip(),
                'elo': row.get('Elo') or row.get('elo') or '',
            }
        )
        if max_clubs and len(rows) >= max_clubs:
            break

    parsed_path = settings.data_dir / 'processed' / 'clubelo_snapshot.csv'
    write_csv(parsed_path, rows, fieldnames=['clubelo_rank', 'club_name', 'country', 'level', 'elo'])

    write_json(
        raw_dir / 'metadata.json',
        {
            'snapshot_url': source_url,
            'retrieved_at_utc': datetime.now(timezone.utc).isoformat(),
            'row_count': len(rows),
            'parsed_csv_path': str(parsed_path),
        },
    )
    return parsed_path
