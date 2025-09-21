export default function DriverApp() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Driver Mobile App</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Download the DigiSaarthi driver app to enable real-time location tracking and enhance passenger experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* App Download Section */}
          <div className="order-2 lg:order-1">
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Get the App</h2>
              
              {/* QR Code Section */}
              <div className="text-center mb-8">
                <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center" data-testid="qr-code">
                  <div className="grid grid-cols-8 gap-1">
                    {/* Simple QR code pattern */}
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Scan to download the app</p>
              </div>

              {/* Download Buttons */}
              <div className="space-y-4">
                <button 
                  className="w-full bg-black text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors"
                  data-testid="button-app-store"
                >
                  <i className="fab fa-apple text-2xl"></i>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </button>
                
                <button 
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg flex items-center justify-center space-x-3 hover:bg-primary/90 transition-colors"
                  data-testid="button-google-play"
                >
                  <i className="fab fa-google-play text-2xl"></i>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* App Features */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-xl" data-testid="feature-location-sharing">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marked-alt text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Real-time Location Sharing</h3>
                    <p className="text-muted-foreground">Automatically share your bus location with passengers for accurate tracking</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl" data-testid="feature-route-optimization">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-route text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Route Optimization</h3>
                    <p className="text-muted-foreground">Get optimized routes based on real-time traffic and passenger demand</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl" data-testid="feature-analytics">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-chart-line text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                    <p className="text-muted-foreground">Track your performance metrics and passenger feedback</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl" data-testid="feature-emergency">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-shield-alt text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Emergency Support</h3>
                    <p className="text-muted-foreground">One-tap emergency assistance and direct communication with dispatch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mt-12 glass-card p-8 rounded-xl" data-testid="installation-instructions">
          <h2 className="text-2xl font-semibold mb-6 text-center">Installation Instructions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center" data-testid="step-download">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Download</h3>
              <p className="text-muted-foreground">Download the app from App Store or Google Play</p>
            </div>
            <div className="text-center" data-testid="step-register">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Register</h3>
              <p className="text-muted-foreground">Create your driver account with your credentials</p>
            </div>
            <div className="text-center" data-testid="step-start-tracking">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Tracking</h3>
              <p className="text-muted-foreground">Enable location services and start your route</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
