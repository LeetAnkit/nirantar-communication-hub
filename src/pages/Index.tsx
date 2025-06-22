
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectionStatus from '@/components/ConnectionStatus';
import EmergencyContacts from '@/components/EmergencyContacts';
import SafetyTips from '@/components/SafetyTips';
import HelpForm from '@/components/HelpForm';
import LanguageSelector from '@/components/LanguageSelector';
import { Shield, Phone, Users, Info } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error));
    }

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      console.log(`PWA install ${outcome}`);
      setInstallPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8"></div> {/* Spacer */}
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t('appName')}</h1>
                <p className="text-sm text-gray-600">{t('tagline')}</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
          
          {/* Connection Status */}
          <ConnectionStatus />
          
          {/* PWA Install Button */}
          {installPrompt && (
            <Button 
              onClick={handleInstallPWA}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Install App
            </Button>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="emergency" className="flex items-center gap-2 text-xs">
              <Phone className="h-4 w-4" />
              {t('emergency')}
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2 text-xs">
              <Users className="h-4 w-4" />
              {t('help')}
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2 text-xs">
              <Shield className="h-4 w-4" />
              {t('safety')}
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2 text-xs">
              <Info className="h-4 w-4" />
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="animate-fade-in">
            <EmergencyContacts />
          </TabsContent>

          <TabsContent value="help" className="animate-fade-in">
            <Tabs defaultValue="need" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="need">{t('needHelp')}</TabsTrigger>
                <TabsTrigger value="offer">{t('offerHelp')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="need">
                <HelpForm type="need" />
              </TabsContent>
              
              <TabsContent value="offer">
                <HelpForm type="offer" />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="safety" className="animate-fade-in">
            <SafetyTips />
          </TabsContent>

          <TabsContent value="info" className="animate-fade-in">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About Nirantar</h2>
                  <div className="space-y-4 text-sm">
                    <p>
                      <strong>Nirantar</strong> is a disaster-resilient communication system designed to work 
                      even when internet and mobile networks fail during emergencies.
                    </p>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Key Features:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Works offline - all data stored locally</li>
                        <li>Automatically syncs when connection is restored</li>
                        <li>Multilingual support (Hindi & English)</li>
                        <li>Emergency contacts always accessible</li>
                        <li>Community help coordination</li>
                        <li>Battery-optimized for long usage</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">How it works:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Install as a mobile app (PWA) on your device</li>
                        <li>Access emergency information offline</li>
                        <li>Submit help requests that sync when online</li>
                        <li>Stay connected with your community during disasters</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                      <p className="text-orange-800 font-medium">
                        🚨 Always call emergency services (112) for immediate life-threatening situations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
