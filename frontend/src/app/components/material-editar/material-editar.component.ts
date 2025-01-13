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

  constructor(
    private router: Router,
    private stockService: StockService,
    private dataTransfer: DataTransferService
  ) { }

  ngOnInit(): void {
    // Intentar obtener los datos a través de DataTransferService
    const datos = this.dataTransfer.getData();
    
    // Asegurarse de que los datos estén disponibles antes de asignarlos
    if (datos && datos._id) {
      this.material = { ...datos }; // Usar spread operator para evitar referencia directa
      console.log('Material cargado:', this.material);
    } else {
      console.error('No se pudo cargar el material');
    }
  }

  editarMaterial(): void {
    if (this.material._id) {
      this.stockService.updateMaterial(this.material._id, this.material).subscribe({
        next: (response) => {
          console.log('Material actualizado correctamente', response);
          // Redirigir a la lista de materiales después de la actualización (o cualquier otra acción)
          this.router.navigate(['/materiales']);
        },
        error: (error) => {
          console.error('Error al editar el material', error);
          alert('Ocurrió un error al actualizar el material. Por favor, revisa los datos y vuelve a intentarlo.');
        },
      });
    } else {
      console.error('No se encontró un ID para el material');
    }
  }
}
