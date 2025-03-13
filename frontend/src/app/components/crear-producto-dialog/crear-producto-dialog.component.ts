import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-crear-producto-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './crear-producto-dialog.component.html',
  styleUrl: './crear-producto-dialog.component.css',
})
export class CrearProductoDialogComponent implements OnInit {
  dataSource: any = {}; 
  productoForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { formula: any },private fb: FormBuilder,
              private stockService: StockService) {
    this.dataSource = this.data.formula;
  }

  ngOnInit(): void {
    const datos = this.dataSource; 
    console.log('📌 Datos en OnInit:', datos);

    if (!datos || !datos.materialesCompuestosUsados || !datos.materialesUsados) {
      console.error('❌ ERROR: Faltan datos en materialesCompuestosUsados o materialesUsados');
    }

    this.productoForm = this.fb.group({
      nombre: [datos.nombre, Validators.required],
      codigo: ['', Validators.required],
      unidadMedida: [datos.unidadMedida, Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      alertaStock: ['', [Validators.required, Validators.min(0)]],
      // materialesUsados: this.fb.array([]),
      // materialesCompuestosUsados: this.fb.array([]),

      materialesCompuestosUsados: this.fb.array(
        (datos.materialesCompuestosUsados || []).map((materialCompuesto: any) => {
          // Verifica si materialCompuesto y su id son válidos
          if (!materialCompuesto || !materialCompuesto.materialCompuesto || !materialCompuesto.materialCompuesto._id) {
            console.error('❌ ERROR: materialCompuesto o materialCompuesto.materialCompuesto._id es undefined:', materialCompuesto);
            return this.fb.group({ nombre: '', id: '', cantidad: 0, unidadMedida: '' });
          }

          return this.fb.group({
            nombre: [materialCompuesto.materialCompuesto?.nombre || ''],
            id: [materialCompuesto.materialCompuesto._id || ''], 
            cantidad: [materialCompuesto.cantidad || 0, [Validators.required, Validators.min(0)]],
            unidadMedida: [materialCompuesto.unidadMedida || ''],
          });
        })
      ),

      materialesUsados: this.fb.array(
        (datos.materialesUsados || []).map((materialUsado: any) => {          
          // Verifica si materialUsado y su id son válidos
          if (!materialUsado || !materialUsado.material || !materialUsado.material._id) {
            console.error('❌ ERROR: materialUsado o materialUsado.material._id es undefined:', materialUsado);
            return this.fb.group({ nombre: '', id: '', cantidad: 0, unidadMedida: '' });
          }

          return this.fb.group({
            nombre: [materialUsado.material?.nombre || ''],
            cantidad: [materialUsado.cantidad || 0, [Validators.required, Validators.min(0)]],
            id: [materialUsado.material._id || ''], 
            unidadMedida: [materialUsado.unidadMedida || ''],
          });
        })
      ),
    });    
  }

  crearProducto() {
    // Antes de enviar, aseguramos que los datos están completos
    const productoData = this.productoForm.value;
    let valid = true;

    // Verificamos que los materiales y compuestos tengan sus 'id' correctamente definidos
    productoData.materialesCompuestosUsados.forEach((item: any) => {
      if (!item.id) {
        console.error('❌ ERROR: materialCompuesto sin id', item);
        valid = false;
      }
    });

    productoData.materialesUsados.forEach((item: any) => {
      if (!item.id) {
        console.error('❌ ERROR: materialUsado sin id', item);
        valid = false;
      }
    });

    if (!valid) {
      console.error('❌ Hay errores en los datos, no se enviarán.');
      return;
    }

    console.log('📤 JSON que se enviará:', JSON.stringify(productoData, null, 2));

    // Enviar solo si los datos son válidos
    if (this.productoForm.valid) {
      console.log("JSON que se enviara: ",this.productoForm.value)
      this.stockService.addProducto(productoData).subscribe(
        (response) => {
          console.log('✅ Producto creado con éxito:', response);
          this.productoForm.reset();
        },
        (error) => {
          alert(error.error.error);
          console.error('❌ Error al crear producto:', error);
        }
      );
    }
  }
}
