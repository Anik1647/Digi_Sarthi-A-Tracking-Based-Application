import { Link } from 'wouter';
import BenefitsChart from '@/components/benefits-chart';

export default function Home() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Smart <span className="gradient-text">Public Transport</span> Tracking
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
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="fas fa-users text-primary mr-3"></i>
              For Passengers
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Real-time bus locations</li>
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Arrival time predictions</li>
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Route planning assistance</li>
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Crowd density information</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-xl" data-testid="features-drivers">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="fas fa-bus text-primary mr-3"></i>
              For Drivers
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Easy location sharing</li>
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Route optimization</li>
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Passenger analytics</li>
              <li className="flex items-center"><i className="fas fa-check text-accent mr-2"></i>Emergency assistance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
