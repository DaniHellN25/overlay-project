import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Settings, Eye, Gamepad2 } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import DarkModeToggle from './DarkModeToggle';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center max-md:h-fit h-16 flex-wrap max-md:flex-col max-md:items-start max-md:space-x-0 max-md:space-y-">
          <header className="flex items-center space-x-3 flex-wrap max-md:h-fit ">
            <Gamepad2 className="text-blue-400 dark:text-blue-400" size={32} />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Esports Overlay
            </h1>
          </header>

          <div className="flex items-center space-x-4 flex-wrap max-md:flex-col max-md:items-start max-md:space-x-0 max-md:space-y-2 max-md:w-full max-md:grid grid-cols-2 gap-4">
            <Link
              to="/config"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/config')
                  ? 'bg-blue-800 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-800 hover:text-white dark:hover:bg-purple-800'
              }`}
              aria-current={isActive('/config') ? 'page' : undefined}
            >
              <Settings size={20} />
              <strong className="font-medium">{t('nav.config')}</strong>
            </Link>

            <Link
              to="/preview"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/preview')
                  ? 'bg-blue-800 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-900 hover:text-white dark:hover:bg-purple-900'
              }`}
              aria-current={isActive('/preview') ? 'page' : undefined}
            >
              <Eye size={20} />
              <strong className="font-medium">{t('nav.preview')}</strong>
            </Link>

            <DarkModeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;