
import React, { useState } from 'react';
import { Identity } from '@/lib/identity-generator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, Star, Copy, QrCode, Share, StarOff, CheckCheck 
} from 'lucide-react';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/lib/storage-service';
import { generateIdentityPDF } from '@/lib/pdf-generator';
import { generateIdentityQRCode } from '@/lib/qr-generator';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface IdentityCardProps {
  identity: Identity;
  onFavoriteToggle?: () => void;
}

const IdentityCard: React.FC<IdentityCardProps> = ({ 
  identity,
  onFavoriteToggle
}) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite(identity.id));
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [copying, setCopying] = useState<boolean>(false);
  const { toast } = useToast();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(identity.id);
      toast({
        title: "Retiré des favoris",
        description: `${identity.firstName} ${identity.lastName} a été retiré des favoris`,
      });
    } else {
      addToFavorites(identity);
      toast({
        title: "Ajouté aux favoris",
        description: `${identity.firstName} ${identity.lastName} a été ajouté aux favoris`,
      });
    }
    setFavorite(!favorite);
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfDataUrl = await generateIdentityPDF(identity);
      
      // Create an anchor element and set the attributes
      const link = document.createElement('a');
      link.href = pdfDataUrl;
      link.download = `${identity.lastName}_${identity.firstName}_ID.pdf`;
      
      // Simulate click to trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "PDF téléchargé",
        description: "L'identité a été exportée en PDF avec succès",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      setCopying(true);
      const text = `
Nom: ${identity.firstName} ${identity.lastName}
Genre: ${identity.gender === 'male' ? 'Homme' : identity.gender === 'female' ? 'Femme' : 'Autre'}
Date de naissance: ${new Date(identity.birthDate).toLocaleDateString()}
Email: ${identity.email}
Téléphone: ${identity.phone}
Adresse: ${identity.address.street}, ${identity.address.zipCode} ${identity.address.city}, ${identity.address.country}
Nationalité: ${identity.nationality}
ID: ${identity.idNumber}
      `;
      
      await navigator.clipboard.writeText(text);
      
      toast({
        title: "Copié",
        description: "Les informations d'identité ont été copiées dans le presse-papiers",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier les informations",
        variant: "destructive",
      });
    } finally {
      setCopying(false);
    }
  };

  const handleGenerateQRCode = async () => {
    if (!qrCode) {
      try {
        const dataUrl = await generateIdentityQRCode(identity);
        setQrCode(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast({
          title: "Erreur",
          description: "Impossible de générer le QR code",
          variant: "destructive",
        });
      }
    }
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <Card className="w-full identity-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={identity.profileImage || ""} alt={`${identity.firstName} ${identity.lastName}`} />
              <AvatarFallback>{getInitials(identity.firstName, identity.lastName)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{identity.firstName} {identity.lastName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {calculateAge(identity.birthDate)} ans • {identity.nationality}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="ml-auto">
            {identity.gender === 'male' ? 'Homme' : identity.gender === 'female' ? 'Femme' : 'Autre'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-[1fr_2fr] gap-1">
            <span className="text-muted-foreground">ID:</span>
            <span className="font-mono text-xs">{identity.idNumber}</span>
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-1">
            <span className="text-muted-foreground">Email:</span>
            <span className="text-xs truncate">{identity.email}</span>
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-1">
            <span className="text-muted-foreground">Téléphone:</span>
            <span>{identity.phone}</span>
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-1">
            <span className="text-muted-foreground">Adresse:</span>
            <div className="text-xs">
              <p>{identity.address.street}</p>
              <p>{identity.address.zipCode} {identity.address.city}</p>
              <p>{identity.address.country}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex flex-wrap gap-2 justify-between">
        <TooltipProvider>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleFavoriteToggle} 
                  className={favorite ? "text-yellow-500 border-yellow-200 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-600" : ""}
                >
                  {favorite ? <StarOff size={16} /> : <Star size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopyToClipboard}
                >
                  {copying ? <CheckCheck size={16} /> : <Copy size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Copier les informations
              </TooltipContent>
            </Tooltip>
            
            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleGenerateQRCode}
                    >
                      <QrCode size={16} />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  Générer un QR code
                </TooltipContent>
              </Tooltip>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>QR Code d'identité</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center py-4">
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code d'identité" className="max-w-full h-auto" />
                  ) : (
                    <div className="h-[200px] w-[200px] bg-muted flex items-center justify-center">
                      Génération du QR code...
                    </div>
                  )}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Scannez ce QR code pour accéder aux informations d'identité.
                </p>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="sm" onClick={handleDownloadPDF}>
                  <Download size={16} className="mr-1" />
                  PDF
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Télécharger en PDF
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default IdentityCard;
