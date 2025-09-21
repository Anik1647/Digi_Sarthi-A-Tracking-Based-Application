import { useEffect, useRef, useState } from 'react';

export default function SimpleGoogleMapsTest() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Initializing...');
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setStatus('❌ No API key found');
      return;
    }

    setStatus('🔄 Loading Google Maps...');

    // Simple script loading approach
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;

    script.onload = () => {
      setStatus('✅ Script loaded, checking window.google...');
      
      // Check if google is available
      setTimeout(() => {
        if ((window as any).google?.maps) {
          setStatus('✅ Google Maps API available');
          
          // Try to create a map
          if (mapRef.current) {
            try {
              const map = new (window as any).google.maps.Map(mapRef.current, {
                center: { lat: 28.6139, lng: 77.2090 },
                zoom: 10,
              });
              setStatus('✅ Map created successfully');
            } catch (err) {
              setStatus('❌ Failed to create map');
              setErrorDetails(err instanceof Error ? err.message : String(err));
            }
          }
        } else {
          setStatus('❌ Google Maps API not available on window');
          setErrorDetails('window.google or window.google.maps is undefined');
        }
      }, 1000);
    };

    script.onerror = (err) => {
      setStatus('❌ Script failed to load');
      setErrorDetails('Network error or API key issue');
      console.error('Script error:', err);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="p-4 bg-blue-50 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Simple Google Maps Test</h3>
      <p><strong>Status:</strong> {status}</p>
      {errorDetails && <p><strong>Error:</strong> {errorDetails}</p>}
      <p><strong>Window.google available:</strong> {(window as any).google ? 'Yes' : 'No'}</p>
      <p><strong>Maps API available:</strong> {(window as any).google?.maps ? 'Yes' : 'No'}</p>
      
      <div 
        ref={mapRef} 
        className="w-full h-32 bg-gray-200 rounded mt-4"
        style={{ minHeight: '150px' }}
      />
    </div>
  );
}