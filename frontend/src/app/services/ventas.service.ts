import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})

export class VentasService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL a la de tu backend

  constructor(private http: HttpClient) { }

  addVenta(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ventas`, data);
  }

  getVentas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas`);
  }

}
