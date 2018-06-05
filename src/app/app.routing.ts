import { RestaurantComponent } from './components/menu/restaurant/restaurant.component';
import { PrincipalComponent } from './components/principal/principal.component';
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//componentes
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';

const appRoutes:Routes =[
    {path:'**', component:MenuComponent},
    {path:'login', component:MenuComponent},
    {path:'principal', component:PrincipalComponent},
    
    {path:'restaurant', component:RestaurantComponent}
];

export const appRoutingProviders:any[]=[];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);

