import { Component, OnInit } from '@angular/core';
import { TimetableService, TimetableEntry } from '../timetable.service';

interface ClassPeriod {
  hour: string;
  course: string;
  faculty: string;
  room: string;
}

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
})
export class TimetableComponent implements OnInit {
  fullTimetable: TimetableEntry[] = [];
  selectedClass: ClassPeriod | null = null;

  today: string = '';
  lunchHour: string = '12:50 - 1:40';
  showPrintView: boolean = false;

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.fullTimetable = this.timetableService.getFullWeek();
    this.today = this.getTodayName();
  }

  // ✅ Get only the unique hours with classes
  getClassHours(): string[] {
    const hoursSet = new Set<string>();
    this.fullTimetable.forEach(day => {
      day.entries.forEach(e => {
        if (e.course) hoursSet.add(e.hour);
      });
    });

    return Array.from(hoursSet).sort((a, b) => {
      const parse = (t: string) => new Date('1970/01/01 ' + t.split('-')[0].trim()).getTime();
      return parse(a) - parse(b);
    });
  }

  // ✅ Get class for a given day and hour
  getClassByDayAndHour(day: string, hour: string): ClassPeriod | null {
    const dayEntry = this.fullTimetable.find(d => d.day === day);
    if (!dayEntry) return null;
    return dayEntry.entries.find(e => e.hour === hour && e.course) || null;
  }

  // ✅ Open modal for a class
  openClassDetails(cls: ClassPeriod | null): void {
    if (cls && cls.course) {
      this.selectedClass = cls;
    }
  }

  // ✅ Close modal
  closeModal(): void {
    this.selectedClass = null;
  }

  // ✅ Highlight today
  isToday(day: string): boolean {
    return this.today === day;
  }

  // ✅ Get today's day name
  getTodayName(): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  }

  // ✅ Check if it's lunch hour
  isLunchBreak(hour: string): boolean {
    return hour === this.lunchHour;
  }

  // ✅ Trigger print
  printTimetable(): void {
    this.showPrintView = true;
    setTimeout(() => {
      window.print();
      this.showPrintView = false;
    }, 100);
  }
}
