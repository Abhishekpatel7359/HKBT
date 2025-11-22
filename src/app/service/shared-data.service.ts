import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private servicesSubject = new BehaviorSubject<any>(null);
  private industriesSubject = new BehaviorSubject<any>(null);
  private productSubject = new BehaviorSubject<any>(null);

  services$ = this.servicesSubject.asObservable();
  industries$ = this.industriesSubject.asObservable();
  product$ = this.productSubject.asObservable();


  set services(data: any) {
    this.servicesSubject.next(data);
  }

  set industries(data: any) {
    this.industriesSubject.next(data);
  }
  set product(data: any) {  // New setter for products
    this.productSubject.next(data);
  }
}
