
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: 'Nirantar',
    tagline: 'Disaster Communication Hub',
    emergency: 'Emergency',
    help: 'Help',
    safety: 'Safety',
    contacts: 'Contacts',
    offline: 'Offline Mode',
    online: 'Online',
    needHelp: 'Need Help',
    offerHelp: 'Offer Help',
    emergencyContacts: 'Emergency Contacts',
    safetyTips: 'Safety Tips',
    nationalEmergency: 'National Emergency',
    police: 'Police',
    fire: 'Fire Department',
    ambulance: 'Ambulance',
    disasterManagement: 'Disaster Management',
    helpRequests: 'Help Requests',
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    connectionStatus: 'Connection Status',
    lastSync: 'Last Sync',
    syncNow: 'Sync Now',
    location: 'Location',
    description: 'Description',
    urgency: 'Urgency Level',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    submit: 'Submit',
    floodSafety: 'Flood Safety Tips',
    earthquakeSafety: 'Earthquake Safety',
    fireSafety: 'Fire Safety',
    generalEmergency: 'General Emergency Tips'
  },
  hi: {
    appName: 'निरंतर',
    tagline: 'आपदा संचार केंद्र',
    emergency: 'आपातकाल',
    help: 'मदद',
    safety: 'सुरक्षा',
    contacts: 'संपर्क',
    offline: 'ऑफलाइन मोड',
    online: 'ऑनलाइन',
    needHelp: 'मदद चाहिए',
    offerHelp: 'मदद की पेशकश',
    emergencyContacts: 'आपातकालीन संपर्क',
    safetyTips: 'सुरक्षा सुझाव',
    nationalEmergency: 'राष्ट्रीय आपातकाल',
    police: 'पुलिस',
    fire: 'अग्निशमन विभाग',
    ambulance: 'एम्बुलेंस',
    disasterManagement: 'आपदा प्रबंधन',
    helpRequests: 'सहायता अनुरोध',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    connectionStatus: 'कनेक्शन स्थिति',
    lastSync: 'अंतिम सिंक',
    syncNow: 'अभी सिंक करें',
    location: 'स्थान',
    description: 'विवरण',
    urgency: 'तात्कालिकता स्तर',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    submit: 'जमा करें',
    floodSafety: 'बाढ़ सुरक्षा सुझाव',
    earthquakeSafety: 'भूकंप सुरक्षा',
    fireSafety: 'आग सुरक्षा',
    generalEmergency: 'सामान्य आपातकालीन सुझाव'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('nirantar-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('nirantar-language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
