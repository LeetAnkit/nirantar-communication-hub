
import React from 'react';
import { useOffline } from '@/contexts/OfflineContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ConnectionStatus = () => {
  const { isOnline, lastSync, syncData } = useOffline();
  const { t } = useLanguage();

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleString();
  };

  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">
        <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          {isOnline ? t('online') : t('offline')}
        </Badge>
        <div className="text-sm text-muted-foreground">
          {t('lastSync')}: {formatLastSync(lastSync)}
        </div>
      </div>
      {isOnline && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={syncData}
          className="text-xs"
        >
          {t('syncNow')}
        </Button>
      )}
    </div>
  );
};

export default ConnectionStatus;
