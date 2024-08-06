import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  ElementRef,
  Injectable,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CalendarDragInfoModel } from '@models/calendar-drag-model';
import { CalendarEvent } from '@models/calendar-event';
import { dropCalculation } from '@utils/utils';
import { CalendarService } from 'services/calendar.service';

@Injectable()
export abstract class CalendarBaseClass {
  readonly store;

  constructor(
    protected calendarService: CalendarService,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    this.store = this.calendarService.getStore();
  }
  @ViewChildren('calendarCell') calendarCells: QueryList<ElementRef> | null =
    null;

  displayedColumns: string[] = ['monday'];
  isDragging = false;
  editingText = 'no title';

  draggingItemInfo: { row: CalendarEvent | null; columnName: string } = {
    row: null,
    columnName: '',
  };

  timer: any = null;

  // dataSource = signal(this.store.weekCalendar());
  onDragStart(row: CalendarEvent, columnName: string) {
    this.draggingItemInfo = { row, columnName };
    this.isDragging = true;
  }

  onDragEnd() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.isDragging = false;
    }, 2000);
  }

  determineIfBooked(columnName: string, row: CalendarEvent) {
    return row.bookedMeetings.some(
      (meeting) =>
        meeting.rowId === row.id && meeting.columnName === columnName,
    );
  }

  onCellClick<K extends keyof CalendarEvent | string>(
    $event: MouseEvent,
    columnNameInfo: K,
    row: CalendarEvent,
  ) {
    if (this.isDragging) {
      this.handleDrag(row, columnNameInfo);

      return;
    }

    let columnName = columnNameInfo;

    // we are using time as the column name but we want to update the monday column
    if (columnName === 'time') {
      columnName = 'monday' as unknown as K;
    }

    this.calendarService.updateWeekCalendar(
      columnName as keyof CalendarEvent,
      row,
      this.editingText,
    );

    this.calendarService.openModal({
      x: $event.clientX,
      y: $event.clientY,
      row,
      columnName,
    });
  }

  handleDrag(row: CalendarEvent, columnNameInfo: string) {
    const dragInfo: CalendarDragInfoModel = {
      prevRow: this.draggingItemInfo.row,
      prevColumnName: this.draggingItemInfo.columnName,
      movedTo: row,
      movedToColumnName: columnNameInfo,
    };

    this.calendarService.updateStateOnDrop(dragInfo);
  }
  myTrackById(_index: number, user: { id: number }) {
    return user.id;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.calendarCells) {
      dropCalculation(event, this.calendarCells);
    }
  }
}
