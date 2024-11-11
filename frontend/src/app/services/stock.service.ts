import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL a la de tu backend

  constructor(private http: HttpClient) { }

  // Métodos para materialescd
  getMateriales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materiales`);
  }

  // Método de búsqueda genérico
  search(type: 'materiales' | 'materiales-compuestos' | 'productos', query: string): Observable<any> {
    let params = new HttpParams().set('q', query); // Parámetro de búsqueda
    
    // Realiza la búsqueda dependiendo del tipo
    return this.http.get(`${this.apiUrl}/${type}`, { params });
  }

  addMaterial(data: any): Observable<any> {
    console.log("ALGO SALE: ", data);
    return this.http.post(`${this.apiUrl}/materiales`, data);
  }

  updateMaterial(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/materiales/${id}`, data);
  }

  deleteMaterial(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materiales/${id}`);
  }

  // Métodos para materiales compuestos
  getMaterialesCompuestos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materiales-compuestos`);
  }

  addMaterialCompuesto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/materiales-compuestos`, data);
  }

  deleteMaterialCompuesto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materiales-compuestos/${id}`);
  }

  // Métodos para productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  addProducto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, data);
  }
}
