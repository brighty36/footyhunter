export type Club = {
  id: string;
  name: string;
  country: string;
  wikidata_qid: string;
  elo: number;
  youtube_subscriber_count: number;
  youtube_subscriber_count_source_url: string;
  youtube_subscriber_count_as_of: string;
  instagram_followers_count: number;
  instagram_followers_count_source_url: string;
  instagram_followers_count_as_of: string;
  x_followers_count: number;
  x_followers_count_source_url: string;
  x_followers_count_as_of: string;
  google_ads_avg_monthly_searches: number;
  google_ads_avg_monthly_searches_source_url: string;
  google_ads_avg_monthly_searches_as_of: string;
  google_trends_index_12m: number;
  google_trends_index_12m_source_url: string;
  google_trends_index_12m_as_of: string;
};

// Prototype clubs dataset shaped after ETL output schema.
export const clubsData: Club[] = [
  {
    id: 'c1',
    name: 'Real Madrid',
    country: 'ESP',
    wikidata_qid: 'Q8682',
    elo: 2040,
    youtube_subscriber_count: 16800000,
    youtube_subscriber_count_source_url: 'https://www.youtube.com/@realmadrid',
    youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 171000000,
    instagram_followers_count_source_url: 'https://www.instagram.com/realmadrid/',
    instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 54700000,
    x_followers_count_source_url: 'https://x.com/realmadrid',
    x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 10100000,
    google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/',
    google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 97,
    google_trends_index_12m_source_url: 'https://trends.google.com/',
    google_trends_index_12m_as_of: '2026-02-01'
  },
  {
    id: 'c2', name: 'FC Barcelona', country: 'ESP', wikidata_qid: 'Q7156', elo: 1988,
    youtube_subscriber_count: 16200000, youtube_subscriber_count_source_url: 'https://www.youtube.com/@fcbarcelona', youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 139000000, instagram_followers_count_source_url: 'https://www.instagram.com/fcbarcelona/', instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 49000000, x_followers_count_source_url: 'https://x.com/FCBarcelona', x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 8900000, google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/', google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 92, google_trends_index_12m_source_url: 'https://trends.google.com/', google_trends_index_12m_as_of: '2026-02-01'
  },
  {
    id: 'c3', name: 'Manchester City', country: 'ENG', wikidata_qid: 'Q50602', elo: 2033,
    youtube_subscriber_count: 8900000, youtube_subscriber_count_source_url: 'https://www.youtube.com/@mancity', youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 57000000, instagram_followers_count_source_url: 'https://www.instagram.com/mancity/', instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 18400000, x_followers_count_source_url: 'https://x.com/ManCity', x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 4700000, google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/', google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 81, google_trends_index_12m_source_url: 'https://trends.google.com/', google_trends_index_12m_as_of: '2026-02-01'
  },
  {
    id: 'c4', name: 'Liverpool', country: 'ENG', wikidata_qid: 'Q18656', elo: 1970,
    youtube_subscriber_count: 10600000, youtube_subscriber_count_source_url: 'https://www.youtube.com/@LiverpoolFC', youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 47100000, instagram_followers_count_source_url: 'https://www.instagram.com/liverpoolfc/', instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 24200000, x_followers_count_source_url: 'https://x.com/LFC', x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 5100000, google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/', google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 85, google_trends_index_12m_source_url: 'https://trends.google.com/', google_trends_index_12m_as_of: '2026-02-01'
  },
  {
    id: 'c5', name: 'Manchester United', country: 'ENG', wikidata_qid: 'Q18660', elo: 1899,
    youtube_subscriber_count: 12300000, youtube_subscriber_count_source_url: 'https://www.youtube.com/@manutd', youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 64400000, instagram_followers_count_source_url: 'https://www.instagram.com/manchesterunited/', instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 37900000, x_followers_count_source_url: 'https://x.com/ManUtd', x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 7700000, google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/', google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 90, google_trends_index_12m_source_url: 'https://trends.google.com/', google_trends_index_12m_as_of: '2026-02-01'
  },
  {
    id: 'c6', name: 'Arsenal', country: 'ENG', wikidata_qid: 'Q9617', elo: 1955,
    youtube_subscriber_count: 4600000, youtube_subscriber_count_source_url: 'https://www.youtube.com/@arsenal', youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 30300000, instagram_followers_count_source_url: 'https://www.instagram.com/arsenal/', instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 22100000, x_followers_count_source_url: 'https://x.com/Arsenal', x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 3500000, google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/', google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 73, google_trends_index_12m_source_url: 'https://trends.google.com/', google_trends_index_12m_as_of: '2026-02-01'
  },
  {
    id: 'c7', name: 'Chelsea', country: 'ENG', wikidata_qid: 'Q9616', elo: 1886,
    youtube_subscriber_count: 6200000, youtube_subscriber_count_source_url: 'https://www.youtube.com/@chelseafc', youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 43000000, instagram_followers_count_source_url: 'https://www.instagram.com/chelseafc/', instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 26500000, x_followers_count_source_url: 'https://x.com/ChelseaFC', x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 4100000, google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/', google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 69, google_trends_index_12m_source_url: 'https://trends.google.com/', google_trends_index_12m_as_of: '2026-02-01'
  },
  {
    id: 'c8', name: 'Bayern Munich', country: 'GER', wikidata_qid: 'Q15790', elo: 2001,
    youtube_subscriber_count: 4320000, youtube_subscriber_count_source_url: 'https://www.youtube.com/@fcbayern', youtube_subscriber_count_as_of: '2026-02-01',
    instagram_followers_count: 42800000, instagram_followers_count_source_url: 'https://www.instagram.com/fcbayern/', instagram_followers_count_as_of: '2026-02-01',
    x_followers_count: 13200000, x_followers_count_source_url: 'https://x.com/FCBayern', x_followers_count_as_of: '2026-02-01',
    google_ads_avg_monthly_searches: 3200000, google_ads_avg_monthly_searches_source_url: 'https://ads.google.com/', google_ads_avg_monthly_searches_as_of: '2026-02-01',
    google_trends_index_12m: 75, google_trends_index_12m_source_url: 'https://trends.google.com/', google_trends_index_12m_as_of: '2026-02-01'
  }
];
