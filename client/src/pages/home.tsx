import { Link } from 'wouter';
import BenefitsChart from '@/components/benefits-chart';

export default function Home() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="gradient-text">DigiSaarthi</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Never miss your bus again. Track real-time locations, optimize your commute, and transform public transportation in your city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tracking"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 inline-block text-center"
              data-testid="button-start-tracking"
            >
              <i className="fas fa-map-marked-alt mr-2"></i>Start Tracking
            </Link>
            <Link
              href="/driver-app"
              className="glass-card text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-200 inline-block text-center"
              data-testid="button-download-app"
            >
              <i className="fas fa-download mr-2"></i>Download App
            </Link>
          </div>
        </div>

        {/* Benefits Section with Animated Graphs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Time Savings Benefit */}
          <div className="glass-card p-6 rounded-xl" data-testid="benefit-time-savings">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-accent text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-muted-foreground">Reduce waiting time by up to 40% with real-time tracking</p>
            </div>
            <BenefitsChart type="time-savings" />
            <p className="text-center text-sm text-muted-foreground mt-2">Efficiency Over Time</p>
          </div>

          {/* Real-time Updates */}
          <div className="glass-card p-6 rounded-xl" data-testid="benefit-real-time">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-satellite-dish text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">Live location tracking with 99.9% accuracy</p>
            </div>
            <BenefitsChart type="accuracy" />
            <p className="text-center text-sm text-muted-foreground mt-2">Tracking Accuracy</p>
          </div>

          {/* Cost Efficiency */}
          <div className="glass-card p-6 rounded-xl" data-testid="benefit-cost-effective">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-coins text-accent text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Effective</h3>
              <p className="text-muted-foreground">Reduce transportation costs by 25%</p>
            </div>
            <BenefitsChart type="cost-comparison" />
            <p className="text-center text-sm text-muted-foreground mt-2">Cost Comparison</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-xl" data-testid="features-passengers">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">For Passengers</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/>
                    <circle cx="12" cy="9" r="2"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Real-time bus locations</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Arrival time predictions</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3l18 18M10.5 6.5L20 3l-3 9.5M7 10l-3 9.5 9.5-3"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Route planning assistance</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <circle cx="19" cy="11" r="2"/>
                    <path d="M19 13v3"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Crowd density information</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl" data-testid="features-drivers">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M22 10h-4.5a1.5 1.5 0 0 0-3 0H2"/>
                  <circle cx="7" cy="15" r="1"/>
                  <circle cx="17" cy="15" r="1"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">For Drivers</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Easy location sharing</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 17 4 12 9 7"/>
                    <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Route optimization</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 21H3M21 21V7M3 21V3M3 3h18M3 3l9 9 3-3 6 6"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Passenger analytics</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L4 7l8 5 8-5-8-5z"/>
                    <path d="M4 12l8 5 8-5"/>
                    <path d="M12 22v-5"/>
                  </svg>
                </div>
                <span className="text-lg text-muted-foreground">Emergency assistance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
