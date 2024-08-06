import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CalendarEvent } from '@models/calendar-event';
import { CalendarService } from 'services/calendar.service';
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
  


  determineIfBooked(columnName: string,row: CalendarEvent){

    return row.bookedMeetings.some((meeting)=> meeting.rowId === row.id && meeting.columnName === columnName)

  

  }


  onCellClick<K extends keyof CalendarEvent>($event: MouseEvent, columnNameInfo: K, row: CalendarEvent) {
 
    let columnName = columnNameInfo 


    // we are using time as the column name but we want to update the monday column
    if(columnName === 'time'){
        columnName='monday' as unknown as K
     
    }

    
  this.calendarService.updateWeekCalendar(columnName, row, this.editingText)
       
  this.calendarService.openModal({
    x: $event.clientX,
    y:  $event.clientY,
    row,
    columnName
  })
    
  

  }
  myTrackById(_index: number, user: {id: number}) {
 
    return user.id;
  }

 
}
