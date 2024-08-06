import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalendarHeaderComponent } from '../../components/calendar-header/calendar-header.component';
import { TimePeriod } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendar-container',
  standalone: true,
  imports: [CalendarHeaderComponent],
  templateUrl: './calendar-container.component.html',
  styleUrl: './calendar-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarContainerComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  TIME_PERIOD = TimePeriod;
  timePeriodChanged(time: TimePeriod) {
    this.router.navigate([`/${time}`]);
  }

  
  


  arrowClickNext(next: boolean){
    const queryParams = this.route.snapshot.queryParams;
    let day = queryParams['day'] ?? 'monday'
   const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
   const index = days.indexOf(day);

   let nextDay = day;

   if(next && nextDay !== 'sunday'){
      nextDay = days[index + 1]
   }
    if(!next && nextDay !== 'monday'){
      nextDay = days[index - 1]
    }


    this.router.navigate([], {
      queryParams: { day: nextDay },
      queryParamsHandling: 'merge',
    });
  }
}
