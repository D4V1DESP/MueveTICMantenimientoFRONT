import { Component } from '@angular/core';
import { RedirectService } from '../redirect.service';
import { ConstantsModule } from '../constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  url: string = this.constantsModule.SERVER_URL + "/logout";

  constructor(private redirectService: RedirectService, private constantsModule: ConstantsModule) {
    sessionStorage.removeItem("user")
    this.redirectService.redirect(this.url, '/');
   }

}
