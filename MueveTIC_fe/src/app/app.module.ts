import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AdministrarVeComponent } from './administrar-ve/administrar-ve.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './users/users.component';
import { LogoutComponent } from './logout/logout.component';
import { OauthComponent } from './oauth/oauth.component';
import { DatePipe } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ConstantsModule } from './constants';
import { ConfigComponent } from './config/config.component';
import { AtencionTelefonicaComponent } from './atencion-telefonica/atencion-telefonica.component';
import { ReservasTelefonicasComponent } from './reservas-telefonicas/reservas-telefonicas.component';
import { ConsultasTelefonicasComponent } from './consultas-telefonicas/consultas-telefonicas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministrarVeComponent,
    InicioComponent,
    PerfilComponent,
    UsersComponent,
    LogoutComponent,
    OauthComponent,
    MenuComponent,
    ReservationsComponent,
    ConfigComponent,
    AtencionTelefonicaComponent,
    ReservasTelefonicasComponent,
    ConsultasTelefonicasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [ConstantsModule]
})
export class AppModule { }
