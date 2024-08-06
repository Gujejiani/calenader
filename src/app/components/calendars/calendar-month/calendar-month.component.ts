import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-calendar-month',
  standalone: true,
  imports: [],
  templateUrl: './calendar-month.component.html',
  styleUrl: './calendar-month.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthComponent {}
