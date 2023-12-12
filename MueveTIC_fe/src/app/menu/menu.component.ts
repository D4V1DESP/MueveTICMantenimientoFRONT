import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(public accountService: AccountService, private router: Router) {}

  redirectToProfile() {
    this.router.navigate(['/perfil']);
  }

  redirectToReservas() {
    this.router.navigate(['/reservations']);
  }

  redirectToVehiculos() {
    this.router.navigate(['/vehiculos']);
  }

  redirectToUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  redirectToConfig() {
    this.router.navigate(['/config']);
  }

  redirectToReservasTelefonicas(){
    this.router.navigate(['/reservasTelefonicas'])
  }
  
  redirectToLogout() {
    this.router.navigate(['/logout']);
  }

}
