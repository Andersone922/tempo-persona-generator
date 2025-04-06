
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
  };
  nationality: string;
  idNumber: string;
  profileImage: string | null;
  createdAt: string;
}

// Mock data
const maleFirstNames = [
  "Jean", "Pierre", "Michel", "Luc", "Thomas", "Nicolas", "David", "Julien", "Maxime", "Antoine",
  "Étienne", "Hugo", "Louis", "Benoit", "François", "Jacques", "Sébastien", "Marc", "Vincent", "Alexandre"
];

const femaleFirstNames = [
  "Marie", "Sophie", "Isabelle", "Anne", "Julie", "Camille", "Claire", "Lucie", "Emma", "Sarah",
  "Laura", "Charlotte", "Manon", "Léa", "Élise", "Chloé", "Céline", "Émilie", "Audrey", "Mathilde"
];

const lastNames = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy", "Moreau",
  "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David", "Bertrand", "Roux", "Vincent", "Fournier",
  "Morel", "Girard", "André", "Mercier", "Blanc", "Guerin", "Muller", "Faure", "Rousseau", "Henry"
];

const streets = [
  "Rue de la Paix", "Avenue des Champs-Élysées", "Boulevard Saint-Michel", 
  "Rue de Rivoli", "Avenue Montaigne", "Boulevard Haussmann", "Rue Saint-Honoré", 
  "Avenue Victor Hugo", "Boulevard Voltaire", "Rue de Vaugirard"
];

const cities = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", 
  "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Toulon", "Grenoble"
];

const zipCodes = [
  "75001", "69001", "13001", "31000", "06000", "44000", "67000", "34000", 
  "33000", "59000", "35000", "51100", "76600", "83000", "38000"
];

const nationalities = ["Française", "Belge", "Suisse", "Canadienne", "Allemande", "Espagnole", "Italienne", "Portugaise"];
const domains = ["tempmail.com", "anonyme.fr", "idtemp.org", "mailtemp.fr", "fauxmail.com"];

const placeholderImages = [
  "/placeholder.svg",
  "https://source.unsplash.com/featured/?person",
  "https://source.unsplash.com/featured/?portrait",
  "https://source.unsplash.com/featured/?face",
  "https://source.unsplash.com/featured/?profile"
];

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

const generatePhoneNumber = (): string => {
  return `0${getRandomNumber(6, 7)}${Array.from({ length: 8 }, () => getRandomNumber(0, 9)).join('')}`;
};

const generateIdNumber = (): string => {
  return Array.from({ length: 12 }, () => getRandomNumber(0, 9)).join('');
};

export const generateIdentity = (gender?: "male" | "female" | "other", nationality?: string): Identity => {
  const randomGender = gender || (Math.random() > 0.5 ? "male" : "female");
  const firstName = randomGender === "male" 
    ? getRandomElement(maleFirstNames) 
    : getRandomElement(femaleFirstNames);
  const lastName = getRandomElement(lastNames);
  
  const today = new Date();
  const minBirthDate = new Date();
  minBirthDate.setFullYear(today.getFullYear() - 65);
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(today.getFullYear() - 18);
  
  const birthDate = getRandomDate(minBirthDate, maxBirthDate);
  
  return {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    gender: randomGender,
    birthDate: formatDate(birthDate),
    email: generateEmail(firstName, lastName),
    phone: generatePhoneNumber(),
    address: {
      street: getRandomElement(streets) + " " + getRandomNumber(1, 100),
      city: getRandomElement(cities),
      zipCode: getRandomElement(zipCodes),
      country: "France"
    },
    nationality: nationality || getRandomElement(nationalities),
    idNumber: generateIdNumber(),
    profileImage: getRandomElement(placeholderImages),
    createdAt: new Date().toISOString()
  };
};

export const getRandomIdentities = (count: number): Identity[] => {
  return Array.from({ length: count }, () => generateIdentity());
};
