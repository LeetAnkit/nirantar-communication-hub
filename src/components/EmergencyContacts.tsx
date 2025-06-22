
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const EmergencyContacts = () => {
  const { t } = useLanguage();

  const contacts = [
    { name: t('nationalEmergency'), number: '112', color: 'bg-red-600' },
    { name: t('police'), number: '100', color: 'bg-blue-600' },
    { name: t('fire'), number: '101', color: 'bg-orange-600' },
    { name: t('ambulance'), number: '108', color: 'bg-green-600' },
    { name: t('disasterManagement'), number: '1078', color: 'bg-purple-600' },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">{t('emergencyContacts')}</h2>
      <div className="grid gap-3">
        {contacts.map((contact, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center`}>
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-2xl font-bold text-primary">{contact.number}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCall(contact.number)}
                  className={`${contact.color} hover:opacity-90 text-white`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;
