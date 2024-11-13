import { Injectable } from '@angular/core';
import axios from 'axios';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosInstance {
  private axiosInstance = axios.create({
    baseURL: '/api' // Replace with your base API URL
  });

  constructor(private sessionService: SessionService) {
    this.initializeInterceptor();
  }

  private initializeInterceptor() {
    // Attach a request interceptor to add the token from SessionService
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.sessionService.getToken();
        console.log(123456, token)
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Optional response interceptor for handling errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error, e.g., redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  // Method to get the Axios instance with interceptors applied
  getAxiosInstance() {
    return this.axiosInstance;
  }
}