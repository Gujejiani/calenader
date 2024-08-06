import { CalendarDragInfoModel, CalendarEvent } from '@models/index';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  QueryList,
  ElementRef,
  ViewChild,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CalendarService } from 'services/calendar.service';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { dropCalculation } from '@utils/utils';
@Component({
  selector: 'app-calendar-weeks',
  standalone: true,
  imports: [MatTableModule, CommonModule, CdkDrag, CdkDropList],
  templateUrl: './calendar-weeks.component.html',
  styleUrl: './calendar-weeks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarWeeksComponent {
  readonly store;

  constructor(
    private cdf: ChangeDetectorRef,
    private calendarService: CalendarService,
  ) {
    this.store = this.calendarService.getStore();
  }
  @ViewChildren('calendarCell') calendarCells: QueryList<ElementRef> | null =
    null;

  displayedColumns: string[] = [
    'time',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
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

  onCellClick<K extends keyof CalendarEvent>(
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

    this.calendarService.updateWeekCalendar(columnName, row, this.editingText);

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
