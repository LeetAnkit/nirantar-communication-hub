
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOffline } from '@/contexts/OfflineContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface HelpFormProps {
  type: 'need' | 'offer';
}

const HelpForm: React.FC<HelpFormProps> = ({ type }) => {
  const { t } = useLanguage();
  const { saveOfflineData, getOfflineData, isOnline } = useOffline();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    urgency: 'medium',
    contact: '',
    type: type
  });

  const [requests, setRequests] = useState(() => {
    return getOfflineData('help-requests') || [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.location || !formData.description) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toISOString(),
      synced: isOnline
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    saveOfflineData('help-requests', updatedRequests);

    toast({
      title: isOnline ? "Request submitted successfully" : "Request saved offline",
      description: isOnline ? "Your request has been sent." : "Will sync when connection is restored."
    });

    // Reset form
    setFormData({
      location: '',
      description: '',
      urgency: 'medium',
      contact: '',
      type: type
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {type === 'need' ? t('needHelp') : t('offerHelp')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('location')} *
              </label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Area, landmark, or address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('description')} *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder={type === 'need' ? 
                  "Describe what help you need (food, water, medical, rescue, etc.)" :
                  "Describe what help you can offer (transportation, supplies, shelter, etc.)"
                }
                required
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('urgency')}
              </label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t('high')}</SelectItem>
                  <SelectItem value="medium">{t('medium')}</SelectItem>
                  <SelectItem value="low">{t('low')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contact (Optional)
              </label>
              <Input
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                placeholder="Phone number or other contact info"
              />
            </div>

            <Button type="submit" className="w-full">
              {t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display previous requests */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{t('helpRequests')}</h3>
        {requests.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No help requests yet
          </p>
        ) : (
          requests
            .filter((req: any) => req.type === type)
            .slice(0, 5)
            .map((request: any) => (
              <Card key={request.id} className="text-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {t(request.urgency)}
                    </Badge>
                    <div className="flex gap-2">
                      {!request.synced && (
                        <Badge variant="outline" className="text-xs">
                          Offline
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(request.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="font-medium mb-1">{request.location}</p>
                  <p className="text-muted-foreground">{request.description}</p>
                  {request.contact && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Contact: {request.contact}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  );
};

export default HelpForm;
