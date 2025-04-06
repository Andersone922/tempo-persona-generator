
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MainNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">TempoIdentity</span>
        </div>
        
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center",
              isActive("/") ? "text-primary" : "text-muted-foreground"
            )}
          >
            <User className="mr-2 h-4 w-4" />
            Générateur
          </Link>
          <Link 
            to="/favorites" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center",
              isActive("/favorites") ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Star className="mr-2 h-4 w-4" />
            Favoris
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Paramètres
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
