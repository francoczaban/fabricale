import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StockService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL a la de tu backend

  constructor(private http: HttpClient) { }

  // Métodos para materiales
  getMateriales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materiales`);
  }

  addMaterial(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/materiales`, data);
  }

  updateMaterial(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/materiales/${id}`, data);
  }

  deleteMaterial(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materiales/${id}`);
  }

  addCantidadMaterial(id: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/materiales/${id}`, data);
  }

  getStockByMaterial(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/materiales/${id}/stock`);
  }

  // Métodos para materiales compuestos
  // getMaterialesCompuestos(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/materiales-compuestos`);
  // }
 
  // addMaterialCompuesto(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/materiales-compuestos`, data);
  // }

  // updateMaterialCompuesto(id: string, data: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/materiales-compuestos/${id}`, data);
  // }

  // deleteMaterialCompuesto(id: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/materiales-compuestos/${id}`);
  // }

  addMaterialCompuesto(materialCompuesto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/materiales-compuestos`, materialCompuesto);
  }

  getMaterialesCompuestos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materiales-compuestos`);
  }

  updateMaterialCompuesto(id: string, materialCompuesto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/materiales-compuestos/${id}`, materialCompuesto);
  }

  deleteMaterialCompuesto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materiales-compuestos/${id}`);
  }

  // Métodos para productos
  // getProductos(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/productos`);
  // }

  // addProducto(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/productos`, data);
  // }

  // updateProducto(id: string, data: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/productos/${id}`, data);
  // }

  // deleteProducto(id: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/productos/${id}`);
  // }

  // Métodos para productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  addProducto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, data);
  }

  updateProducto(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, data);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`);
}

}
