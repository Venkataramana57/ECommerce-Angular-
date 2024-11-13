import { Injectable, Inject } from '@angular/core';
// import axios from 'axios';
import { AxiosInstance } from './axios-instance';

import { Observable, from } from 'rxjs';
// import { API_URL } from '../../../api-url.token';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	// constructor(@Inject(API_URL) private apiUrl: string) {}
  constructor(
    private axiosService: AxiosInstance,
    private sessionService: SessionService
  ) {}

	login(credentials: any): Observable<any> {
    const loginPromise = this.axiosService.getAxiosInstance().post('/login', credentials)
      .then(response => response.data)
      .catch(error => { throw error });
    return from(loginPromise);
  }

  signup(data: { name: string; email: string; password: string; role: string }): Observable<any> {
		const signupPromise = this.axiosService.getAxiosInstance().post('/signup', data )
      .then(response => response.data)
      .catch(error => {
        console.error('Error during signup:', error);
        throw error;
      });

		return from(signupPromise)
  }

  isUserLoggedIn() {
    return this.sessionService.getToken();
  }

	currentUser() {
		return this.sessionService.currentUser();
	}

	isRetailer() {
		return this.currentUser() && this.currentUser().role === 'retailer';
	}

	isCustomer() {
		return this.currentUser() && this.currentUser().role === 'customer';
	}
}
