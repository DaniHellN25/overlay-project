import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wifi, WifiOff, Database, Gamepad2, AlertCircle, CheckCircle } from 'lucide-react';
import { useOverlayStore } from '../store/useOverlayStore';

const DataSourceToggle: React.FC = () => {
  const { t } = useTranslation();
  const { 
    config, 
    isConnected, 
    connectionError, 
    updateConfig, 
    connectToRealData, 
    disconnectFromRealData 
  } = useOverlayStore();

  const handleToggleDataSource = async () => {
    const newUseRealData = !config.useRealData;
    updateConfig({ useRealData: newUseRealData });
  };

  const getConnectionStatusIcon = () => {
    if (connectionError) {
      return <AlertCircle className="text-red-500" size={16} />;
    }
    if (isConnected) {
      return <CheckCircle className="text-green-500" size={16} />;
    }
    return <WifiOff className="text-gray-400" size={16} />;
  };

  const getConnectionStatusText = () => {
    if (connectionError) {
      return t('dataSource.error');
    }
    if (config.useRealData && isConnected) {
      return t('dataSource.connected');
    }
    if (config.useRealData && !isConnected) {
      return t('dataSource.connecting');
    }
    return t('dataSource.mockData');
  };

  return (
    <article className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <header className="flex items-center gap-3 border-b pb-4">
        <Database className="text-purple-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">
          {t('dataSource.title')}
        </h3>
      </header>

      {/* Data Source Toggle */}
      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-3">
            {t('dataSource.selectSource')}
          </legend>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Mock Data Option */}
            <label className={`
              flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${!config.useRealData 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}>
              <input
                type="radio"
                name="dataSource"
                checked={!config.useRealData}
                onChange={() => updateConfig({ useRealData: false })}
                className="sr-only"
              />
              <Gamepad2 size={20} className={!config.useRealData ? 'text-blue-600' : 'text-gray-400'} />
              <div>
                <div className="font-medium text-sm">
                  {t('dataSource.mockData')}
                </div>
                <div className="text-xs text-gray-500">
                  {t('dataSource.mockDescription')}
                </div>
              </div>
            </label>

            {/* Real Data Option */}
            <label className={`
              flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${config.useRealData 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}>
              <input
                type="radio"
                name="dataSource"
                checked={config.useRealData}
                onChange={() => updateConfig({ useRealData: true })}
                className="sr-only"
              />
              <Wifi size={20} className={config.useRealData ? 'text-purple-600' : 'text-gray-400'} />
              <div>
                <div className="font-medium text-sm">
                  {t('dataSource.realData')}
                </div>
                <div className="text-xs text-gray-500">
                  {t('dataSource.realDescription')}
                </div>
              </div>
            </label>
          </div>
        </fieldset>

        {/* Connection Status */}
        <div className={`
          flex items-center gap-3 p-3 rounded-lg border
          ${connectionError 
            ? 'border-red-200 bg-red-50' 
            : isConnected 
              ? 'border-green-200 bg-green-50' 
              : 'border-gray-200 bg-gray-50'
          }
        `}>
          {getConnectionStatusIcon()}
          <div className="flex-1">
            <div className="text-sm font-medium">
              {getConnectionStatusText()}
            </div>
            {connectionError && (
              <div className="text-xs text-red-600 mt-1">
                {connectionError}
              </div>
            )}
            {config.useRealData && isConnected && (
              <div className="text-xs text-green-600 mt-1">
                {t('dataSource.receivingUpdates')}
              </div>
            )}
          </div>
        </div>

        {/* Real Data Information */}
        {config.useRealData && (
          <aside className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Wifi size={16} />
              {t('dataSource.realDataInfo')}
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• {t('dataSource.features.liveUpdates')}</li>
              <li>• {t('dataSource.features.realTimeStats')}</li>
              <li>• {t('dataSource.features.automaticSync')}</li>
              <li>• {t('dataSource.features.tournamentData')}</li>
            </ul>
            
            <div className="mt-3 text-xs text-blue-600">
              <strong>{t('dataSource.note')}:</strong> {t('dataSource.demoNote')}
            </div>
          </aside>
        )}

        {/* Production Setup Information */}
        <details className="bg-gray-50 border border-gray-200 rounded-lg">
          <summary className="p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
            {t('dataSource.productionSetup')} 🔧
          </summary>
          <div className="p-4 pt-0 text-xs text-gray-600 space-y-2">
            <p><strong>{t('dataSource.production.apiProviders')}:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Riot Games API (League of Legends, Valorant)</li>
              <li>• Steam Web API (CS:GO, Dota 2)</li>
              <li>• PandaScore API (Multi-game esports data)</li>
              <li>• Abios Gaming API (Tournament data)</li>
            </ul>
            
            <p className="mt-3"><strong>{t('dataSource.production.requirements')}:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• API keys and authentication tokens</li>
              <li>• WebSocket endpoint configuration</li>
              <li>• Rate limiting and error handling</li>
              <li>• Data transformation and caching</li>
            </ul>
          </div>
        </details>
      </div>
    </article>
  );
};

export default DataSourceToggle;