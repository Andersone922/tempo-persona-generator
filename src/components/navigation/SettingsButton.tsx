
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SettingsButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild
            className="text-muted-foreground hover:text-foreground hover:bg-accent/10"
          >
            <Link to="/settings">
              <Settings size={20} />
              <span className="sr-only">Paramètres</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Paramètres</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SettingsButton;
