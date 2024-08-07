import { Observable } from 'rxjs';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CalendarEvent } from '@models/calendar-event';



@Injectable({providedIn: 'root'})

export class HttpCalendarService {

    constructor(private httpClient: HttpClient){}

    getMeetingsData() : Observable<{weekCalendarInitialData:  CalendarEvent[]}> {

        return this.httpClient.get('https://gujejiani.github.io/calenader/mock/meetings.json') as Observable<{weekCalendarInitialData:  CalendarEvent[]}>;
    }
}