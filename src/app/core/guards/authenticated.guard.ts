import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token")
  const router = inject(Router)

  if (!token) {
    // Si NO hay token, redirige a login
    router.navigate(["login"])
    return false
  }

  // Verificar el rol del usuario
  const userStr = localStorage.getItem("user")
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      // Verificar que el rol sea DENTIST
      if (user.role === "DENTIST") {
        return true // Permite acceso si es dentista
      } else {
        // Si el rol no es DENTIST, redirigir a una página apropiada
        console.warn("Acceso denegado: Se requiere rol DENTIST")
        router.navigate(["/inicio"]) // O cualquier otra ruta para usuarios no autorizados
        return false
      }
    } catch (error) {
      console.error("Error al parsear datos de usuario:", error)
      router.navigate(["login"])
      return false
    }
  } else {
    // Si hay token pero no hay datos de usuario, algo está mal
    console.error("Token presente pero no hay datos de usuario")
    localStorage.removeItem("token") // Limpiar token inválido
    router.navigate(["login"])
    return false
  }
};
