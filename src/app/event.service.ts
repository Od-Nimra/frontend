import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  // Replace with real backend URL later
  submitRsvp(isGoing: boolean): Observable<any> {
    const rsvpData = {
      eventId: 'sample-event-id',
      going: isGoing
    };

    // Placeholder: Replace this with actual backend call
    console.log('Sending RSVP data to server:', rsvpData);
    // return this.http.post('https://your-backend.com/api/rsvp', rsvpData);
    return of({ success: true });
  }
}
