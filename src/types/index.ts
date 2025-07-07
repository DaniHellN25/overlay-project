export interface TeamConfig {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface GameData {
  kills: number;
  score: number;
  isAlive: boolean;
}

export interface MatchData {
  currentRound: number;
  totalRounds: number;
  timeRemaining: string;
  gameMode: 'elimination' | 'capture' | 'deathmatch' | 'battleroyale';
  status: 'live' | 'paused' | 'ended';
  teams: {
    team1: GameData;
    team2: GameData;
  };
}

export interface OverlayConfig {
  headerText: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  teams: {
    team1: TeamConfig;
    team2: TeamConfig;
  };
  language: 'en' | 'es';
  showGameData: boolean;
  useRealData: boolean; // New toggle for real vs mock data
}

export interface OverlayStore {
  config: OverlayConfig;
  matchData: MatchData;
  isConnected: boolean; // Connection status for real data
  connectionError: string | null; // Error message if connection fails
  updateConfig: (updates: Partial<OverlayConfig>) => void;
  updateTeam: (teamId: 'team1' | 'team2', updates: Partial<TeamConfig>) => void;
  updateMatchData: (updates: Partial<MatchData>) => void;
  updateTeamGameData: (teamId: 'team1' | 'team2', updates: Partial<GameData>) => void;
  resetConfig: () => void;
  saveConfig: () => void;
  loadConfig: () => void;
  startGameSimulation: () => void;
  stopGameSimulation: () => void;
  connectToRealData: () => Promise<void>; // New method for real data connection
  disconnectFromRealData: () => void; // New method to disconnect
}

// Real API Response Types (for production use)
export interface RealTimeMatchResponse {
  match_id: string;
  tournament_id: string;
  game_mode: string;
  status: 'live' | 'paused' | 'ended' | 'scheduled';
  current_round: number;
  total_rounds: number;
  time_remaining: number; // seconds
  teams: {
    team_a: {
      id: string;
      name: string;
      logo_url: string;
      primary_color: string;
      secondary_color: string;
      stats: {
        kills: number;
        deaths: number;
        score: number;
        is_alive: boolean;
      };
    };
    team_b: {
      id: string;
      name: string;
      logo_url: string;
      primary_color: string;
      secondary_color: string;
      stats: {
        kills: number;
        deaths: number;
        score: number;
        is_alive: boolean;
      };
    };
  };
  last_updated: string;
}

export interface WebSocketMessage {
  type: 'match_update' | 'round_end' | 'match_end' | 'kill_event' | 'connection_status';
  data: any;
  timestamp: string;
}