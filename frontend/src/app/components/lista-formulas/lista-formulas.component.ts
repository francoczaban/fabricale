import { Component, inject } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { DataTransferService } from '../../services/data-transfer.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CrearProductoDialogComponent } from '../crear-producto-dialog/crear-producto-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-formulas',
  standalone: true,
  imports: [
    MatCardModule, MatChipsModule, CommonModule, 
    MatButtonModule, MatInputModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './lista-formulas.component.html',
  styleUrl: './lista-formulas.component.css'
})
export class ListaFormulasComponent {
  listaFormulas: any[] = [];
  cantidad: any;
  codigo: any;
  readonly dialog = inject(MatDialog);

  constructor(private stockService: StockService, private router: Router, private dataTransfer: DataTransferService) { }

  ngOnInit(): void {
    this.stockService.getFormulas().subscribe({
      next: (data) => {
        this.listaFormulas = data;
      },
      error: (error) => {
        console.error('Error al obtener las formulas:', error);
      }
    });
  }

  openDialog(formula: any) {
    console.log('📦 Fórmula enviada al diálogo:', JSON.stringify(formula, null, 2));

    const dialogRef = this.dialog.open(CrearProductoDialogComponent, {
      height: '500px',
      data: { formula: formula },
    });
  }
}
