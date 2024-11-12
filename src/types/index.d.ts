export interface SystemContext {
    theme: 'light' | 'dark';
    language: 'en' | 'es' | 'pt';
    toggleTheme: () => void;
    setLanguage: (language: 'en' | 'es' | 'pt') => void;
  }
  