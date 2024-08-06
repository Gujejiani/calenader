import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input,OnInit, AfterViewInit, ViewChild, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarEvent } from '@models/calendar-event';
import { CalendarEventInfo } from '@models/form-model';

@Component({
  selector: 'app-addin-calendar-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addin-calendar-modal.component.html',
  styleUrl: './addin-calendar-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInCalendarModalComponent implements OnInit, AfterViewInit {

  @ViewChild('titleInput') titleInput: ElementRef<HTMLInputElement> | null = null;
  meetingForm: FormGroup = new FormGroup({});
 
   positionX = input('400px');
   positionY = input('400px');
   startTime = input('12:00');
   endTime = input('12:00');
   rowId= input(0)
   
  columnName = input('name')
  constructor(private fb: FormBuilder) {}
  closeCompModal = output()

  submitForm = output<CalendarEventInfo>()
  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      title: ['', Validators.required],
      start: [this.startTime, Validators.required],
      end: [this.endTime, Validators.required],
      columnName: [this.columnName],
      rowId: [this.rowId],
      description: ['']
    });
    if(this.titleInput){
      this.titleInput.nativeElement.focus();
    }
    
  }

  ngAfterViewInit(): void {
    if(this.titleInput){
      this.titleInput.nativeElement.focus();
    }
  }
  onSubmit(){
    console.log(this.positionX)
    console.log(this.meetingForm.value);
    this.submitForm.emit(this.meetingForm.value);
  }
  closeModal(){
  

    this.closeCompModal.emit();
    console.log('close modal');
  }
}
