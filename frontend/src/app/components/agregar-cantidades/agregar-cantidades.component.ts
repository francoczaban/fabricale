import { Component } from '@angular/core';
import { DataTransferService } from '../../services/data-transfer.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';


@Component({
  selector: 'app-agregar-cantidades',
  standalone: true,
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
  templateUrl: './agregar-cantidades.component.html',
  styleUrl: './agregar-cantidades.component.css'
})
export class AgregarCantidadesComponent {

  cantidad: any;
  datos: any;
  total: any = 0;

  material = {
    _id: '',
    nombre: '',
    codigo: '',
    cantidad: 0,
    unidadMedida: '',
    precio: 0,
    tipo: ''
  };


  materialCompuesto: any;




  constructor(private dataTransfer: DataTransferService, private stockService: StockService) {

  }

  ngOnInit(): void {

    this.datos = this.dataTransfer.getData();

    if (this.datos.tipo == 'Material') {

      this.material = this.datos;

    } else if (this.datos.tipo == 'Material Compuesto') {

      this.materialCompuesto = this.datos;

    }

  }

  agregarCantidades() {
    //ES MATERIAL
    if (this.material._id) {

      this.material.cantidad = this.material.cantidad + this.cantidad;

      this.stockService.updateMaterial(this.material._id, this.material).subscribe({
        next: (response) => {
          console.log('Cantidad actualizada correctamente', response);
        },
        error: (error) => {
          console.error('Error al actualizar la cantidad del material', error);
          alert('Ocurrió un error al actualizar la cantidad del material. Por favor, revisa los datos y vuelve a intentarlo.');
        },
      });

       //ES MATERIAL COMPUESTO
    } else if (this.materialCompuesto._id) {

      this.materialCompuesto.cantidad = this.materialCompuesto.cantidad + this.cantidad;

      this.stockService.updateMaterialCompuesto(this.materialCompuesto._id, this.materialCompuesto).subscribe({
        next: (response) => {
          console.log('Cantidad actualizada correctamente', response);
        },
        error: (error) => {
          console.error('Error al actualizar la cantidad del material', error);
          alert('Ocurrió un error al actualizar la cantidad del material. Por favor, revisa los datos y vuelve a intentarlo.');
        },
      });

    } else {
      console.error('No se encontró un ID para el material / materialCompuesto');
    }

  }
}
