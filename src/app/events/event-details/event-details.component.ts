import { Component } from '@angular/core';
import { EventService } from '../../event.service'; // ✅ FIXED: relative path to parent folder

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  rsvpStatus: 'none' | 'going' = 'none';
  showGoingModal = false;
  showEditModal = false;

  constructor(private eventService: EventService) {}

  onRsvpClick() {
    this.showGoingModal = true;
  }

  confirmRsvp() {
    this.rsvpStatus = 'going';
    this.showGoingModal = false;

    // Backend call
    this.eventService.submitRsvp(true).subscribe(() => {
      console.log('RSVP status saved as going');
    });
  }

  openEditRsvp() {
    this.showEditModal = true;
  }

  setEditRsvp(choice: 'yes' | 'no') {
    if (choice === 'no') {
      this.rsvpStatus = 'none';

      this.eventService.submitRsvp(false).subscribe(() => {
        console.log('RSVP status changed to not going');
      });
    }
    this.showEditModal = false;
  }
}
