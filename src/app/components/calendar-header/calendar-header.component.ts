import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TimePeriod } from '../../models';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [MatIcon, MatSelectModule, MatButtonModule],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderComponent {
  selectedOption = signal(TimePeriod.DAY);

  timePeriodChanged = output<TimePeriod>();

  arrowClickNext = output<boolean>();
  todayClick = output<void>();
  valueChanged(event: TimePeriod) {

    this.timePeriodChanged.emit(event);
  }

  arrowClick(next: boolean) {
    this.arrowClickNext.emit(next);
  }

  todayClicked() {
    this.todayClick.emit();
  }
}
