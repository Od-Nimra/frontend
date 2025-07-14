import { Component, OnInit } from '@angular/core';
import { AuthService, SignupResponse } from '../../services/auth.service';
import { SessionstorageService } from '../../services/sessionstorage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {
  formData = {
    fullName: '',
    email: '',
    password: '',
    department: '',
    semester: ''
  };

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private sessionStorage: SessionstorageService
  ) {}

  ngOnInit(): void {
    const saved = this.sessionStorage.load('signupData');
    if (saved) {
      this.formData.fullName = saved.fullName || '';
      this.formData.email = saved.email || '';
      this.formData.department = saved.department || '';
      this.formData.semester = saved.semester || '';
    }
  }

  updateSession(): void {
    const { fullName, email, department, semester } = this.formData;
    this.sessionStorage.save('signupData', { fullName, email, department, semester });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }

  onSubmit(): void {
    const { fullName, email, password, department, semester } = this.formData;
    if (fullName && email && password && department && semester) {
      this.authService.registerUser(this.formData).subscribe({
        next: (response: SignupResponse) => {
          console.log('Signup successful:', response);
          this.showToastMessage(response.message, 'success');

          this.updateSession();
          this.sessionStorage.remove('signupData');

          this.formData = {
            fullName: '',
            email: '',
            password: '',
            department: '',
            semester: ''
          };
        },
        error: (err: any) => {
          console.error('Signup error:', err);
          this.showToastMessage('Signup failed. Please try again.', 'error');
        }
      });
    }
  }
}
