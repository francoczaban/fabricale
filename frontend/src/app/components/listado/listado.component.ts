import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { VentasService } from '../../services/ventas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableColumn } from '../../models/table-column';
import { TableComponent } from '../table/table.component';
import { Router } from '@angular/router';
import { DataTransferService } from '../../services/data-transfer.service';
import { MatIconModule } from '@angular/material/icon';
import { TablaExpandibleComponent } from "../tabla-expandible/tabla-expandible.component";
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'

@Component({
  standalone: true,
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
  imports: [CommonModule, RouterModule, TableComponent, MatIconModule, TablaExpandibleComponent, MatCard, MatTabsModule],
  providers: [DatePipe]
})
export class ListadoComponent implements OnInit {
  materiales: any[] = [];
  materialesCompuestos: any[] = [];
  productos: any[] = [];
  columnasMateriales: TableColumn[] = [];
  columnasMaterialesCompuestos: TableColumn[] = [];
  columnasFormulas: TableColumn[] = [];
  columnasVentas: TableColumn[] = [];
  columnasProductos: TableColumn[] = [];
  dataSourceMateriales: any[] = [];
  dataSourceMaterialesCompuestos: any[] = [];
  dataSourceMaterialesCompuestos2: any[] = [];
  dataSourceProductos: any[] = [];
  dataSourceFormulas: any[] = [];
  dataSourceVentas: any[] = [];
  contador: number = 0;
  arrayNotificaciones: any[] = [];

  constructor(
    private stockService: StockService,
    private router: Router,
    private datePipe: DatePipe,
    private ventasService: VentasService,
    private dataTransfer: DataTransferService) { }

  ngOnInit() {
    this.setTableColumns();
    this.cargarMateriales();
    this.cargarMaterialesCompuestos();
    this.cargarProductos();
    this.cargarFormulas();
    this.cargarVentas();
  }

  checkStock(array: any[]) {
    array.forEach(element => {
      if (element.cantidad <= element.alertaStock) {
        this.contador++;
        this.arrayNotificaciones.push(element);
      }
    });
    this.dataTransfer.sendData(this.contador, this.arrayNotificaciones)
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


  agregarMaterial(material: any): void {
    this.dataTransfer.setData(material);
    this.router.navigate(['/agregar-cantidades']);
  }

  agregarMaterialCompuesto(materialCompuesto: any): void {
    this.dataTransfer.setData(materialCompuesto);
    this.router.navigate(['/agregar-cantidaes']);
  }

  setTableColumns() {
    this.columnasMateriales = [
      { label: 'Material', def: 'nombre', dataKey: 'nombre' },
      { label: 'Proveedor', def: 'proveedorName', dataKey: 'proveedorName' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Unidad de Medida', def: 'unidadMedida', dataKey: 'unidadMedida' },
      { label: 'Costo', def: 'precio', dataKey: 'precio' },
      { label: 'Alerta Stock', def: 'alertaStock', dataKey: 'alertaStock' }
    ];

    this.columnasMaterialesCompuestos = [
      { label: 'Material Compuesto', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Materiales', def: 'materialesUsados', dataKey: 'materialesUsados' }, // Detalles de materiales usados
      { label: 'Alerta Stock', def: 'alertaStock', dataKey: 'alertaStock' }
    ];

    this.columnasProductos = [
      { label: 'Producto', def: 'nombre', dataKey: 'nombre' },
      { label: 'Código', def: 'codigo', dataKey: 'codigo' },
      { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
      { label: 'Materiales', def: 'materialesUsados', dataKey: 'materialesUsados' },
      { label: 'Materiales Compuestos', def: 'materialesCompuestosUsados', dataKey: 'materialesCompuestosUsados' }, // Detalles de materiales compuestos usados
      { label: 'Alerta Stock', def: 'alertaStock', dataKey: 'alertaStock' }
    ];

    this.columnasFormulas = [
      { label: 'Formula', def: 'nombre', dataKey: 'nombre' },
      { label: 'Materiales', def: 'materialesUsados', dataKey: 'materialesUsados' },
      { label: 'Materiales Compuestos', def: 'materialesCompuestosUsados', dataKey: 'materialesCompuestosUsados' }, // Detalles de materiales compuestos usados
    ];

    this.columnasVentas = [
      { label: 'Venta', def: 'productosVendidos', dataKey: 'productosVendidos' },
      { label: 'Cantidad', def: 'productosVendidos_cantidad', dataKey: 'productosVendidos' },
      { label: 'Precio U.', def: 'productosVendidos_precio', dataKey: 'productosVendidos' },
      { label: 'Total', def: 'total', dataKey: 'total' },
      { label: 'Fecha Venta', def: 'fechaVenta', dataKey: 'fechaVenta' }
    ];
    
  }

  cargarMateriales() {
    this.stockService.getMateriales().subscribe({
      next: (data) => {
        this.dataSourceMateriales = data;
        this.checkStock(this.dataSourceMateriales);
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
        this.checkStock(this.dataSourceMaterialesCompuestos);
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
        this.checkStock(this.dataSourceProductos);
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  cargarFormulas() {
    this.stockService.getFormulas().subscribe({
      next: (data) => {
        this.dataSourceFormulas = data;
        this.checkStock(this.dataSourceFormulas);
      },
      error: (error) => {
        console.error('Error al obtener las formulas:', error);
      }
    });
  }

  cargarVentas() {
    this.ventasService.getVentas().subscribe({
      next: (data) => {
        this.dataSourceVentas = data.map((venta: any) => {
          // Si es venta simple (caso viejo)
          if (venta.productoId) {
            const producto = this.dataSourceProductos.find(p => p._id === venta.productoId);
            venta.productoNombre = producto ? producto.nombre : venta.productoId;
          }

          // Si es venta compuesta (nueva)
          if (venta.productosVendidos?.length) {
            venta.productosVendidos = venta.productosVendidos.map((item: any) => {
              const producto = this.dataSourceProductos.find(p => p._id === item.productoId._id || p._id === item.productoId);
              return {
                ...item,
                nombre: producto?.nombre || item.productoId.nombre || 'Desconocido'
              };
            });
          }

          venta.fechaVenta = this.datePipe.transform(venta.fechaVenta, 'yyyy-MM-dd');
          return venta;
        });

        console.log("VENTAS: ", this.dataSourceVentas);
      },
      error: (error) => {
        console.error('Error al obtener las ventas:', error);
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
