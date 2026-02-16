from __future__ import annotations

from pathlib import Path

from etl.utils.io import read_csv


def load_id_map(path_str: str | None, id_field: str) -> dict[str, str]:
    if not path_str:
        return {}
    path = Path(path_str)
    if not path.exists():
        return {}
    rows = read_csv(path)
    out: dict[str, str] = {}
    for row in rows:
        qid = row.get('wikidata_qid', '')
        value = row.get(id_field, '')
        if qid and value:
            out[qid] = value
    return out
