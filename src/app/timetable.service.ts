import { Injectable } from '@angular/core';

export interface TimetableEntry {
  day: string;
  entries: {
    hour: string;       // e.g., "9:00 - 9:50"
    course: string;
    faculty: string;
    room: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private timetable: TimetableEntry[] = [
    {
      day: 'Monday',
      entries: [
        { hour: '9:00 - 9:50', course: 'Library', faculty: '', room: '' },
        { hour: '10:00 - 10:50', course: '', faculty: '', room: '' },
        { hour: '11:00 - 11:50', course: '', faculty: '', room: '' },
        { hour: '12:00 - 12:50', course: '', faculty: '', room: '' },
        { hour: '12:50 - 1:40', course: '', faculty: '', room: '' },
        { hour: '1:40 - 2:30', course: 'DBMS', faculty: 'SYW', room: 'M205' },
        { hour: '2:40 - 3:30', course: 'ISM', faculty: 'SRM', room: 'M205' },
        { hour: '3:40 - 4:30', course: 'Lang', faculty: '', room: 'M205' }
      ]
    },
    {
      day: 'Tuesday',
      entries: [
        { hour: '9:00 - 9:50', course: 'DBMS', faculty: 'SYW', room: 'M205' },
        { hour: '10:00 - 10:50', course: 'ENG', faculty: '', room: 'M205' },
        { hour: '11:00 - 11:50', course: 'ISM', faculty: 'SRM', room: 'M205' },
        { hour: '12:00 - 12:50', course: 'Lang', faculty: '', room: 'M205' },
        { hour: '12:50 - 1:40', course: '', faculty: '', room: '' },
        { hour: '1:40 - 2:30', course: '', faculty: '', room: '' },
        { hour: '2:40 - 3:30', course: '', faculty: '', room: '' },
        { hour: '3:40 - 4:30', course: '', faculty: '', room: '' }
      ]
    },
    {
      day: 'Wednesday',
      entries: [
        { hour: '9:00 - 9:50', course: '', faculty: '', room: '' },
        { hour: '10:00 - 10:50', course: '', faculty: '', room: '' },
        { hour: '11:00 - 11:50', course: 'Python Lab', faculty: 'SNI', room: 'M1 Lab' },
        { hour: '12:00 - 12:50', course: 'Python Lab', faculty: 'SNI', room: 'M1 Lab' },
        { hour: '12:50 - 1:40', course: '', faculty: '', room: '' },
        { hour: '1:40 - 2:30', course: 'ENG', faculty: '', room: 'M205' },
        { hour: '2:40 - 3:30', course: 'ISM', faculty: 'SRM', room: 'M205' },
        { hour: '3:40 - 4:30', course: 'Python', faculty: 'SNI', room: 'M205' }
      ]
    },
    {
      day: 'Thursday',
      entries: [
        { hour: '9:00 - 9:50', course: 'DBMS Lab', faculty: 'SYW', room: 'AL1 Lab' },
        { hour: '10:00 - 10:50', course: 'DBMS Lab', faculty: 'SYW', room: 'AL1 Lab' },
        { hour: '11:00 - 11:50', course: 'Python', faculty: 'SNI', room: 'M205' },
        { hour: '12:00 - 12:50', course: '', faculty: '', room: '' },
        { hour: '12:50 - 1:40', course: '', faculty: '', room: '' },
        { hour: '1:40 - 2:30', course: 'CA', faculty: 'SYW', room: 'M102' },
        { hour: '2:40 - 3:30', course: 'Python', faculty: 'SNI', room: 'M205' },
        { hour: '3:40 - 4:30', course: 'Lang', faculty: '', room: 'M205' }
      ]
    },
    {
      day: 'Friday',
      entries: [
        { hour: '9:00 - 9:50', course: '', faculty: '', room: '' },
        { hour: '10:00 - 10:50', course: '', faculty: '', room: '' },
        { hour: '11:00 - 11:50', course: '', faculty: '', room: '' },
        { hour: '12:00 - 12:50', course: '', faculty: '', room: '' },
        { hour: '12:50 - 1:40', course: '', faculty: '', room: '' },
        { hour: '1:40 - 2:30', course: 'Python', faculty: 'SNI', room: 'M205' },
        { hour: '2:40 - 3:30', course: 'Lang', faculty: '', room: 'M205' },
        { hour: '3:40 - 4:30', course: 'DBMS', faculty: 'SYW', room: 'M205' }
      ]
    },
    {
      day: 'Saturday',
      entries: [
        { hour: '9:00 - 9:50', course: '', faculty: '', room: '' },
        { hour: '10:00 - 10:50', course: '', faculty: '', room: '' },
        { hour: '11:00 - 11:50', course: '', faculty: '', room: '' },
        { hour: '12:00 - 12:50', course: '', faculty: '', room: '' },
        { hour: '12:50 - 1:40', course: '', faculty: '', room: '' },
        { hour: '1:40 - 2:30', course: '', faculty: '', room: '' },
        { hour: '2:40 - 3:30', course: '', faculty: '', room: '' },
        { hour: '3:40 - 4:30', course: '', faculty: '', room: '' }
      ]
    }
  ];

  // Return full week
  getFullWeek(): TimetableEntry[] {
    return this.timetable;
  }

  // Return only today's classes
  getTodaysClasses(): {
    hour: string;
    course: string;
    faculty: string;
    room: string;
  }[] {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = days[new Date().getDay()];
    const todayEntry = this.timetable.find(t => t.day === todayName);
    return todayEntry?.entries || [];
  }
}
