import { CalendarEventInfo } from '@models/form-model';
import { CalendarEvent } from '@models/calendar-event';
import { patchState, signalStore, withMethods, withState, } from '@ngrx/signals';
import { weekCalendarInitialData } from './initial-data';


type CalendarState = {
  weekCalendar: CalendarEvent[];
  
};

const initialState: CalendarState = {
  weekCalendar: weekCalendarInitialData,
 
};

export const CalendarStore = signalStore(
    {providedIn: 'root'},
  withState(initialState),
  withMethods((store) => ({
    updateWeekCalendar(weekCalendar: CalendarEvent[]) {
      patchState(store, (state) => {
      
  
        // Construct the updated state
        const updatedState = {
          ...state,
          weekCalendar // Assuming you want to replace the entire weekCalendar
        };
  
        // console.log('updated state ', updatedState.weekCalendar);
  
        // Return the updated state
        return { weekCalendar: updatedState.weekCalendar };
      });
    },
    addMeeting(meeting: CalendarEventInfo) {


      patchState(store, (state)=>{

        const updated =  structuredClone(state.weekCalendar).map((data)=>{
          let updatingColumnName = ''
          const foundIndex = data.bookedMeetings.findIndex((booked)=> {
            if(booked?.rowId === meeting.rowId && booked.columnName === meeting.columnName){
            
              updatingColumnName = booked.columnName
              return true
            }
            return false
          
          } )

          console.log('already added ', data.id === meeting.rowId && foundIndex !==-1)
          // check if the meeting is already added
          if(data.id === meeting.rowId && foundIndex ===-1){
              
             data.bookedMeetings.push(meeting);
            (data[meeting.columnName as keyof CalendarEvent]  as string ) = meeting.title

            // if the meeting is already added update the meeting
          }else if(data.id === meeting.rowId && foundIndex !==-1){
             data.bookedMeetings.splice(foundIndex, 1)
             data.bookedMeetings.push(meeting);
             console.log('updated meeting', data.bookedMeetings);
              (data[updatingColumnName as keyof CalendarEvent]  as string ) = meeting.title
           
          }
          return data
        })
        console.log('added meeting',updated)

        return  {weekCalendar: updated}
      })


    }
      
  })),
);


