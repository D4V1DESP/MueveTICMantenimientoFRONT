import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  redirect(url: string, success_redirect: string, failure_redirect: string = success_redirect): void {
    sessionStorage.setItem('success_redirect', success_redirect);
    sessionStorage.setItem('failure_redirect', failure_redirect);
    this.document.location.href = url;
  }
}
