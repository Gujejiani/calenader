import { Component } from '@angular/core';
import { CalendarHeaderComponent } from '../../components/calendar-header/calendar-header.component';
import { TimePeriod } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-container',
  standalone: true,
  imports: [CalendarHeaderComponent],
  templateUrl: './calendar-container.component.html',
  styleUrl: './calendar-container.component.scss',
})
export class CalendarContainerComponent {
  constructor(private router: Router) {}
  TIME_PERIOD = TimePeriod;
  timePeriodChanged(time: TimePeriod) {
    this.router.navigate([`/${time}`]);
  }
}
