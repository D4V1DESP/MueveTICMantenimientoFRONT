import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { MsalService } from './msal.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  serverUrl: string = "https://muevetic-be.onrender.com"

  constructor(public accountService: AccountService, private router: Router, private msalService: MsalService, private datePipe: DatePipe) {
    if (sessionStorage.getItem('doLogout') === 'true') {
      sessionStorage.removeItem('doLogout');
      this.msalService.logout();
    }

    let cached: any = sessionStorage.getItem("user")

    if (cached != null) {
      cached = JSON.parse(cached)
      this.accountService.user = cached
      this.accountService.auxUser = cached

      this.accountService.getMe().subscribe({
        next: _ => {},
        error: _ => {
          sessionStorage.removeItem("user")
          this.msalService.login()
        }
      })

      return
    }

    this.accountService.getMe().subscribe({
      next: respuesta => {
        this.accountService.user = respuesta
        this.accountService.user.birthdate = this.datePipe.transform(this.accountService.user.birthdate, 'yyyy-MM-dd')!
        this.accountService.auxUser = this.accountService.user
        this.accountService.eventPipe.emit("USER-LOADED")
        sessionStorage.setItem("user", JSON.stringify(this.accountService.user))
      },
      error : _ => {
        this.router.navigate(["/login"])
      }
    })
  }
}
