import { Component } from '@angular/core';
import { CalendarContainerComponent } from '../../containers/calendar-container/calendar-container.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CalendarContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
