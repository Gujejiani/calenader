import { inject } from '@angular/core';
import { CalendarDragInfoModel } from './../models/calendar-drag-model';
import { CalendarEventInfo } from '@models/form-model';
import { CalendarEvent } from '@models/calendar-event';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { HttpCalendarService } from 'http-services/http-calendar.service';
import { catchError, map, of } from 'rxjs';


type CalendarState = {
  weekCalendar: CalendarEvent[];
};

const initialState: CalendarState = {
  weekCalendar: [],
};

export const CalendarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withHooks({
    onInit(store,calendarService = inject(HttpCalendarService) ) {
   
      calendarService.getMeetingsData().pipe(
        map(res => res.weekCalendarInitialData), // Transform response if necessary
        catchError(error => {
          console.error('Error fetching meetings data', error);
          return of([]); // Return an empty array or handle the error as needed
        })
      ).subscribe(weekCalendar => {
        patchState(store, (state) => ({
          ...state,
          weekCalendar
        }));
        console.log('Fetched data:', weekCalendar);
      });
      
    },
  }),
  withMethods((store) => ({
    updateWeekCalendar(weekCalendar: CalendarEvent[]) {
      patchState(store, (state) => {
        // Construct the updated state
        const updatedState = {
          ...state,
          weekCalendar, // Assuming you want to replace the entire weekCalendar
        };

        

        // Return the updated state
        return { weekCalendar: updatedState.weekCalendar };
      });
    },
    addMeeting(meeting: CalendarEventInfo) {
      patchState(store, (state) => {
        //
        const updated = structuredClone(state.weekCalendar).map((data) => {
          let updatingColumnName = '';
          const foundIndex = data.bookedMeetings.findIndex((booked) => {
            if (
              booked?.rowId === meeting.rowId &&
              booked.columnName === meeting.columnName
            ) {
              updatingColumnName = booked.columnName;
              return true;
            }
            return false;
          });

          // check if the meeting is already added
          if (data.id === meeting.rowId && foundIndex === -1) {
            data.bookedMeetings.push(meeting);
            (data[meeting.columnName as keyof CalendarEvent] as string) =
              meeting.title;

            // if the meeting is already added update the meeting
          } else if (data.id === meeting.rowId && foundIndex !== -1) {
            data.bookedMeetings.splice(foundIndex, 1);
            data.bookedMeetings.push(meeting);
           
            (data[updatingColumnName as keyof CalendarEvent] as string) =
              meeting.title;
          }
          
          return data;
        });

    

        return { weekCalendar: updated };
      });
    },

    moveWithDragAndDrop(dragInfo: CalendarDragInfoModel) {
      patchState(store, (state) => {
        const calendarDepCopy = structuredClone(state.weekCalendar);

        const prevRow = calendarDepCopy.find(
          (data) => data.id === dragInfo.prevRow?.id,
        );

        // get booking
        const bookingIndex = prevRow?.bookedMeetings.findIndex(
          (booked) =>
            booked.rowId === prevRow?.id &&
            booked.columnName === dragInfo.prevColumnName,
        );

        if (bookingIndex === -1) return state;
        const booking = [
          prevRow?.bookedMeetings[bookingIndex as number],
        ] as CalendarEventInfo[];

        // delete booking from previous row
        prevRow?.bookedMeetings.splice(bookingIndex as number, 1);

        // get the row to move to
        const movedToRow = calendarDepCopy.find(
          (data) => data.id === dragInfo.movedTo?.id,
        );
    

        // update  moving booking data
        if (booking.length) {
          booking[0].columnName = dragInfo.movedToColumnName;
          booking[0].rowId = dragInfo.movedTo?.id as number;

          // add booking to the moved to row
          movedToRow?.bookedMeetings.push(booking[0]);

          if (movedToRow) {
            (movedToRow[
              dragInfo.movedToColumnName as keyof CalendarEvent
            ] as string) = booking[0].title;
          }
          if (prevRow) {
            (prevRow[
              dragInfo.prevColumnName as keyof CalendarEvent
            ] as string) = '';
          }
        }

        return { ...state, weekCalendar: calendarDepCopy };
      });
    },
    deleteMeeting(rowId: number, columnName: string) {
      patchState(store, (state) => {
        const calendarDepCopy = structuredClone(state.weekCalendar);

        const row = calendarDepCopy.find((data) => data.id === rowId);

        if(row){
          ( row[columnName as keyof CalendarEvent] as string) = '';
          row.bookedMeetings = row.bookedMeetings.filter(
            (booked) => booked.columnName !== columnName,
          );
        }

     


        return { weekCalendar: calendarDepCopy };
      });
    }
  })),
);
