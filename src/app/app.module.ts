import { MaterialModule } from './shared/modules/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RestaurantComponent } from './components/menu/restaurant/restaurant.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { FooterComponent } from './components/footer/footer.component'; 
import {OverlayModule} from '@angular/cdk/overlay'; 
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PrincipalComponent,
    RestaurantComponent,
    PerfilComponent,
    LoginComponent,
    ComentariosComponent,
    FooterComponent,
    CardComponent 
  ],
  imports: [
    MaterialModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    routing,
    OverlayModule,ReactiveFormsModule
  ],   
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
