from __future__ import annotations

from datetime import datetime, timezone

from etl.config import Settings
from etl.utils.http import HttpClient


def fetch(settings: Settings, http: HttpClient, query: str) -> tuple[float | None, str, str]:
    as_of = datetime.now(timezone.utc).isoformat()
    source_url = 'https://ads.google.com/'

    required = [
        settings.google_ads_developer_token,
        settings.google_ads_customer_id,
        settings.google_ads_client_id,
        settings.google_ads_client_secret,
        settings.google_ads_refresh_token,
    ]
    if not all(required):
        return None, source_url, as_of

    # Placeholder: wire this to official Google Ads KeywordPlanIdeaService client implementation.
    # This function intentionally returns None when SDK wiring is not present.
    _ = http
    _ = query
    return None, source_url, as_of
