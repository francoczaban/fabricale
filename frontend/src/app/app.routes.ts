import { Routes } from '@angular/router';
import { MaterialCompuestoFormComponent } from './components/material-compuesto-form/material-compuesto-form.component';
import { MaterialFormComponent } from './components/material-form/material-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ListadoComponent } from './components/listado/listado.component';

export const routes: Routes = [
    { path: 'materiales', component: MaterialFormComponent },
    { path: 'materiales-compuestos', component: MaterialCompuestoFormComponent },
    { path: 'productos', component: ProductoFormComponent },
    { path: 'listado', component: ListadoComponent },
    { path: '', redirectTo: '/listado', pathMatch: 'full' }
];




