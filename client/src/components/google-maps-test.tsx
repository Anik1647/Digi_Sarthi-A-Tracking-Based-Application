import { useEffect, useState } from 'react';

export default function GoogleMapsTest() {
  const [status, setStatus] = useState('Initializing...');
  const [errorDetails, setErrorDetails] = useState('');
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    console.log('API Key from env:', apiKey);
    
    if (!apiKey) {
      setStatus('❌ No API key found');
      return;
    }

    setStatus('🔄 Loading Google Maps API...');

    // Check if already loaded
    if (window.google && window.google.maps) {
      setStatus('✅ Google Maps API already loaded');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setStatus('✅ Google Maps API loaded successfully');
      
      // Try to create a simple map to test
      try {
        // Wait for Google Maps to be fully available
        if (window.google && window.google.maps) {
          const testDiv = document.createElement('div');
          testDiv.style.height = '100px';
          testDiv.style.width = '100px';
          document.body.appendChild(testDiv);
          
          const map = new google.maps.Map(testDiv, {
            center: { lat: 28.6139, lng: 77.2090 },
            zoom: 10,
          });
          
          setStatus('✅ Google Maps API working correctly');
          document.body.removeChild(testDiv);
        } else {
          setStatus('⚠️ Google Maps API loaded but not ready');
          setTimeout(() => {
            if (window.google && window.google.maps) {
              setStatus('✅ Google Maps API working correctly (delayed)');
            } else {
              setStatus('❌ Google Maps API not available after loading');
            }
          }, 1000);
        }
      } catch (err) {
        setStatus('❌ Google Maps API loaded but failed to create map');
        setErrorDetails(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    script.onerror = (err) => {
      setStatus('❌ Failed to load Google Maps API');
      setErrorDetails('Script failed to load - check API key and restrictions');
      console.error('Google Maps script error:', err);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  return (
    <div className="p-4 bg-blue-50 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Google Maps API Test</h3>
      <p><strong>API Key:</strong> {apiKey ? `${apiKey.substring(0, 20)}...` : 'Not found'}</p>
      <p><strong>Status:</strong> {status}</p>
      {errorDetails && <p><strong>Error:</strong> {errorDetails}</p>}
      <p><strong>Window.google:</strong> {typeof window !== 'undefined' && window.google ? 'Available' : 'Not available'}</p>
      
      <div className="mt-4 p-2 bg-yellow-100 rounded text-sm">
        <strong>Common Issues:</strong>
        <ul className="list-disc ml-4 mt-1">
          <li>API key not enabled for Maps JavaScript API</li>
          <li>Billing not enabled in Google Cloud Console</li>
          <li>API key has domain restrictions</li>
          <li>Daily quota exceeded</li>
        </ul>
      </div>
    </div>
  );
}