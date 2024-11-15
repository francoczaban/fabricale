import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
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

  @Input() set data(data: any[]) {
    this.dataSource.data = data;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map(col => col.def);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  // Agregar el ViewChild para MatSort

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  // Asignar MatSort al dataSource
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
}
