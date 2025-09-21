import { useEffect, useState } from 'react';

export default function NetworkTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  
  const addResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  useEffect(() => {
    const runTests = async () => {
      addResult('🏁 Starting network tests...');
      
      // Test 1: Basic fetch to Google Maps API
      try {
        addResult('📡 Testing Google Maps API connectivity...');
        const response = await fetch('https://maps.googleapis.com/maps/api/js?key=test', { method: 'HEAD' });
        addResult(`📡 Google Maps API response: ${response.status} ${response.statusText}`);
      } catch (error) {
        addResult(`❌ Google Maps API error: ${error}`);
      }

      // Test 2: Test our own API
      try {
        addResult('🏠 Testing local API...');
        const response = await fetch('/api/vehicles');
        const data = await response.json();
        addResult(`🏠 Local API: ${response.status} - ${data.length} vehicles`);
      } catch (error) {
        addResult(`❌ Local API error: ${error}`);
      }

      // Test 3: Check browser environment
      addResult(`🌐 User Agent: ${navigator.userAgent.substring(0, 50)}...`);
      addResult(`🔒 HTTPS: ${location.protocol === 'https:'}`);
      addResult(`🏠 Origin: ${location.origin}`);

      // Test 4: Check for ad blockers
      addResult('🛡️ Checking for ad blockers...');
      setTimeout(() => {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        document.body.appendChild(testAd);
        
        setTimeout(() => {
          const isBlocked = testAd.offsetHeight === 0;
          addResult(`🛡️ Ad blocker detected: ${isBlocked ? 'Yes' : 'No'}`);
          document.body.removeChild(testAd);
        }, 100);
      }, 100);
    };

    runTests();
  }, []);

  return (
    <div className="p-4 bg-yellow-50 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Network & Environment Test</h3>
      <div className="max-h-40 overflow-y-auto space-y-1">
        {testResults.map((result, index) => (
          <div key={index} className="text-sm">{result}</div>
        ))}
      </div>
    </div>
  );
}