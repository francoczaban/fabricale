import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatIconModule, 
    MatDividerModule, MatButtonModule],
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  productoForm: FormGroup;
  materiales: any[] = [];
  materialesCompuestos: any[] = [];
  unidadesMedida: string[] = ['KG', 'LT', 'GR', 'CC']; // Lista simple de unidades

  constructor(private fb: FormBuilder, private stockService: StockService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      unidadMedida: ['', Validators.required],
      materialesUsados: this.fb.array([]),
      materialesCompuestosUsados: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.cargarMateriales();
    this.cargarMaterialesCompuestos();
    window.addEventListener('wheel', (event) => {
      // tu código aquí
    }, { passive: true });
  }

  cargarMateriales() {
    this.stockService.getMateriales().subscribe((data) => {
      this.materiales = data;
    });
  }

  cargarMaterialesCompuestos() {
    this.stockService.getMaterialesCompuestos().subscribe((data) => {
      this.materialesCompuestos = data;
    });
  }

  get materialesUsados() {
    return this.productoForm.get('materialesUsados') as FormArray;
  }

  get materialesCompuestosUsados() {
    return this.productoForm.get('materialesCompuestosUsados') as FormArray;
  }

  agregarMaterialUsado() {
    this.materialesUsados.push(this.fb.group({
      unidadMedida: [''],
      material: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  agregarMaterialCompuestoUsado() {
    this.materialesCompuestosUsados.push(this.fb.group({
      unidadMedida: [''],
      materialCompuesto: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarMaterialUsado(index: number) {
    this.materialesUsados.removeAt(index);
  }

  eliminarMaterialCompuestoUsado(index: number) {
    this.materialesCompuestosUsados.removeAt(index);
  }

  onSubmit() {
    if (this.productoForm.valid) {
      console.log("producto: ",this.productoForm.value)
      this.stockService.addProducto(this.productoForm.value).subscribe(
        (response) => {
          console.log('Producto creado:', response);
          this.productoForm.reset();
        },
        (error) => {
          console.error('Error al crear producto:', error);
        }
      );
    }
  }
}
