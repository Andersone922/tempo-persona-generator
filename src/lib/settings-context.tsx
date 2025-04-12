
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour les paramètres
type AppLanguage = "fr" | "en" | "es" | "de";
type ThemeMode = "light" | "dark" | "system";
type BackgroundType = "color" | "gradient" | "image";

interface AppSettings {
  language: AppLanguage;
  theme: ThemeMode;
  background: {
    type: BackgroundType;
    value: string;
  };
  preferences: {
    notifications: boolean;
    soundEffects: boolean;
  };
}

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

// Valeurs par défaut
const defaultSettings: AppSettings = {
  language: "fr",
  theme: "light",
  background: {
    type: "color",
    value: "#f8fafc",
  },
  preferences: {
    notifications: true,
    soundEffects: true,
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Charger les paramètres depuis le localStorage au démarrage
  useEffect(() => {
    const savedSettings = localStorage.getItem("app-settings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        applySettings(parsedSettings);
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres:", error);
      }
    } else {
      // Appliquer les paramètres par défaut
      applySettings(defaultSettings);
    }
  }, []);

  // Appliquer les paramètres visuels
  const applySettings = (settings: AppSettings) => {
    // Appliquer le thème
    document.documentElement.classList.remove("dark", "light");
    if (settings.theme === "system") {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.add(systemPreference);
    } else {
      document.documentElement.classList.add(settings.theme);
    }
    
    // Appliquer le fond d'écran
    document.body.style.backgroundImage = "none";
    
    if (settings.background.type === "image" && settings.background.value) {
      document.body.style.backgroundImage = `url(${settings.background.value})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } else if (settings.background.type === "color") {
      document.body.style.backgroundColor = settings.background.value;
    }
    // Pour les gradients, ils sont appliqués via des classes Tailwind
  };

  // Mettre à jour les paramètres
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = {
      ...settings,
      ...newSettings,
      // Fusionner les objets imbriqués si présents
      ...(newSettings.background ? { background: { ...settings.background, ...newSettings.background } } : {}),
      ...(newSettings.preferences ? { preferences: { ...settings.preferences, ...newSettings.preferences } } : {}),
    };
    
    setSettings(updatedSettings);
    localStorage.setItem("app-settings", JSON.stringify(updatedSettings));
    applySettings(updatedSettings);
  };

  // Réinitialiser les paramètres
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("app-settings", JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook personnalisé pour accéder aux paramètres
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings doit être utilisé à l'intérieur d'un SettingsProvider");
  }
  return context;
};
