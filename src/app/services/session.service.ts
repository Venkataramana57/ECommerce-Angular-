import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class SessionService {
	private userSubject = new BehaviorSubject<any>(null)
	private tokenSubject = new BehaviorSubject<any>(null)
	user$ = this.userSubject.asObservable();
	token$ = this.tokenSubject.asObservable();

	constructor() {
    const userData: any = this.getLocalStorageItem('userData');
		const accessToken: any = this.getLocalStorageItem('accessToken');
    if (accessToken) {
      this.userSubject.next(JSON.parse(userData));
			this.tokenSubject.next(JSON.parse(accessToken));
    }
  }

	login(userData: any) {
		this.setLocalStorageItem('userData', JSON.stringify(userData.user));
		this.setLocalStorageItem('accessToken', JSON.stringify(userData.token));
		this.userSubject.next(userData.user);
		this.tokenSubject.next(userData.token);
	}

	getToken() {
		return this.tokenSubject.value;
	}

	currentUser() {
		return this.userSubject.value;
	}

	logout() {
		this.userSubject.next(null);
		this.tokenSubject.next(null);
		this.removeLocalStorageItem('userData');
		this.removeLocalStorageItem('accessToken');
	}

	private getLocalStorageItem(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

}