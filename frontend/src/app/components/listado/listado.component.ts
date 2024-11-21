import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableColumn } from '../../models/table-column';
import { TableComponent } from '../table/table.component';

@Component({
  standalone: true,
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  imports: [CommonModule, RouterModule, TableComponent]
})
export class ListadoComponent implements OnInit {
  materiales: any[] = [];
  materialesCompuestos: any[] = [];
  productos: any[] = [];
  columnasMateriales: TableColumn[] = [];
  columnasMaterialesCompuestos: TableColumn[] = [];
  columnasProductos: TableColumn[] = [];
  dataSourceMateriales: any[] = [];
  dataSourceMaterialesCompuestos: any[] = [];
  dataSourceProductos: any[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.setTableColumns();
    this.cargarMateriales();
    this.cargarMaterialesCompuestos();
    this.cargarProductos();
  }

  setTableColumns() {
    this.columnasMateriales = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Unidad de Medida', def: 'unidadMedida', dataKey: 'unidadMedida' },
      { label: 'Costo', def: 'precio', dataKey: 'precio' }
    ];

    this.columnasMaterialesCompuestos = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Materiales', def: 'materialesUsados', dataKey: 'materialesUsados' } // Detalles de materiales usados
    ];

    this.columnasProductos = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Materiales', def: 'materialesUsados', dataKey: 'materialesUsados' },
      { label: 'Materiales Compuestos', def: 'materialesCompuestosUsados', dataKey: 'materialesCompuestosUsados' } // Detalles de materiales compuestos usados
    ];
  }

  cargarMateriales() {
    this.stockService.getMateriales().subscribe({
      next: (data) => {
        this.dataSourceMateriales = data;
      },
      error: (error) => {
        console.error('Error al obtener los materiales:', error);
      }
    });
  }

  cargarMaterialesCompuestos() {
    this.stockService.getMaterialesCompuestos().subscribe({
      next: (data) => {
        this.dataSourceMaterialesCompuestos = data;
      },
      error: (error) => {
        console.error('Error al obtener los materiales compuestos:', error);
      }
    });
  }

  cargarProductos() {
    this.stockService.getProductos().subscribe({
      next: (data) => {
        this.dataSourceProductos = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }
}
