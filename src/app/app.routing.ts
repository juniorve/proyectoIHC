import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { MrestaurantComponent } from './components/mrestaurant/mrestaurant.component';
import { ListrestaurantComponent } from './components/listrestaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/editrestaurant/editrestaurant.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'principal', component: PrincipalComponent },
      { path: 'restaurant/:id', component: RestaurantComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'mrestaurant', component: MrestaurantComponent },
      { path: 'listrestaurant', component: ListrestaurantComponent },
      // { path: 'menu', component: MenuComponent },
      { path: 'editrestaurant/:id', component: EditrestaurantComponent },
      { path: '', redirectTo: '/principal', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent }



  //   {path:'restaurant', component:RestaurantComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

