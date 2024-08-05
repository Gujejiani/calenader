import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-addin-calendar-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addin-calendar-modal.component.html',
  styleUrl: './addin-calendar-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInCalendarModalComponent {
  meetingForm: FormGroup = new FormGroup({});
 

  @Input() positionX = '400px';
  @Input() positionY = '400px';

  constructor(private fb: FormBuilder) {}
  closeCompModal = output()

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: ['']
    });

    
  }

  onSubmit(){
    console.log(this.positionX)
    console.log(this.meetingForm.value);
  }
  closeModal(){
  

    this.closeCompModal.emit();
    console.log('close modal');
  }
}
