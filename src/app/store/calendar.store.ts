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
          if(data.id === meeting?.rowId && !(data.bookedMeetings.some((booked)=> booked?.rowId === meeting.rowId && booked.columnName !== meeting.columnName ))){
              
             data.bookedMeetings.push(meeting);
            (data[meeting.columnName as keyof CalendarEvent]  as string ) = meeting.title
          }
          return data
        })

        return  {weekCalendar: updated}
      })


    }
      
  })),
);


