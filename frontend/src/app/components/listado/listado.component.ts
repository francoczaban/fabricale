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
    this.stockService.getMateriales().subscribe(data => this.dataSourceMateriales = data);
    this.stockService.getMaterialesCompuestos().subscribe({
      next: (data) => {
        this.dataSourceMaterialesCompuestos = data;
      },
      error: (error) => {
        console.error('Error al obtener materiales compuestos', error);
      },
    });
    this.stockService.getProductos().subscribe(data => this.dataSourceProductos = data);
  }

  setTableColumns() {
    this.columnasMateriales = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Unidad Medida', def: 'unidadMedida', dataKey: 'unidadMedida' }
    ]
    this.columnasMaterialesCompuestos = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Materiales', def: 'materialesUsados', dataKey: 'materialesUsados' }  // Nueva columna para mostrar detalles de materiales
    ];

    this.columnasProductos = [
      { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Materiales', def: 'materialesUsados', dataKey: 'materialesUsados' },
      { label: 'Materiales Compuestos', def: 'materialesCompuestosUsados', dataKey: 'materialesCompuestosUsados' } // Nueva columna para detalles de materiales compuestos
    ];
  }

}
