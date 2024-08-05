import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CalendarEvent } from '@models/calendar-event';
@Component({
  selector: 'app-calendar-weeks',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './calendar-weeks.component.html',
  styleUrl: './calendar-weeks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarWeeksComponent {
  displayedColumns: string[] = ['time', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  editingText = 'no title'
  dataSource = signal<CalendarEvent[]>([
    { id: 1, time: '00 AM', monday: 'Meeting', tuesday: '', wednesday: '', thursday: 'Project Work', friday: '', saturday: '', sunday: '', betweentime: '12 - 1 AM', selected: false },
    { id: 2, time: '1 AM', monday: 'Meeting', tuesday: '', wednesday: '', thursday: 'Project Work', friday: '', saturday: '', sunday: '', betweentime: '1 - 2 AM', selected: false },
    { id: 3, time: '2 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '2 - 3 AM', selected: false },
    { id: 4, time: '3 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '3 - 4 AM', selected: false },
    { id: 5, time: '4 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '4 - 5 AM', selected: false },
    { id: 6, time: '5 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '5 - 6 AM', selected: false },
    { id: 7, time: '6 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '6 - 7 AM', selected: false },
    { id: 8, time: '7 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '7 - 8 AM', selected: false },
    { id: 9, time: '8 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '8 - 9 AM', selected: false },
    { id: 10, time: '9 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '9 - 10 AM', selected: false },
    { id: 11, time: '10 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '10 - 11 AM', selected: false },
    { id: 12, time: '11 AM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '11 AM - 12 PM', selected: false },
    { id: 13, time: '12 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '12 - 1 PM', selected: false },
    { id: 14, time: '1 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '1 - 2 PM', selected: false },
    { id: 15, time: '2 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '2 - 3 PM', selected: false },
    { id: 16, time: '3 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '3 - 4 PM', selected: false },
    { id: 17, time: '4 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '4 - 5 PM', selected: false },
    { id: 18, time: '5 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '5 - 6 PM', selected: false },
    { id: 19, time: '6 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '6 - 7 PM', selected: false },
    { id: 20, time: '7 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '7 - 8 PM', selected: false },
    { id: 21, time: '8 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '8 - 9 PM', selected: false },
    { id: 22, time: '9 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '9 - 10 PM', selected: false },
    { id: 23, time: '10 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '10 - 11 PM', selected: false },
    { id: 24, time: '11 PM', monday: '', tuesday: 'Call', wednesday: '', thursday: '', friday: '', saturday: '', sunday: 'Family Time', betweentime: '11 PM - 12 AM', selected: false }
  ]);
  




  onCellClick<K extends keyof CalendarEvent>(columnName: K, row: CalendarEvent) {
    
    
    console.log(columnName, row)
    this.dataSource.set( this.dataSource().map((data=>{
      if(data.id === row.id){
        
          data[columnName] = this.editingText as unknown as CalendarEvent[K]
        
      }
      return data
    })))

  }
  myTrackById(_index: number, user: {id: number}) {
 
    return user.id;
  }

 
}
