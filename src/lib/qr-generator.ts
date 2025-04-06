
import { Identity } from './identity-generator';

export const generateIdentityQRCode = async (identity: Identity): Promise<string> => {
  // We will use the QRCode.js library via CDN
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js';
    script.onload = () => {
      try {
        // Create a data object with selected identity info
        const identityData = {
          name: `${identity.firstName} ${identity.lastName}`,
          birthDate: identity.birthDate,
          nationality: identity.nationality,
          email: identity.email,
          phone: identity.phone,
          id: identity.id
        };
        
        // Convert to JSON
        const jsonData = JSON.stringify(identityData);
        
        // Create a temporary canvas element
        const canvas = document.createElement('canvas');
        
        // Generate QR code on canvas
        // @ts-ignore - QRCode is loaded from CDN
        QRCode.toCanvas(canvas, jsonData, { width: 200 }, (error: Error | null) => {
          if (error) {
            reject(error);
            return;
          }
          
          // Convert canvas to data URL
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        });
      } catch (error) {
        reject(error);
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
