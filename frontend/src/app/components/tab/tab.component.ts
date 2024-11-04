import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})

export class TabComponent {
  constructor(private router: Router) { }



}

