import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//componentes
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RestaurantComponent } from './components/menu/restaurant/restaurant.component';
import { PrincipalComponent } from './components/principal/principal.component';

const appRoutes:Routes =[ 
    {
        path:'',
         component:MenuComponent,
        children:[
            {path:'principal', component:PrincipalComponent},
            {path:'restaurant',component:RestaurantComponent},
            {path:'perfil', component: PerfilComponent},
            {path:'', redirectTo:'/principal', pathMatch:'full'}
        ]
    },
     {path:'login', component:LoginComponent}

     
    
 //   {path:'restaurant', component:RestaurantComponent}
];

export const appRoutingProviders:any[]=[];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);

