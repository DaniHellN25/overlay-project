import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OverlayStore, OverlayConfig, MatchData } from '../types';
import { GameDataSimulator } from '../services/gameDataSimulator';
import { RealDataService } from '../services/realDataService';

const defaultConfig: OverlayConfig = {
  headerText: 'Live Now',
  position: 'top',
  teams: {
    team1: {
      id: 'team1',
      name: 'Team Alpha-Live',
      logo: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF'
    },
    team2: {
      id: 'team2',
      name: 'Team Beta-Live',
      logo: '',
      primaryColor: '#EF4444',
      secondaryColor: '#DC2626'
    }
  },
  language: 'en',
  showGameData: true,
  useRealData: false // Default to mock data
};

const defaultMatchData: MatchData = {
  currentRound: 1,
  totalRounds: 5,
  timeRemaining: '05:00',
  gameMode: 'elimination',
  status: 'live',
  teams: {
    team1: { kills: 0, score: 0, isAlive: true },
    team2: { kills: 0, score: 0, isAlive: true }
  }
};

let gameSimulator: GameDataSimulator | null = null;
let realDataService: RealDataService | null = null;

export const useOverlayStore = create<OverlayStore>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      matchData: defaultMatchData,
      isConnected: false,
      connectionError: null,
      
      updateConfig: (updates) => {
        set((state) => ({
          config: { ...state.config, ...updates }
        }));

        // Handle data source switching
        if ('useRealData' in updates) {
          const { useRealData } = updates;
          if (useRealData) {
            // Switch to real data
            get().stopGameSimulation();
            get().connectToRealData();
          } else {
            // Switch to mock data
            get().disconnectFromRealData();
            get().startGameSimulation();
          }
        }
      },
      
      updateTeam: (teamId, updates) => {
        set((state) => ({
          config: {
            ...state.config,
            teams: {
              ...state.config.teams,
              [teamId]: {
                ...state.config.teams[teamId],
                ...updates
              }
            }
          }
        }));
      },
      
      updateMatchData: (updates) => {
        set((state) => ({
          matchData: { ...state.matchData, ...updates }
        }));
      },
      
      updateTeamGameData: (teamId, updates) => {
        set((state) => ({
          matchData: {
            ...state.matchData,
            teams: {
              ...state.matchData.teams,
              [teamId]: {
                ...state.matchData.teams[teamId],
                ...updates
              }
            }
          }
        }));
      },
      
      resetConfig: () => {
        set({ 
          config: defaultConfig, 
          matchData: defaultMatchData,
          isConnected: false,
          connectionError: null
        });
        if (gameSimulator) {
          gameSimulator.stop();
          gameSimulator = null;
        }
        if (realDataService) {
          realDataService.disconnect();
          realDataService = null;
        }
      },
      
      saveConfig: () => {
        const { config, matchData } = get();
        localStorage.setItem('overlay-config', JSON.stringify({ config, matchData }));
      },
      
      loadConfig: () => {
        const savedData = localStorage.getItem('overlay-config');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          set({ 
            config: parsed.config || defaultConfig,
            matchData: parsed.matchData || defaultMatchData
          });
        }
      },
      
      startGameSimulation: () => {
        if (gameSimulator) {
          gameSimulator.stop();
        }
        
        const updateMatchData = (data: MatchData) => {
          set({ matchData: data });
        };
        
        gameSimulator = new GameDataSimulator(updateMatchData, get().matchData);
        gameSimulator.start();
        
        set({ isConnected: true, connectionError: null });
      },
      
      stopGameSimulation: () => {
        if (gameSimulator) {
          gameSimulator.stop();
          gameSimulator = null;
        }
        set({ isConnected: false });
      },

      connectToRealData: async () => {
        try {
          set({ connectionError: null });

          if (realDataService) {
            realDataService.disconnect();
          }

          const updateMatchData = (data: MatchData) => {
            set({ matchData: data });
          };

          const updateConnectionStatus = (connected: boolean, error?: string) => {
            set({ 
              isConnected: connected, 
              connectionError: error || null 
            });
          };

          realDataService = new RealDataService(updateMatchData, updateConnectionStatus);
          
          // In production, you'd pass a real match ID here
          // For demo, we'll use a mock match ID
          await realDataService.connect('demo-match-123');
          
        } catch (error) {
          console.error('Failed to connect to real data:', error);
          set({ 
            isConnected: false, 
            connectionError: error instanceof Error ? error.message : 'Connection failed' 
          });
        }
      },

      disconnectFromRealData: () => {
        if (realDataService) {
          realDataService.disconnect();
          realDataService = null;
        }
        set({ isConnected: false, connectionError: null });
      }
    }),
    {
      name: 'overlay-config-storage',
      partialize: (state) => ({ 
        config: state.config, 
        matchData: state.matchData 
      })
    }
  )
);