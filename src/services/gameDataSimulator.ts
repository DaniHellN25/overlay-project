import { MatchData, GameData } from '../types';

export class GameDataSimulator {
  private intervalId: NodeJS.Timeout | null = null;
  private updateCallback: (data: MatchData) => void;
  private currentData: MatchData;

  constructor(updateCallback: (data: MatchData) => void, initialData: MatchData) {
    this.updateCallback = updateCallback;
    this.currentData = { ...initialData };
  }

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.simulateGameUpdate();
    }, 2000); // Update every 2 seconds
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private simulateGameUpdate() {
    const updates: Partial<MatchData> = {};
    
    // Simulate time countdown
    if (this.currentData.status === 'live') {
      const timeUpdate = this.updateTimeRemaining();
      if (timeUpdate) {
        updates.timeRemaining = timeUpdate;
      }
    }

    // Randomly update kills and scores
    if (Math.random() > 0.7) { // 30% chance of kill update
      const teamToUpdate = Math.random() > 0.5 ? 'team1' : 'team2';
      const currentTeamData = this.currentData.teams[teamToUpdate];
      
      updates.teams = {
        ...this.currentData.teams,
        [teamToUpdate]: {
          ...currentTeamData,
          kills: currentTeamData.kills + 1,
          score: this.calculateScore(currentTeamData.kills + 1, this.currentData.gameMode)
        }
      };
    }

    // Simulate round progression
    if (this.shouldProgressRound()) {
      updates.currentRound = Math.min(this.currentData.currentRound + 1, this.currentData.totalRounds);
      updates.timeRemaining = this.getInitialTimeForGameMode(this.currentData.gameMode);
      
      // Reset some stats for new round
      if (this.currentData.gameMode === 'elimination') {
        updates.teams = {
          team1: { ...this.currentData.teams.team1, isAlive: true },
          team2: { ...this.currentData.teams.team2, isAlive: true }
        };
      }
    }

    // Check if match should end
    if (this.currentData.currentRound >= this.currentData.totalRounds && this.currentData.timeRemaining === '00:00') {
      updates.status = 'ended';
    }

    // Apply updates
    if (Object.keys(updates).length > 0) {
      this.currentData = { ...this.currentData, ...updates };
      this.updateCallback(this.currentData);
    }
  }

  private updateTimeRemaining(): string | null {
    const [minutes, seconds] = this.currentData.timeRemaining.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    
    if (totalSeconds <= 0) return null;
    
    const newTotalSeconds = totalSeconds - 1;
    const newMinutes = Math.floor(newTotalSeconds / 60);
    const newSeconds = newTotalSeconds % 60;
    
    return `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
  }

  private calculateScore(kills: number, gameMode: string): number {
    switch (gameMode) {
      case 'elimination':
        return kills * 100;
      case 'capture':
        return kills * 50;
      case 'deathmatch':
        return kills * 10;
      case 'battle-royale':
        return kills * 25;
      default:
        return kills * 10;
    }
  }

  private shouldProgressRound(): boolean {
    // Progress round if time runs out or in elimination mode when conditions are met
    if (this.currentData.timeRemaining === '00:00') return true;
    
    if (this.currentData.gameMode === 'elimination') {
      // In elimination, round ends when one team reaches certain kills
      const team1Kills = this.currentData.teams.team1.kills;
      const team2Kills = this.currentData.teams.team2.kills;
      return Math.max(team1Kills, team2Kills) >= 5;
    }
    
    return false;
  }

  private getInitialTimeForGameMode(gameMode: string): string {
    switch (gameMode) {
      case 'elimination':
        return '03:00';
      case 'capture':
        return '05:00';
      case 'deathmatch':
        return '10:00';
      case 'battle-royale':
        return '15:00';
      default:
        return '05:00';
    }
  }

  updateGameMode(gameMode: MatchData['gameMode']) {
    this.currentData.gameMode = gameMode;
    this.currentData.timeRemaining = this.getInitialTimeForGameMode(gameMode);
    this.currentData.currentRound = 1;
    this.currentData.status = 'live';
    
    // Reset team data
    this.currentData.teams = {
      team1: { kills: 0, score: 0, isAlive: true },
      team2: { kills: 0, score: 0, isAlive: true }
    };
    
    this.updateCallback(this.currentData);
  }
}