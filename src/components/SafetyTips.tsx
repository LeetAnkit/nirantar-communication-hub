
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SafetyTips = () => {
  const { t } = useLanguage();

  const safetyData = {
    flood: {
      title: t('floodSafety'),
      tips: [
        'Move immediately to higher ground or upper floors',
        'Avoid walking or driving through flood waters',
        'Stay away from electrical wires and equipment',
        'Listen to emergency broadcasts for updates',
        'Keep emergency supplies ready (water, food, flashlight)',
        'Do not drink flood water - use bottled or boiled water only'
      ]
    },
    earthquake: {
      title: t('earthquakeSafety'),
      tips: [
        'Drop, Cover, and Hold On during shaking',
        'Stay away from windows, mirrors, and heavy objects',
        'If outdoors, move away from buildings and power lines',
        'Do not run outside during shaking',
        'After shaking stops, check for injuries and hazards',
        'Be prepared for aftershocks'
      ]
    },
    fire: {
      title: t('fireSafety'),
      tips: [
        'Stay low to avoid smoke inhalation',
        'Test doors before opening - if hot, find another exit',
        'Never use elevators during a fire',
        'Have an evacuation plan and meeting point',
        'Call fire department immediately',
        'Stop, Drop, and Roll if clothes catch fire'
      ]
    },
    general: {
      title: t('generalEmergency'),
      tips: [
        'Keep important documents in waterproof container',
        'Maintain emergency contact list',
        'Store emergency supplies (3 days minimum)',
        'Know your evacuation routes',
        'Keep battery-powered radio and flashlight',
        'Learn basic first aid and CPR'
      ]
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">{t('safetyTips')}</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {Object.entries(safetyData).map(([key, section]) => (
          <AccordionItem key={key} value={key} className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline">
              <span className="text-lg font-semibold">{section.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ul className="space-y-2">
                {section.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SafetyTips;
