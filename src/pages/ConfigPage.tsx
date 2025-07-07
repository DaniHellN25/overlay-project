import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Settings, Save, RotateCcw, Eye, Type, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';
import { useOverlayStore } from '../store/useOverlayStore';
import TeamForm from '../components/TeamForm';
import OverlayPreview from '../components/OverlayPreview';
import GameDataControls from '../components/GameDataControls';
import DataSourceToggle from '../components/DataSourceToggle';
import AlertSuccess  from '../components/AlertSuccess'; // Adjust the path as needed

const ConfigPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { t } = useTranslation();
  const { config, matchData, updateConfig, updateTeam, resetConfig, saveConfig } = useOverlayStore();

  const handleSave = () => {
    saveConfig();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000); 
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings?')) {
      resetConfig();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Settings className="text-blue-600 dark:text-blue-400" size={32} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('config.title')}
            </h1>
          </div>
          <nav className="flex items-center space-x-0 flex-wrap gap-2">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 mb-2"
            >
              <RotateCcw size={20} />
              <strong>{t('actions.reset')}</strong>
            </button>
            <div className='relative'>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 mb-2"
              >
                <Save size={20} />
                <strong>{t('actions.save')}</strong>
              </button>
              {showAlert && <AlertSuccess/>}
            </div>
            <Link
              to="/preview"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 mb-2"
            >
              <Eye size={20} />
              <strong>{t('actions.preview')}</strong>
            </Link>
          </nav>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* General Settings */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700 transition-colors duration-200">
            <header className="flex items-center space-x-3 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <Settings className="text-blue-600 dark:text-blue-400" size={24} />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {t('config.general')}
              </h2>
            </header>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <fieldset>
                <label htmlFor="headerText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Type size={16} />
                  {t('config.headerText')}
                </label>
                <input
                  id="headerText"
                  type="text"
                  value={config.headerText}
                  onChange={(e) => updateConfig({ headerText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Live Now"
                  aria-label={t('a11y.headerInput')}
                />
              </fieldset>

              <fieldset>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  {t('config.position')}
                </label>
                <select
                  id="position"
                  value={config.position}
                  onChange={(e) => updateConfig({ position: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  aria-label={t('a11y.positionSelect')}
                >
                  <option value="top">{t('config.position.top')}</option>
                  <option value="bottom">{t('config.position.bottom')}</option>
                  <option value="left">{t('config.position.left')}</option>
                  <option value="right">{t('config.position.right')}</option>
                </select>
              </fieldset>

              <fieldset className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => updateConfig({ showGameData: !config.showGameData })}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {config.showGameData ? (
                      <ToggleRight className="text-blue-600 dark:text-blue-400" size={20} />
                    ) : (
                      <ToggleLeft className="text-gray-400 dark:text-gray-500" size={20} />
                    )}
                    {t('config.showGameData')}
                  </button>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('config.showGameDataDescription')}
                </p>
              </fieldset>
            </form>
          </section>

          {/* Data Source Toggle */}
          <DataSourceToggle />

          {/* Game Data Controls - Only show for mock data or when real data is connected */}
          {config.showGameData && !config.useRealData && <GameDataControls />}

          {/* Team Settings */}
          <section>
            <header className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-3">
                <Settings className="text-blue-600 dark:text-blue-400" size={24} />
                {t('config.teams')}
              </h2>
            </header>

            <div className="space-y-6">
              <TeamForm
                team={config.teams.team1}
                onUpdate={(updates) => updateTeam('team1', updates)}
                teamNumber={1}
              />
              <TeamForm
                team={config.teams.team2}
                onUpdate={(updates) => updateTeam('team2', updates)}
                teamNumber={2}
              />
            </div>
          </section>
        </div>

        {/* Live Preview */}
        <aside className="xl:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8 border dark:border-gray-700 transition-colors duration-200">
            <header className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Live Preview
              </h2>
              {config.useRealData && (
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  📡 Using real data source
                </p>
              )}
            </header>
            <OverlayPreview config={config} matchData={matchData} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ConfigPage;