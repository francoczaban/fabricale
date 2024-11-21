import { Routes } from '@angular/router';
import { MaterialCompuestoFormComponent } from './components/material-compuesto-form/material-compuesto-form.component';
import { MaterialFormComponent } from './components/material-form/material-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ListadoComponent } from './components/listado/listado.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProveedorFormComponent } from './components/proveedor-form/proveedor-form.component'; // Importa el componente de proveedores
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'materiales', component: MaterialFormComponent, canActivate: [authGuard] },
    { path: 'materiales-compuestos', component: MaterialCompuestoFormComponent, canActivate: [authGuard] },
    { path: 'productos', component: ProductoFormComponent, canActivate: [authGuard] },
    { path: 'listado', component: ListadoComponent, canActivate: [authGuard] },
    { path: 'proveedores', component: ProveedorFormComponent, canActivate: [authGuard] }, // Nueva ruta para proveedores
    { path: '', redirectTo: '/listado', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/listado', pathMatch: 'full' } // Ruta wildcard para manejar rutas no encontradas
];
