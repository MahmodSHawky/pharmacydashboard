import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface LocalUser {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {
  private router = new Router(); // لو Standalone ممكن نعمل inject
  private user: LocalUser = {
    email: 'youremail@example.com', // حط إيميلك هنا
    password: '123456',             // حط الباسورد اللي تحبه
    name: 'Mahmoud'
  };

  currentUser = signal<LocalUser | null>(null);
  isLoggedIn = signal(false);

  signIn(email: string, password: string) {
    if (email === this.user.email && password === this.user.password) {
      this.currentUser.set(this.user);
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/signin']);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
