import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SigninComponent {
  loginForm: FormGroup;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.router.navigate(['/dashboard']); // تعديل للصفحة اللي عايز توصلها بعد تسجيل الدخول
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed! Check your credentials.');
      }
    });
  }
}
