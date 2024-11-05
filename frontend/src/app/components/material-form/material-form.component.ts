import { Component } from '@angular/core';
import { StockService } from '..//../services/stock.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, 
    MatIconModule, MatDividerModule, MatButtonModule],
})

export class MaterialFormComponent {
  material = {
    nombre: '',
    codigo: '',
    cantidad: 0,
    unidadMedida: ''
  };

  constructor(private stockService: StockService) { }

  addMaterial() {
    console.log("Material: ", this.material)
    // this.stockService.addMaterial(this.material).subscribe(response => {
    //   console.log('Material agregado:', response);
    //   this.resetForm();
    // });
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
