import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'week',
        loadComponent: () =>
          import(
            './components/calendars/calendar-weeks/calendar-weeks.component'
          ).then((m) => m.CalendarWeeksComponent),
      },
      {
        path: 'month',
        loadComponent: () =>
          import(
            './components/calendars/calendar-month/calendar-month.component'
          ).then((m) => m.CalendarMonthComponent),
      },
      {
        path: 'day',
        loadComponent: () =>
          import(
            './components/calendars/calendar-days/calendar-days.component'
          ).then((m) => m.CalendarDaysComponent),
      },
    ],
    
  },
];
