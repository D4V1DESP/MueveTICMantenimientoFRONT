import { Component, Inject, OnInit } from '@angular/core';
import { RedirectService } from '../redirect.service';
import { ConstantsModule } from '../constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  url: string = this.constantsModule.SERVER_URL + "/oauth2/authorization/B2C_1_test";

  constructor(private redirectService: RedirectService, private constantsModule: ConstantsModule) {
    this.redirectService.redirect(this.url, '/inicio');
   }

}
