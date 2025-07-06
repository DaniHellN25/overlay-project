import React from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  ariaLabel?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, ariaLabel }) => {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        <Palette size={16} />
        {label}
      </legend>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={ariaLabel}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="#000000"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </fieldset>
  );
};

export default ColorPicker;