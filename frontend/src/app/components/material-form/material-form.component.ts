import { Component } from '@angular/core';
import { StockService } from '..//../services/stock.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, 
    MatIconModule, MatDividerModule, MatButtonModule, CommonModule],
})

export class MaterialFormComponent {
  material = {
    nombre: '',
    codigo: '',
    cantidad: 0,
    unidadMedida: ''
  };
  successMessage: string | null = null;

  constructor(private stockService: StockService) { }

  addMaterial() {
    this.stockService.addMaterial(this.material).subscribe(response => {
      console.log('Material agregado:', response);
      this.successMessage = `Material '${this.material.nombre}' creado con éxito.`;
      this.resetForm();

      // Ocultar el mensaje después de unos segundos
      setTimeout(() => {
        this.successMessage = null;
      },3000); // 3 segundos
    });
  }

  resetForm() {
    this.material = {
      nombre: '',
      codigo: '',
      cantidad: 0,
      unidadMedida: ''
    };
  }
}
