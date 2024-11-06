import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MaterialService } from '../../services/material.service';
import { StockService } from '../../services/stock.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-material-compuesto-form',
  templateUrl: './material-compuesto-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule,
    MatFormFieldModule, MatSelectModule,
    MatIconModule, MatDividerModule, MatButtonModule]
})
export class MaterialCompuestoFormComponent implements OnInit {
  materialCompuestoForm: FormGroup;
  materiales: any[] = [];

  constructor(private fb: FormBuilder, private materialService: MaterialService, private stockService: StockService) {
    this.materialCompuestoForm = this.fb.group({
      nombre: [''],
      codigo: [''],
      descripcion: [''],
      unidadMedida: [''],
      cantidad: [''],
      materialesUsados: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.materialService.getMateriales().subscribe(data => {
      this.materiales = data;
    });
  }

  get materialesUsadosArray(): FormArray {
    return this.materialCompuestoForm.get('materialesUsados') as FormArray;
  }

  agregarMaterial() {
    const materialForm = this.fb.group({
      material: [''],
      cantidad: ['']
    });
    this.materialesUsadosArray.push(materialForm);
  }

  eliminarMaterial(index: number) {
    this.materialesUsadosArray.removeAt(index);
  }

  onSubmit() {
    if (this.materialCompuestoForm.valid) {
      console.log("materialComp: ", this.materialCompuestoForm.value)
      this.stockService.addMaterialCompuesto(this.materialCompuestoForm.value).subscribe({
        next: response => console.log('Material compuesto guardado exitosamente', response),
        error: error => console.error('Error al guardar el material compuesto', error)
      });
    }
  }

}
