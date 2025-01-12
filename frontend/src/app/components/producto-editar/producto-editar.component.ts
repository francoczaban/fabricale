import { Component, OnInit} from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DataTransferService } from '../../services/data-transfer.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-editar',
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
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './producto-editar.component.html',
  styleUrl: './producto-editar.component.css'
})

export class ProductoEditarComponent implements OnInit {
  datos: any;
  productoForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataTransfer: DataTransferService, private router: Router) {}

  ngOnInit() {    
    this.datos = this.dataTransfer.getData();

    // Redirigir si los datos son nulos
    if (!this.datos) {
      this.router.navigate(['/listado']);
      return; // Salir del método para evitar errores
    }
    
    console.log(this.datos);

    // Inicializar productoForm
    this.productoForm = this.fb.group({
      nombre: [this.datos?.nombre || '', Validators.required],
      codigo: [this.datos?.codigo || '', Validators.required],
      unidadMedida: [this.datos?.unidadMedida || '', Validators.required],
      cantidad: [this.datos?.cantidad || '', [Validators.required, Validators.min(0)]],
      materialesCompuestosUsados: this.fb.array(
        (this.datos.materialesCompuestosUsados || []).map((materialCompuesto: any) =>
          this.fb.group({
            nombre: [materialCompuesto.materialCompuesto?.nombre || ''], // Validar existencia
            cantidad: [materialCompuesto.cantidad || 0, [Validators.required, Validators.min(0)]],
            unidadMedida: [materialCompuesto.materialCompuesto?.unidadMedida || ''], // Validar existencia
          })
        )
      ),
      materialesUsados: this.fb.array(
        (this.datos.materialesUsados || []).map((materialUsado: any) =>
          this.fb.group({
            nombre: [materialUsado.material?.nombre || ''], // Validar existencia
            cantidad: [materialUsado.cantidad || 0, [Validators.required, Validators.min(0)]],
            unidadMedida: [materialUsado.material?.unidadMedida || ''], // Validar existencia
          })
        )
      ),
    });
  }


  // Método para inicializar el FormArray de materiales usados
  initMaterialesUsados(materiales: any[]): FormGroup[] {
    return materiales.map(material =>
      this.fb.group({
        nombre: [material.nombre || '', Validators.required],
        cantidad: [material.cantidad || '', [Validators.required, Validators.min(0)]],
        unidadMedida: [material.unidadMedida || '', Validators.required]
      })
    );
  }

  get materialesUsados() {
    return this.productoForm.get('materialesUsados') as FormArray;
  }

  editarProducto() {
    if (this.productoForm.valid) {
      console.log('Formulario válido:', this.productoForm.value);
      // Procesar los datos del formulario aquí
    } else {
      console.error('Formulario inválido');
    }
  }
}

