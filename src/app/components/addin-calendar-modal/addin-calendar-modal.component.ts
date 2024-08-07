import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  input,
  output,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarEvent } from '@models/calendar-event';
import { CalendarEventInfo } from '@models/form-model';
import { Subject, debounceTime, delay, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-addin-calendar-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addin-calendar-modal.component.html',
  styleUrl: './addin-calendar-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInCalendarModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('titleInput') titleInput: ElementRef<HTMLInputElement> | null =
    null;
  meetingForm: FormGroup = new FormGroup({});
  private destroy$ = new Subject<void>();
  positionX = input('400px');
  positionY = input('400px');
  startTime = input('12:00');
  endTime = input('12:00');
  row: CalendarEvent | null = null;
  columnName = '';
  modalName = ''
  constructor(private fb: FormBuilder, private cdf: ChangeDetectorRef) {}
  closeCompModal = output();

  updateMode = false;

  submitForm = output<CalendarEventInfo>();
  deleteMeeting = output<void>();
  ngOnInit(): void {
    this.handleFormInitialization();


    // Listen to form changes
      this.meetingForm.valueChanges.pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      ).subscribe(values => {
        console.log('Form values changed:', values);
      });
  
      // Simulating fetching data with RxJS
      this.fetchInitialData().pipe(
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.modalName = data.modalTitle;
        console.log('Fetched data:', data);
        this.cdf.detectChanges();
   
      });
  }

  ngAfterViewInit(): void {
    if (this.titleInput) {
      this.titleInput.nativeElement.focus();
    }
  }



  handleFormInitialization(){
    const found = this.row?.bookedMeetings.find(
      (booked) =>
        booked?.rowId === this.row?.id && booked.columnName === this.columnName,
    );

    if (found) {
      this.updateMode = true;
    }
    
    if (this.titleInput) {
      this.titleInput.nativeElement.focus();
    }
    this.meetingForm = this.fb.group({
      title: [this.updateMode ? found?.title : '', Validators.required],
      start: [this.startTime, Validators.required],
      end: [this.endTime, Validators.required],
      columnName: [this.columnName],
      rowId: [this.row?.id],
      
      description: [this.updateMode ? found?.description : ''],
    });
  }
  onSubmit() {
  
   
    this.submitForm.emit(this.meetingForm.value);
  }
  closeModal() {
    this.closeCompModal.emit();
   
  }

   
    fetchInitialData() {
      return of({ modalTitle: 'Add meeting' }).pipe(
        delay(500) // Simulating network delay
      );
    }
  deleteAppointment(){
    this.deleteMeeting.emit();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
