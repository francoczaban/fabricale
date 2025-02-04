import { Component, OnInit, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatInputModule, MatFormFieldModule, MatSortModule]
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  
  tableColumns: TableColumn[] = [];
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() addMaterialRow = new EventEmitter<any>();


  @Input() set data(data: any[]) {
    this.dataSource.data = data;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map(col => col.def);
  
    // Agregar la columna de acciones si no está incluida
    if (!this.displayedColumns.includes('accion')) {
      this.displayedColumns.push('accion');
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) { } // Inyectar MatDialog

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isActionColumn(column: TableColumn, row: any): boolean {
    return column.def === 'accion' &&
      row.sincronizar === 'No' &&
      row.rol === 'Learner';
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatNumber(value: number): string {
    if (typeof value !== 'number') {
      return value; // Si no es un número, retorna el valor tal cual
    }
    if (Number.isInteger(value)) {
      return value.toString(); // Si es entero, muestra sin decimales
    }
    return value.toFixed(2); // Si es decimal, redondea a 2 decimales
  }

  onEdit(row: any): void {
    this.editRow.emit(row);
  }

  onDelete(row: any): void {
    // Abre el diálogo de confirmación
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { name: 'eliminar' } // Pasar datos si es necesario
    });    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRow.emit(row); // Emitir el evento para eliminar
      }
    });
  }

  onAgregar(row: any): void {
    this.addMaterialRow.emit(row);
  }
  

}
