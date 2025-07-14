// absence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LeaveApplication {
  name: string;
  class: string;
  from: string;
  to: string;
  reason: string;
  file: string;
  status: string;
}

export interface DutyApplication {
  name: string;
  event: string;
  date: string;
  file: string;
  slots: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
private baseUrl = 'http://localhost:8080/api/absence';

  constructor(private http: HttpClient) {}

  submitLeaveApplication(data: LeaveApplication): Observable<any> {
    return this.http.post(`${this.baseUrl}/leave`, data)
      .pipe(catchError(err => {
        console.error('Error submitting leave:', err);
        return throwError(() => err);
      }));
  }

  submitDutyApplication(data: DutyApplication): Observable<any> {
    return this.http.post(`${this.baseUrl}/duty`, data)
      .pipe(catchError(err => {
        console.error('Error submitting duty:', err);
        return throwError(() => err);
      }));
  }
}
