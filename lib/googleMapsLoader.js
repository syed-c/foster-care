// Singleton pattern for Google Maps API loading
class GoogleMapsLoader {
  constructor() {
    if (GoogleMapsLoader.instance) {
      return GoogleMapsLoader.instance;
    }
    
    this.loaded = false;
    this.loading = false;
    this.callbacks = [];
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    GoogleMapsLoader.instance = this;
  }
  
  load(callback) {
    // If already loaded, call callback immediately
    if (this.loaded) {
      callback();
      return;
    }
    
    // If loading in progress, add callback to queue
    if (this.loading) {
      this.callbacks.push(callback);
      return;
    }
    
    // Start loading process
    this.loading = true;
    this.callbacks.push(callback);
    
    // Check if Google Maps is already available
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      this.loaded = true;
      this.loading = false;
      this.callbacks.forEach(cb => cb());
      this.callbacks = [];
      return;
    }
    
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.loaded = true;
      this.loading = false;
      this.callbacks.forEach(cb => cb());
      this.callbacks = [];
    };
    script.onerror = (error) => {
      this.loading = false;
      console.error('Failed to load Google Maps API:', error);
      this.callbacks.forEach(cb => cb(new Error('Failed to load Google Maps API: ' + error.message)));
      this.callbacks = [];
    };
    
    // Handle script load errors specifically
    script.onload = () => {
      // Check if Google Maps loaded successfully
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        this.loaded = true;
        this.loading = false;
        this.callbacks.forEach(cb => cb());
        this.callbacks = [];
      } else {
        this.loading = false;
        console.error('Google Maps API loaded but window.google.maps is not available');
        this.callbacks.forEach(cb => cb(new Error('Google Maps API loaded but failed to initialize')));
        this.callbacks = [];
      }
    };
    
    // Handle script errors
    script.addEventListener('error', (event) => {
      this.loading = false;
      console.error('Google Maps script error:', event);
      const errorMessage = event.message || event.error || 'Unknown error loading Google Maps script';
      this.callbacks.forEach(cb => cb(new Error('Google Maps script error: ' + errorMessage)));
      this.callbacks = [];
    });
    
    document.head.appendChild(script);
  }
  
  isLoaded() {
    return this.loaded;
  }
}

// Export singleton instance
const googleMapsLoader = new GoogleMapsLoader();
export default googleMapsLoader;