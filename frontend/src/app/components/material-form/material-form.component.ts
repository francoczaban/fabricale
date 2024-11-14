import { Component } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule,
     MatIconModule, MatDividerModule, MatButtonModule, MatSelectModule],
})
export class MaterialFormComponent {
  unidadesMedida: string[] = ['KG', 'LT', 'GR', 'CC']; // Lista simple de unidades

  material = {
    nombre: '',
    codigo: '',
    cantidad: 0,
    unidadMedida: ''
  };

  constructor(private stockService: StockService) { }

  addMaterial() {
    console.log("Material: ", this.material);
    this.stockService.addMaterial(this.material).subscribe(response => {
      console.log('Material agregado:', response);
      this.resetForm();
    });
  }

  resetForm() {
    this.material = {
      nombre: '',
      codigo: '',
      cantidad: 0,
      unidadMedida: ''
    };
  }
}
