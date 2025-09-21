import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ThemeToggle } from './theme-toggle';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/tracking', label: 'Vehicle Tracking', icon: 'fas fa-map-marked-alt' },
    { path: '/driver-app', label: 'Driver App', icon: 'fas fa-mobile-alt' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </div>
              
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">Digi</span>
              <span className="text-2xl font-bold text-cyan-500">Saarthi</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-foreground hover:text-primary transition-colors duration-200 font-medium ${
                  location === item.path ? 'text-primary' : ''
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <i className={`${item.icon} mr-2`}></i>
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
              data-testid="nav-signup"
            >
              <i className="fas fa-user-plus mr-2"></i>Sign Up
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary p-2"
              data-testid="mobile-menu-toggle"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 rounded-lg" data-testid="mobile-menu">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-foreground hover:text-primary py-2"
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <i className={`${item.icon} mr-2`}></i>
                {item.label}
              </Link>
            ))}
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left bg-primary text-primary-foreground py-2 px-3 rounded-lg"
              data-testid="mobile-nav-signup"
            >
              <i className="fas fa-user-plus mr-2"></i>Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
