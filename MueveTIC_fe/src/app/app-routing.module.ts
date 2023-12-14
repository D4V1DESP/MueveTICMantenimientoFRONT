import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdministrarVeComponent } from './administrar-ve/administrar-ve.component';
import { UsersComponent } from './users/users.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { LogoutComponent } from './logout/logout.component';
import { OauthComponent } from './oauth/oauth.component';
import { MenuComponent } from './menu/menu.component';
import { ConfigComponent } from './config/config.component';
import { AtencionTelefonicaComponent } from './atencion-telefonica/atencion-telefonica.component';
import { ConsultasTelefonicasComponent } from './consultas-telefonicas/consultas-telefonicas.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login/redirect', component: LoginComponent },
  { path: 'inicio', component: MenuComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'vehiculos', component: AdministrarVeComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'oauth/redirect', component: OauthComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'atencion-telefonica', component: AtencionTelefonicaComponent },
  { path: 'consultas', component: ConsultasTelefonicasComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
