from __future__ import annotations

from pathlib import Path

from etl.config import Settings
from etl.utils.http import HttpClient
from etl.utils.io import read_csv, write_csv


def _search_qid(http: HttpClient, api_url: str, club_name: str) -> tuple[str, str, str]:
    payload = http.get_json(
        api_url,
        params={
            'action': 'wbsearchentities',
            'language': 'en',
            'format': 'json',
            'search': club_name,
            'limit': 1,
            'type': 'item',
        },
    )
    result = (payload.get('search') or [{}])[0]
    qid = result.get('id', '')
    label = result.get('label', '')
    desc = result.get('description', '')
    return qid, label, desc


def run(settings: Settings, http: HttpClient, clubelo_csv_path: Path, allow_network: bool = True) -> Path:
    clubs = read_csv(clubelo_csv_path)

    resolved_rows: list[dict[str, str]] = []
    unresolved_rows: list[dict[str, str]] = []

    for idx, club in enumerate(clubs, start=1):
        club_name = club['club_name']

        qid = ''
        label = ''
        desc = ''
        if allow_network:
            try:
                qid, label, desc = _search_qid(http, settings.wikidata_api, club_name)
            except Exception:
                qid, label, desc = '', '', ''

        if not qid:
            qid = f'SYNTH{idx:05d}'
            label = club_name
            desc = 'Synthetic identifier (network unavailable or disabled)'
            method = 'synthetic_fallback'
            confidence = 'low'
            unresolved_rows.append({'club_name': club_name, 'reason': 'used_synthetic_fallback'})
        else:
            method = 'wbsearchentities'
            confidence = 'high' if label.lower() == club_name.lower() else 'medium'

        resolved_rows.append(
            {
                **club,
                'wikidata_qid': qid,
                'wikidata_label': label,
                'wikidata_description': desc,
                'aliases': club_name,
                'match_confidence': confidence,
                'match_method': method,
            }
        )

    resolved_path = settings.data_dir / 'processed' / 'club_identity_map.csv'
    write_csv(
        resolved_path,
        resolved_rows,
        fieldnames=[
            'clubelo_rank',
            'club_name',
            'country',
            'level',
            'elo',
            'wikidata_qid',
            'wikidata_label',
            'wikidata_description',
            'aliases',
            'match_confidence',
            'match_method',
        ],
    )

    exceptions_path = settings.data_dir / 'processed' / 'club_identity_exceptions.csv'
    write_csv(exceptions_path, unresolved_rows, fieldnames=['club_name', 'reason'])
    return resolved_path
