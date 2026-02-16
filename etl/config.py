from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


@dataclass
class Settings:
    data_dir: Path = Path('data')
    cache_dir: Path = Path('data/cache')
    request_timeout_s: int = 30
    max_retries: int = 4
    retry_backoff_s: float = 1.2
    rate_limit_per_sec: float = 2.0

    clubelo_snapshot_url: str = 'http://api.clubelo.com/All'
    clubelo_snapshot_file: Optional[str] = None

    wikidata_api: str = 'https://www.wikidata.org/w/api.php'

    youtube_api_key: Optional[str] = None
    youtube_channel_map_file: Optional[str] = None

    instagram_access_token: Optional[str] = None
    instagram_business_account_map_file: Optional[str] = None

    x_bearer_token: Optional[str] = None
    x_user_map_file: Optional[str] = None

    google_ads_developer_token: Optional[str] = None
    google_ads_customer_id: Optional[str] = None
    google_ads_login_customer_id: Optional[str] = None
    google_ads_refresh_token: Optional[str] = None
    google_ads_client_id: Optional[str] = None
    google_ads_client_secret: Optional[str] = None

    google_trends_api_base_url: Optional[str] = None
    google_trends_api_token: Optional[str] = None


def load_dotenv(path: Path = Path('.env')) -> None:
    if not path.exists():
        return
    for line in path.read_text(encoding='utf-8').splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith('#') or '=' not in stripped:
            continue
        key, value = stripped.split('=', 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def load_settings() -> Settings:
    load_dotenv()
    return Settings(
        data_dir=Path(os.getenv('ETL_DATA_DIR', 'data')),
        cache_dir=Path(os.getenv('ETL_CACHE_DIR', 'data/cache')),
        request_timeout_s=int(os.getenv('ETL_TIMEOUT_S', '30')),
        max_retries=int(os.getenv('ETL_MAX_RETRIES', '4')),
        retry_backoff_s=float(os.getenv('ETL_BACKOFF_S', '1.2')),
        rate_limit_per_sec=float(os.getenv('ETL_RATE_LIMIT_PER_SEC', '2')),
        clubelo_snapshot_url=os.getenv('CLUBELO_SNAPSHOT_URL', 'http://api.clubelo.com/All'),
        clubelo_snapshot_file=os.getenv('CLUBELO_SNAPSHOT_FILE'),
        youtube_api_key=os.getenv('YOUTUBE_API_KEY'),
        youtube_channel_map_file=os.getenv('YOUTUBE_CHANNEL_MAP_FILE'),
        instagram_access_token=os.getenv('INSTAGRAM_ACCESS_TOKEN'),
        instagram_business_account_map_file=os.getenv('INSTAGRAM_ACCOUNT_MAP_FILE'),
        x_bearer_token=os.getenv('X_BEARER_TOKEN'),
        x_user_map_file=os.getenv('X_USER_MAP_FILE'),
        google_ads_developer_token=os.getenv('GOOGLE_ADS_DEVELOPER_TOKEN'),
        google_ads_customer_id=os.getenv('GOOGLE_ADS_CUSTOMER_ID'),
        google_ads_login_customer_id=os.getenv('GOOGLE_ADS_LOGIN_CUSTOMER_ID'),
        google_ads_refresh_token=os.getenv('GOOGLE_ADS_REFRESH_TOKEN'),
        google_ads_client_id=os.getenv('GOOGLE_ADS_CLIENT_ID'),
        google_ads_client_secret=os.getenv('GOOGLE_ADS_CLIENT_SECRET'),
        google_trends_api_base_url=os.getenv('GOOGLE_TRENDS_API_BASE_URL'),
        google_trends_api_token=os.getenv('GOOGLE_TRENDS_API_TOKEN'),
    )
