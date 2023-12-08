import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { RedirectService } from '../redirect.service';
import { MsalService } from '../msal.service';
import { ConstantsModule } from '../constants';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  msg?: string;
  confirm: boolean = false;
  date: string = '2003-01-01';

  constructor(public accountService: AccountService, private router: Router, private redirectService: RedirectService, private msalService: MsalService, private constantsModule: ConstantsModule) {}

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
  }

  doUpdatePassword() {
    if (this.accountService.user.role == 'ADMIN')
      this.redirectService.redirect(this.constantsModule.SERVER_URL + '/oauth2/authorization/B2C_1_passadmin', '/logout', '/perfil');
    else
      this.redirectService.redirect(this.constantsModule.SERVER_URL + '/oauth2/authorization/B2C_1_pass', '/logout', '/perfil');
  }

  doRedirect() {
    if (this.accountService.user.role == 'ADMIN')
      this.redirectService.redirect(this.constantsModule.SERVER_URL + '/oauth2/authorization/B2C_1_updateadmin', '/perfil');
    else
      this.redirectService.redirect(this.constantsModule.SERVER_URL + '/oauth2/authorization/B2C_1_update', '/perfil');
  }

  backToMainMenu() {
    this.router.navigate(['/inicio']);
  }

  isValid() {
    return this.accountService.validateDni(this.accountService.auxUser.dni) && (this.accountService.auxUser.role == "ADMIN" || this.accountService.validateTelephone(this.accountService.auxUser.telephone))
  }

  doUpdateAccount() {
    if (!this.isValid()) {
      this.msg = 'Datos no válidos'
      return
    }

    this.accountService.update().subscribe({
      next: respuesta => {
        this.accountService.user = this.accountService.auxUser
        sessionStorage.setItem("user", JSON.stringify(this.accountService.user))
        this.msg = "Datos actualizados correctamente"
      },
      error: _ => {
        this.msg = "No se ha podido actualizar los datos, verifique que los datos son correctos"
      }
    })
  }

  showConfirmation() {
    this.confirm = true
  }

  doDeleteAccount() {
    let obs = this.accountService.delete()

    if (obs != null)
      obs.subscribe({
        next: _ => {
          this.msalService.logout()
        },
        error: _ => {}
      })
    else
      this.cancelDelete()
  }

  cancelDelete() {
    this.confirm = false
  }

}
