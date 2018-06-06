
import { Routes, RouterModule } from '@angular/router'; 
import { MenuComponent } from './menu.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {

    path: '', component: MenuComponent,
    children: [
      { path: 'restaurant', component:RestaurantComponent} 
    ]

  },
  
];

export const MenuRoutes = RouterModule.forChild(routes);
