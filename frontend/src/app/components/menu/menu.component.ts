import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router) { }

  aMateriales() {
    this.router.navigateByUrl("/materiales");
  }
  
  aMaterialesCompuestos() {
    this.router.navigateByUrl("/materiales-compuestos");
  }

  aListado(){
    this.router.navigateByUrl("/listado");
  }

  aProductos(){
    this.router.navigateByUrl("/productos");
  }
}
