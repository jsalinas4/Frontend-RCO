import { Routes } from '@angular/router';
import { InicioComponent } from './pages/public/home/inicio/inicio.component';
import { ServiciosComponent } from './pages/public/home/servicios/servicios.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { loginRedirectGuard } from './core/guards/login-redirect.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CitaComponent } from './pages/public/home/cita/cita.component';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { PaymentSuccessComponent } from './pages/public/home/payment-success/payment-success.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent, title: 'Inicio'},
    {path: 'servicios', component: ServiciosComponent, title: 'Servicios'},
    {path: 'login', component: LoginComponent, title: 'Login', canActivate: [loginRedirectGuard]},
    {path: 'register', component: RegisterComponent, title: 'Register'},
    {path: 'cita', component: CitaComponent, title: 'Cita'},
    ///{path: 'login-test', component: LoginTestComponent, title: 'Login Test'},
    { path: 'admin', loadChildren: () => import('./pages/admin/admin-routing.routes').then(m => m.routesadmin),
        canActivate: [authenticatedGuard], 
        title: 'Admin' },
    {path: 'payment-success', component: PaymentSuccessComponent, title: 'Payment Success'},
];
