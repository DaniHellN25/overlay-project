import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleToggle = () => {
    toggleDarkMode();
    
    // Announce the theme change to screen readers
    const announcement = isDarkMode 
      ? t('a11y.lightModeEnabled') 
      : t('a11y.darkModeEnabled');
    
    // Create a temporary announcement element
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    
    document.body.appendChild(announcer);
    
    // Remove the announcer after screen readers have processed it
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={isDarkMode ? t('a11y.switchToLightMode') : t('a11y.switchToDarkMode')}
    >
      {isDarkMode ? (
        <>
          <Sun size={20} />
          <strong className="font-medium">{t('theme.light')}</strong>
        </>
      ) : (
        <>
          <Moon size={20} />
          <strong className="font-medium">{t('theme.dark')}</strong>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;