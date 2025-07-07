import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.config': 'Configuration',
      'nav.preview': 'Preview',
      'nav.language': 'Language',
      
      // Theme
      'theme.dark': 'Dark',
      'theme.light': 'Light',
      
      // Configuration Panel
      'config.title': 'Overlay Configuration',
      'config.general': 'General Settings',
      'config.teams': 'Team Settings',
      'config.headerText': 'Header Text',
      'config.position': 'Position',
      'config.position.top': 'Top',
      'config.position.bottom': 'Bottom',
      'config.position.left': 'Left',
      'config.position.right': 'Right',
      'config.showGameData': 'Show Game Data',
      'config.showGameDataDescription': 'Display kills, scores, rounds, and timer in the overlay',
      
      // Data Source
      'dataSource.title': 'Data Source',
      'dataSource.selectSource': 'Select Data Source',
      'dataSource.mockData': 'Mock Data',
      'dataSource.realData': 'Real Data',
      'dataSource.mockDescription': 'Simulated game data for testing',
      'dataSource.realDescription': 'Live tournament data via API',
      'dataSource.connected': 'Connected to live data',
      'dataSource.connecting': 'Connecting...',
      'dataSource.error': 'Connection error',
      'dataSource.receivingUpdates': 'Receiving real-time updates',
      'dataSource.realDataInfo': 'Real Data Features',
      'dataSource.features.liveUpdates': 'Live match updates',
      'dataSource.features.realTimeStats': 'Real-time player statistics',
      'dataSource.features.automaticSync': 'Automatic data synchronization',
      'dataSource.features.tournamentData': 'Official tournament data',
      'dataSource.note': 'Note',
      'dataSource.demoNote': 'Currently using simulated real data for demonstration',
      'dataSource.productionSetup': 'Production Setup Guide',
      'dataSource.production.apiProviders': 'Supported API Providers',
      'dataSource.production.requirements': 'Setup Requirements',
      
      // Team Configuration
      'team.name': 'Team Name',
      'team.logo': 'Logo URL',
      'team.primaryColor': 'Primary Color',
      'team.secondaryColor': 'Secondary Color',
      'team.team1': 'Team 1',
      'team.team2': 'Team 2',
      
      // Game Data Controls
      'gameData.controls': 'Game Data Controls',
      'gameData.simulation': 'Simulation Controls',
      'gameData.start': 'Start',
      'gameData.pause': 'Pause',
      'gameData.stop': 'Stop',
      'gameData.reset': 'Reset',
      'gameData.gameMode': 'Game Mode',
      'gameData.selectGameMode': 'Select game mode',
      'gameData.manualControls': 'Manual Kill Controls',
      'gameData.currentStatus': 'Current Match Status',
      'gameData.round': 'Round',
      'gameData.timeRemaining': 'Time',
      'gameData.status': 'Status',
      'gameData.mode': 'Mode',
      
      // Game Modes
      'gameData.modes.elimination': 'Elimination',
      'gameData.modes.capture': 'Capture the Flag',
      'gameData.modes.deathmatch': 'Deathmatch',
      'gameData.modes.battleRoyale': 'Battle Royale',
      
      // Game Statuses
      'gameData.statuses.live': 'Live',
      'gameData.statuses.paused': 'Paused',
      'gameData.statuses.ended': 'Ended',
      
      // Actions
      'actions.save': 'Save Configuration',
      'actions.reset': 'Reset to Default',
      'actions.preview': 'Preview Overlay',
      'actions.backToConfig': 'Back to Configuration',
      
      // Preview
      'preview.title': 'Live Overlay Preview',
      'preview.fullscreen': 'Fullscreen Preview',
      
      // Accessibility
      'a11y.colorInput': 'Select color for',
      'a11y.logoInput': 'Enter logo URL for',
      'a11y.nameInput': 'Enter team name for',
      'a11y.headerInput': 'Enter header text for overlay',
      'a11y.positionSelect': 'Select overlay position',
      'a11y.languageToggle': 'Toggle language between English and Spanish',
      'a11y.switchToDarkMode': 'Switch to dark mode',
      'a11y.switchToLightMode': 'Switch to light mode',
      'a11y.darkModeEnabled': 'Dark mode enabled',
      'a11y.lightModeEnabled': 'Light mode enabled',
      //Alerts
      'alert.success': 'Configuration saved'
    },
  },
  es: {
    translation: {
      // Navigation
      'nav.config': 'Configuración',
      'nav.preview': 'Vista previa',
      'nav.language': 'Idioma',
      
      // Theme
      'theme.dark': 'Oscuro',
      'theme.light': 'Claro',
      
      // Configuration Panel
      'config.title': 'Configuración de Overlay',
      'config.general': 'Configuración General',
      'config.teams': 'Configuración de Equipos',
      'config.headerText': 'Texto del Encabezado',
      'config.position': 'Posición',
      'config.position.top': 'Arriba',
      'config.position.bottom': 'Abajo',
      'config.position.left': 'Izquierda',
      'config.position.right': 'Derecha',
      'config.showGameData': 'Mostrar Datos del Juego',
      'config.showGameDataDescription': 'Mostrar kills, puntuaciones, rondas y cronómetro en el overlay',
      
      // Data Source
      'dataSource.title': 'Fuente de Datos',
      'dataSource.selectSource': 'Seleccionar Fuente de Datos',
      'dataSource.mockData': 'Datos Simulados',
      'dataSource.realData': 'Datos Reales',
      'dataSource.mockDescription': 'Datos de juego simulados para pruebas',
      'dataSource.realDescription': 'Datos de torneo en vivo vía API',
      'dataSource.connected': 'Conectado a datos en vivo',
      'dataSource.connecting': 'Conectando...',
      'dataSource.error': 'Error de conexión',
      'dataSource.receivingUpdates': 'Recibiendo actualizaciones en tiempo real',
      'dataSource.realDataInfo': 'Características de Datos Reales',
      'dataSource.features.liveUpdates': 'Actualizaciones de partida en vivo',
      'dataSource.features.realTimeStats': 'Estadísticas de jugadores en tiempo real',
      'dataSource.features.automaticSync': 'Sincronización automática de datos',
      'dataSource.features.tournamentData': 'Datos oficiales de torneo',
      'dataSource.note': 'Nota',
      'dataSource.demoNote': 'Actualmente usando datos reales simulados para demostración',
      'dataSource.productionSetup': 'Guía de Configuración de Producción',
      'dataSource.production.apiProviders': 'Proveedores de API Soportados',
      'dataSource.production.requirements': 'Requisitos de Configuración',
      
      // Team Configuration
      'team.name': 'Nombre del Equipo',
      'team.logo': 'URL del Logo',
      'team.primaryColor': 'Color Primario',
      'team.secondaryColor': 'Color Secundario',
      'team.team1': 'Equipo 1',
      'team.team2': 'Equipo 2',
      
      // Game Data Controls
      'gameData.controls': 'Controles de Datos del Juego',
      'gameData.simulation': 'Controles de Simulación',
      'gameData.start': 'Iniciar',
      'gameData.pause': 'Pausar',
      'gameData.stop': 'Detener',
      'gameData.reset': 'Reiniciar',
      'gameData.gameMode': 'Modo de Juego',
      'gameData.selectGameMode': 'Seleccionar modo de juego',
      'gameData.manualControls': 'Controles Manuales de Kills',
      'gameData.currentStatus': 'Estado Actual del Partido',
      'gameData.round': 'Ronda',
      'gameData.timeRemaining': 'Tiempo',
      'gameData.status': 'Estado',
      'gameData.mode': 'Modo',
      
      // Game Modes
      'gameData.modes.elimination': 'Eliminación',
      'gameData.modes.capture': 'Capturar la Bandera',
      'gameData.modes.deathmatch': 'Combate a Muerte',
      'gameData.modes.battleRoyale': 'Guerra Campal',
      
      // Game Statuses
      'gameData.statuses.live': 'En Vivo',
      'gameData.statuses.paused': 'Pausado',
      'gameData.statuses.ended': 'Terminado',
      
      // Actions
      'actions.save': 'Guardar Configuración',
      'actions.reset': 'Restablecer por Defecto',
      'actions.preview': 'Vista Previa del Overlay',
      'actions.backToConfig': 'Volver a Configuración',
      
      // Preview
      'preview.title': 'Vista Previa del Overlay en Vivo',
      'preview.fullscreen': 'Vista Previa Completa',
      
      // Accessibility
      'a11y.colorInput': 'Seleccionar color para',
      'a11y.logoInput': 'Introducir URL del logo para',
      'a11y.nameInput': 'Introducir nombre del equipo para',
      'a11y.headerInput': 'Introducir texto del encabezado para el overlay',
      'a11y.positionSelect': 'Seleccionar posición del overlay',
      'a11y.languageToggle': 'Cambiar idioma entre inglés y español',
      'a11y.switchToDarkMode': 'Cambiar a modo oscuro',
      'a11y.switchToLightMode': 'Cambiar a modo claro',
      'a11y.darkModeEnabled': 'Modo oscuro activado',
      'a11y.lightModeEnabled': 'Modo claro activado',
            //Alerts
      'alert.success': 'Configuración guardada'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;