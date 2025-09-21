import { useQuery } from '@tanstack/react-query';
import VehicleMap from '@/components/vehicle-map';
import GoogleMapsTest from '@/components/google-maps-test';
import SimpleGoogleMapsTest from '@/components/simple-maps-test';
import MinimalMapsTest from '@/components/minimal-maps-test';
import NetworkTest from '@/components/network-test';
import type { Vehicle } from '@shared/schema';

export default function Tracking() {
  const { data: vehicles, isLoading, error } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles'],
  });

  if (error) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
            <h1 className="text-4xl font-bold mb-4">Error Loading Vehicles</h1>
            <p className="text-muted-foreground">Failed to load vehicle tracking data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Vehicle Tracking</span>
          </h1>
          <p className="text-xl text-muted-foreground">Track all public transportation vehicles in real-time</p>
        </div>

        {/* Map Container */}
        <div className="glass-card p-4 rounded-xl mb-8" data-testid="map-container">
          <NetworkTest />
          <MinimalMapsTest />
          <VehicleMap />
        </div>

        {/* Vehicle Status Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-xl animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            ))
          ) : vehicles && vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <div key={vehicle.id} className="glass-card p-6 rounded-xl" data-testid={`vehicle-card-${vehicle.routeNumber}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold" data-testid={`text-route-${vehicle.routeNumber}`}>
                    Route {vehicle.routeNumber}
                  </h3>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      vehicle.status === 'active' 
                        ? 'bg-accent/20 text-accent' 
                        : vehicle.status === 'delayed'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-muted/20 text-muted-foreground'
                    }`}
                    data-testid={`status-${vehicle.routeNumber}`}
                  >
                    {vehicle.status || 'inactive'}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span data-testid={`location-${vehicle.routeNumber}`}>
                      {vehicle.currentLocation || 'Location unavailable'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <i className="fas fa-route text-primary mr-2"></i>
                    <span data-testid={`next-stop-${vehicle.routeNumber}`}>
                      {vehicle.nextStop || 'No next stop data'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <i className="fas fa-users text-primary mr-2"></i>
                    <span data-testid={`occupancy-${vehicle.routeNumber}`}>
                      {vehicle.occupancyPercentage || 0}% occupied
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <i className="fas fa-bus text-6xl text-muted-foreground mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">No Vehicles Available</h3>
              <p className="text-muted-foreground">No vehicles are currently being tracked in the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
