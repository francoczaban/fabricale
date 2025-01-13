import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableColumn } from '../../models/table-column';
import { TableComponent } from '../table/table.component';
import { Router } from '@angular/router';
import { DataTransferService } from '../../services/data-transfer.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  standalone: true,
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  imports: [CommonModule, RouterModule, TableComponent, MatIconModule]
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

  constructor(private stockService: StockService, private router: Router, private dataTransfer: DataTransferService) { }

  ngOnInit() {
    this.setTableColumns();
    this.cargarMateriales();
    this.cargarMaterialesCompuestos();
    this.cargarProductos();
  }

  editarMaterial(material: any): void {
    this.dataTransfer.setData(material);
    this.router.navigate(['/editar-material']);
  }

  editarMaterialCompuesto(materialCompuesto: any): void {
    this.dataTransfer.setData(materialCompuesto);
    this.router.navigate(['/editar-materialCompuesto']);
  }

  editarProducto(producto: any): void {
    this.dataTransfer.setData(producto);
    this.router.navigate(['/editar-producto']);
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

  deleteMaterial(material: any): void {
    this.stockService.deleteMaterial(material._id).subscribe({
      next: () => {        
        this.cargarMateriales(); // Recargar la lista de materiales después de la eliminación
      },
      error: (err) => {
        console.error('Error al eliminar el material:', err);
        alert('No se pudo eliminar el material.');
      }
    });
  }
  
  deleteMaterialCompuesto(materialCompuesto: any): void {
    this.stockService.deleteMaterialCompuesto(materialCompuesto._id).subscribe({
      next: () => {
        alert('Material Compuesto eliminado correctamente.');
        this.cargarMaterialesCompuestos(); // Recargar la lista de materiales compuestos
      },
      error: (err) => {
        console.error('Error al eliminar el material compuesto:', err);
        alert('No se pudo eliminar el material compuesto.');
      }
    });
  }
  
  deleteProducto(producto: any): void {
    this.stockService.deleteProducto(producto._id).subscribe({
      next: () => {
        alert('Producto eliminado correctamente.');
        this.cargarProductos(); // Recargar la lista de productos
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        alert('No se pudo eliminar el producto.');
      }
    });
  }
  
}
