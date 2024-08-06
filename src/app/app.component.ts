import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
        this.router.navigate(['/day']);
  }
  title = 'calendar-application';
}
