
import React, { useState, useEffect } from "react";
import MainNavigation from "@/components/navigation/MainNavigation";
import IdentityCard from "@/components/identity/IdentityCard";
import { Identity } from "@/lib/identity-generator";
import { getFavorites } from "@/lib/storage-service";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Identity[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  }, []);
  
  const handleFavoriteToggle = () => {
    // Refresh favorites from storage
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  };

  const goToGenerator = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainNavigation />
      
      <main className="flex-grow container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Star className="mr-2 text-yellow-500" size={24} />
            Identités favorites
          </h1>
        </div>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((identity) => (
              <IdentityCard 
                key={identity.id} 
                identity={identity} 
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-white shadow-sm">
            <Star className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h2 className="text-xl font-medium mb-2">Aucun favori</h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore ajouté d'identités à vos favoris
            </p>
            <Button onClick={goToGenerator}>
              Générer une identité
            </Button>
          </div>
        )}
      </main>
      
      <footer className="mt-auto py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Générateur d'identités temporaires • Les données générées sont fictives et ne doivent pas être utilisées à des fins illégales</p>
        </div>
      </footer>
    </div>
  );
};

export default Favorites;
