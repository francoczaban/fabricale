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
import { MatTabsModule } from '@angular/material/tabs'
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formula',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatIconModule,
    MatDividerModule, MatButtonModule, MatTabsModule, MatCardModule, FormsModule
  ],
  templateUrl: './formula.component.html',
  styleUrl: './formula.component.css'
})
export class FormulaComponent implements OnInit {
  formulaForm: FormGroup;
  materiales: any[] = [];
  categoria: any[] = [];
  materialesCompuestos: any[] = [];
  unidadesMedida: string[] = ['KG', 'LT', 'GR', 'CC'];

  constructor(private fb: FormBuilder, private stockService: StockService) {
    this.formulaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      materialesUsados: this.fb.array([]),
      materialesCompuestosUsados: this.fb.array([]),
      categoria: ['', Validators.required],
      categoriaNombre: ''
    });
  }

  ngOnInit(): void {
    this.cargarMateriales();
    this.cargarMaterialesCompuestos();
    this.cargarCategorias();
    
  }

  cargarMateriales() {
    this.stockService.getMateriales().subscribe((data) => {
      this.materiales = data;
    });
  }

  cargarCategorias() {
    this.stockService.getCategoria().subscribe((data) => {
      this.categoria = data;
      console.log(this.categoria)
    });
  }

  onCategoriaSelect(categoriaId: string) {
    const categoriaSeleccionado = this.categoria.find(cat => cat._id === categoriaId);
    if (categoriaSeleccionado) {
      // this.formulaForm.categoriaNombre = categoriaSeleccionado.nombre;
    }
  }

  cargarMaterialesCompuestos() {
    this.stockService.getMaterialesCompuestos().subscribe((data) => {
      this.materialesCompuestos = data;
    });
  }

  get materialesUsados() {
    return this.formulaForm.get('materialesUsados') as FormArray;
  }

  get materialesCompuestosUsados() {
    return this.formulaForm.get('materialesCompuestosUsados') as FormArray;
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
    if (this.formulaForm.valid) {
      const formula = {
        nombre: this.formulaForm.value.nombre,
        unidadMedida: this.formulaForm.value.unidadMedida,
        descripcion: this.formulaForm.value.descripcion,
        materialesUsados: this.formulaForm.value.materialesUsados.map((m: any) => ({
          material: typeof m.material === 'string' ? { _id: m.material } : m.material,
          cantidad: m.cantidad,
          unidadMedida: m.unidadMedida
        })),
        materialesCompuestosUsados: this.formulaForm.value.materialesCompuestosUsados.map((m: any) => ({
          materialCompuesto: typeof m.materialCompuesto === 'string' ? { _id: m.materialCompuesto } : m.materialCompuesto,
          cantidad: m.cantidad,
          unidadMedida: m.unidadMedida
        }))
      };

      this.stockService.addFormula(formula).subscribe(
        (response) => {
          console.log('Formula creada:', response);
          this.formulaForm.reset();
        },
        (error) => {
          alert(error.error.error);
          console.error('Error al crear la formula:', error);
        }
      );
    }
  }
}
