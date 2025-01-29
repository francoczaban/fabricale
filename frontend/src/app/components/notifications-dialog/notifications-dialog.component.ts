// import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule } from '@angular/material/table';

// @Component({
//   selector: 'app-notifications-dialog',
//   templateUrl: 'notifications-dialog.component.html',
//   standalone: true,
//   imports: [MatDialogModule, MatButtonModule, CommonModule, MatTableModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })


// export class NotificationsDialogComponent {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: { notifications: any[] }) {  }
// }


import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: 'notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialogComponent {
  // Se crea la variable dataSource para almacenar los datos aplanados
  dataSource: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { notifications: any[] }) {
    // Aplanamos el arreglo de notificaciones
    this.dataSource = this.data.notifications.flat(); // Aplana el arreglo de un arreglo
    console.log(this.dataSource); // Verifica que los datos estén correctamente aplanados
  }
}
