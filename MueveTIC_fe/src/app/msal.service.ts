import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MsalService {

  router;

  constructor(router: Router) {
    this.router = router;
  }

  login() {
    this.router.navigate(['/login/redirect']);
  }

  logout() {
    this.router.navigate(['/logout']);
  }
}
