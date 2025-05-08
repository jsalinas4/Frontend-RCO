import { Component, Input, Output, EventEmitter } from "@angular/core"
import type { MenuItem } from "primeng/api"
import { SidebarModule } from "primeng/sidebar"
import { MenuModule } from "primeng/menu"
import { NgClass, NgFor } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"

@Component({
  selector: "app-sidebar-menu",
  imports: [SidebarModule, MenuModule, NgFor, FormsModule, NgClass, RouterLink],
  templateUrl: "./sidebar-menu.component.html",
})
export class SidebarMenuComponent {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()

  menuItems: MenuItem[] = [
    {
      label: "Citas",
      icon: "pi pi-calendar",
      styleClass: "active-menu-item",
      routerLink: "/admin/citas",
    },
    {
      label: "Ajustes",
      icon: "pi pi-cog",
      routerLink: "/admin/ajustes",
    },
  ]

  constructor(private router: Router) {}

  onHide() {
    this.visibleChange.emit(false)
  }

  logout() {
    // Aquí puedes añadir la lógica para limpiar el token, etc.
    localStorage.removeItem("token")
    // Redirigir a la página principal
    this.router.navigate(["/"])
  }
}
