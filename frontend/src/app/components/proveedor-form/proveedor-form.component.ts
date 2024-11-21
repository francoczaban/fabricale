import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../services/proveedor.service'; // Importar el servicio

@Component({
  standalone: true,
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class ProveedorFormComponent {
  unidadesMedida: string[] = ['KG', 'LT', 'GR', 'CC']; // Lista simple de unidades

  proveedor = {
    nombre: '',
    direccion: '',
    email: '',
    telefono: '',
    // materiales: [
    //   {
    //     nombre: '',
    //     precio: 0,
    //     cantidad: 0,
    //     unidadMedida: '',
    //   },
    // ],
  };

  constructor(private proveedorService: ProveedorService) {} // Inyectar el servicio

  addProveedor() {
    // Validar datos antes de enviarlos
    if (!this.proveedor.nombre || !this.proveedor.direccion) {
      console.error('El nombre y la dirección del proveedor son obligatorios.');
      return;
    }

    console.log(this.proveedor)

    // Llamar al servicio para agregar el proveedor
    this.proveedorService.addProveedor(this.proveedor).subscribe({
      next: (response) => {
        console.log('Proveedor creado con éxito:', response);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al crear el proveedor:', err);
      },
    });
  }

  resetForm() {
    this.proveedor = {
      nombre: '',
      direccion: '',
      email: '',
      telefono: '',
      // materiales: [
      //   {
      //     nombre: '',
      //     precio: 0,
      //     cantidad: 0,
      //     unidadMedida: '',
      //   },
      // ],
    };
  }

//   addMaterial() {
//     // Agregar un nuevo material al proveedor
//     this.proveedor.materiales.push({
//       nombre: '',
//       precio: 0,
//       cantidad: 0,
//       unidadMedida: '',
//     });
//   }

//   removeMaterial(index: number) {
//     // Eliminar un material del array
//     this.proveedor.materiales.splice(index, 1);
//   }
}
