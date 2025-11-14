import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Expose mount function for shell app
(window as any).mountUserMFE = function(containerId?: string) {
  const targetElement = containerId ? document.getElementById(containerId) : document.body;
  
  if (targetElement && containerId) {
    // Create app-root element inside the container
    const appRoot = document.createElement('app-root');
    targetElement.appendChild(appRoot);
  }
  
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
      console.log('✅ Angular User MFE loaded successfully');
    })
    .catch(err => console.error('❌ Angular MFE error:', err));
};

// Auto-mount in standalone mode (when accessed directly on port 3003)
if (window.location.port === '3003') {
  (window as any).mountUserMFE();
}