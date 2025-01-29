import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: 'notifications-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { notifications: any[] }) { }
}