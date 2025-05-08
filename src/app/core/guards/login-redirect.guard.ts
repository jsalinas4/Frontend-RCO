import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginRedirectGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    // Ya está autenticado, redirige al dashboard
    const router = inject(Router);
    router.navigate(['inicio']);
    return false;
  }

  // No hay token, permite acceder a login
  return true;
};
