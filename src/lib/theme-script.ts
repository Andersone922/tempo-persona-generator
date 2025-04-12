
// Ce script détecte les préférences de thème système et applique le thème approprié
export const initializeThemeListener = () => {
  // Observer les changements de préférence de thème système
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const savedSettings = localStorage.getItem("app-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      
      // Si le thème est réglé sur "system", mettre à jour le thème selon la préférence du système
      if (settings.theme === "system") {
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(e.matches ? "dark" : "light");
      }
    }
  };
  
  // Vérifier initialement
  handleThemeChange(mediaQuery);
  
  // Écouter les changements
  mediaQuery.addEventListener('change', handleThemeChange);
  
  // Fonction de nettoyage pour le listener
  return () => {
    mediaQuery.removeEventListener('change', handleThemeChange);
  };
};
