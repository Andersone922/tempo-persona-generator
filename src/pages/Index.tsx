
import React, { useState, useEffect } from "react";
import MainNavigation from "@/components/navigation/MainNavigation";
import IdentityGeneratorForm from "@/components/identity/IdentityGeneratorForm";
import IdentityCard from "@/components/identity/IdentityCard";
import { Identity, getRandomIdentities } from "@/lib/identity-generator";
import { getHistory } from "@/lib/storage-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Heart } from "lucide-react";

const Index = () => {
  const [currentIdentity, setCurrentIdentity] = useState<Identity | null>(null);
  const [historyItems, setHistoryItems] = useState<Identity[]>([]);
  
  useEffect(() => {
    // Load history from localStorage
    const history = getHistory();
    setHistoryItems(history);
    
    // Set a default identity if none exists
    if (!currentIdentity && history.length === 0) {
      const randomIdentities = getRandomIdentities(1);
      if (randomIdentities.length > 0) {
        setCurrentIdentity(randomIdentities[0]);
      }
    } else if (history.length > 0 && !currentIdentity) {
      setCurrentIdentity(history[0]);
    }
  }, []);
  
  const handleIdentityGenerated = (identity: Identity) => {
    setCurrentIdentity(identity);
    // Update the history list
    setHistoryItems([identity, ...historyItems.filter(item => item.id !== identity.id)]);
  };
  
  const handleHistoryUpdate = () => {
    // Refresh history from storage
    const history = getHistory();
    setHistoryItems(history);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainNavigation />
      
      <main className="flex-grow container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Generator Form */}
          <div className="md:col-span-1 space-y-6">
            <IdentityGeneratorForm onIdentityGenerated={handleIdentityGenerated} />
          </div>
          
          {/* Right Column - Current Identity and History */}
          <div className="md:col-span-2 space-y-6">
            {/* Current Generated Identity */}
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Identité générée</h2>
              {currentIdentity ? (
                <IdentityCard 
                  identity={currentIdentity} 
                  onFavoriteToggle={handleHistoryUpdate}
                />
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-muted-foreground">
                    Aucune identité générée. Utilisez le formulaire pour en créer une.
                  </p>
                </div>
              )}
            </div>
            
            {/* History Tab */}
            <div>
              <Tabs defaultValue="history">
                <TabsList>
                  <TabsTrigger value="history" className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Historique récent
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="history">
                  {historyItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {historyItems.slice(0, 4).map((identity) => (
                        <IdentityCard 
                          key={identity.id} 
                          identity={identity} 
                          onFavoriteToggle={handleHistoryUpdate}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center mt-4">
                      <p className="text-muted-foreground">
                        Votre historique est vide.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
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

export default Index;
