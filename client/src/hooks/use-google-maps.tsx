import { useEffect, useState } from 'react';
import { GoogleMapsLoader } from '@/lib/google-maps-loader';
/// <reference path="../types/google-maps.d.ts" />

interface GoogleMapsConfig {
  apiKey: string;
  libraries?: string[];
}

export function useGoogleMaps(config: GoogleMapsConfig) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    if (!config.apiKey) {
      setLoadError(new Error('Google Maps API key is required'));
      return;
    }

    const loader = GoogleMapsLoader.getInstance();
    
    // Check if already loaded
    if (loader.isGoogleMapsLoaded()) {
      setIsLoaded(true);
      return;
    }

    loader.load(config.apiKey, config.libraries || [])
      .then(() => {
        setIsLoaded(true);
        setLoadError(null);
      })
      .catch((error: Error) => {
        setLoadError(error);
        setIsLoaded(false);
      });
  }, [config.apiKey, config.libraries]);

  return { isLoaded, loadError };
}
