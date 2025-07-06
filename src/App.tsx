import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useOverlayStore } from './store/useOverlayStore';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import ConfigPage from './pages/ConfigPage';
import PreviewPage from './pages/PreviewPage';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const { config, loadConfig } = useOverlayStore();

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    i18n.changeLanguage(config.language);
  }, [config.language, i18n]);

  // Fix screen reader language detection
  useEffect(() => {
    // Update the HTML lang attribute for screen readers
    document.documentElement.lang = config.language;
    
    // Also update the dir attribute for RTL languages if needed in the future
   // document.documentElement.dir = config.language === 'ar' ? 'rtl' : 'ltr';
  }, [config.language]);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation />
          <main>
            <Routes>
              <Route path="/config" element={<ConfigPage />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/" element={<Navigate to="/config" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;