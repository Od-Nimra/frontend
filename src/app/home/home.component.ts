import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../timetable.service';

interface Event {
  name: string;
  date: Date;
  location: string;
  image: string;
}

interface TimetableEntry {
  hour: string;
  course: string;
  faculty: string;
  room: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[] = [
    {
      name: 'Sports Day',
      date: new Date(2025, 6, 8),
      location: 'College Ground',
      image: 'https://tse1.mm.bing.net/th/id/OIP.mkOJu6Ts27hheE-OQJW1vAHaER?pid=Api&P=0&h=180'
    },
    {
      name: 'Exhibition',
      date: new Date(2025, 6, 13),
      location: 'Hall A',
      image: 'https://tse3.mm.bing.net/th/id/OIP.Z9Dj52536qvNsn1n2PXKawHaE8?pid=Api&P=0&h=180'
    },
    {
      name: 'Tech Fest',
      date: new Date(2025, 7, 5),
      location: 'Auditorium',
      image: 'https://tse3.mm.bing.net/th/id/OIP.oJn0QNccVxtLSIGX9Za95QHaE8?pid=Api&P=0&h=180'
    }
  ];

  todaysClasses: TimetableEntry[] = [];
  userName: string = 'Student'; // Default fallback

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    // Get user name from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = user.fullName || 'Student';

    this.todaysClasses = this.timetableService.getTodaysClasses().filter(c => !!c.course);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}