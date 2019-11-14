import { Routes } from '@angular/router';
import { MaestroComponent } from './components/maestro/maestro.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: MaestroComponent
    }
];
