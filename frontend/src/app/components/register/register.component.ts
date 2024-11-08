import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [CommonModule, FormsModule, RouterLink]
})
export class RegisterComponent {
    email = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) {}

    onRegister(): void {
        this.authService.register(this.email, this.password).subscribe({
            next: (res) => {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                this.router.navigate(['/login']);
            },
            error: (err) => alert('Error en el registro: ' + err.error.message || 'Error desconocido')
        });
        console.log("email", this.email);
        console.log("password", this.password);
    }
}
