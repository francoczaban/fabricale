import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class DataTransferService {
  private data: any;
  private array: any[] = [];
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  constructor() { }

  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  clearData(): void {
    this.data = null;
  }

  sendData(data: any, array: any[]): void {
    this.dataSubject.next(data);
    this.dataSubject.next(array);
  }
}
