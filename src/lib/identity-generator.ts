
export interface Identity {
  id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  birthDate: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  nationality: string;
  idNumber: string;
  profileImage: string | null;
  createdAt: string;
  // Nouvelles propriétés avancées
  bloodType?: string;
  height?: number;
  weight?: number;
  occupation?: string;
  education?: string;
  languages?: string[];
  personalityTraits?: string[];
  creditCardInfo?: {
    number: string;
    expiryDate: string;
    cvv: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  biography?: string;
  signatures?: {
    image: string;
    vector: number[];
  };
  fingerprint?: string;
  facialBiometrics?: number[];
}

// Données internationales
const namesByCountry = {
  France: {
    male: [
      "Jean", "Pierre", "Michel", "Luc", "Thomas", "Nicolas", "David", "Julien", "Maxime", "Antoine",
      "Étienne", "Hugo", "Louis", "Benoit", "François", "Jacques", "Sébastien", "Marc", "Vincent", "Alexandre"
    ],
    female: [
      "Marie", "Sophie", "Isabelle", "Anne", "Julie", "Camille", "Claire", "Lucie", "Emma", "Sarah",
      "Laura", "Charlotte", "Manon", "Léa", "Élise", "Chloé", "Céline", "Émilie", "Audrey", "Mathilde"
    ],
    lastNames: [
      "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy", "Moreau",
      "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David", "Bertrand", "Roux", "Vincent", "Fournier"
    ]
  },
  USA: {
    male: [
      "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles",
      "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Andrew", "Paul", "Joshua"
    ],
    female: [
      "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
      "Lisa", "Nancy", "Betty", "Sandra", "Margaret", "Ashley", "Kimberly", "Emily", "Donna", "Michelle"
    ],
    lastNames: [
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
      "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
    ]
  },
  Japan: {
    male: [
      "Haruto", "Yuto", "Sota", "Yuki", "Hayato", "Haruki", "Ryusei", "Koki", "Sora", "Sosuke",
      "Riku", "Takumi", "Ren", "Hiroto", "Yuma", "Tatsuki", "Yamato", "Minato", "Kaito", "Yusei"
    ],
    female: [
      "Yui", "Aoi", "Yuna", "Hina", "Riko", "Ichika", "Rin", "Akari", "Yuna", "Saki",
      "Miyu", "Kokona", "Mei", "Yua", "Hana", "Rikka", "Mao", "Honoka", "Momoka", "Airi"
    ],
    lastNames: [
      "Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Kato",
      "Yoshida", "Yamada", "Sasaki", "Yamaguchi", "Matsumoto", "Inoue", "Kimura", "Hayashi", "Shimizu", "Saito"
    ]
  },
  Germany: {
    male: [
      "Lukas", "Leon", "Luca", "Maximilian", "Felix", "Jonas", "Paul", "Julian", "Tim", "Elias",
      "Finn", "Philipp", "David", "Jakob", "Noah", "Niklas", "Ben", "Max", "Moritz", "Emil"
    ],
    female: [
      "Sophia", "Emma", "Hannah", "Mia", "Anna", "Lea", "Emilia", "Marie", "Lina", "Lena",
      "Leonie", "Sophie", "Julia", "Laura", "Johanna", "Charlotte", "Maria", "Clara", "Sarah", "Amelie"
    ],
    lastNames: [
      "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann",
      "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann"
    ]
  },
  Brazil: {
    male: [
      "Miguel", "Arthur", "Bernardo", "Heitor", "Davi", "Lorenzo", "Théo", "Pedro", "Gabriel", "Enzo",
      "João", "Lucas", "Matheus", "Rafael", "Guilherme", "Gustavo", "Nicolas", "Samuel", "Henrique", "Felipe"
    ],
    female: [
      "Alice", "Sophia", "Helena", "Valentina", "Laura", "Isabella", "Manuela", "Julia", "Heloísa", "Luiza",
      "Maria", "Lorena", "Lívia", "Giovanna", "Maria", "Beatriz", "Cecília", "Ana", "Clara", "Carolina"
    ],
    lastNames: [
      "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
      "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa"
    ]
  }
};

// Traits de personnalité
const personalityTraits = {
  positive: [
    "Ambitieux", "Audacieux", "Charismatique", "Confiant", "Créatif", "Déterminé", "Discipliné", "Empathique", 
    "Énergique", "Enthousiaste", "Extraverti", "Généreux", "Honnête", "Humble", "Loyal", "Optimiste", "Patient", 
    "Persévérant", "Résilient", "Sociable"
  ],
  neutral: [
    "Analytique", "Calme", "Conventionnel", "Curieux", "Discret", "Flexible", "Indépendant", "Introspectif", 
    "Logique", "Méthodique", "Observateur", "Pragmatique", "Prudent", "Réfléchi", "Réservé", "Sceptique", 
    "Sérieux", "Spontané", "Stoïque", "Traditionnel"
  ],
  negative: [
    "Anxieux", "Arrogant", "Borné", "Cynique", "Défensif", "Distant", "Dominateur", "Exigeant", "Impulsif", 
    "Indécis", "Irritable", "Jaloux", "Manipulateur", "Obstiné", "Paranoïaque", "Perfectionniste", "Pessimiste", 
    "Possessif", "Rancunier", "Susceptible"
  ]
};

// Occupations
const occupations = [
  "Développeur logiciel", "Médecin", "Avocat", "Ingénieur", "Designer", "Enseignant", "Chef cuisinier", 
  "Entrepreneur", "Comptable", "Consultant", "Artiste", "Chercheur", "Photographe", "Architecte", "Pilote", 
  "Agent immobilier", "Journaliste", "Pharmacien", "Marketing digital", "Chauffeur"
];

// Éducation
const educationLevels = [
  "Baccalauréat", "Licence", "Master", "Doctorat", "Formation professionnelle", "BTS", "DUT", 
  "École d'ingénieur", "École de commerce", "Autodidacte"
];

// Langues
const languages = [
  "Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Chinois", "Japonais", 
  "Russe", "Arabe", "Hindi", "Néerlandais", "Grec", "Coréen", "Suédois", "Polonais"
];

// Groupes sanguins
const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Types de cartes
const creditCardTypes = [
  { name: "Visa", pattern: "4[0-9]{12}(?:[0-9]{3})?" },
  { name: "Mastercard", pattern: "5[1-5][0-9]{14}" },
  { name: "American Express", pattern: "3[47][0-9]{13}" }
];

// Domaines d'email
const domains = ["tempmail.com", "anonyme.fr", "idtemp.org", "mailtemp.fr", "fauxmail.com"];

// Images de profil (générées par IA ou placeholders)
const placeholderImages = [
  "/placeholder.svg",
  "https://source.unsplash.com/featured/?person",
  "https://source.unsplash.com/featured/?portrait",
  "https://source.unsplash.com/featured/?face",
  "https://source.unsplash.com/featured/?profile"
];

// Données d'adresse
const streetsByCountry = {
  France: ["Rue de la Paix", "Avenue des Champs-Élysées", "Boulevard Saint-Michel", 
    "Rue de Rivoli", "Avenue Montaigne", "Boulevard Haussmann", "Rue Saint-Honoré", 
    "Avenue Victor Hugo", "Boulevard Voltaire", "Rue de Vaugirard"],
  USA: ["Main Street", "Broadway", "Park Avenue", "5th Avenue", "Washington Street",
    "Lincoln Avenue", "Jefferson Boulevard", "Oak Street", "Maple Avenue", "Sunset Boulevard"],
  Japan: ["Sakura Dori", "Ginza", "Aoyama Dori", "Omotesando", "Meiji Dori",
    "Takeshita Dori", "Nakamise Dori", "Harumi Dori", "Yanaka Ginza", "Chuo Dori"],
  Germany: ["Hauptstraße", "Berliner Straße", "Bahnhofstraße", "Schillerstraße", "Goethestraße",
    "Friedrichstraße", "Königstraße", "Marktplatz", "Kaiserstraße", "Lindenstraße"],
  Brazil: ["Avenida Paulista", "Rua Augusta", "Avenida Atlântica", "Rua Oscar Freire", "Avenida Copacabana",
    "Rua das Laranjeiras", "Avenida Faria Lima", "Rua 25 de Março", "Avenida Brasil", "Rua da Consolação"]
};

const citiesByCountry = {
  France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", 
    "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Toulon", "Grenoble"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego",
    "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte"],
  Japan: ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto",
    "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Kitakyushu", "Chiba", "Sakai"],
  Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund",
    "Essen", "Leipzig", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus",
    "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos", "Campinas", "São Luís"]
};

const zipCodePatternsByCountry = {
  France: "#####", // 75001
  USA: "#####", // 90210
  Japan: "###-####", // 100-0001
  Germany: "#####", // 10115
  Brazil: "#####-###" // 01000-000
};

// Utility functions
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const generatePatternedString = (pattern: string): string => {
  return pattern.replace(/#/g, () => getRandomNumber(0, 9).toString());
};

const generateEmail = (firstName: string, lastName: string): string => {
  const normalizedFirstName = firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const normalizedLastName = lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const formats = [
    `${normalizedFirstName}.${normalizedLastName}`,
    `${normalizedFirstName}${getRandomNumber(1, 99)}`,
    `${normalizedFirstName[0]}${normalizedLastName}`,
    `${normalizedLastName}.${normalizedFirstName[0]}`,
    `${normalizedFirstName}${normalizedLastName}${getRandomNumber(1, 99)}`
  ];
  
  return `${getRandomElement(formats)}@${getRandomElement(domains)}`;
};

const generatePhoneNumber = (country: string): string => {
  switch(country) {
    case "France":
      return `+33 ${getRandomNumber(6, 7)}${Array.from({ length: 8 }, () => getRandomNumber(0, 9)).join('')}`;
    case "USA":
      return `+1 ${getRandomNumber(2, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}`;
    case "Japan":
      return `+81 ${getRandomNumber(3, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}`;
    case "Germany":
      return `+49 ${getRandomNumber(1, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}`;
    case "Brazil":
      return `+55 ${getRandomNumber(1, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}`;
    default:
      return `+33 ${getRandomNumber(6, 7)}${Array.from({ length: 8 }, () => getRandomNumber(0, 9)).join('')}`;
  }
};

const generateIdNumber = (country: string): string => {
  switch(country) {
    case "France":
      // Format simplifié du numéro de sécu français
      return Array.from({ length: 15 }, () => getRandomNumber(0, 9)).join('');
    case "USA":
      // Format simplifié du SSN américain
      return `${getRandomNumber(1, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}`;
    case "Japan":
      // Format simplifié My Number
      return Array.from({ length: 12 }, () => getRandomNumber(0, 9)).join('');
    case "Germany":
      // Format simplifié Personalausweisnummer
      return `${String.fromCharCode(65 + getRandomNumber(0, 25))}${Array.from({ length: 9 }, () => getRandomNumber(0, 9)).join('')}`;
    case "Brazil":
      // Format simplifié CPF
      return `${Array.from({ length: 9 }, () => getRandomNumber(0, 9)).join('')}-${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}`;
    default:
      return Array.from({ length: 12 }, () => getRandomNumber(0, 9)).join('');
  }
};

const generateCreditCardInfo = (): { number: string; expiryDate: string; cvv: string } => {
  const cardType = getRandomElement(creditCardTypes);
  // Génération simplifiée - pas de vérification Luhn
  const number = generatePatternedString(cardType.pattern);
  
  // Date d'expiration: entre 1 et 5 ans dans le futur
  const today = new Date();
  const expiryYear = today.getFullYear() + getRandomNumber(1, 5);
  const expiryMonth = getRandomNumber(1, 12);
  
  return {
    number: number,
    expiryDate: `${expiryMonth.toString().padStart(2, '0')}/${expiryYear}`,
    cvv: generatePatternedString("###"),
  };
};

const generateRandomTraits = (count: number): string[] => {
  const allTraits = [
    ...personalityTraits.positive,
    ...personalityTraits.neutral,
    ...(Math.random() > 0.7 ? personalityTraits.negative : []) // 30% de chance d'avoir des traits négatifs
  ];
  
  // Mélanger l'array
  const shuffled = [...allTraits].sort(() => 0.5 - Math.random());
  
  // Récupérer le nombre demandé de traits
  return shuffled.slice(0, count);
};

const generateBiography = (identity: Partial<Identity>): string => {
  if (!identity.firstName || !identity.occupation || !identity.nationality) {
    return "Biographie non disponible";
  }
  
  const bioTemplates = [
    `${identity.firstName} est un(e) ${identity.occupation} ${identity.nationality.toLowerCase()}. Né(e) le ${identity.birthDate}, il/elle a étudié ${identity.education} avant de commencer sa carrière. ${identity.personalityTraits?.slice(0, 2).join(" et ")} sont ses principales qualités.`,
    
    `Originaire de ${identity.address?.city}, ${identity.firstName} a développé une passion pour son métier de ${identity.occupation}. Avec son tempérament ${identity.personalityTraits?.[0].toLowerCase()}, il/elle excelle dans son domaine. Diplômé(e) en ${identity.education}, il/elle parle couramment ${identity.languages?.join(", ")}.`,
    
    `Expert(e) en tant que ${identity.occupation}, ${identity.firstName} est reconnu(e) pour son approche ${identity.personalityTraits?.[0].toLowerCase()}. Après avoir obtenu son diplôme en ${identity.education}, il/elle a construit une carrière solide. En dehors du travail, il/elle cultive sa passion pour les langues étrangères, maîtrisant ${identity.languages?.join(" et ")}.`
  ];
  
  return getRandomElement(bioTemplates);
};

// Génération de code d'empreinte digitale fictif
const generateFingerprint = (): string => {
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

// Génération de vecteurs biométriques faciaux fictifs
const generateFacialBiometrics = (): number[] => {
  return Array.from({ length: 128 }, () => Math.random() * 2 - 1); // Vecteurs entre -1 et 1
};

// Génération de coordonnées GPS cohérentes avec le pays
const generateCoordinates = (country: string): { latitude: number; longitude: number } => {
  // Plages approximatives de coordonnées par pays
  const coordRanges = {
    France: { lat: [42, 51], lng: [-4, 8] },
    USA: { lat: [24, 49], lng: [-125, -66] },
    Japan: { lat: [30, 46], lng: [129, 146] },
    Germany: { lat: [47, 55], lng: [5, 15] },
    Brazil: { lat: [-33, 5], lng: [-74, -34] }
  };
  
  const range = coordRanges[country as keyof typeof coordRanges] || coordRanges.France;
  
  return {
    latitude: range.lat[0] + Math.random() * (range.lat[1] - range.lat[0]),
    longitude: range.lng[0] + Math.random() * (range.lng[1] - range.lng[0])
  };
};

// Fonction principale pour générer une identité complète
export const generateIdentity = (gender?: "male" | "female" | "other", nationality?: string, country?: string): Identity => {
  // Déterminer le genre
  const randomGender = gender || (Math.random() > 0.5 ? "male" : "female");
  
  // Déterminer le pays
  const availableCountries = Object.keys(namesByCountry);
  const selectedCountry = country || nationality || getRandomElement(availableCountries);
  
  // Déterminer les données spécifiques au pays
  const countryData = namesByCountry[selectedCountry as keyof typeof namesByCountry] || namesByCountry.France;
  
  // Nom et prénom en fonction du pays et du genre
  const firstName = randomGender === "male" 
    ? getRandomElement(countryData.male) 
    : getRandomElement(countryData.female);
  const lastName = getRandomElement(countryData.lastNames);
  
  // Date de naissance (entre 18 et 65 ans)
  const today = new Date();
  const minBirthDate = new Date();
  minBirthDate.setFullYear(today.getFullYear() - 65);
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(today.getFullYear() - 18);
  const birthDate = getRandomDate(minBirthDate, maxBirthDate);
  
  // Sélection aléatoire des données d'adresse
  const countryStreets = streetsByCountry[selectedCountry as keyof typeof streetsByCountry] || streetsByCountry.France;
  const countryCities = citiesByCountry[selectedCountry as keyof typeof citiesByCountry] || citiesByCountry.France;
  const zipCodePattern = zipCodePatternsByCountry[selectedCountry as keyof typeof zipCodePatternsByCountry] || zipCodePatternsByCountry.France;
  
  // Génération des traits de personnalité (entre 3 et 5)
  const traitCount = getRandomNumber(3, 5);
  const traits = generateRandomTraits(traitCount);
  
  // Génération des langues parlées (entre 1 et 4)
  const languageCount = getRandomNumber(1, 4);
  const shuffledLanguages = [...languages].sort(() => 0.5 - Math.random());
  const spokenLanguages = shuffledLanguages.slice(0, languageCount);
  
  // Génération du métier et de l'éducation
  const occupation = getRandomElement(occupations);
  const education = getRandomElement(educationLevels);
  
  // Autres données aléatoires
  const bloodType = getRandomElement(bloodTypes);
  const height = getRandomNumber(150, 200);
  const weight = getRandomNumber(45, 120);
  
  // Crée l'identité
  const partialIdentity: Partial<Identity> = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    gender: randomGender,
    birthDate: formatDate(birthDate),
    email: generateEmail(firstName, lastName),
    phone: generatePhoneNumber(selectedCountry),
    address: {
      street: getRandomElement(countryStreets) + " " + getRandomNumber(1, 100),
      city: getRandomElement(countryCities),
      zipCode: generatePatternedString(zipCodePattern),
      country: selectedCountry,
      coordinates: generateCoordinates(selectedCountry)
    },
    nationality: nationality || selectedCountry,
    idNumber: generateIdNumber(selectedCountry),
    profileImage: getRandomElement(placeholderImages),
    createdAt: new Date().toISOString(),
    bloodType,
    height,
    weight,
    occupation,
    education,
    languages: spokenLanguages,
    personalityTraits: traits,
    creditCardInfo: generateCreditCardInfo(),
    socialMedia: {
      facebook: `https://facebook.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomNumber(1, 999)}`,
      twitter: `https://twitter.com/${firstName.toLowerCase()}${lastName.toLowerCase().substring(0, 2)}${getRandomNumber(1, 9999)}`,
      instagram: `https://instagram.com/${firstName.toLowerCase()}_${lastName.toLowerCase()}${getRandomNumber(1, 999)}`,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${getRandomNumber(10000, 99999)}`
    },
    fingerprint: generateFingerprint(),
    facialBiometrics: generateFacialBiometrics()
  };
  
  // Génère la biographie basée sur les autres données
  partialIdentity.biography = generateBiography(partialIdentity);
  
  // Génère une signature fictive (URL d'image et vecteur)
  partialIdentity.signatures = {
    image: "data:image/svg+xml;base64,..." + generateFingerprint().substring(0, 10),
    vector: Array.from({ length: 64 }, () => Math.random())
  };
  
  return partialIdentity as Identity;
};

export const getRandomIdentities = (count: number): Identity[] => {
  return Array.from({ length: count }, () => generateIdentity());
};
