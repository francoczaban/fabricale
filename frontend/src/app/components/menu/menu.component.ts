import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router, private authService: AuthService) { }

  aMateriales() {
    this.router.navigateByUrl("/materiales");
  }

  aMaterialesCompuestos() {
    this.router.navigateByUrl("/materiales-compuestos");
  }

  aListado() {
    this.router.navigateByUrl("/listado");
  }

  aProductos() {
    this.router.navigateByUrl("/productos");
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
