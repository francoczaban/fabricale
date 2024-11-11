import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { TableColumn } from '../../models/table-column';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatInputModule, MatFormFieldModule]
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  tableColumns: TableColumn[] = [];

  @Input() set data(data: any[]) {
    this.dataSource.data = data; // Mostrar solo los últimos 10 elementos
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
