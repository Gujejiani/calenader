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
  
        console.log('updated state ', updatedState.weekCalendar);
  
        // Return the updated state
        return { weekCalendar: updatedState.weekCalendar };
      });
    }
  })),
);


