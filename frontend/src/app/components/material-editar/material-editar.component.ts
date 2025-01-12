import { Component, OnInit } from '@angular/core';
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
import { DataTransferService } from '../../services/data-transfer.service';

@Component({
  selector: 'app-material-editar',
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
  templateUrl: './material-editar.component.html',
  styleUrls: ['./material-editar.component.css'],
})
export class MaterialEditarComponent implements OnInit {
  material = {
    _id: '',
    nombre: '',
    codigo: '',
    cantidad: 0,
    unidadMedida: '',
    precio: 0, // Campo para el precio
  };

  datos: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    private dataTransfer: DataTransferService
  ) { }

  ngOnInit(): void {
    // Accedemos a los parámetros de matrix
    // this.route.params.subscribe(params => {
    //   this.material.id = params['_id'] || '';
    //   this.material.nombre = params['nombre'] || '';
    //   this.material.codigo = params['codigo'] || '';
    //   this.material.cantidad = +params['cantidad'] || 0;
    //   this.material.unidadMedida = params['unidadMedida'] || '';
    //   this.material.precio = +params['precio'] || 0;
    // });
    this.datos = this.dataTransfer.getData();
    this.material = this.datos;

    console.log('Material cargado:', this.material);
  }

  editarMaterial() {    
    this.stockService.updateMaterial(this.material._id, this.material).subscribe({
      next: response => console.log('Material actualizado correctamente', response),
      error: error => {
        console.error('Error al editar el material', error);
        alert('Ocurrió un error al actualizar el material. Por favor, revisa los datos y vuelve a intentarlo.');
      }
    });  
  }
}
