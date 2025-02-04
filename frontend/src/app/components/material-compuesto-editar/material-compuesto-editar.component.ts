import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DataTransferService } from '../../services/data-transfer.service';
import { StockService } from '../../services/stock.service';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  selector: 'app-material-compuesto-editar',
  templateUrl: './material-compuesto-editar.component.html',
  styleUrls: ['./material-compuesto-editar.component.css'],
})
export class MaterialCompuestoEditarComponent implements OnInit {
  materialCompuestoForm!: FormGroup;
  unidadesMedida = ['KG', 'GR', 'LT', 'CC'];
  datos: any;
  selected: any;


  constructor(private route: ActivatedRoute,private fb: FormBuilder, private dataTransfer: DataTransferService,
              private stockService: StockService) {}

  ngOnInit(): void {
    // Obtén los datos transferidos
    this.datos = this.dataTransfer.getData();

    if (!this.datos || !this.datos.materialesUsados) {
      console.error('Datos no disponibles o incompletos');
      this.datos = {
        nombre: '',
        codigo: '',
        unidadMedida: '',
        cantidad: 0,
        materialesUsados: [],
      };
    }
    this.selected = this.datos.unidadMedida;
    console.log('selected: ',this.selected);
    console.log('DATOS OBTENIDOS:', this.datos);
    console.log('id: ', this.datos.materialesUsados[0].material._id);

    // Inicializa el formulario usando los datos obtenidos
    this.materialCompuestoForm = this.fb.group({
      nombre: [this.datos.nombre, Validators.required],
      codigo: [this.datos.codigo, Validators.required],
      unidadMedida: [this.datos.unidadMedida, Validators.required],
      cantidad: [this.datos.cantidad, [Validators.required, Validators.min(0)]],
      materialesUsados: this.fb.array(
        this.datos.materialesUsados.map((materialUsado: any) =>
          this.fb.group({
            nombre: [materialUsado.material?.nombre || '', Validators.required],
            cantidad: [materialUsado.cantidad || 0, [Validators.required, Validators.min(0)]],
            unidadMedida: [
              materialUsado.unidadMedida || '',
              Validators.required,
            ],
            id: [materialUsado.material._id],
          })
        )
      ),
    });
    console.log(this.materialCompuestoForm.value);
  }

  // Obtén la lista de materiales usados
  get materialesUsadosArray(): FormArray {
    return this.materialCompuestoForm.get('materialesUsados') as FormArray;
  }

  // Añade un material al array
  agregarMaterial(): void {
    this.materialesUsadosArray.push(
      this.fb.group({
        nombre: ['', Validators.required],
        cantidad: [0, [Validators.required, Validators.min(0)]],
        unidadMedida: ['', Validators.required],
      })
    );
  }

  // Elimina un material del array
  eliminarMaterial(index: number): void {
    this.materialesUsadosArray.removeAt(index);
  }

  // Envía los datos editados al backend
  guardarMaterialCompuesto(): void {
    if (this.materialCompuestoForm.invalid) {
      console.error('Formulario inválido');
      alert('Por favor, corrige los errores antes de guardar.');
    }
    console.log(   'datos.:ID: ' ,this.datos._id);
    this.stockService.updateMaterialCompuesto(this.datos._id, this.materialCompuestoForm.value).subscribe({
      next: (response) => {
        console.log('Material Compuesto actualizado correctamente', response);
        // // Redirigir a la lista de materiales después de la actualización (o cualquier otra acción)
        // this.router.navigate(['/materiales']);
      },
      error: (error) => {
        console.error('Error al editar el material compuesto', error);
        alert('Ocurrió un error al actualizar el material compuesto. Por favor, revisa los datos y vuelve a intentarlo.');
      },
    });

    console.log('Material Compuesto Editado:', this.materialCompuestoForm.value);
    console.log('DATOS: ',this.datos);

    // Aquí puedes implementar la lógica para enviar los datos al backend
    // Por ejemplo, usando un servicio HTTP
  }

  
}
