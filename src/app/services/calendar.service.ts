import { getModalPosition, parseBetweentime } from '@utils/index';
import { Injectable, inject } from '@angular/core';
import { CalendarEvent } from '@models/calendar-event';
import { CalendarStore } from 'store/calendar.store';
import { WeekDays } from 'store/initial-data';
import { ModalService } from './modal.service';
import { AddInCalendarModalComponent } from 'components/addin-calendar-modal/addin-calendar-modal.component';
import { CalendarDragInfoModel } from '@models/calendar-drag-model';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  readonly store = inject(CalendarStore);
  constructor(private modalService: ModalService) {}

  getStore() {
    return this.store;
  }

  updateWeekCalendar<K extends keyof CalendarEvent>(
    columnName: K,
    row: CalendarEvent,
    editingText: string,
  ) {
    const updated = structuredClone(this.store.weekCalendar()).map(
      (data: CalendarEvent) => {
        if (data.id === row.id) {
          data[columnName] = editingText as unknown as CalendarEvent[K];
        }

        // checks if the editing text is the same as the other days and clears them so we can add one event at time
        this.clearWeekDaysHelper(data, row, columnName, editingText);

        return data;
      },
    );

    this.store.updateWeekCalendar(updated);
  }

  /**
   *
   * @param data  the data to be updated
   * @param row  the row to be updated
   * @param columnName  the column name to be updated
   * @param editingText
   */
  clearWeekDaysHelper(
    data: Partial<CalendarEvent>,
    row: CalendarEvent,
    columnName: string,
    editingText: string,
  ) {
    Object.keys(WeekDays).forEach((key) => {
      if (!(data.id === row.id && columnName === key)) {
        if (data[key as keyof CalendarEvent] === editingText) {
          (data[key as keyof CalendarEvent] as string) = '';
        }
      }
    });
  }

  openModal(modaldata: {
    x: number;
    y: number;
    row: CalendarEvent;
    columnName: string;
  }) {
    const position = getModalPosition(modaldata);
    const { startTime, endTime } = parseBetweentime(modaldata.row.betweentime);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format

    this.modalService.openPortal({
      component: AddInCalendarModalComponent,
      inputs: {
        positionX: `${position.x}px`,
        positionY: `${position.y}px`,
        startTime: `${today}T${startTime}`,
        endTime: `${today}T${endTime}`,
        row: modaldata.row,
        columnName: modaldata.columnName,
      },

      outputs: {
        closeCompModal: () => {
         
          this.clearSelectedDate(modaldata.row.id, modaldata.columnName);
          this.updateWeekCalendar(
            'time',
            this.getStore().weekCalendar()[0],
            '',
          );
          this.modalService.closePortal();
        },
        submitForm: <CalendarBookedEventInfo>(
          data: CalendarBookedEventInfo,
        ) => {
          this.store.addMeeting(data as any);
          this.modalService.closePortal();
        },
        
        deleteMeeting: ()=>{
          this.store.deleteMeeting(modaldata.row.id, modaldata.columnName);
          this.modalService.closePortal();
        }
        
      },
    });
  }

  clearSelectedDate(rowId: number, columnName: string) {
   
    const updated = structuredClone(this.store.weekCalendar()).map(
      (data: CalendarEvent) => {
        Object.keys(WeekDays).forEach((key) => {   
          if (data[key as keyof CalendarEvent] === 'no title') {
            (data[key as keyof CalendarEvent] as string) = '';
          }

          if (data.id === rowId && key === columnName) {
            const meeting = data.bookedMeetings.find(meeting => meeting.rowId === rowId && meeting.columnName === columnName);
            if(meeting){
              (data[key as keyof CalendarEvent] as string) = meeting.title;
            }
           
          }

          
        });
        return data;
      },
    );

    this.store.updateWeekCalendar(updated);
  }

  updateStateOnDrop(dragInfo: CalendarDragInfoModel) {
    this.store.moveWithDragAndDrop(dragInfo);
  }
}
