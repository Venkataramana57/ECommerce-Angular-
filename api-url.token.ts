import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('apiUrl', {
  providedIn: 'root',  // This makes the token available globally
  factory: () => '/api' // Default value for development
});
