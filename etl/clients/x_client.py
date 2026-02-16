from __future__ import annotations

from datetime import datetime, timezone

from etl.clients.common import load_id_map
from etl.config import Settings
from etl.utils.http import HttpClient


def fetch(settings: Settings, http: HttpClient, wikidata_qid: str) -> tuple[float | None, str, str]:
    user_map = load_id_map(settings.x_user_map_file, 'x_user_id')
    user_id = user_map.get(wikidata_qid)
    as_of = datetime.now(timezone.utc).isoformat()
    source_url = f'https://x.com/i/user/{user_id}' if user_id else ''

    if not (settings.x_bearer_token and user_id):
        return None, source_url, as_of

    payload = http.get_json(
        f'https://api.x.com/2/users/{user_id}',
        params={'user.fields': 'public_metrics'},
        headers={'Authorization': f'Bearer {settings.x_bearer_token}'},
    )
    followers = (((payload.get('data') or {}).get('public_metrics') or {}).get('followers_count'))
    return float(followers or 0), source_url, as_of
