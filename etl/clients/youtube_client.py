from __future__ import annotations

from datetime import datetime, timezone

from etl.clients.common import load_id_map
from etl.config import Settings
from etl.utils.http import HttpClient


def fetch(settings: Settings, http: HttpClient, wikidata_qid: str) -> tuple[float | None, str, str]:
    channel_map = load_id_map(settings.youtube_channel_map_file, 'youtube_channel_id')
    channel_id = channel_map.get(wikidata_qid)
    as_of = datetime.now(timezone.utc).isoformat()
    source_url = f'https://www.youtube.com/channel/{channel_id}' if channel_id else ''

    if not (settings.youtube_api_key and channel_id):
        return None, source_url, as_of

    payload = http.get_json(
        'https://www.googleapis.com/youtube/v3/channels',
        params={'part': 'statistics', 'id': channel_id, 'key': settings.youtube_api_key},
    )
    items = payload.get('items') or []
    if not items:
        return None, source_url, as_of
    return float(items[0]['statistics'].get('subscriberCount', 0)), source_url, as_of
