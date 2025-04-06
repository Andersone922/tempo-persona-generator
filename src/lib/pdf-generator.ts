
import { Identity } from './identity-generator';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Add TypeScript type definitions for jsPDF autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateIdentityPDF = async (identity: Identity): Promise<string> => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Add title
  doc.setFontSize(20);
  doc.text('Identité Temporaire', 105, 15, { align: 'center' });
  
  // Add creation date
  doc.setFontSize(10);
  doc.text(`Généré le: ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });
  
  // Add profile image if available
  if (identity.profileImage) {
    try {
      // Add placeholder for profile image
      doc.rect(20, 30, 50, 50, 'S');
      doc.setFontSize(8);
      doc.text('Photo de profil', 45, 55, { align: 'center' });
    } catch (error) {
      console.error('Error adding profile image to PDF:', error);
    }
  }
  
  // Add identity info
  doc.setFontSize(12);
  doc.text(`${identity.firstName} ${identity.lastName}`, 80, 40);
  doc.setFontSize(10);
  doc.text(`Genre: ${identity.gender === 'male' ? 'Homme' : identity.gender === 'female' ? 'Femme' : 'Autre'}`, 80, 48);
  doc.text(`Date de naissance: ${new Date(identity.birthDate).toLocaleDateString()}`, 80, 56);
  doc.text(`Nationalité: ${identity.nationality}`, 80, 64);
  doc.text(`N° d'identité: ${identity.idNumber}`, 80, 72);
  
  // Add contact info
  doc.line(20, 90, 190, 90);
  doc.setFontSize(14);
  doc.text('Coordonnées', 20, 100);
  doc.setFontSize(10);
  doc.text(`Email: ${identity.email}`, 20, 110);
  doc.text(`Téléphone: ${identity.phone}`, 20, 118);
  
  // Add address
  doc.setFontSize(14);
  doc.text('Adresse', 20, 130);
  doc.setFontSize(10);
  doc.text(`${identity.address.street}`, 20, 140);
  doc.text(`${identity.address.zipCode} ${identity.address.city}`, 20, 148);
  doc.text(`${identity.address.country}`, 20, 156);
  
  // Add disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    'AVERTISSEMENT: Cette identité est fictive et a été générée à des fins de test uniquement. ' +
    'Toute utilisation frauduleuse est strictement interdite.',
    105, 
    280, 
    { align: 'center', maxWidth: 170 }
  );
  
  // Return the PDF as a data URL
  return doc.output('dataurlstring');
};
