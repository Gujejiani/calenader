import { Injectable, inject } from "@angular/core";
import { CalendarEvent } from "@models/calendar-event";
import { CalendarStore } from "store/calendar.store";
import { WeekDays } from "store/initial-data";


@Injectable({providedIn: 'root'})

export class CalendarService {

    readonly store = inject(CalendarStore);


    getStore(){
       
        return this.store
    }

    


    updateWeekCalendar<K extends keyof CalendarEvent>(columnName: K, row: CalendarEvent, editingText: string) {
    
    
        
        const updated = structuredClone(this.store.weekCalendar()).map(((data: CalendarEvent)=>{
            if(data.id === row.id){
              
                data[columnName] = editingText as unknown as CalendarEvent[K]
              
            }

            // checks if the editing text is the same as the other days and clears them so we can add one event at time
            this.clearWeekDays(data, row, columnName, editingText)

            return data
          }))
          
          this.store.updateWeekCalendar(
            updated
          )
       
        
    
      }

      /**
       * 
       * @param data  the data to be updated
       * @param row  the row to be updated
       * @param columnName  the column name to be updated
       * @param editingText 
       */
      clearWeekDays(data: CalendarEvent, row: CalendarEvent, columnName: string, editingText: string){
        Object.keys(WeekDays).forEach((key)=>{
                 
            if(!(data.id ===row.id && columnName === key)){
                if(data[key as keyof CalendarEvent] === editingText){


                    (data[key as keyof CalendarEvent]  as string ) = '';
                       
                   }
            }
           
           
        })
      }
}