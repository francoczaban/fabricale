// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    // Iniciar sesión y guardar el token en el almacenamiento local
    login(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            this.http.post<{ token: string }>(`${this.apiUrl}/register/login`, { email, password }).subscribe(
                response => {
                    if (response.token) {
                        localStorage.setItem('token', response.token); // Guarda el token
                        observer.next(response);
                    } else {
                        observer.error('No se recibió un token.');
                    }
                },
                error => observer.error(error)
            );
        });
    }

    // Registro de usuario
    register(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, { email, password });
    }

    // Verificar si el usuario está autenticado
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token'); // Verifica si existe el token
    }

    // Cerrar sesión y eliminar el token
    logout(): void {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    }
}
