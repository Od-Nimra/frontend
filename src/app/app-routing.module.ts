import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './home/home.component';
import { TimetableComponent } from './timetable/timetable.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { AbsenceApplicationComponent } from './absence-application/absence-application.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';

// 🔐 Import auth components directly
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { ForgotpassComponent } from './auth/forgotpass/forgotpass.component';

const routes: Routes = [

  // 🔐 Auth Routes (outside layout)
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgotpass', component: ForgotpassComponent },
   { path: 'dashboard', component: DashboardLayoutComponent},

    // 🌐 Default route redirects to login
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  // 🏠 Student Dashboard Layout
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'timetable', component: TimetableComponent },
      { path: 'events', component: EventsListComponent },
      { path: 'events/:id', component: EventDetailsComponent },
      { path: 'absence', component: AbsenceApplicationComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },

  // 🧭 Wildcard - Redirect unknown paths to login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
