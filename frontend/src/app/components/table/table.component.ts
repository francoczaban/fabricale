import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { TableColumn } from '../../models/table-column';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [MatTableModule, MatPaginatorModule, CommonModule]
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  tableColumns: TableColumn[] = [];

  @Input() set data(data: any[]) {
    this.dataSource.data = data.slice(-10); // Mostrar solo los últimos 10 elementos
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map(col => col.def);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  isActionColumn(column: TableColumn, row: any): boolean {
    return column.def === 'accion' &&
      row.sincronizar === 'No' &&
      row.rol === 'Learner';
  }

}
