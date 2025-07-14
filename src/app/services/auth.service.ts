import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


// Interfaces
export interface SignupResponse {
  message: string;
  userId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    department: string;
    semester: string;
  };
}


export interface GenericResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // --- Signup ---
  registerUser(data: any): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.baseUrl}/auth/signup`, data)
      .pipe(catchError(this.handleError));
  }

// --- Login ---
loginUser(data: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, data).pipe(
    tap((response: LoginResponse) => {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('user', JSON.stringify(response.user));
    }),
    catchError(this.handleError)
  );
}

  // --- Forgot Password ---
 // Update the sendVerificationCode method in auth.service.ts
sendVerificationCode(email: string): Observable<GenericResponse> {
    const payload = { email };
    console.log('Sending verification code for email:', email); // Debug log
    return this.http.post<GenericResponse>(
        `${this.baseUrl}/auth/forgot-password/send-code`, 
        payload
    ).pipe(
        catchError(error => {
            console.error('Error sending verification code:', error);
            return throwError(() => error);
        })
    );
}

  verifyCode(email: string, code: string): Observable<GenericResponse> {
    const payload = { email, code };
    return this.http.post<GenericResponse>(`${this.baseUrl}/auth/forgot-password/verify-code`, payload)
      .pipe(catchError(this.handleError));
  }

  resetPassword(email: string, newPassword: string): Observable<GenericResponse> {
    const payload = { email, newPassword };
    return this.http.post<GenericResponse>(`${this.baseUrl}/auth/forgot-password/reset`, payload)
      .pipe(catchError(this.handleError));
  }

  // --- Token Management ---
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // --- Auth Header Helper ---
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // --- Error Handler ---
  private handleError(error: any): Observable<never> {
    console.error('AuthService Error:', error);
    return throwError(() => error);
  }
}