import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { DataTransferService } from '../../services/data-transfer.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatDialogModule, CommonModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  datosRecibidos: number | null = null;
  array: any[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.dataTransferService.data$.subscribe((data) => {
      if (typeof data === 'number') {
        // Si es un número, sobrescribe datosRecibidos
        this.datosRecibidos = data;
      } else if (typeof data === 'object' && data !== null) {
        // Si es un objeto, agrégalo a un array
        if (!Array.isArray(this.datosRecibidos)) {
          this.array= [];
        }
        this.array.push(data);
      }
      // console.log('Datos recibidos:', this.datosRecibidos);
      console.log('Datos array:', this.array);
      console.log('Datos recibidos:', this.datosRecibidos);
    });
  }
  

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsDialogComponent, {
      data: { notifications: this.array }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}