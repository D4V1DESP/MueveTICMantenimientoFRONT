import { Component, OnInit } from '@angular/core';
import { MsalService } from '../msal.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  msg?: string;

  constructor(private authService: MsalService, public accountService: AccountService, private router: Router) {
    this.accountService = accountService;
    this.authService = authService;
    this.accountService.eventPipe.subscribe({
      next: (event: string) => {
        if (event === "USER-LOADED")
          this.doRedirectInicio();
      }
    })
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  doRedirectInicio() {
    this.router.navigate(['/inicio']);
  }

}


