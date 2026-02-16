from __future__ import annotations

from datetime import datetime, timezone

from etl.clients.common import load_id_map
from etl.config import Settings
from etl.utils.http import HttpClient


def fetch(settings: Settings, http: HttpClient, wikidata_qid: str) -> tuple[float | None, str, str]:
    account_map = load_id_map(settings.instagram_business_account_map_file, 'instagram_account_id')
    account_id = account_map.get(wikidata_qid)
    as_of = datetime.now(timezone.utc).isoformat()
    source_url = f'https://www.instagram.com/{account_id}/' if account_id else ''

    if not (settings.instagram_access_token and account_id):
        return None, source_url, as_of

    payload = http.get_json(
        f'https://graph.facebook.com/v20.0/{account_id}',
        params={'fields': 'followers_count', 'access_token': settings.instagram_access_token},
    )
    return float(payload.get('followers_count', 0)), source_url, as_of
