import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig = {
  providers: [],
  styles: [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'src/styles.css'
  ],
  scripts: [
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  ]
};
