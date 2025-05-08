import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgIf } from '@angular/common';
import { SidebarMenuComponent } from './pages/admin/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgIf,
    SidebarMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontRCO';

  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    return this.router.url.includes('login') || this.router.url.includes('register');
  }

  sidebarVisible = false

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible
  }
}
