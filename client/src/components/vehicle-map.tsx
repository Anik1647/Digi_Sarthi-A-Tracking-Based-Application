/// <reference types="@types/google.maps" />
import { useEffect, useRef, useState } from 'react';
import { useGoogleMaps } from '@/hooks/use-google-maps';
import { useQuery } from '@tanstack/react-query';
import type { Vehicle } from '@shared/schema';
/// <reference path="../types/google-maps.d.ts" />

export default function VehicleMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useGoogleMaps({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles'],
    enabled: isLoaded,
  });

  useEffect(() => {
    if (isLoaded && mapRef.current && !map && window.google?.maps) {
      try {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: 28.6139, lng: 77.2090 }, // Default to Delhi
          zoom: 12,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [{"color": "#1d2c4d"}]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#8ec3b9"}]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{"color": "#1a3646"}]
            }
          ]
        });
        setMap(newMap);
      } catch (error) {
        console.error('Error creating Google Map:', error);
      }
    }
  }, [isLoaded, map]);

  useEffect(() => {
    if (map && vehicles && window.google?.maps) {
      // Clear existing markers (in a real app, you'd want to store and clean up markers)
      // Add vehicle markers
      vehicles.forEach((vehicle) => {
        if (vehicle.currentLat && vehicle.currentLng) {
          try {
            const marker = new google.maps.Marker({
              position: {
                lat: parseFloat(vehicle.currentLat),
                lng: parseFloat(vehicle.currentLng)
              },
              map,
              title: `Route ${vehicle.routeNumber}`,
              icon: {
                path: 0, // Use numeric value for CIRCLE instead of enum
                scale: 8,
                fillColor: vehicle.status === 'active' ? '#3b82f6' : '#f59e0b',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#ffffff'
              }
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="color: #000; padding: 8px;">
                  <h3 style="margin: 0 0 8px 0; font-weight: bold;">Route ${vehicle.routeNumber}</h3>
                  <p style="margin: 4px 0;"><strong>Location:</strong> ${vehicle.currentLocation || 'Unknown'}</p>
                  <p style="margin: 4px 0;"><strong>Next Stop:</strong> ${vehicle.nextStop || 'N/A'}</p>
                  <p style="margin: 4px 0;"><strong>Occupancy:</strong> ${vehicle.occupancyPercentage || 0}%</p>
                  <p style="margin: 4px 0;"><strong>Status:</strong> ${vehicle.status || 'inactive'}</p>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          } catch (error) {
            console.error('Error creating marker for vehicle:', vehicle.routeNumber, error);
          }
        }
      });
    }
  }, [map, vehicles]);

  if (loadError || !import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-96 md:h-[500px] bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-map text-4xl text-primary mb-4"></i>
          <p className="text-xl font-semibold mb-2">Map Unavailable</p>
          {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
            <p className="text-muted-foreground mb-4">Google Maps API key not configured</p>
          ) : (
            <div>
              <p className="text-muted-foreground mb-4">Unable to load Google Maps</p>
              <p className="text-sm text-muted-foreground mb-2">This might be due to:</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                <li>Ad blocker blocking the map requests</li>
                <li>Internet connectivity issues</li>
                <li>API key restrictions</li>
              </ul>
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-4">Vehicle locations are available in the cards below</p>
        </div>
      </div>
    );
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="h-96 md:h-[500px] bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl font-semibold mb-2">Loading Map...</p>
          <p className="text-muted-foreground">Please wait while we load the vehicle tracking map</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="h-96 md:h-[500px] rounded-lg"
      data-testid="google-maps-container"
    />
  );
}
