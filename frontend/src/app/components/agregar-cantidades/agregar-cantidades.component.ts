import { Component } from '@angular/core';
import { DataTransferService } from '../../services/data-transfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { Route } from '@angular/router';
import { response } from 'express';

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

  

  constructor(private dataTransfer: DataTransferService, private stockService: StockService) {

  }

  ngOnInit(): void {
    
    this.datos = this.dataTransfer.getData();
    console.log('datos: ',this.datos);
    
    if(this.datos.tipo == 'Material')
    {
      this.material = this.datos;
    }
    console.log('Material traido por getdata: ',this.material);
    
  }

  agregarCantidades(){

    if (this.material._id) {
      this.material.cantidad = this.material.cantidad + this.cantidad;
      console.log('this.material.cantidad: ',this.material.cantidad);
      this.stockService.updateMaterial(this.material._id, this.material).subscribe({
        next: (response) => {
          console.log('Cantidad actualizada correctamente', response);
          // Redirigir a la lista de materiales después de la actualización (o cualquier otra acción)
          // this.router.navigate(['/materiales']);
        },
        error: (error) => {
          console.error('Error al actualizar la cantidad del material', error);
          alert('Ocurrió un error al actualizar la cantidad del material. Por favor, revisa los datos y vuelve a intentarlo.');
        },
      });
    } else {
      console.error('No se encontró un ID para el material');
    }

  }
}
