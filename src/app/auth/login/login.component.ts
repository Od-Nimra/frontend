import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest, LoginResponse } from '../../services/auth.service';
import { SessionstorageService } from '../../services/sessionstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  showLoginPassword = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionStorage: SessionstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedEmail = this.sessionStorage.load<string>('savedLoginEmail');
    if (savedEmail) {
      this.loginForm.get('email')?.setValue(savedEmail);
    }
  }

  onEmailChange(): void {
    const emailValue = this.loginForm.get('email')?.value;
    this.sessionStorage.save('savedLoginEmail', emailValue);
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData: LoginRequest = {
      email: this.loginForm.get('email')!.value!,
      password: this.loginForm.get('password')!.value!
    };

    this.authService.loginUser(loginData).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful:', response);
        this.showToastMessage('Login successful!', 'success');

        // Save token and user details
        this.sessionStorage.save('authToken', response.token);
        this.sessionStorage.save('user', response.user);
        this.sessionStorage.save('savedLoginEmail', loginData.email);

        // Navigate to dashboard after delay
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.showToastMessage('Login failed. Please check your credentials.', 'error');
      }
    });
  }
}
