
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,

} from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CalendarBaseClass } from 'abstracts/calendar-base.class';
@Component({
  selector: 'app-calendar-weeks',
  standalone: true,
  imports: [MatTableModule, CommonModule, CdkDrag, CdkDropList],
  templateUrl: './calendar-weeks.component.html',
  styleUrl: './calendar-weeks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarWeeksComponent extends CalendarBaseClass {
  
  override   displayedColumns: string[] = [
    'time',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
}
