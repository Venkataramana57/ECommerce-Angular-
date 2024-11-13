import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import * as router from '@angular/router';
import { API_URL } from './../../api-url.token';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    router.provideRouter(routes),
    { provide: API_URL, useValue: '/api' }, provideAnimationsAsync()
  ]
};
