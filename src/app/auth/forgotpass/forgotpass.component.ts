import { Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html'
})
export class ForgotpassComponent implements OnInit {
  form: FormGroup;
  currentStep = 1;
  message = '';
  messageClass = '';
  otpControls: FormControl[] = Array.from({ length: 6 }, () => new FormControl('', [Validators.required, Validators.pattern(/^[0-9]$/)]));
  otpInvalid = false;
  isLoading = false;
  showNewPassword = false;
  showConfirmPassword = false;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder, 
    public sessionStorage: SessionstorageService,
    private authService: AuthService // Inject AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {
    // Auto-fill email
    const savedEmail = this.sessionStorage.load<string>('forgotPassEmail');
    if (savedEmail) {
      this.form.get('email')?.setValue(savedEmail);
    }
  }

  passwordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

 goToStep2() {
    const emailControl = this.form.get('email');
    if (emailControl?.valid) {
        this.isLoading = true;
        this.message = '';
        console.log('Attempting to send OTP to:', emailControl.value); // Debug log
        
        this.authService.sendVerificationCode(emailControl.value).subscribe({
            next: (response) => {
                console.log('OTP sent response:', response); // Debug log
                this.isLoading = false;
                this.sessionStorage.save('forgotPassEmail', emailControl.value);
                this.currentStep = 2;
                this.message = 'OTP sent to your email successfully!';
                this.messageClass = 'bg-green-100 text-green-700';
            },
            error: (error) => {
                console.error('Error sending OTP:', error); // Debug log
                this.isLoading = false;
                this.message = 'Failed to send OTP. Please try again.';
                this.messageClass = 'bg-red-100 text-red-700';
            }
        });
    } else {
        emailControl?.markAsTouched();
    }
}

  verifyOtp() {
    const allFilled = this.otpControls.every(ctrl => ctrl.valid);
    this.otpInvalid = !allFilled;

    if (allFilled) {
      this.isLoading = true;
      this.message = '';
      
      // Get OTP code from form controls
      const otpCode = this.otpControls.map(ctrl => ctrl.value).join('');
      const email = this.form.get('email')?.value;

      // Call backend to verify OTP
      this.authService.verifyCode(email, otpCode).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.currentStep = 3;
          this.message = 'OTP verified successfully!';
          this.messageClass = 'bg-green-100 text-green-700';
          console.log('OTP verified successfully:', response);
        },
        error: (error) => {
          this.isLoading = false;
          this.message = 'Invalid OTP. Please try again.';
          this.messageClass = 'bg-red-100 text-red-700';
          this.otpInvalid = true;
          console.error('Error verifying OTP:', error);
        }
      });
    }
  }

  resetPassword() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      this.message = '';
      
      const email = this.form.get('email')?.value;
      const newPassword = this.form.get('newPassword')?.value;

      // Call backend to reset password
      this.authService.resetPassword(email, newPassword).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.message = 'Password reset successful!';
          this.messageClass = 'bg-green-100 text-green-700';
          this.sessionStorage.remove('forgotPassEmail');
          console.log('Password reset successful:', response);
          
          // Optional: redirect to login page after 3 seconds
          setTimeout(() => {
            // this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.isLoading = false;
          this.message = 'Failed to reset password. Please try again.';
          this.messageClass = 'bg-red-100 text-red-700';
          console.error('Error resetting password:', error);
        }
      });
    } else {
      this.message = 'Please fix the errors above.';
      this.messageClass = 'bg-red-100 text-red-700';
    }

    setTimeout(() => this.message = '', 3000);
  }

  onOtpInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (/^\d$/.test(value)) {
      this.otpControls[index].setValue(value);
      if (index < this.otpControls.length - 1) {
        this.otpInputs.get(index + 1)?.nativeElement.focus();
      }
    } else {
      this.otpControls[index].setValue('');
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !this.otpControls[index].value && index > 0) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}