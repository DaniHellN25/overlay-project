# Live Overlay Configurator for Esports Broadcasts

A modern, responsive Single Page Application (SPA) built with React + TypeScript that allows users to customize live overlay elements for esports broadcasts.

## 🚀 Features

- **Real-time Configuration**: Configure team names, colors, logos, and positioning
- **Live Preview**: See changes instantly with smooth animations
- **Multi-language Support**: English and Spanish translations
- **Responsive Design**: Mobile-first approach with full tablet and desktop support
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Persistent Storage**: Configuration automatically saved to localStorage
- **Semantic HTML**: Proper HTML5 semantic elements throughout

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for SPA navigation
- **Zustand** for state management
- **React i18next** for internationalization
- **Tailwind CSS** for styling
- **Lucide React** for icons

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ColorPicker.tsx
│   ├── LanguageToggle.tsx
│   ├── Navigation.tsx
│   ├── OverlayPreview.tsx
│   └── TeamForm.tsx
├── pages/               # Route components
│   ├── ConfigPage.tsx
│   └── PreviewPage.tsx
├── store/               # State management
│   └── useOverlayStore.ts
├── types/               # TypeScript definitions
│   └── index.ts
├── i18n/               # Internationalization
│   └── index.ts
├── App.tsx
└── main.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎯 Usage

### Configuration Panel (`/config`)

- **General Settings**: Configure header text and overlay position
- **Team Settings**: Set up team names, logos, and brand colors
- **Live Preview**: See changes in real-time
- **Actions**: Save, reset, or preview your configuration

### Preview Page (`/preview`)

- **Full-screen Preview**: See how your overlay will look in a broadcast
- **Responsive Design**: Test on different screen sizes
- **Real-time Updates**: Changes from the config panel appear instantly

### Key Features

#### Multi-language Support
- Toggle between English and Spanish
- Persistent language preference
- Complete UI translation

#### Accessibility
- Screen reader compatible
- Keyboard navigation support
- High contrast colors
- Proper ARIA labels

#### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Fluid typography and spacing

## 🎨 Customization

### Adding New Languages

1. Update `src/i18n/index.ts` with new language resources
2. Add the language option to the language toggle component
3. Update the `OverlayConfig` type to include the new language

### Styling

The application uses Tailwind CSS for styling. Key design elements:

- **Color System**: Blue primary, with semantic colors for actions
- **Typography**: Responsive font sizes with proper hierarchy
- **Spacing**: Consistent 8px spacing system
- **Animations**: Smooth transitions and hover effects

### State Management

The application uses Zustand for state management with localStorage persistence:

```typescript
// Access the store
const { config, updateConfig, updateTeam } = useOverlayStore();

// Update general configuration
updateConfig({ headerText: 'New Header' });

// Update team-specific configuration
updateTeam('team1', { name: 'New Team Name' });
```

## 🔧 Configuration Schema

```typescript
interface OverlayConfig {
  headerText: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  teams: {
    team1: TeamConfig;
    team2: TeamConfig;
  };
  language: 'en' | 'es';
}

interface TeamConfig {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Accessibility guidelines from WCAG 2.1
