import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsComponent } from '../notifications/notifications.component'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [NotificationsComponent,MatIconModule],
})
export class MenuComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
