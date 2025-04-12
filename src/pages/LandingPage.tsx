
import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  User, 
  Star, 
  Settings, 
  ArrowRight, 
  PlayCircle, 
  UserCheck,
  Download,
  Star as StarIcon,
  Settings as SettingsIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-primary/5">
      {/* Header/Navigation */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">TempoIdentity</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
              Démo
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/generator">
                Essayer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Générez des <span className="text-primary">identités temporaires</span> en quelques clics
              </h1>
              <p className="text-lg text-muted-foreground">
                TempoIdentity vous permet de créer facilement des identités fictives pour vos tests, démos et prototypes.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Button asChild size="lg" className="font-semibold">
                  <Link to="/generator">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#demo" className="font-semibold">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Voir la démo
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border shadow-xl">
              <video 
                className="w-full h-auto" 
                autoPlay 
                loop 
                muted 
                playsInline
                poster="/placeholder.svg"
              >
                <source src="https://static.videezy.com/system/resources/previews/000/023/251/original/digital-identity.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités principales</h2>
            <p className="text-lg text-muted-foreground">
              Découvrez comment TempoIdentity peut vous aider à générer et gérer des identités temporaires.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <UserCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Génération d'identités</CardTitle>
                <CardDescription>
                  Créez des identités complètes en un clic avec photos, noms, adresses et informations détaillées.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md overflow-hidden bg-muted mb-4">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster="/placeholder.svg"
                  >
                    <source src="https://static.videezy.com/system/resources/previews/000/038/656/original/alb_6_04.mp4" type="video/mp4" />
                  </video>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/generator">
                    Essayer maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Feature 2 */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <StarIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Favoris et historique</CardTitle>
                <CardDescription>
                  Sauvegardez vos identités préférées et accédez facilement à votre historique de génération.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md overflow-hidden bg-muted mb-4">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster="/placeholder.svg"
                  >
                    <source src="https://static.videezy.com/system/resources/previews/000/051/510/original/Save_Profile_Info.mp4" type="video/mp4" />
                  </video>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/favorites">
                    Voir les favoris
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Feature 3 */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <SettingsIcon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Personnalisation</CardTitle>
                <CardDescription>
                  Adaptez l'application à vos besoins avec des paramètres personnalisables et des thèmes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md overflow-hidden bg-muted mb-4">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster="/placeholder.svg"
                  >
                    <source src="https://static.videezy.com/system/resources/previews/000/038/668/original/alb_6_16.mp4" type="video/mp4" />
                  </video>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/settings">
                    Paramètres
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Demo Video Section */}
      <section id="demo" className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Démonstration vidéo</h2>
            <p className="text-lg text-muted-foreground">
              Voyez TempoIdentity en action et découvrez comment l'utiliser efficacement.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border shadow-xl">
            <video 
              className="w-full h-auto" 
              controls
              poster="/placeholder.svg"
            >
              <source src="https://static.videezy.com/system/resources/previews/000/005/529/original/Hud_2.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-lg text-muted-foreground">
              Découvrez pourquoi les développeurs et les designers adorent TempoIdentity.
            </p>
          </div>
          
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">SM</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">Sophie Martin</CardTitle>
                        <CardDescription>Développeuse Web</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">
                      "Cet outil m'a fait gagner des heures lors du développement de mon interface de profil utilisateur. Plus besoin de créer manuellement des données de test !"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">TD</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">Thomas Dubois</CardTitle>
                        <CardDescription>Designer UX/UI</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">
                      "J'utilise TempoIdentity pour toutes mes maquettes et présentations. Les identités générées sont réalistes et donnent vie à mes designs."
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">LR</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">Léa Robert</CardTitle>
                        <CardDescription>Chef de projet</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">
                      "Un gain de temps considérable pour nos démos clients. L'interface est intuitive et les identités générées sont parfaitement crédibles."
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground">
              Tout ce que vous devez savoir sur TempoIdentity.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Les identités générées sont-elles utilisables légalement ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Non, les identités générées par TempoIdentity sont entièrement fictives et destinées uniquement à des fins de test, de démonstration ou de prototypage. L'utilisation de ces identités pour tromper, frauder ou se faire passer pour une autre personne est strictement interdite et illégale.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Puis-je personnaliser les identités générées ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Oui, TempoIdentity vous permet de personnaliser de nombreux aspects des identités générées, comme le genre, l'âge, la nationalité et d'autres caractéristiques. Vous pouvez également modifier manuellement les informations après la génération.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Les données sont-elles conservées en ligne ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Non, toutes les identités générées sont stockées localement dans votre navigateur. Aucune donnée n'est envoyée ou stockée sur nos serveurs, garantissant ainsi votre confidentialité.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Générez votre première identité temporaire en quelques secondes et découvrez tout le potentiel de TempoIdentity.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link to="/generator">
              Essayer maintenant gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">TempoIdentity</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Link to="/generator" className="text-sm text-muted-foreground hover:text-foreground">
                Générateur
              </Link>
              <Link to="/favorites" className="text-sm text-muted-foreground hover:text-foreground">
                Favoris
              </Link>
              <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground">
                Paramètres
              </Link>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 TempoIdentity • Les données générées sont fictives et ne doivent pas être utilisées à des fins illégales</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
