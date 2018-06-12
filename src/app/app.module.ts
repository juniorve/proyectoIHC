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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PrincipalComponent,
    RestaurantComponent,
    PerfilComponent,
    LoginComponent,
    ComentariosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
