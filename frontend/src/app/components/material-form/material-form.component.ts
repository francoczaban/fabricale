import { Component } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ProveedorService } from '../../services/proveedor.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css',
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule,
    MatIconModule, MatDividerModule, MatButtonModule, MatSelectModule, MatCardModule],
})
export class MaterialFormComponent {
  unidadesMedida: string[] = ['KG', 'LT', 'GR', 'CC']; // Lista simple de unidades
  proveedores: any[] = [];

  material = {
    nombre: '',
    codigo: '',
    cantidad: 0,
    unidadMedida: '',
    precio: 0, // Campo para el precio
    alertaStock: 0,
    proveedor: '',
    proveedorName: '',
  };

  constructor(
    private stockService: StockService,
    private proveedorService: ProveedorService) { }

  ngOnInit() {
    this.proveedorService.getProveedores().subscribe(response => {
      this.proveedores = response;
    });
  }

  onProveedorSelect(proveedorId: string) {
    const proveedorSeleccionado = this.proveedores.find(prov => prov._id === proveedorId);
    if (proveedorSeleccionado) {
      this.material.proveedorName = proveedorSeleccionado.nombre;
    }
  }

  addMaterial() {
    this.stockService.addMaterial(this.material).subscribe(response => {
      console.log('Material agregado:', response);
      this.resetForm();
    });
  }

  resetForm() {
    this.material = {
      nombre: '',
      codigo: '',
      cantidad: 0,
      unidadMedida: '',
      precio: 0, // Resetea el precio a 0
      alertaStock: 0,
      proveedor: '',
      proveedorName: ''
    };
  }
}
