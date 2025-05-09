import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { VentasService } from '../../services/ventas.service';
import { Observable } from 'rxjs';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs'

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [
      FormsModule, ReactiveFormsModule, CommonModule,
      MatInputModule, MatFormFieldModule, MatSelectModule,
      MatIconModule, MatDividerModule, MatButtonModule, MatCard, MatTabsModule
    ],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  ventaForm!: FormGroup;
  productos$!: Observable<any[]>; // Lista de productos disponibles
  unidadesMedida = ['kg', 'g', 'litros', 'ml']; // Ajusta según las unidades disponibles

  constructor(
    private fb: FormBuilder,
    private ventasService: VentasService,
    private stockService: StockService // Servicio para obtener productos
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario
    this.ventaForm = this.fb.group({
      productoId: ['', Validators.required],
      cantidadVendida: ['', [Validators.required, Validators.min(1)]],
      precioUnitario: ['', [Validators.required, Validators.min(0)]],
    });

    // Obtenemos los productos disponibles
    this.productos$ = this.stockService.getProductos();
  }

  // Método para manejar la venta
  onSubmit(): void {
    if (this.ventaForm.valid) {
      const ventaData = this.ventaForm.value;
      this.ventasService.addVenta(ventaData).subscribe(
        (response) => {
          console.log('Venta registrada con éxito', response);
          // Limpiar formulario o redirigir
          this.ventaForm.reset();
        },
        (error) => {
          console.error('Error al registrar la venta', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
