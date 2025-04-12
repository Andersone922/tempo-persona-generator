
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw, Wand2, Globe, User, Camera, BookOpen, Database, FileText } from 'lucide-react';
import { Identity, generateIdentity } from '@/lib/identity-generator';
import { addToHistory } from '@/lib/storage-service';
import PhotoUploader from './PhotoUploader';
import { useToast } from '@/components/ui/use-toast';

interface IdentityGeneratorFormProps {
  onIdentityGenerated: (identity: Identity) => void;
}

const availableCountries = ["France", "USA", "Japan", "Germany", "Brazil"];

const IdentityGeneratorForm: React.FC<IdentityGeneratorFormProps> = ({ onIdentityGenerated }) => {
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [country, setCountry] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [includeAdvancedDetails, setIncludeAdvancedDetails] = useState<boolean>(true);
  const [customBiography, setCustomBiography] = useState<string>("");
  const { toast } = useToast();

  const handleGenerateIdentity = () => {
    setIsGenerating(true);
    
    // Simulate a short delay to show the loading state
    setTimeout(() => {
      try {
        // Generate the identity based on selected parameters
        const identity = generateIdentity(
          gender || undefined,
          nationality || undefined,
          country || undefined
        );
        
        // Apply the uploaded photo if available
        if (uploadedPhoto) {
          identity.profileImage = uploadedPhoto;
        }
        
        // Apply custom biography if provided
        if (customBiography.trim()) {
          identity.biography = customBiography.trim();
        }
        
        // Remove advanced details if not needed
        if (!includeAdvancedDetails) {
          delete identity.bloodType;
          delete identity.height;
          delete identity.weight;
          delete identity.occupation;
          delete identity.education;
          delete identity.languages;
          delete identity.personalityTraits;
          delete identity.creditCardInfo;
          delete identity.socialMedia;
          delete identity.biography;
          delete identity.signatures;
          delete identity.fingerprint;
          delete identity.facialBiometrics;
          if (identity.address && identity.address.coordinates) {
            delete identity.address.coordinates;
          }
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
    setCountry("");
    setUploadedPhoto(null);
    setCustomBiography("");
    setIncludeAdvancedDetails(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Générateur d'identité avancé</CardTitle>
        <CardDescription>
          Créez des identités 100x plus puissantes et réalistes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="basic">
              <User size={16} className="mr-1" />
              Base
            </TabsTrigger>
            <TabsTrigger value="photo">
              <Camera size={16} className="mr-1" />
              Photo
            </TabsTrigger>
            <TabsTrigger value="origin">
              <Globe size={16} className="mr-1" />
              Origine
            </TabsTrigger>
            <TabsTrigger value="details">
              <Database size={16} className="mr-1" />
              Détails
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
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

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="advancedDetails" 
                checked={includeAdvancedDetails}
                onCheckedChange={(checked) => setIncludeAdvancedDetails(checked as boolean)}
              />
              <Label htmlFor="advancedDetails" className="text-sm font-medium leading-none cursor-pointer">
                Inclure les détails avancés (biométrie, traits de personnalité, etc.)
              </Label>
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
          
          <TabsContent value="origin" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Pays de résidence</Label>
              <Select 
                value={country} 
                onValueChange={setCountry}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Sélectionner un pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Aléatoire</SelectItem>
                  {availableCountries.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
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
                  <SelectItem value="Américaine">Américaine</SelectItem>
                  <SelectItem value="Japonaise">Japonaise</SelectItem>
                  <SelectItem value="Allemande">Allemande</SelectItem>
                  <SelectItem value="Brésilienne">Brésilienne</SelectItem>
                  <SelectItem value="Belge">Belge</SelectItem>
                  <SelectItem value="Suisse">Suisse</SelectItem>
                  <SelectItem value="Canadienne">Canadienne</SelectItem>
                  <SelectItem value="Espagnole">Espagnole</SelectItem>
                  <SelectItem value="Italienne">Italienne</SelectItem>
                  <SelectItem value="Portugaise">Portugaise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Biographie personnalisée (optionnel)</Label>
              <Textarea 
                id="bio" 
                placeholder="Laissez vide pour générer automatiquement"
                value={customBiography}
                onChange={(e) => setCustomBiography(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Si vous laissez ce champ vide, une biographie sera générée automatiquement
              </p>
            </div>
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
