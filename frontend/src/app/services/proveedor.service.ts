import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los proveedores
  getProveedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores`);
  }

  // Crear un nuevo proveedor
  addProveedor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/proveedores`, data);
  }

  // Obtener un proveedor por ID
  getProveedorById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores/${id}`);
  }

  // Actualizar un proveedor
  updateProveedor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/proveedores/${id}`, data);
  }

  // Eliminar un proveedor
  deleteProveedor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/proveedores/${id}`);
  }
}
