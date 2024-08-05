import { CalendarEventInfo } from './form-model';
export interface CalendarEvent {
    id: number;
    time: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    betweentime: string;
    bookedMeetings: CalendarEventInfo[];
  }