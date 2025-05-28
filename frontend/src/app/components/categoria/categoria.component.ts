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
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule,
    MatIconModule, MatDividerModule, MatButtonModule, MatSelectModule, MatCardModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categoria = {
    nombre: '',
  }

  constructor(
    private stockService: StockService
    ) { }
    addCategoria() {
      this.stockService.addCategoria(this.categoria).subscribe(response => {
        console.log('Material agregado:', response);
        this.resetForm();
      });
    }
    
    resetForm() {
      this.categoria = {
        nombre: ''
      };
    }
}
