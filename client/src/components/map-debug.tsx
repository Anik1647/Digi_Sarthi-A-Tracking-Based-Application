import { useGoogleMaps } from '@/hooks/use-google-maps';

export default function MapDebug() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useGoogleMaps({
    apiKey: apiKey || '',
    libraries: ['places']
  });

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Google Maps Debug Info:</h3>
      <p><strong>API Key:</strong> {apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found'}</p>
      <p><strong>Is Loaded:</strong> {isLoaded ? 'Yes' : 'No'}</p>
      <p><strong>Load Error:</strong> {loadError ? loadError.message : 'None'}</p>
      <p><strong>Window Google:</strong> {typeof window !== 'undefined' && window.google ? 'Available' : 'Not available'}</p>
    </div>
  );
}