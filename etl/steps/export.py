from __future__ import annotations

from pathlib import Path

from etl.config import Settings
from etl.utils.io import read_csv, write_csv


def run(settings: Settings, scores_path: Path) -> Path:
    rows = read_csv(scores_path)
    out_path = settings.data_dir / 'output' / 'top_250_clubs.csv'
    write_csv(out_path, rows)
    return out_path
