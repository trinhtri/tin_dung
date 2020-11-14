import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  isClickGuiCV  = new BehaviorSubject<boolean>(false);
  isClickHenPV = new BehaviorSubject<boolean>(false);
  isClickDiPV = new BehaviorSubject<boolean>(false);
  isClickDaNhan = new BehaviorSubject<boolean>(false);
  isClickVeMoi = new BehaviorSubject<boolean>(false);
  public readonly observableEvent_Click_GuiCV: Observable<boolean> = this.isClickGuiCV.asObservable();
  public readonly observableEvent_Click_HenPV: Observable<boolean> = this.isClickHenPV.asObservable();
  public readonly observableEvent_Click_ChuaKQ: Observable<boolean> = this.isClickDiPV.asObservable();
  public readonly observableEvent_Click_DaNhan: Observable<boolean> = this.isClickDaNhan.asObservable();
  public readonly observableEvent_Click_VeMoi: Observable<boolean> = this.isClickVeMoi.asObservable();
  constructor() { }
  clickGuiCV(status: boolean) {
    this.isClickGuiCV.next(status);
  }
  clickHenPV(click: boolean) {
    this.isClickHenPV.next(click);
  }
  clickDiPV(input) {
    this.isClickDiPV.next(input);
  }

  clickDaNhan(input) {
    this.isClickDaNhan.next(input);
  }
  clickVeMoi(input) {
    this.isClickVeMoi.next(input);
  }
}
