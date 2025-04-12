
import React, { useState, useEffect } from "react";
import MainNavigation from "@/components/navigation/MainNavigation";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Moon, Palette, Image, Monitor } from "lucide-react";

// Types pour les paramètres
type AppLanguage = "fr" | "en" | "es" | "de";
type ThemeMode = "light" | "dark" | "system";
type BackgroundType = "color" | "gradient" | "image";

// Options pour les langues
const languageOptions = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
];

// Options de thème
const themeOptions = [
  { value: "light", label: "Clair", icon: <Monitor className="mr-2 h-4 w-4" /> },
  { value: "dark", label: "Sombre", icon: <Moon className="mr-2 h-4 w-4" /> },
  { value: "system", label: "Système", icon: <Monitor className="mr-2 h-4 w-4" /> }
];

// Options de fond d'écran
const backgroundOptions = [
  { 
    value: "color", 
    label: "Couleur unie",
    colors: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#94a3b8", "#334155", "#0f172a"]
  },
  { 
    value: "gradient", 
    label: "Dégradé",
    gradients: [
      "bg-gradient-to-r from-primary-100 to-secondary-100",
      "bg-gradient-to-r from-primary-200 to-secondary-200",
      "bg-gradient-to-br from-accent-100 to-primary-200",
      "bg-gradient-to-br from-primary/10 to-secondary/10",
      "bg-gradient-to-br from-accent/10 to-primary/10"
    ]
  },
  { 
    value: "image", 
    label: "Image",
    presets: ["nature", "abstract", "geometric", "custom"]
  }
];

const Settings = () => {
  // États pour les différents paramètres
  const [language, setLanguage] = useState<AppLanguage>("fr");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("color");
  const [backgroundColor, setBackgroundColor] = useState("#f8fafc");
  const [backgroundGradient, setBackgroundGradient] = useState("bg-gradient-to-br from-primary/10 to-secondary/10");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState("");
  
  const { toast } = useToast();

  // Fonction pour sauvegarder les paramètres dans le stockage local
  const saveSettings = () => {
    const settings = {
      language,
      theme,
      background: {
        type: backgroundType,
        value: backgroundType === "color" 
          ? backgroundColor 
          : backgroundType === "gradient" 
            ? backgroundGradient 
            : backgroundImage
      },
      preferences: {
        notifications,
        soundEffects
      }
    };
    
    localStorage.setItem("app-settings", JSON.stringify(settings));
    
    // Appliquer les paramètres immédiatement
    applySettings(settings);
    
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
  };
  
  // Fonction pour appliquer les paramètres
  const applySettings = (settings: any) => {
    // Appliquer le thème
    document.documentElement.classList.remove("dark", "light");
    if (settings.theme === "system") {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.add(systemPreference);
    } else {
      document.documentElement.classList.add(settings.theme);
    }
    
    // Appliquer le fond d'écran (pour simplifier, on utilise une classe CSS)
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
  
  // Charger les paramètres au démarrage
  useEffect(() => {
    const savedSettings = localStorage.getItem("app-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setLanguage(settings.language || "fr");
      setTheme(settings.theme || "light");
      
      if (settings.background) {
        setBackgroundType(settings.background.type || "color");
        
        if (settings.background.type === "color") {
          setBackgroundColor(settings.background.value || "#f8fafc");
        } else if (settings.background.type === "gradient") {
          setBackgroundGradient(settings.background.value || "bg-gradient-to-br from-primary/10 to-secondary/10");
        } else if (settings.background.type === "image") {
          setBackgroundImage(settings.background.value || "");
        }
      }
      
      if (settings.preferences) {
        setNotifications(settings.preferences.notifications !== undefined ? settings.preferences.notifications : true);
        setSoundEffects(settings.preferences.soundEffects !== undefined ? settings.preferences.soundEffects : true);
      }
      
      // Appliquer les paramètres
      applySettings(settings);
    }
  }, []);
  
  const handleCustomBackground = () => {
    if (customBackgroundUrl) {
      setBackgroundImage(customBackgroundUrl);
      toast({
        title: "Image de fond définie",
        description: "L'image personnalisée a été appliquée.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainNavigation />
      
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Paramètres de l'application</h1>
          
          <Tabs defaultValue="appearance" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette size={16} />
                <span>Apparence</span>
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2">
                <Globe size={16} />
                <span>Langue</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Moon size={16} />
                <span>Préférences</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Onglet Apparence */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thème</CardTitle>
                  <CardDescription>Choisissez le thème de l'application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {themeOptions.map(option => (
                      <Button
                        key={option.value}
                        variant={theme === option.value ? "default" : "outline"}
                        className={`flex flex-col items-center justify-center p-6 h-auto ${theme === option.value ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setTheme(option.value as ThemeMode)}
                      >
                        {option.icon}
                        <span className="mt-2">{option.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fond d'écran</CardTitle>
                  <CardDescription>Personnalisez l'arrière-plan de l'application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {backgroundOptions.map(option => (
                      <Button
                        key={option.value}
                        variant={backgroundType === option.value ? "default" : "outline"}
                        className={`flex flex-col items-center justify-center p-6 h-auto ${backgroundType === option.value ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setBackgroundType(option.value as BackgroundType)}
                      >
                        <Image size={20} className="mb-2" />
                        <span>{option.label}</span>
                      </Button>
                    ))}
                  </div>
                  
                  {/* Options spécifiques au type de fond choisi */}
                  {backgroundType === "color" && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Couleurs</h4>
                      <div className="grid grid-cols-6 gap-3">
                        {backgroundOptions[0].colors.map(color => (
                          <button
                            key={color}
                            className={`w-10 h-10 rounded-full ${backgroundColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setBackgroundColor(color)}
                            aria-label={`Couleur ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {backgroundType === "gradient" && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Dégradés</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {backgroundOptions[1].gradients.map(gradient => (
                          <button
                            key={gradient}
                            className={`h-16 rounded-lg ${gradient} ${backgroundGradient === gradient ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => setBackgroundGradient(gradient)}
                            aria-label={`Dégradé ${gradient}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {backgroundType === "image" && (
                    <div className="mt-6 space-y-4">
                      <h4 className="text-sm font-medium mb-3">Images préréglées</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          className="h-24 rounded-lg bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80')]"
                          onClick={() => setBackgroundImage("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")}
                        />
                        <button 
                          className="h-24 rounded-lg bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80')]"
                          onClick={() => setBackgroundImage("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")}
                        />
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-3">Image personnalisée</h4>
                        <div className="flex space-x-2">
                          <Input
                            type="url"
                            placeholder="URL de l'image..."
                            value={customBackgroundUrl}
                            onChange={(e) => setCustomBackgroundUrl(e.target.value)}
                          />
                          <Button onClick={handleCustomBackground}>Appliquer</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Onglet Langue */}
            <TabsContent value="language" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Langue</CardTitle>
                  <CardDescription>Choisissez la langue de l'interface</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={language} onValueChange={(value) => setLanguage(value as AppLanguage)}>
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Onglet Préférences */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences utilisateur</CardTitle>
                  <CardDescription>Ajustez vos préférences générales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notifications" className="flex flex-col space-y-1">
                      <span>Notifications</span>
                      <span className="font-normal text-sm text-muted-foreground">Recevoir des notifications de l'application</span>
                    </Label>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sound-effects" className="flex flex-col space-y-1">
                      <span>Effets sonores</span>
                      <span className="font-normal text-sm text-muted-foreground">Activer les sons lors des interactions</span>
                    </Label>
                    <Switch
                      id="sound-effects"
                      checked={soundEffects}
                      onCheckedChange={setSoundEffects}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end">
            <Button onClick={saveSettings}>Enregistrer les paramètres</Button>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Générateur d'identités temporaires • Les données générées sont fictives et ne doivent pas être utilisées à des fins illégales</p>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
