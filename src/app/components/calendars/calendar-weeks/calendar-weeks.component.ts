import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CalendarEvent } from '@models/calendar-event';
import { CalendarService } from 'services/calendar.service';
import { CalendarStore } from 'store/calendar.store';
@Component({
  selector: 'app-calendar-weeks',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './calendar-weeks.component.html',
  styleUrl: './calendar-weeks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarWeeksComponent {
  constructor(private cdf: ChangeDetectorRef, private calendarService: CalendarService){
      this.store = this.calendarService.getStore()
  }
  displayedColumns: string[] = ['time', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  editingText = 'no title'
  readonly store;
  // dataSource = signal(this.store.weekCalendar());
  




  onCellClick<K extends keyof CalendarEvent>(columnName: K, row: CalendarEvent) {
    
    
    console.log(columnName, row)
   this.calendarService.updateWeekCalendar(columnName, row, this.editingText)
       
   
    

  }
  myTrackById(_index: number, user: {id: number}) {
 
    return user.id;
  }

 
}
