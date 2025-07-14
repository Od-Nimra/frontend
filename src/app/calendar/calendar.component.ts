import { Component, OnInit } from '@angular/core';

interface CalendarEvent {
  title: string;
  date: string;
  description?: string;
  category: 'Seminar' | 'Celebration' | 'Academic' | 'arts' | 'science' | 'commerce' | 'tech';
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: 'month' | 'week' = 'month';
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  selectedDate = new Date();
  today = new Date();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  events: CalendarEvent[] = [
    { title: 'Seminar on AI', date: '2025-07-10', category: 'Seminar', description: 'AI trends in education' },
    { title: 'Cultural Fest', date: '2025-07-10', category: 'Celebration', description: 'Annual cultural festival' },
    { title: 'Internal Exams Begin', date: '2025-07-10', category: 'Academic', description: 'Midterm evaluations' },
    { title: 'Math Workshop', date: '2025-07-13', category: 'Academic', description: 'Hands-on learning' },
    { title: 'Independence Day Celebration', date: '2025-08-15', category: 'Celebration', description: 'Flag hoisting ceremony' }
  ];

  calendarCells: CalendarDay[] = [];
  selectedDayEvents: CalendarEvent[] = [];
  weekDates: { label: string; fullDate: Date }[] = [];

  ngOnInit(): void {
    this.generateCalendar();
    this.selectDate(new Date());
  }

  setView(v: 'month' | 'week') {
    this.view = v;
    if (v === 'week') this.generateWeekDates(this.selectedDate);
  }

  generateCalendar(): void {
    this.calendarCells = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const startDay = (firstDayOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    for (let i = startDay; i > 0; i--) {
      this.calendarCells.push({
        date: new Date(this.currentYear, this.currentMonth - 1, daysInPrevMonth - i + 1),
        isCurrentMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarCells.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        isCurrentMonth: true
      });
    }

    const remainingCells = 42 - this.calendarCells.length;
    for (let i = 1; i <= remainingCells; i++) {
      this.calendarCells.push({
        date: new Date(this.currentYear, this.currentMonth + 1, i),
        isCurrentMonth: false
      });
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  selectDate(day: CalendarDay | Date): void {
    const dateObj = day instanceof Date ? day : day.date;
    this.selectedDate = dateObj;
    const dateStr = this.formatDate(dateObj);
    this.selectedDayEvents = this.events.filter(e => e.date === dateStr);
    if (this.view === 'week') {
      this.generateWeekDates(dateObj);
    }
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getEvents(date: Date): CalendarEvent[] {
    return this.events.filter(e => e.date === this.formatDate(date));
  }

  getDotColor(event: CalendarEvent): string {
    const colors: Record<CalendarEvent['category'], string> = {
      Seminar: 'bg-blue-500',
      Celebration: 'bg-green-500',
      Academic: 'bg-yellow-500',
      arts: 'bg-pink-500',
      science: 'bg-green-500',
      commerce: 'bg-yellow-500',
      tech: 'bg-blue-500'
    };
    return colors[event.category] || 'bg-gray-400';
  }

  getCardColor(event: CalendarEvent): string {
    const colors: Record<CalendarEvent['category'], string> = {
      Seminar: 'border-l-4 border-blue-400 bg-[#00152e]',
      Celebration: 'border-l-4 border-green-400 bg-[#00152e]',
      Academic: 'border-l-4 border-yellow-400 bg-[#00152e]',
      arts: 'border-l-4 border-pink-400 bg-[#00152e]',
      science: 'border-l-4 border-green-400 bg-[#00152e]',
      commerce: 'border-l-4 border-yellow-400 bg-[#00152e]',
      tech: 'border-l-4 border-blue-400 bg-[#00152e]'
    };
    return colors[event.category] || 'border-l-4 border-gray-400 bg-[#00152e]';
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  generateWeekDates(baseDate: Date): void {
    const weekStart = new Date(baseDate);
    const dayOfWeek = (baseDate.getDay() + 6) % 7;
    weekStart.setDate(baseDate.getDate() - dayOfWeek);

    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return {
        label: `${this.dayNames[i]} ${date.getDate()}`,
        fullDate: date
      };
    });
  }

  isSelectedDate(date: Date): boolean {
    return date.toDateString() === this.selectedDate.toDateString();
  }

  goToToday(): void {
    this.selectedDate = new Date();
    this.currentMonth = this.selectedDate.getMonth();
    this.currentYear = this.selectedDate.getFullYear();
    this.generateCalendar();
    this.selectDate(this.selectedDate);
  }
}
