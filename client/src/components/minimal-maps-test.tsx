import { useEffect, useState } from 'react';

export default function MinimalMapsTest() {
  const [logs, setLogs] = useState<string[]>([]);
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addLog('Component mounted');
    
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    addLog(`API Key: ${apiKey ? 'Present' : 'Missing'}`);
    
    if (!apiKey) {
      addLog('❌ No API key - stopping');
      return;
    }

    // Check if Google Maps is already loaded
    if ((window as any).google?.maps) {
      addLog('✅ Google Maps already loaded');
      return;
    }

    addLog('📡 Loading Google Maps script...');
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    
    script.addEventListener('load', () => {
      addLog('✅ Script load event fired');
      
      // Check immediately
      if ((window as any).google?.maps) {
        addLog('✅ Google Maps available immediately');
      } else {
        addLog('⏳ Waiting for Google Maps to be available...');
        
        // Poll for availability
        let attempts = 0;
        const checkInterval = setInterval(() => {
          attempts++;
          
          if ((window as any).google?.maps) {
            addLog(`✅ Google Maps available after ${attempts} attempts`);
            clearInterval(checkInterval);
          } else if (attempts > 50) {
            addLog('❌ Google Maps not available after 50 attempts');
            clearInterval(checkInterval);
          }
        }, 100);
      }
    });

    script.addEventListener('error', (event) => {
      addLog(`❌ Script error: ${event.type}`);
    });

    addLog('📌 Adding script to document head');
    document.head.appendChild(script);

    return () => {
      addLog('🧹 Cleanup - removing script');
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="p-4 bg-green-50 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Minimal Google Maps Test</h3>
      <div className="max-h-40 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="text-sm font-mono">{log}</div>
        ))}
      </div>
    </div>
  );
}