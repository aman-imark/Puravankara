import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();

  private dataObserved2 = new BehaviorSubject<any>('');
  currentEvent2 = this.dataObserved2.asObservable();

  constructor() { }


  publish(param):void {
    this.dataObserved.next(param);
  }


  fcmPublish(param):void {
    this.dataObserved2.next(param);
  }


}
