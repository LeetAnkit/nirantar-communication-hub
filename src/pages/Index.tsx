
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
import { Shield, Phone, Users, Info, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8"></div> {/* Spacer */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className="h-10 w-10 text-blue-600 pulse-glow" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent glow-text">
                  Tarang
                </h1>
                <p className="text-sm text-gray-600 font-medium">{t('tagline')}</p>
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
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white glow-blue pulse-glow"
            >
              <Zap className="h-4 w-4 mr-2" />
              Install App
            </Button>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 glow-card">
            <TabsTrigger value="emergency" className="flex items-center gap-2 text-xs hover:glow-blue transition-all duration-300">
              <Phone className="h-4 w-4" />
              {t('emergency')}
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2 text-xs hover:glow-purple transition-all duration-300">
              <Users className="h-4 w-4" />
              {t('help')}
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2 text-xs hover:glow-green transition-all duration-300">
              <Shield className="h-4 w-4" />
              {t('safety')}
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2 text-xs hover:glow-orange transition-all duration-300">
              <Info className="h-4 w-4" />
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="animate-fade-in">
            <div className="glow-card rounded-lg">
              <EmergencyContacts />
            </div>
          </TabsContent>

          <TabsContent value="help" className="animate-fade-in">
            <div className="glow-card rounded-lg">
              <Tabs defaultValue="need" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/50 backdrop-blur-sm">
                  <TabsTrigger value="need" className="hover:glow-blue transition-all duration-300">{t('needHelp')}</TabsTrigger>
                  <TabsTrigger value="offer" className="hover:glow-green transition-all duration-300">{t('offerHelp')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="need">
                  <HelpForm type="need" />
                </TabsContent>
                
                <TabsContent value="offer">
                  <HelpForm type="offer" />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="animate-fade-in">
            <div className="glow-card rounded-lg">
              <SafetyTips />
            </div>
          </TabsContent>

          <TabsContent value="info" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="glow-card border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Tarang</h2>
                  <div className="space-y-4 text-sm">
                    <p className="leading-relaxed">
                      <strong className="text-blue-600">Tarang</strong> is a disaster-resilient communication system designed to work 
                      even when internet and mobile networks fail during emergencies.
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg glow-blue/20">
                      <h3 className="font-semibold mb-2 text-blue-700">Key Features:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Works offline - all data stored locally</li>
                        <li>Automatically syncs when connection is restored</li>
                        <li>Multilingual support (Hindi & English)</li>
                        <li>Emergency contacts always accessible</li>
                        <li>Community help coordination</li>
                        <li>Battery-optimized for long usage</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-4 rounded-lg glow-purple/20">
                      <h3 className="font-semibold mb-2 text-purple-700">How it works:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Install as a mobile app (PWA) on your device</li>
                        <li>Access emergency information offline</li>
                        <li>Submit help requests that sync when online</li>
                        <li>Stay connected with your community during disasters</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg border-l-4 border-orange-400 glow-orange/30">
                      <p className="text-orange-800 font-medium flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-600" />
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
