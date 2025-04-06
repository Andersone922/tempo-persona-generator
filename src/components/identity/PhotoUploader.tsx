
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Camera, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PhotoUploaderProps {
  onPhotoSelect: (imageUrl: string) => void;
  currentPhoto?: string | null;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotoSelect, currentPhoto }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhoto || null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Format invalide",
        description: "Veuillez sélectionner une image (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximale autorisée est de 5 Mo",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onPhotoSelect(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onPhotoSelect('');
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <Card 
        className={`border-2 ${isDragging ? 'border-primary border-dashed bg-primary/5' : 'border-dashed'}`}
      >
        <CardContent className="p-0">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Photo de profil"
                className="w-full h-[200px] object-cover rounded"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={handleButtonClick}
                >
                  <Camera size={16} className="mr-1" />
                  Changer
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={handleClearImage}
                >
                  <X size={16} />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-1">
                <Check size={16} />
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-[200px] p-4 cursor-pointer"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleButtonClick}
            >
              <Upload size={32} className="text-muted-foreground mb-2" />
              <p className="text-sm text-center text-muted-foreground mb-1">
                Glissez-déposez une photo ou
              </p>
              <Button variant="secondary" size="sm">
                Parcourir
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                JPG, PNG • 5 Mo max
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoUploader;
