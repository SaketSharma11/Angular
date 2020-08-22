import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../shared/feedback';
import { Observable, throwError } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private phms: ProcessHTTPMsgService) { }
  submitFeedback(data: Feedback[]): Observable<Feedback[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback[]>(baseURL + 'feedback', data, httpOptions).pipe(catchError(this.phms.handleerror));
  }
}
