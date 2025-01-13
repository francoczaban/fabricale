import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title class="dialog-title">Confirmación</h1>
    <div mat-dialog-content class="dialog-content">
      <mat-icon class="dialog-icon">warning</mat-icon>
      <p>¿Estás seguro de que quieres eliminar este elemento?</p>
    </div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-button (click)="onConfirm()" class="confirm-button">Confirmar</button>
      <button mat-button (click)="onCancel()" class="cancel-button">Cancelar</button>
    </div>
  `,
  styleUrls: ['./confirm-dialog.component.css'],
  standalone: true,
  imports: [MatIconModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

