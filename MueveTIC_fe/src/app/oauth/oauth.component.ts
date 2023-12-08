import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent {

  constructor (private activatedRoute: ActivatedRoute, private router: Router) {
    if (activatedRoute.snapshot.queryParamMap.get('continue') != null) {
      router.navigate([sessionStorage.getItem('success_redirect')]);
    } else {
      router.navigate([sessionStorage.getItem('failure_redirect')]);
    }
  }
}
