 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { UserService } from '../../services/user.service';  
import { FormsModule } from '@angular/forms';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuRoutes } from './menu.routing';
 
@NgModule({
    declarations: [ 
        RestaurantComponent
],
    imports: [  
       RouterModule,
       MenuRoutes, 
       FormsModule],
    exports: [],
    providers: [UserService],
})
export class MenuModule {}