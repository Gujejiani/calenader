import { getModalPosition } from '@utils/index';
import { Injectable, inject } from "@angular/core";
import { CalendarEvent } from "@models/calendar-event";
import { CalendarStore } from "store/calendar.store";
import { WeekDays } from "store/initial-data";
import { ModalService } from "./modal.service";
import { AddInCalendarModalComponent } from "components/addin-calendar-modal/addin-calendar-modal.component";


@Injectable({providedIn: 'root'})

export class CalendarService {

    readonly store = inject(CalendarStore);
    constructor(private modalService: ModalService){}

    getStore(){
       
        return this.store
    }

    


    updateWeekCalendar<K extends keyof CalendarEvent>(columnName: K, row: CalendarEvent, editingText: string) {
    
    
        
        const updated = structuredClone(this.store.weekCalendar()).map(((data: CalendarEvent)=>{
            if(data.id === row.id){
              
                data[columnName] = editingText as unknown as CalendarEvent[K]
              
            }

            // checks if the editing text is the same as the other days and clears them so we can add one event at time
            this.clearWeekDaysHelper(data, row, columnName, editingText)

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
      clearWeekDaysHelper(data: Partial<CalendarEvent>, row: CalendarEvent, columnName: string, editingText: string){
        Object.keys(WeekDays).forEach((key)=>{
                 
            if(!(data.id ===row.id && columnName === key)){
                if(data[key as keyof CalendarEvent] === editingText){


                    (data[key as keyof CalendarEvent]  as string ) = '';
                       
                   }
            }
           
           
        })
      }

      openModal(modalPosition: {x: number, y: number} ) {
      
        const position = getModalPosition(modalPosition)

        
        this.modalService.openPortal(
          {
            component: AddInCalendarModalComponent,
            inputs: {
                
                positionX: `${position.x}px`,
                positionY: `${position.y}px`
            },
            
            outputs: {
              closeCompModal: ()=>{
                console.log('close modal')
                this.clearSelectedDate();
                this.updateWeekCalendar('time', this.getStore().weekCalendar()[0], '');
                this.modalService.closePortal();
             
              }
              // closeModal: () => {
              //   console.log('close modal')
              // },
              // onSubmit: () => {
              //   console.log('submit')
              // }
          }
        }
         )
      }



      clearSelectedDate(){
        console.log('am called')
        const updated = structuredClone(this.store.weekCalendar()).map(((data: CalendarEvent)=>{
            
            Object.keys(WeekDays).forEach((key)=>{
                 
         
                    if(data[key as keyof CalendarEvent] === 'no title'){
                    
    
                        (data[key as keyof CalendarEvent]  as string ) = '';
                           
                }
                
               
               
            })
          return data
        }))
        
        this.store.updateWeekCalendar(
          updated
        )
      }


     
      
}