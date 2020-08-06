import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProcessHTTPMsgService {
  public handleerror(error: HttpErrorResponse | any) {
    let errmsg: string;
    if (error.error instanceof ErrorEvent) {
      errmsg = error.error.message;

    }
    else {
      errmsg = `${error.status}-${error.statusText || ''} ${error.error}`;
    }
    return throwError(errmsg);
  }

  constructor() { }
}
