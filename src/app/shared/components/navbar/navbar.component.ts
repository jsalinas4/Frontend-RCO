import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, CommonModule, AvatarModule, CardModule, RouterLink, TooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MegaMenuItem[] | undefined
  mobileMenuVisible = false
  isAuthenticated = false
  userRole: string | null = null

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: "Company",
      },
      {
        label: "Resources",
      },
      {
        label: "Contact",
      },
    ]

    // Verificar autenticación
    this.checkAuthentication()

    // Suscribirse a cambios en el estado de autenticación
    this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user
      this.userRole = user?.role || null
    })
  }

  checkAuthentication() {
    // Verificar si hay token y datos de usuario
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")

    this.isAuthenticated = !!token && !!userStr

    if (this.isAuthenticated && userStr) {
      try {
        const user = JSON.parse(userStr)
        this.userRole = user.role
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error)
        this.isAuthenticated = false
      }
    }
  }

    goToAdmin() {
      this.router.navigate(['/admin']);
    }

    logout() {
      this.authService.logout()
      this.isAuthenticated = false
      this.userRole = null
      this.router.navigate(["/inicio"])
    }
}
