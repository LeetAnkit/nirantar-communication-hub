
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
    <div className="min-h-screen bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90 relative overflow-hidden pt-4">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl floating-orb"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-red-500/15 rounded-full blur-3xl floating-orb delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-yellow-300/10 rounded-full blur-3xl floating-orb delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-red-400/10 rounded-full blur-3xl floating-orb delay-2000"></div>
        
        {/* Additional glowing particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full glow-yellow animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-red-500 rounded-full glow-red animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-300 rounded-full glow-yellow animate-pulse delay-1400"></div>
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-red-400 rounded-full glow-red animate-pulse delay-300"></div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8"></div> {/* Spacer */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className="h-12 w-12 text-yellow-400 pulse-glow-yellow" />
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-300 bg-clip-text text-transparent glow-text-yellow">
                  Tarang
                </h1>
                <p className="text-sm text-yellow-200/80 font-medium glow-text-yellow">{t('tagline')}</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
          
          {/* Connection Status */}
          <div className="glass-card rounded-lg p-1 mb-4">
            <ConnectionStatus />
          </div>
          
          {/* PWA Install Button */}
          {installPrompt && (
            <Button 
              onClick={handleInstallPWA}
              className="glass-button text-white hover:text-yellow-200 transition-all duration-300"
            >
              <Zap className="h-4 w-4 mr-2" />
              Install App
            </Button>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 glass-tab border-yellow-400/20">
            <TabsTrigger value="emergency" className="flex items-center gap-2 text-xs text-yellow-200 hover:text-white hover:glow-red transition-all duration-300 data-[state=active]:bg-red-600/30 data-[state=active]:text-white">
              <Phone className="h-4 w-4" />
              {t('emergency')}
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2 text-xs text-yellow-200 hover:text-white hover:glow-yellow transition-all duration-300 data-[state=active]:bg-yellow-600/30 data-[state=active]:text-white">
              <Users className="h-4 w-4" />
              {t('help')}
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2 text-xs text-yellow-200 hover:text-white hover:glow-green transition-all duration-300 data-[state=active]:bg-green-600/30 data-[state=active]:text-white">
              <Shield className="h-4 w-4" />
              {t('safety')}
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2 text-xs text-yellow-200 hover:text-white hover:glow-orange transition-all duration-300 data-[state=active]:bg-orange-600/30 data-[state=active]:text-white">
              <Info className="h-4 w-4" />
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="animate-fade-in">
            <div className="glass-card rounded-lg">
              <EmergencyContacts />
            </div>
          </TabsContent>

          <TabsContent value="help" className="animate-fade-in">
            <div className="glass-card rounded-lg">
              <Tabs defaultValue="need" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 glass-tab border-yellow-400/20">
                  <TabsTrigger value="need" className="text-yellow-200 hover:text-white hover:glow-red transition-all duration-300 data-[state=active]:bg-red-600/30 data-[state=active]:text-white">{t('needHelp')}</TabsTrigger>
                  <TabsTrigger value="offer" className="text-yellow-200 hover:text-white hover:glow-green transition-all duration-300 data-[state=active]:bg-green-600/30 data-[state=active]:text-white">{t('offerHelp')}</TabsTrigger>
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
            <div className="glass-card rounded-lg">
              <SafetyTips />
            </div>
          </TabsContent>

          <TabsContent value="info" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="glass-card border-0 border-yellow-400/30">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent glow-text-yellow">About Tarang</h2>
                  <div className="space-y-4 text-sm">
                    <p className="leading-relaxed text-yellow-100/90">
                      <strong className="text-yellow-400 glow-text-yellow">Tarang</strong> is a disaster-resilient communication system designed to work 
                      even when internet and mobile networks fail during emergencies.
                    </p>
                    
                    <div className="glass-tab p-4 rounded-lg border-yellow-400/20">
                      <h3 className="font-semibold mb-2 text-yellow-400 glow-text-yellow">Key Features:</h3>
                      <ul className="list-disc list-inside space-y-1 text-yellow-200/80">
                        <li>Works offline - all data stored locally</li>
                        <li>Automatically syncs when connection is restored</li>
                        <li>Multilingual support (Hindi & English)</li>
                        <li>Emergency contacts always accessible</li>
                        <li>Community help coordination</li>
                        <li>Battery-optimized for long usage</li>
                      </ul>
                    </div>

                    <div className="glass-tab p-4 rounded-lg border-red-400/20">
                      <h3 className="font-semibold mb-2 text-red-400 glow-text-red">How it works:</h3>
                      <ul className="list-disc list-inside space-y-1 text-yellow-200/80">
                        <li>Install as a mobile app (PWA) on your device</li>
                        <li>Access emergency information offline</li>
                        <li>Submit help requests that sync when online</li>
                        <li>Stay connected with your community during disasters</li>
                      </ul>
                    </div>

                    <div className="glass-button p-4 rounded-lg border-l-4 border-red-500 glow-red">
                      <p className="text-red-300 font-medium flex items-center gap-2">
                        <Zap className="h-5 w-5 text-red-400 pulse-glow-red" />
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
