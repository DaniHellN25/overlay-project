import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { useOverlayStore } from '../store/useOverlayStore';
import OverlayPreview from '../components/OverlayPreview';

const PreviewPage: React.FC = () => {
  const { t } = useTranslation();
  const { config, matchData } = useOverlayStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b dark:bg-gray-800" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Eye className="text-blue-600" size={32} />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('preview.title')}
              </h1>
            </div>
            <nav>
              <Link
                to="/config"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ArrowLeft size={20} />
                <strong>{t('actions.backToConfig')}</strong>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="p-8 dark:bg-gray-900 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <OverlayPreview config={config} matchData={matchData} isFullscreen={true} />
          </article>
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;