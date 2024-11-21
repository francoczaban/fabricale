import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MaterialService } from '../../services/material.service';
import { StockService } from '../../services/stock.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-material-compuesto-form',
  templateUrl: './material-compuesto-form.component.html',
  imports: [
    FormsModule, ReactiveFormsModule, CommonModule,
    MatInputModule, MatFormFieldModule, MatSelectModule,
    MatIconModule, MatDividerModule, MatButtonModule
  ]
})
export class MaterialCompuestoFormComponent implements OnInit {
  materialCompuestoForm: FormGroup;
  materiales: any[] = [];
  unidadesMedida: string[] = ['KG', 'LT', 'GR', 'CC']; // Lista simple de unidades
  stock: any = {}; // Almacena las cantidades disponibles por material

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
    this.cargarMateriales()
  }

  cargarMateriales() {
    this.materialService.getMateriales().subscribe((data) => {      
      this.materiales = data;      
      this.materiales = this.materiales.filter(material => material.cantidad != 0);      
    });
  }

  cargarStock(): void {
    // Cargar stock de cada material
    this.materiales.forEach(material => {
      this.stockService.getStockByMaterial(material._id).subscribe(stockData => {
        this.stock[material._id] = stockData.cantidadDisponible; // Guardar cantidades por ID
      });
    });
  }

  get materialesUsadosArray(): FormArray {
    return this.materialCompuestoForm.get('materialesUsados') as FormArray;
  }

  agregarMaterial() {
    const materialForm = this.fb.group({
      unidadMedida: [''],
      material: [''], // Material seleccionado
      cantidad: ['']
    });
    this.materialesUsadosArray.push(materialForm);
  }

  eliminarMaterial(index: number) {
    this.materialesUsadosArray.removeAt(index);
  }

  trackById(index: number, item: any): string {
    return item._id;
  }

  // Genera opciones de cantidad para el desplegable
  getStockOptions(materialId: string): number[] {
    const stockDisponible = this.stock[materialId] || 0; // Recupera el stock por ID o 0 si no existe
    return Array.from({ length: stockDisponible }, (_, i) => i + 1);
  }

  onSubmit() {
    console.log(this.materialCompuestoForm.value)
    if (this.materialCompuestoForm.valid) {
      this.stockService.addMaterialCompuesto(this.materialCompuestoForm.value).subscribe({
        next: response => console.log('Material compuesto guardado exitosamente', response),
        error: error => {
          console.error('Error al guardar el material compuesto', error);
          alert('Ocurrió un error al guardar el material compuesto. Por favor, revisa los datos y vuelve a intentarlo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios antes de enviar.');
    }
  }

  get materialesUsadosList() {
    return this.materialesUsadosArray.controls.map((control, index) => ({
      ...control.value,
      index, // Agrega un índice único para Angular
    }));
  }
}
