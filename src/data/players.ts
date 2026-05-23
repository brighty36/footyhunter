export type Player = {
  id: string;
  name: string;
  nationality: string;
  club: string;
  position: string;
  goals_2024: number;
  assists_2024: number;
  market_value_eur: number;
  caps: number;
};

// Curated snapshot using widely reported 2024 season outputs and transfer valuations.
// Values are static game data (not fetched at runtime) and intentionally approximate.
export const playersData: Player[] = [
  { id: 'p1', name: 'Kylian Mbappé', nationality: 'France', club: 'Real Madrid', position: 'FW', goals_2024: 44, assists_2024: 10, market_value_eur: 180000000, caps: 86 },
  { id: 'p2', name: 'Erling Haaland', nationality: 'Norway', club: 'Manchester City', position: 'FW', goals_2024: 38, assists_2024: 6, market_value_eur: 180000000, caps: 39 },
  { id: 'p3', name: 'Jude Bellingham', nationality: 'England', club: 'Real Madrid', position: 'MF', goals_2024: 23, assists_2024: 13, market_value_eur: 180000000, caps: 39 },
  { id: 'p4', name: 'Vinícius Júnior', nationality: 'Brazil', club: 'Real Madrid', position: 'FW', goals_2024: 24, assists_2024: 11, market_value_eur: 170000000, caps: 39 },
  { id: 'p5', name: 'Bukayo Saka', nationality: 'England', club: 'Arsenal', position: 'FW', goals_2024: 20, assists_2024: 14, market_value_eur: 150000000, caps: 43 },
  { id: 'p6', name: 'Phil Foden', nationality: 'England', club: 'Manchester City', position: 'MF', goals_2024: 27, assists_2024: 12, market_value_eur: 140000000, caps: 44 },
  { id: 'p7', name: 'Florian Wirtz', nationality: 'Germany', club: 'Bayer Leverkusen', position: 'MF', goals_2024: 18, assists_2024: 20, market_value_eur: 140000000, caps: 29 },
  { id: 'p8', name: 'Rodri', nationality: 'Spain', club: 'Manchester City', position: 'MF', goals_2024: 12, assists_2024: 14, market_value_eur: 130000000, caps: 57 },
  { id: 'p9', name: 'Declan Rice', nationality: 'England', club: 'Arsenal', position: 'MF', goals_2024: 9, assists_2024: 10, market_value_eur: 120000000, caps: 65 },
  { id: 'p10', name: 'Cole Palmer', nationality: 'England', club: 'Chelsea', position: 'FW', goals_2024: 27, assists_2024: 15, market_value_eur: 120000000, caps: 11 },
  { id: 'p11', name: 'Lautaro Martínez', nationality: 'Argentina', club: 'Inter', position: 'FW', goals_2024: 32, assists_2024: 6, market_value_eur: 100000000, caps: 67 },
  { id: 'p12', name: 'Harry Kane', nationality: 'England', club: 'Bayern Munich', position: 'FW', goals_2024: 52, assists_2024: 12, market_value_eur: 100000000, caps: 104 },
  { id: 'p13', name: 'Martin Ødegaard', nationality: 'Norway', club: 'Arsenal', position: 'MF', goals_2024: 11, assists_2024: 12, market_value_eur: 110000000, caps: 61 },
  { id: 'p14', name: 'Mohamed Salah', nationality: 'Egypt', club: 'Liverpool', position: 'FW', goals_2024: 30, assists_2024: 18, market_value_eur: 55000000, caps: 99 },
  { id: 'p15', name: 'Kevin De Bruyne', nationality: 'Belgium', club: 'Manchester City', position: 'MF', goals_2024: 8, assists_2024: 18, market_value_eur: 35000000, caps: 107 },
  { id: 'p16', name: 'Lionel Messi', nationality: 'Argentina', club: 'Inter Miami', position: 'FW', goals_2024: 23, assists_2024: 13, market_value_eur: 20000000, caps: 191 },
  { id: 'p17', name: 'Cristiano Ronaldo', nationality: 'Portugal', club: 'Al Nassr', position: 'FW', goals_2024: 50, assists_2024: 13, market_value_eur: 12000000, caps: 211 },
  { id: 'p18', name: 'Antoine Griezmann', nationality: 'France', club: 'Atlético Madrid', position: 'FW', goals_2024: 24, assists_2024: 9, market_value_eur: 22000000, caps: 137 },
  { id: 'p19', name: 'Robert Lewandowski', nationality: 'Poland', club: 'Barcelona', position: 'FW', goals_2024: 35, assists_2024: 9, market_value_eur: 15000000, caps: 158 },
  { id: 'p20', name: 'Bruno Fernandes', nationality: 'Portugal', club: 'Manchester United', position: 'MF', goals_2024: 15, assists_2024: 14, market_value_eur: 55000000, caps: 76 }
];
