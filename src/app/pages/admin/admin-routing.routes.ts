import { Routes } from "@angular/router";
import { AdminlayoutComponent } from "./adminlayout/adminlayout.component";
import { CitasComponent } from "./citas/citas.component";
import { AjustesComponent } from "./ajustes/ajustes.component";

export const routesadmin: Routes = [
    {
      path: '',
      component: AdminlayoutComponent,
      children: [
        { path: 'citas', component: CitasComponent },
        { path: 'ajustes', component: AjustesComponent },
        { path: '', redirectTo: 'citas', pathMatch: 'full' }
      ]
    }
  ];
  