from __future__ import annotations

import hashlib
import json
import time
from pathlib import Path
from typing import Any, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


class HttpClient:
    def __init__(
        self,
        cache_dir: Path,
        timeout_s: int = 30,
        max_retries: int = 4,
        backoff_s: float = 1.2,
        rate_limit_per_sec: float = 2.0,
    ) -> None:
        self.cache_dir = cache_dir
        self.timeout_s = timeout_s
        self.max_retries = max_retries
        self.backoff_s = backoff_s
        self.rate_limit_per_sec = rate_limit_per_sec
        self._last_call_ts = 0.0
        self.cache_dir.mkdir(parents=True, exist_ok=True)

    def _sleep_for_rate_limit(self) -> None:
        min_interval = 1.0 / self.rate_limit_per_sec if self.rate_limit_per_sec > 0 else 0.0
        elapsed = time.time() - self._last_call_ts
        if elapsed < min_interval:
            time.sleep(min_interval - elapsed)

    def _cache_key(self, url: str, params: Optional[dict[str, Any]]) -> str:
        raw = f'{url}?{json.dumps(params or {}, sort_keys=True, ensure_ascii=False)}'
        return hashlib.sha256(raw.encode('utf-8')).hexdigest()

    def get(
        self,
        url: str,
        params: Optional[dict[str, Any]] = None,
        headers: Optional[dict[str, str]] = None,
        use_cache: bool = True,
    ) -> str:
        key = self._cache_key(url, params)
        cache_file = self.cache_dir / f'{key}.txt'
        if use_cache and cache_file.exists():
            return cache_file.read_text(encoding='utf-8')

        full_url = f'{url}?{urlencode(params or {})}' if params else url
        req = Request(full_url, headers=headers or {})

        for attempt in range(self.max_retries + 1):
            try:
                self._sleep_for_rate_limit()
                with urlopen(req, timeout=self.timeout_s) as response:
                    body = response.read().decode('utf-8')
                self._last_call_ts = time.time()
                if use_cache:
                    cache_file.write_text(body, encoding='utf-8')
                return body
            except (HTTPError, URLError) as exc:
                if attempt >= self.max_retries:
                    raise RuntimeError(f'HTTP request failed for {full_url}: {exc}') from exc
                time.sleep(self.backoff_s * (2 ** attempt))

        raise RuntimeError(f'HTTP request failed for {full_url}')

    def get_json(
        self,
        url: str,
        params: Optional[dict[str, Any]] = None,
        headers: Optional[dict[str, str]] = None,
        use_cache: bool = True,
    ) -> dict[str, Any]:
        return json.loads(self.get(url, params=params, headers=headers, use_cache=use_cache))
