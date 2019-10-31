import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let result = window.localStorage.getItem('ACCESS_TOKEN');
    if (result) {
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
