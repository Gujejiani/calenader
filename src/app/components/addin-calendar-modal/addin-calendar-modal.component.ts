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
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarEvent } from '@models/calendar-event';
import { CalendarEventInfo } from '@models/form-model';

@Component({
  selector: 'app-addin-calendar-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addin-calendar-modal.component.html',
  styleUrl: './addin-calendar-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInCalendarModalComponent implements OnInit, AfterViewInit {
  @ViewChild('titleInput') titleInput: ElementRef<HTMLInputElement> | null =
    null;
  meetingForm: FormGroup = new FormGroup({});

  positionX = input('400px');
  positionY = input('400px');
  startTime = input('12:00');
  endTime = input('12:00');
  row: CalendarEvent | null = null;

  columnName = '';
  constructor(private fb: FormBuilder) {}
  closeCompModal = output();

  updateMode = false;

  submitForm = output<CalendarEventInfo>();
  ngOnInit(): void {
    const found = this.row?.bookedMeetings.find(
      (booked) =>
        booked?.rowId === this.row?.id && booked.columnName === this.columnName,
    );

    if (found) {
      this.updateMode = true;
    }
    this.meetingForm = this.fb.group({
      title: [this.updateMode ? found?.title : '', Validators.required],
      start: [this.startTime, Validators.required],
      end: [this.endTime, Validators.required],
      columnName: [this.columnName],
      rowId: [this.row?.id],
      description: [this.updateMode ? found?.description : ''],
    });
    if (this.titleInput) {
      this.titleInput.nativeElement.focus();
    }
  }

  ngAfterViewInit(): void {
    if (this.titleInput) {
      this.titleInput.nativeElement.focus();
    }
  }
  onSubmit() {
  
   
    this.submitForm.emit(this.meetingForm.value);
  }
  closeModal() {
    this.closeCompModal.emit();
   
  }
}