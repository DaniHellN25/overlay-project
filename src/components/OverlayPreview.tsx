import React from 'react';
import { useTranslation } from 'react-i18next';
import { OverlayConfig, MatchData } from '../types';
import { useOverlayStore } from '../store/useOverlayStore';

interface OverlayPreviewProps {
  config: OverlayConfig;
  matchData?: MatchData;
  isFullscreen?: boolean;
}

const OverlayPreview: React.FC<OverlayPreviewProps> = ({ 
  config, 
  matchData,
  isFullscreen = false 
}) => {
  const { t } = useTranslation();
  const { isConnected, connectionError } = useOverlayStore();

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-10 transition-all duration-300 ease-in-out';
    switch (config.position) {
      case 'top':
        return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2`;
      case 'bottom':
        return `${baseClasses} bottom-4 left-1/2 transform -translate-x-1/2`;
      case 'left':
        return `${baseClasses} left-4 top-1/2 transform -translate-y-1/2`;
      case 'right':
        return `${baseClasses} right-4 top-1/2 transform -translate-y-1/2`;
      default:
        return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2`;
    }
  };

  const isVertical = config.position === 'left' || config.position === 'right';

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'live': return 'bg-red-600 animate-pulse';
      case 'paused': return 'bg-yellow-600';
      case 'ended': return 'bg-gray-600';
      default: return 'bg-red-600 animate-pulse';
    }
  };

  const getDataSourceIndicator = () => {
    if (!config.useRealData) {
      return 'bg-blue-600'; // Mock data
    }
    if (connectionError) {
      return 'bg-red-600'; // Error
    }
    if (isConnected) {
      return 'bg-green-600'; // Connected to real data
    }
    return 'bg-yellow-600'; // Connecting
  };

  // Convert time format for screen readers - reads as countdown timer
  const formatTimeForScreenReader = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':');
    const minutesNum = parseInt(minutes, 10);
    const secondsNum = parseInt(seconds, 10);
    
    // Create a natural countdown description
    if (minutesNum === 0 && secondsNum === 0) {
      return 'Time expired';
    } else if (minutesNum === 0) {
      return `${secondsNum} seconds left on timer`;
    } else if (secondsNum === 0) {
      return `${minutesNum} minutes left on timer`;
    } else {
      return `${minutesNum} minutes and ${secondsNum} seconds left on timer`;
    }
  };

  return (
    <div className={`relative bg-gray-900 ${isFullscreen ? 'min-h-screen' : 'min-h-[400px]'} rounded-lg overflow-hidden`}>
      {/* Background pattern to simulate broadcast */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
      
      <aside className={getPositionClasses() + ' md:max-md:w-dvw px-4'}>
        <article className={`
          bg-black bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl
          ${isVertical ? 'flex flex-col items-center px-4 py-6' : 'flex items-center px-6 py-4'}
          transition-all duration-300 ease-in-out hover:bg-opacity-90 flex-wrap gap-4
        `}>
          {/* Header with Game Info */}
          <header className={`${isVertical ? 'mb-4' : 'mr-6'} text-center`}>
            <div className="flex items-center gap-2 justify-center">
              <h2 className={`text-white font-bold text-sm uppercase tracking-wide px-3 py-1 rounded-full ${getStatusColor(matchData?.status)}`}>
                {config.headerText}
              </h2>
              
              {/* Data source indicator */}
              <div 
                className={`w-2 h-2 rounded-full ${getDataSourceIndicator()}`}
                title={config.useRealData ? 'Real Data' : 'Mock Data'}
              />
            </div>
            
            {config.showGameData && matchData && (
              <div className="mt-2 text-xs text-gray-300 space-y-1">
                <div className="flex items-center justify-center gap-4">
                  <span>Round {matchData.currentRound}/{matchData.totalRounds}</span>
                  <span className="text-yellow-400 font-mono">
                    {/* Visual display for sighted users */}
                    <span aria-hidden="true">{matchData.timeRemaining}</span>
                    {/* Screen reader friendly countdown version */}
                    <span className="sr-only">
                      {formatTimeForScreenReader(matchData.timeRemaining)}
                    </span>
                  </span>
                </div>
                <div className="text-gray-400 capitalize">
                  {t(`gameData.modes.${matchData.gameMode}`)}
                </div>
                {config.useRealData && (
                  <div className="text-purple-400 text-xs">
                    {isConnected ? '📡 LIVE' : connectionError ? '❌ ERROR' : '🔄 CONNECTING'}
                  </div>
                )}
              </div>
            )}
          </header>

          {/* Teams */}
          <div className={`flex ${isVertical ? 'flex-col space-y-4' : 'space-x-6'} items-center`}>
            {/* Team 1 */}
            <article className="flex items-center space-x-3">
              {config.teams.team1.logo && (
                <figure>
                  <img
                    src={config.teams.team1.logo}
                    alt={`${config.teams.team1.name} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </figure>
              )}
              <div className="text-center">
                <strong
                  className="font-semibold text-white text-sm px-3 py-1 rounded border-2 block"
                  style={{ 
                    backgroundColor: config.teams.team1.primaryColor,
                    borderColor: config.teams.team1.secondaryColor
                  }}
                >
                  {config.teams.team1.name}
                </strong>
                {config.showGameData && matchData && (
                  <div className="mt-1 text-xs text-gray-300 space-x-2">
                    <span className="text-red-400">
                      {/* Visual display */}
                      <span aria-hidden="true">K: {matchData.teams.team1.kills}</span>
                      {/* Screen reader version */}
                      <span className="sr-only">
                        {matchData.teams.team1.kills} eliminations
                      </span>
                    </span>
                    <span className="text-green-400">
                      {/* Visual display */}
                      <span aria-hidden="true">S: {matchData.teams.team1.score}</span>
                      {/* Screen reader version */}
                      <span className="sr-only">
                        Score {matchData.teams.team1.score} points
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </article>

            {/* VS Separator */}
            <div className="text-white font-bold text-xs opacity-75 px-2">
              <span aria-hidden="true">VS</span>
              <span className="sr-only">versus</span>
            </div>

            {/* Team 2 */}
            <article className="flex items-center space-x-3">
              {config.teams.team2.logo && (
                <figure>
                  <img
                    src={config.teams.team2.logo}
                    alt={`${config.teams.team2.name} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </figure>
              )}
              <div className="text-center">
                <strong
                  className="font-semibold text-white text-sm px-3 py-1 rounded border-2 block"
                  style={{ 
                    backgroundColor: config.teams.team2.primaryColor,
                    borderColor: config.teams.team2.secondaryColor
                  }}
                >
                  {config.teams.team2.name}
                </strong>
                {config.showGameData && matchData && (
                  <div className="mt-1 text-xs text-gray-300 space-x-2">
                    <span className="text-red-400">
                      {/* Visual display */}
                      <span aria-hidden="true">K: {matchData.teams.team2.kills}</span>
                      {/* Screen reader version */}
                      <span className="sr-only">
                        {matchData.teams.team2.kills} eliminations
                      </span>
                    </span>
                    <span className="text-green-400">
                      {/* Visual display */}
                      <span aria-hidden="true">S: {matchData.teams.team2.score}</span>
                      {/* Screen reader version */}
                      <span className="sr-only">
                        Score {matchData.teams.team2.score} points
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </article>
          </div>
        </article>
      </aside>

      {/* Fullscreen mode indicator */}
      {isFullscreen && (
        <aside className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded z-20">
          {t('preview.fullscreen')}
          {config.useRealData && (
            <div className="mt-1 text-purple-400">
              📡 Real Data Mode
            </div>
          )}
        </aside>
      )}
    </div>
  );
};

export default OverlayPreview;