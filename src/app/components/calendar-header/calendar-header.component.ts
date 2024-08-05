import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [MatIcon, MatSelectModule, MatButtonModule],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss'
})
export class CalendarHeaderComponent {
  selectedOption= 'month';
}
