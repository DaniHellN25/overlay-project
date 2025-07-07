import { MatchData, RealTimeMatchResponse, WebSocketMessage } from '../types';

/**
 * Real Data Service for connecting to live esports APIs
 * This service demonstrates production-ready patterns for:
 * - WebSocket connections
 * - REST API integration
 * - Error handling and reconnection
 * - Data transformation
 */

export class RealDataService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private updateCallback: (data: MatchData) => void;
  private statusCallback: (connected: boolean, error?: string) => void;
  private currentMatchId: string | null = null;

  constructor(
    updateCallback: (data: MatchData) => void,
    statusCallback: (connected: boolean, error?: string) => void
  ) {
    this.updateCallback = updateCallback;
    this.statusCallback = statusCallback;
  }

  /**
   * Connect to real-time match data
   * In production, this would connect to services like:
   * - Riot Games API (League of Legends, Valorant)
   * - Steam API (CS:GO, Dota 2)
   * - Blizzard API (Overwatch)
   * - Custom tournament APIs
   */
  async connect(matchId?: string): Promise<void> {
    try {
      // Example: First fetch initial match data via REST API
      if (matchId) {
        await this.fetchInitialMatchData(matchId);
      }

      // Then establish WebSocket connection for real-time updates
      await this.connectWebSocket();
      
    } catch (error) {
      console.error('Failed to connect to real data service:', error);
      this.statusCallback(false, error instanceof Error ? error.message : 'Connection failed');
      throw error;
    }
  }

  /**
   * Fetch initial match data from REST API
   * This would typically be called once when connecting to a match
   */
  private async fetchInitialMatchData(matchId: string): Promise<void> {
    // COMMENTED OUT - Uncomment and configure for production use
    /*
    try {
      const response = await fetch(`${process.env.VITE_API_BASE_URL}/matches/${matchId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.VITE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const matchData: RealTimeMatchResponse = await response.json();
      const transformedData = this.transformApiDataToMatchData(matchData);
      this.updateCallback(transformedData);
      this.currentMatchId = matchId;
      
    } catch (error) {
      console.error('Failed to fetch initial match data:', error);
      throw error;
    }
    */

    // Mock implementation for demo
    console.log('🔗 Simulating initial match data fetch for match:', matchId);
    this.currentMatchId = matchId || 'demo-match-123';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data that looks like it came from a real API
    const mockApiResponse: RealTimeMatchResponse = {
      match_id: this.currentMatchId,
      tournament_id: 'tournament-456',
      game_mode: 'elimination',
      status: 'live',
      current_round: 1,
      total_rounds: 5,
      time_remaining: 300, // 5 minutes in seconds
      teams: {
        team_a: {
          id: 'team-alpha-001',
          name: 'Team Alpha Live',
          logo_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
          primary_color: '#3B82F6',
          secondary_color: '#1E40AF',
          stats: { kills: 0, deaths: 0, score: 0, is_alive: true }
        },
        team_b: {
          id: 'team-beta-002',
          name: 'Team Beta Live',
          logo_url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
          primary_color: '#EF4444',
          secondary_color: '#DC2626',
          stats: { kills: 0, deaths: 0, score: 0, is_alive: true }
        }
      },
      last_updated: new Date().toISOString()
    };

    const transformedData = this.transformApiDataToMatchData(mockApiResponse);
    this.updateCallback(transformedData);
  }

  /**
   * Establish WebSocket connection for real-time updates
   * In production, this would connect to live tournament streams
   */
  private async connectWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      // COMMENTED OUT - Uncomment and configure for production use
      /*
      const wsUrl = `${process.env.VITE_WS_URL}/matches/${this.currentMatchId}`;
      this.ws = new WebSocket(wsUrl);
      */

      // Mock WebSocket for demo - simulates real connection
      console.log('🔗 Simulating WebSocket connection to match:', this.currentMatchId);
      
      // Simulate connection delay
      setTimeout(() => {
        this.statusCallback(true);
        this.reconnectAttempts = 0;
        console.log('✅ Connected to real-time match data');
        
        // Start simulating real-time updates
        this.startMockRealTimeUpdates();
        resolve();
      }, 1500);

      // PRODUCTION WebSocket handlers (commented out)
      /*
      this.ws.onopen = () => {
        console.log('✅ Connected to real-time match data');
        this.statusCallback(true);
        this.reconnectAttempts = 0;
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleWebSocketMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('🔌 WebSocket connection closed:', event.code, event.reason);
        this.statusCallback(false);
        
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.attemptReconnect();
        }
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.statusCallback(false, 'WebSocket connection error');
        reject(error);
      };
      */
    });
  }

  /**
   * Mock real-time updates to simulate live match data
   * This demonstrates what real WebSocket messages would look like
   */
  private startMockRealTimeUpdates(): void {
    // Simulate receiving real-time updates every 3-5 seconds
    const updateInterval = setInterval(() => {
      if (!this.currentMatchId) {
        clearInterval(updateInterval);
        return;
      }

      // Simulate different types of real-time events
      const eventTypes = ['kill_event', 'score_update', 'time_update', 'round_progress'];
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];

      const mockMessage: WebSocketMessage = {
        type: randomEvent as any,
        data: this.generateMockEventData(randomEvent),
        timestamp: new Date().toISOString()
      };

      this.handleWebSocketMessage(mockMessage);
    }, 3000 + Math.random() * 2000); // 3-5 second intervals

    // Store interval ID for cleanup
    (this as any).mockUpdateInterval = updateInterval;
  }

  /**
   * Generate mock event data for different event types
   */
  private generateMockEventData(eventType: string): any {
    switch (eventType) {
      case 'kill_event':
        return {
          killer_team: Math.random() > 0.5 ? 'team_a' : 'team_b',
          victim_team: Math.random() > 0.5 ? 'team_a' : 'team_b',
          weapon: 'AK-47',
          timestamp: Date.now()
        };
      
      case 'score_update':
        return {
          team_a_score: Math.floor(Math.random() * 1000),
          team_b_score: Math.floor(Math.random() * 1000)
        };
      
      case 'time_update':
        return {
          time_remaining: Math.max(0, Math.floor(Math.random() * 300))
        };
      
      case 'round_progress':
        return {
          current_round: Math.floor(Math.random() * 5) + 1,
          round_status: 'in_progress'
        };
      
      default:
        return {};
    }
  }

  /**
   * Handle incoming WebSocket messages
   * This processes real-time updates and transforms them to our data format
   */
  private handleWebSocketMessage(message: WebSocketMessage): void {
    console.log('📨 Received real-time update:', message.type, message.data);

    switch (message.type) {
      case 'match_update':
        // Full match state update
        if (message.data.match) {
          const transformedData = this.transformApiDataToMatchData(message.data.match);
          this.updateCallback(transformedData);
        }
        break;

      case 'kill_event':
        // Individual kill event - update team stats
        this.handleKillEvent(message.data);
        break;

      case 'round_end':
        // Round ended - update round info
        this.handleRoundEnd(message.data);
        break;

      case 'match_end':
        // Match ended
        this.handleMatchEnd(message.data);
        break;

      case 'connection_status':
        // Connection status update
        this.statusCallback(message.data.connected, message.data.error);
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  }

  /**
   * Handle kill events from real-time data
   */
  private handleKillEvent(data: any): void {
    // This would update the kill count for the appropriate team
    // For demo, we'll simulate a kill update
    const teamToUpdate = data.killer_team === 'team_a' ? 'team1' : 'team2';
    
    // In a real implementation, you'd get current state and update it
    // For now, we'll just log the event
    console.log(`🎯 Kill event: ${data.killer_team} eliminated player from ${data.victim_team}`);
  }

  /**
   * Handle round end events
   */
  private handleRoundEnd(data: any): void {
    console.log('🏁 Round ended:', data);
    // Update round information
  }

  /**
   * Handle match end events
   */
  private handleMatchEnd(data: any): void {
    console.log('🏆 Match ended:', data);
    this.statusCallback(false, 'Match ended');
  }

  /**
   * Transform API response to our internal MatchData format
   * This is crucial for adapting different API formats to our UI
   */
  private transformApiDataToMatchData(apiData: RealTimeMatchResponse): MatchData {
    // Convert seconds to MM:SS format
    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Map API game modes to our internal format
    const mapGameMode = (apiMode: string): MatchData['gameMode'] => {
      const modeMap: Record<string, MatchData['gameMode']> = {
        'elimination': 'elimination',
        'ctf': 'capture',
        'deathmatch': 'deathmatch',
        'battleRoyale': 'battle royale',
      };
      return modeMap[apiMode.toLowerCase()] || 'elimination';
    };

    return {
      currentRound: apiData.current_round,
      totalRounds: apiData.total_rounds,
      timeRemaining: formatTime(apiData.time_remaining),
      gameMode: mapGameMode(apiData.game_mode),
      status: apiData.status,
      teams: {
        team1: {
          kills: apiData.teams.team_a.stats.kills,
          score: apiData.teams.team_a.stats.score,
          isAlive: apiData.teams.team_a.stats.is_alive
        },
        team2: {
          kills: apiData.teams.team_b.stats.kills,
          score: apiData.teams.team_b.stats.score,
          isAlive: apiData.teams.team_b.stats.is_alive
        }
      }
    };
  }

  /**
   * Attempt to reconnect to WebSocket
   */
  private attemptReconnect(): void {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff

    console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);

    setTimeout(() => {
      this.connectWebSocket().catch(error => {
        console.error('Reconnection failed:', error);
      });
    }, delay);
  }

  /**
   * Disconnect from real-time data
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close(1000, 'User disconnected');
      this.ws = null;
    }

    // Clear mock update interval
    if ((this as any).mockUpdateInterval) {
      clearInterval((this as any).mockUpdateInterval);
      (this as any).mockUpdateInterval = null;
    }

    this.statusCallback(false);
    this.currentMatchId = null;
    console.log('🔌 Disconnected from real-time data');
  }

  /**
   * Check if currently connected
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN || !!(this as any).mockUpdateInterval;
  }
}

/**
 * PRODUCTION ENVIRONMENT VARIABLES
 * Add these to your .env file for real API integration:
 * 
 * VITE_API_BASE_URL=https://api.your-esports-provider.com/v1
 * VITE_WS_URL=wss://ws.your-esports-provider.com/v1
 * VITE_API_TOKEN=your-api-token-here
 * 
 * Example providers:
 * - Riot Games API: https://developer.riotgames.com/
 * - Steam Web API: https://steamcommunity.com/dev
 * - PandaScore API: https://pandascore.co/
 * - Abios Gaming API: https://abiosgaming.com/
 */

/**
 * PRODUCTION DEPLOYMENT CHECKLIST
 * 
 * 1. Security:
 *    - Never expose API tokens in client-side code
 *    - Use environment variables for all sensitive data
 *    - Implement proper CORS policies
 *    - Add rate limiting and request validation
 * 
 * 2. Error Handling:
 *    - Implement circuit breaker pattern for API failures
 *    - Add retry logic with exponential backoff
 *    - Log errors to monitoring service (Sentry, LogRocket)
 *    - Graceful degradation when real data unavailable
 * 
 * 3. Performance:
 *    - Implement data caching strategies
 *    - Use WebSocket connection pooling
 *    - Add request/response compression
 *    - Monitor WebSocket connection health
 * 
 * 4. Monitoring:
 *    - Track connection uptime and latency
 *    - Monitor data freshness and accuracy
 *    - Set up alerts for connection failures
 *    - Log all real-time events for debugging
 */