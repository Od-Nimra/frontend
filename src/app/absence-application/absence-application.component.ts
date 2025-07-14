// absence-application.component.ts
import { Component } from '@angular/core';
import { AbsenceService, LeaveApplication, DutyApplication } from './absence.service';

@Component({
  selector: 'app-absence-application',
  templateUrl: './absence-application.component.html',
})
export class AbsenceApplicationComponent {
  constructor(private absenceService: AbsenceService) {}

  selectedForm: 'leave' | 'duty' = 'leave';

  showToast = false;
  showDetailsModal = false;
  loading = false;
  detailType: 'leave' | 'duty' | '' = '';

  leaveName = '';
  leaveClass = '';
  leaveStart = '';
  leaveEnd = '';
  leaveReason = '';
  leaveFile: File | null = null;
  leaveSubmitted = false;

  dutyName = '';
  dutyEvent = '';
  dutyDate = '';
  dutyFile: File | null = null;
  dutySubmitted = false;

  dutySlots: string = '';

  timeSlots = [
    { time: '9:00 - 9:50', selected: false },
    { time: '9:50 - 10:40', selected: false },
    { time: '11:00 - 11:50', selected: false },
    { time: '11:50 - 12:40', selected: false },
    { time: '1:40 - 2:30', selected: false },
    { time: '2:30 - 3:20', selected: false }
  ];

  pastApplications: any[] = [];

  get selectedDutySlots(): string {
    return this.timeSlots.filter(slot => slot.selected).map(slot => slot.time).join(', ');
  }

  onLeaveFileSelected(event: any): void {
    this.leaveFile = event.target.files[0];
  }

  removeLeaveFile(): void {
    this.leaveFile = null;
  }

  onDutyFileSelected(event: any): void {
    this.dutyFile = event.target.files[0];
  }

  removeDutyFile(): void {
    this.dutyFile = null;
  }

  submitLeave(): void {
    this.loading = true;

    const newApp: LeaveApplication = {
      name: this.leaveName,
      class: this.leaveClass,
      from: this.leaveStart,
      to: this.leaveEnd,
      reason: this.leaveReason,
      file: this.leaveFile?.name || '',
      status: 'Pending',
    };

    this.absenceService.submitLeaveApplication(newApp).subscribe({
      next: () => {
        this.pastApplications.unshift(newApp);
        this.leaveSubmitted = true;
        this.loading = false;
        this.showToast = true;
        this.resetLeaveForm();
        setTimeout(() => (this.showToast = false), 3000);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Failed to submit leave:', err);
      }
    });
  }

  submitDuty(): void {
    this.loading = true;

    const newApp: DutyApplication = {
      name: this.dutyName,
      event: this.dutyEvent,
      date: this.dutyDate,
      file: this.dutyFile?.name || '',
      slots: this.selectedDutySlots,
      status: 'Pending',
    };

    this.absenceService.submitDutyApplication(newApp).subscribe({
      next: () => {
        this.dutySlots = this.selectedDutySlots;
        this.pastApplications.unshift(newApp);
        this.dutySubmitted = true;
        this.loading = false;
        this.showToast = true;
        this.resetDutyForm();
        setTimeout(() => (this.showToast = false), 3000);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Failed to submit duty:', err);
      }
    });
  }

  openDetails(type: 'leave' | 'duty'): void {
    this.detailType = type;

    if (type === 'duty') {
      this.dutySlots = this.selectedDutySlots;
    }

    this.showDetailsModal = true;
  }

  viewLeaveDetails(): void {
    this.openDetails('leave');
  }

  viewDutyDetails(): void {
    this.openDetails('duty');
  }

  closeDetails(): void {
    this.showDetailsModal = false;
    this.detailType = '';
  }

  resetLeaveForm(): void {
    this.leaveName = '';
    this.leaveClass = '';
    this.leaveStart = '';
    this.leaveEnd = '';
    this.leaveReason = '';
    this.leaveFile = null;
  }

  resetDutyForm(): void {
    this.dutyName = '';
    this.dutyEvent = '';
    this.dutyDate = '';
    this.dutyFile = null;
    this.timeSlots.forEach(slot => (slot.selected = false));
  }
}
