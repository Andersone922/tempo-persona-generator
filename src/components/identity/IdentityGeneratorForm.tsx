
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Wand2 } from 'lucide-react';
import { Identity, generateIdentity } from '@/lib/identity-generator';
import { addToHistory } from '@/lib/storage-service';
import PhotoUploader from './PhotoUploader';
import { useToast } from '@/components/ui/use-toast';

interface IdentityGeneratorFormProps {
  onIdentityGenerated: (identity: Identity) => void;
}

const IdentityGeneratorForm: React.FC<IdentityGeneratorFormProps> = ({ onIdentityGenerated }) => {
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [nationality, setNationality] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateIdentity = () => {
    setIsGenerating(true);
    
    // Simulate a short delay to show the loading state
    setTimeout(() => {
      try {
        // Generate the identity based on selected parameters
        const identity = generateIdentity(
          gender || undefined,
          nationality || undefined
        );
        
        // Apply the uploaded photo if available
        if (uploadedPhoto) {
          identity.profileImage = uploadedPhoto;
        }
        
        // Save to history
        addToHistory(identity);
        
        // Notify parent component
        onIdentityGenerated(identity);
        
        toast({
          title: "Identité générée",
          description: `Une nouvelle identité a été créée pour ${identity.firstName} ${identity.lastName}`,
        });
      } catch (error) {
        console.error('Error generating identity:', error);
        toast({
          title: "Erreur",
          description: "Impossible de générer l'identité",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }, 800);
  };

  const handlePhotoSelect = (imageUrl: string) => {
    setUploadedPhoto(imageUrl || null);
  };

  const resetForm = () => {
    setGender("");
    setNationality("");
    setUploadedPhoto(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Générateur d'identité temporaire</CardTitle>
        <CardDescription>
          Configurez les paramètres ou générez une identité aléatoire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="basic">Paramètres de base</TabsTrigger>
            <TabsTrigger value="photo">Photo de profil</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Genre</Label>
                <Select 
                  value={gender} 
                  onValueChange={(value) => setGender(value as "male" | "female" | "other" | "")}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Sélectionner un genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Aléatoire</SelectItem>
                    <SelectItem value="male">Homme</SelectItem>
                    <SelectItem value="female">Femme</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationalité</Label>
                <Select 
                  value={nationality} 
                  onValueChange={setNationality}
                >
                  <SelectTrigger id="nationality">
                    <SelectValue placeholder="Sélectionner une nationalité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Aléatoire</SelectItem>
                    <SelectItem value="Française">Française</SelectItem>
                    <SelectItem value="Belge">Belge</SelectItem>
                    <SelectItem value="Suisse">Suisse</SelectItem>
                    <SelectItem value="Canadienne">Canadienne</SelectItem>
                    <SelectItem value="Allemande">Allemande</SelectItem>
                    <SelectItem value="Espagnole">Espagnole</SelectItem>
                    <SelectItem value="Italienne">Italienne</SelectItem>
                    <SelectItem value="Portugaise">Portugaise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="photo">
            <PhotoUploader 
              onPhotoSelect={handlePhotoSelect}
              currentPhoto={uploadedPhoto}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Sélectionnez une photo de profil ou laissez vide pour une photo aléatoire
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={resetForm}
          disabled={isGenerating}
        >
          <RefreshCw size={16} className="mr-2" />
          Réinitialiser
        </Button>
        <Button 
          onClick={handleGenerateIdentity}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Wand2 size={16} className="mr-2" />
              Générer une identité
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IdentityGeneratorForm;
