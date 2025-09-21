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
                  className="w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-4 transition-all duration-200 shadow-lg"
                  data-testid="button-app-store"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-75">Download on the</div>
                    <div className="text-lg font-semibold -mt-1">App Store</div>
                  </div>
                </button>
                
                <button 
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-4 transition-all duration-200 shadow-lg"
                  data-testid="button-google-play"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                    <path d="M3 20.5v-17c0-.84.55-1.6 1.34-1.86l11.95 10.36L3 20.5zm2.84-17.84c.19-.09.4-.16.62-.16.19 0 .38.05.55.13l12.08 6.97-3.25 2.82L4.84 2.66zM19 12l3.01-1.74c.57-.33.99-.97.99-1.76 0-.79-.42-1.43-.99-1.76L19 5l-3.45 3L19 12zm-3.45 3L4.84 21.34c-.17.08-.36.13-.55.13-.22 0-.43-.07-.62-.16L16.29 12l3.26 2.83L15.55 15z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-75">Get it on</div>
                    <div className="text-lg font-semibold -mt-1">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* App Features */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-xl transform transition-all hover:scale-[1.02]" data-testid="feature-location-sharing">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/>
                      <circle cx="12" cy="9" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Real-time Location Sharing</h3>
                    <p className="text-muted-foreground">Automatically share your bus location with passengers for accurate tracking</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl transform transition-all hover:scale-[1.02]" data-testid="feature-route-optimization">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Route Optimization</h3>
                    <p className="text-muted-foreground">Get optimized routes based on real-time traffic and passenger demand</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl transform transition-all hover:scale-[1.02]" data-testid="feature-analytics">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 21H3M21 21V7M3 21V3M3 3h18M3 3l9 9 3-3 6 6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                    <p className="text-muted-foreground">Track your performance metrics and passenger feedback</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl transform transition-all hover:scale-[1.02]" data-testid="feature-emergency">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L4 7l8 5 8-5-8-5z"/>
                      <path d="M4 12l8 5 8-5"/>
                      <path d="M12 22v-5"/>
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 9v6"/>
                      <path d="M9 12h6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      Emergency Support
                      <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">24/7</span>
                    </h3>
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
