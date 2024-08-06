import { Component } from '@angular/core';
import { CalendarContainerComponent } from '../../containers/calendar-container/calendar-container.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CalendarContainerComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  
}
