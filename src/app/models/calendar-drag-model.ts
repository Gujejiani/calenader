import { CalendarEvent } from '.';

export interface CalendarDragInfoModel {
  prevRow: CalendarEvent | null;
  prevColumnName: string;

  movedTo: CalendarEvent | null;
  movedToColumnName: string;
}
