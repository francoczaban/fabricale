import { Routes } from '@angular/router';
import { MaterialCompuestoFormComponent } from './components/material-compuesto-form/material-compuesto-form.component';
import { MaterialFormComponent } from './components/material-form/material-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ListadoComponent } from './components/listado/listado.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProveedorFormComponent } from './components/proveedor-form/proveedor-form.component'; // Importa el componente de proveedores
import { authGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialEditarComponent } from './components/material-editar/material-editar.component';
import { MaterialCompuestoEditarComponent } from './components/material-compuesto-editar/material-compuesto-editar.component';
import { ProductoEditarComponent } from './components/producto-editar/producto-editar.component';
import { AgregarCantidadesComponent } from './components/agregar-cantidades/agregar-cantidades.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'materiales', component: MaterialFormComponent, canActivate: [authGuard] },
    { path: 'materiales-compuestos', component: MaterialCompuestoFormComponent, canActivate: [authGuard] },
    { path: 'productos', component: ProductoFormComponent, canActivate: [authGuard] },
    { path: 'listado', component: ListadoComponent, canActivate: [authGuard] },
    { path: 'editar-material', component: MaterialEditarComponent, canActivate: [authGuard] },
    { path: 'editar-materialCompuesto', component: MaterialCompuestoEditarComponent, canActivate: [authGuard] },
    { path: 'editar-producto', component: ProductoEditarComponent, canActivate: [authGuard] },
    { path: 'agregar-cantidades', component: AgregarCantidadesComponent, canActivate: [authGuard] },
    { path: 'proveedores', component: ProveedorFormComponent, canActivate: [authGuard] }, // Nueva ruta para proveedores
    { path: '', redirectTo: '/listado', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/listado', pathMatch: 'full' } // Ruta wildcard para manejar rutas no encontradas
];
