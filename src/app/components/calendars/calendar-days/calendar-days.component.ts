import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, QueryList, SimpleChanges, ViewChildren, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CalendarBaseClass } from 'abstracts/calendar-base.class';




@Component({
  selector: 'app-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule, CdkDrag, CdkDropList],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalendarDaysComponent extends CalendarBaseClass implements AfterViewInit, OnChanges {


  @Input()  day='monday'



  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes ', changes)
    this.displayedColumns = ['time', changes['day'].currentValue]
    this.changeDetectorRef.detectChanges()

  }

  
 

 override displayedColumns: string[] = [
     'time',
    'monday',
 
  ];

  ngAfterViewInit(): void {
      
   
  }

 

 

  






}
