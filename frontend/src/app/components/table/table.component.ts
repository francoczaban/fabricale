import { Component, OnInit, Input } from '@angular/core';
import { TableColumn } from '../../models/table-column';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [MatTableModule, CommonModule]
})

export class TableComponent implements OnInit {


  dataSource: any[string];
  displayedColumns: any = [];
  tableColumns: TableColumn[] = [];
  filteredDataSource: any[] = [];

  @Input() set data(data: any) {
    this.dataSource = data;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns
    this.displayedColumns = this.tableColumns.map(col => col.def)
  }

  constructor() { }

  ngOnInit(): void {
  }

  isActionColumn(column: TableColumn, row: any): boolean {
    return column.def === 'accion' &&
      row.sincronizar === 'No' &&
      row.rol === 'Learner';
  }

}
