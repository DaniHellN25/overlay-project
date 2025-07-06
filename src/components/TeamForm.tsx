import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Image } from 'lucide-react';
import { TeamConfig } from '../types';
import ColorPicker from './ColorPicker';

interface TeamFormProps {
  team: TeamConfig;
  onUpdate: (updates: Partial<TeamConfig>) => void;
  teamNumber: 1 | 2;
}

const TeamForm: React.FC<TeamFormProps> = ({ team, onUpdate, teamNumber }) => {
  const { t } = useTranslation();

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 border dark:border-gray-700 transition-colors duration-200">
      <header className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Users className="text-blue-600 dark:text-blue-400" size={24} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {t(`team.team${teamNumber}`)}
        </h3>
      </header>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <fieldset className="space-y-4">
          <div>
            <label htmlFor={`team${teamNumber}-name`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('team.name')}
            </label>
            <input
              id={`team${teamNumber}-name`}
              type="text"
              value={team.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={`Team ${teamNumber}`}
              aria-label={`${t('a11y.nameInput')} ${t(`team.team${teamNumber}`)}`}
            />
          </div>

          <div>
            <label htmlFor={`team${teamNumber}-logo`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Image size={16} />
              {t('team.logo')}
            </label>
            <input
              id={`team${teamNumber}-logo`}
              type="url"
              value={team.logo}
              onChange={(e) => onUpdate({ logo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://example.com/logo.png"
              aria-label={`${t('a11y.logoInput')} ${t(`team.team${teamNumber}`)}`}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <ColorPicker
            label={t('team.primaryColor')}
            value={team.primaryColor}
            onChange={(color) => onUpdate({ primaryColor: color })}
            ariaLabel={`${t('a11y.colorInput')} ${t('team.primaryColor')} ${t(`team.team${teamNumber}`)}`}
          />

          <ColorPicker
            label={t('team.secondaryColor')}
            value={team.secondaryColor}
            onChange={(color) => onUpdate({ secondaryColor: color })}
            ariaLabel={`${t('a11y.colorInput')} ${t('team.secondaryColor')} ${t(`team.team${teamNumber}`)}`}
          />
        </fieldset>
      </form>

      {team.logo && (
        <aside className="mt-4">
          <figure className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border dark:border-gray-600 transition-colors duration-200">
            <img
              src={team.logo}
              alt={`${team.name} logo`}
              className="w-16 h-16 object-contain mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <figcaption className="sr-only">
              Logo preview for {team.name}
            </figcaption>
          </figure>
        </aside>
      )}
    </article>
  );
};

export default TeamForm;