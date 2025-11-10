import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface UserSignIn {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://ecommerce.routemisr.com';
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<any>(null);
  isLoggedIn = signal(false);

  constructor() {
    this.checkAuthState();
  }

  private checkAuthState() {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      this.isLoggedIn.set(true);
      this.currentUser.set(JSON.parse(userData));
    }
  }

  signIn(payload: UserSignIn): Observable<any> {
    return this.http.post(`${this.API_URL}/api/v1/auth/signin`, payload).pipe(
      tap((res: any) => {
        if (res.token && res.user) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('user_data', JSON.stringify(res.user));
          this.isLoggedIn.set(true);
          this.currentUser.set(res.user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/signin']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
