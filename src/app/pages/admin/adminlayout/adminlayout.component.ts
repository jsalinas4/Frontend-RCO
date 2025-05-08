import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-adminlayout',
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink, SidebarModule, MenuModule, SidebarMenuComponent],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css'
})
export class AdminlayoutComponent {
  sidebarVisible = false

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible
  }

  logout() {
    // Aquí puedes añadir la lógica para limpiar el token, etc.
    localStorage.removeItem("token")
    // Redirigir a la página principal
    this.router.navigate(["/"])
  }
}
