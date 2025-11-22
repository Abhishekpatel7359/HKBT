import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(
    private http: HttpClient,
  ) { }



  getWebService(serviceURL: string): Observable<any> {
    const url = serviceURL;
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.handleError));
  }

  
 
  
  
  async getlocalStorage(dbname: any) {
    const localdata = localStorage.getItem(dbname);
    const localstoragedata = localdata !== null ? JSON.parse(localdata) : ''
    return localstoragedata
  }



  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }





}
