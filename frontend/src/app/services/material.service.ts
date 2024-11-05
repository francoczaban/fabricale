import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:3000/api/materiales';

  constructor(private http: HttpClient) {}

  // Obtener materiales existentes
  getMateriales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
