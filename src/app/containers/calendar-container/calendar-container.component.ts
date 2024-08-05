import { Component } from '@angular/core';
import { CalendarHeaderComponent } from '../../components/calendar-header/calendar-header.component';

@Component({
  selector: 'app-calendar-container',
  standalone: true,
  imports: [CalendarHeaderComponent],
  templateUrl: './calendar-container.component.html',
  styleUrl: './calendar-container.component.scss'
})
export class CalendarContainerComponent {

}
