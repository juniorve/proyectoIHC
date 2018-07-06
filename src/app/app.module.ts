import { MaterialModule } from './shared/modules/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CardComponent } from './components/card/card.component';
import { MrestaurantComponent } from './components/mrestaurant/mrestaurant.component';
import { ListrestaurantComponent } from './components/listrestaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/editrestaurant/editrestaurant.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormcomentarioComponent } from './components/formcomentario/formcomentario.component';
import { RegisterComponent } from './components/register/register.component';
import { RestauranteditComponent } from './components/restaurantedit/restaurant_edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FormcomentarioComponent,
    MenuComponent,
    PrincipalComponent,
    RestaurantComponent,
    PerfilComponent,
    LoginComponent,
    RestauranteditComponent,
    // ComentariosComponent,
    FooterComponent,
    CardComponent,
    MrestaurantComponent,
    ListrestaurantComponent,
    EditrestaurantComponent,
    SidebarComponent,
    RegisterComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    routing,
    OverlayModule, ReactiveFormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
