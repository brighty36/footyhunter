from __future__ import annotations

from datetime import datetime, timezone

from etl.config import Settings
from etl.utils.http import HttpClient


def fetch(settings: Settings, http: HttpClient, query: str) -> tuple[float | None, str, str]:
    as_of = datetime.now(timezone.utc).isoformat()
    source_url = settings.google_trends_api_base_url or ''

    if not (settings.google_trends_api_base_url and settings.google_trends_api_token):
        return None, source_url, as_of

    payload = http.get_json(
        settings.google_trends_api_base_url,
        params={'q': query, 'window': '12m'},
        headers={'Authorization': f'Bearer {settings.google_trends_api_token}'},
    )
    return float(payload.get('index_12m', 0)), source_url, as_of
