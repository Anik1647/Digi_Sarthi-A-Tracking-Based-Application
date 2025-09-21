interface GoogleMapsWindow {
  google?: any;
  initGoogleMaps?: () => void;
}

declare const window: GoogleMapsWindow & Window;

export class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private isLoading = false;
  private isLoaded = false;
  private callbacks: Array<(loaded: boolean, error?: Error) => void> = [];

  private constructor() {}

  static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  load(apiKey: string, libraries: string[] = []): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // If already loaded, resolve immediately
      if (this.isLoaded && window.google?.maps) {
        resolve(true);
        return;
      }

      // Add callback to queue
      this.callbacks.push((loaded, error) => {
        if (loaded) resolve(true);
        else reject(error || new Error('Failed to load Google Maps'));
      });

      // If already loading, just wait for completion
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        this.waitForGoogleMaps();
        return;
      }

      // Create and load script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&loading=async&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;

      // Set up global callback
      window.initGoogleMaps = () => {
        this.isLoaded = true;
        this.isLoading = false;
        this.notifyCallbacks(true);
      };

      script.onerror = () => {
        this.isLoading = false;
        const error = new Error('Failed to load Google Maps script');
        this.notifyCallbacks(false, error);
      };

      document.head.appendChild(script);

      // Fallback timeout
      setTimeout(() => {
        if (!this.isLoaded) {
          this.waitForGoogleMaps();
        }
      }, 3000);
    });
  }

  private waitForGoogleMaps() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds with 100ms intervals

    const checkGoogle = () => {
      attempts++;
      
      if (window.google?.maps) {
        this.isLoaded = true;
        this.isLoading = false;
        this.notifyCallbacks(true);
        return;
      }

      if (attempts >= maxAttempts) {
        this.isLoading = false;
        this.notifyCallbacks(false, new Error('Google Maps failed to load within timeout'));
        return;
      }

      setTimeout(checkGoogle, 100);
    };

    checkGoogle();
  }

  private notifyCallbacks(loaded: boolean, error?: Error) {
    const callbacks = [...this.callbacks];
    this.callbacks = [];
    callbacks.forEach(callback => callback(loaded, error));
  }

  isGoogleMapsLoaded(): boolean {
    return this.isLoaded && !!window.google?.maps;
  }
}