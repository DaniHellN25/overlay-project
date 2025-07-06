import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { useOverlayStore } from '../store/useOverlayStore';

const LanguageToggle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { updateConfig } = useOverlayStore();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    updateConfig({ language: newLang as 'en' | 'es' });
    
    // Immediately update HTML lang attribute for screen readers
    document.documentElement.lang = newLang;
    
    // Announce the language change to screen readers
    const announcement = newLang === 'en' 
      ? 'Language changed to English' 
      : 'Idioma cambiado a español';
    
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
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={t('a11y.languageToggle')}
    >
      <Languages size={20} />
      <strong className="font-medium">
        {i18n.language === 'en' ? 'ES' : 'EN'}
      </strong>
    </button>
  );
};

export default LanguageToggle;