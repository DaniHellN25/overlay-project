import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Square, RotateCcw, Clock, Trophy, Target } from 'lucide-react';
import { useOverlayStore } from '../store/useOverlayStore';

const GameDataControls: React.FC = () => {
  const { t } = useTranslation();
  const { 
    matchData, 
    updateMatchData, 
    updateTeamGameData, 
    startGameSimulation, 
    stopGameSimulation 
  } = useOverlayStore();

  const handleStartSimulation = () => {
    updateMatchData({ status: 'live' });
    startGameSimulation();
  };

  const handlePauseSimulation = () => {
    updateMatchData({ status: 'paused' });
    stopGameSimulation();
  };

  const handleStopSimulation = () => {
    updateMatchData({ status: 'ended' });
    stopGameSimulation();
  };

  const handleResetMatch = () => {
    updateMatchData({
      currentRound: 1,
      timeRemaining: '05:00',
      status: 'live',
      teams: {
        team1: { kills: 0, score: 0, isAlive: true },
        team2: { kills: 0, score: 0, isAlive: true }
      }
    });
    stopGameSimulation();
  };

  const handleGameModeChange = (gameMode: typeof matchData.gameMode) => {
    updateMatchData({ gameMode });
    handleResetMatch();
  };

  const handleManualKillUpdate = (teamId: 'team1' | 'team2', increment: number) => {
    const currentKills = matchData.teams[teamId].kills;
    const newKills = Math.max(0, currentKills + increment);
    const newScore = newKills * (matchData.gameMode === 'elimination' ? 100 : 50);
    
    updateTeamGameData(teamId, { 
      kills: newKills, 
      score: newScore 
    });
  };

  // Format time for screen readers as countdown timer
  const formatTimeForScreenReader = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':');
    const minutesNum = parseInt(minutes, 10);
    const secondsNum = parseInt(seconds, 10);
    
    if (minutesNum === 0 && secondsNum === 0) {
      return 'Timer expired';
    } else if (minutesNum === 0) {
      return `${secondsNum} seconds remaining on countdown`;
    } else if (secondsNum === 0) {
      return `${minutesNum} minutes remaining on countdown`;
    } else {
      return `${minutesNum} minutes and ${secondsNum} seconds remaining on countdown`;
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <header className="flex items-center gap-3 border-b pb-4">
        <Target className="text-green-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">
          {t('gameData.controls')}
        </h3>
      </header>

      {/* Simulation Controls */}
      <section className="space-y-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <Play size={16} />
          {t('gameData.simulation')}
        </h4>
        
        <nav className="flex gap-2 flex-wrap">
          <button
            onClick={handleStartSimulation}
            disabled={matchData.status === 'live'}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200"
          >
            <Play size={16} />
            <strong>{t('gameData.start')}</strong>
          </button>
          
          <button
            onClick={handlePauseSimulation}
            disabled={matchData.status !== 'live'}
            className="flex items-center gap-2 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 transition-colors duration-200"
          >
            <Pause size={16} />
            <strong>{t('gameData.pause')}</strong>
          </button>
          
          <button
            onClick={handleStopSimulation}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Square size={16} />
            <strong>{t('gameData.stop')}</strong>
          </button>
          
          <button
            onClick={handleResetMatch}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <RotateCcw size={16} />
            <strong>{t('gameData.reset')}</strong>
          </button>
        </nav>
      </section>

      {/* Game Mode Selection */}
      <section className="space-y-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <Trophy size={16} />
          {t('gameData.gameMode')}
        </h4>
        
        <fieldset>
          <legend className="sr-only">{t('gameData.selectGameMode')}</legend>
          <select
            value={matchData.gameMode}
            onChange={(e) => handleGameModeChange(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="elimination">{t('gameData.modes.elimination')}</option>
            <option value="capture">{t('gameData.modes.capture')}</option>
            <option value="deathmatch">{t('gameData.modes.deathmatch')}</option>
            <option value="battleroyale">{t('gameData.modes.battleRoyale')}</option>
          </select>
        </fieldset>
      </section>

      {/* Manual Kill Controls */}
      <section className="space-y-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <Target size={16} />
          {t('gameData.manualControls')}
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-blue-600">Team 1</legend>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleManualKillUpdate('team1', -1)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                aria-label="Decrease Team 1 eliminations"
              >
                -
              </button>
              <span className="px-3 py-1 bg-gray-100 rounded min-w-[3rem] text-center">
                <span aria-hidden="true">{matchData.teams.team1.kills}</span>
                <span className="sr-only">{matchData.teams.team1.kills} eliminations</span>
              </span>
              <button
                onClick={() => handleManualKillUpdate('team1', 1)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                aria-label="Increase Team 1 eliminations"
              >
                +
              </button>
            </div>
          </fieldset>
          
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-red-600">Team 2</legend>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleManualKillUpdate('team2', -1)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                aria-label="Decrease Team 2 eliminations"
              >
                -
              </button>
              <span className="px-3 py-1 bg-gray-100 rounded min-w-[3rem] text-center">
                <span aria-hidden="true">{matchData.teams.team2.kills}</span>
                <span className="sr-only">{matchData.teams.team2.kills} eliminations</span>
              </span>
              <button
                onClick={() => handleManualKillUpdate('team2', 1)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                aria-label="Increase Team 2 eliminations"
              >
                +
              </button>
            </div>
          </fieldset>
        </div>
      </section>

      {/* Current Match Status */}
      <section className="bg-gray-50 rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <Clock size={16} />
          {t('gameData.currentStatus')}
        </h4>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>{t('gameData.round')}:</strong> {matchData.currentRound}/{matchData.totalRounds}
          </div>
          <div>
            <strong>{t('gameData.timeRemaining')}:</strong> 
            <span className="ml-1">
              {/* Visual display */}
              <span aria-hidden="true">{matchData.timeRemaining}</span>
              {/* Screen reader countdown version */}
              <span className="sr-only">
                {formatTimeForScreenReader(matchData.timeRemaining)}
              </span>
            </span>
          </div>
          <div>
            <strong>{t('gameData.status')}:</strong> 
            <span className={`ml-1 px-2 py-1 rounded text-xs ${
              matchData.status === 'live' ? 'bg-green-100 text-green-800' :
              matchData.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {t(`gameData.statuses.${matchData.status}`)}
            </span>
          </div>
          <div>
            <strong>{t('gameData.mode')}:</strong> {t(`gameData.modes.${matchData.gameMode}`)}
          </div>
        </div>
      </section>
    </article>
  );
};

export default GameDataControls;