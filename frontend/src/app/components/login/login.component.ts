import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
      this.authService.login(this.email, this.password).subscribe({
          next: (res) => {
              localStorage.setItem('token', res.token);
              this.router.navigate(['/listado']);
          },
          error: (err) => alert('Error de autenticación')
      });
  }
}
