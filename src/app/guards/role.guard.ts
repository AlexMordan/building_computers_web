// import { Injectable } from '@angular/core';
// import {
//   Router,
//   CanActivate,
//   ActivatedRouteSnapshot
// } from '@angular/router';

// import { AuthService } from '../auth/auth.service';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(
//     public authService: AuthService,
//     public router: Router,
//   ) { }

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const isAuthorized = this.authService.isAuthorized(route.data.requiredRoles);

//     if (!isAuthorized) {
//       this.router.navigate(['account', 'login']);
//     }
//     return isAuthorized;
//   }
// }

// const roles = ["accountmanager", "licensekeymanager", "usermanager", "campaignmanager"];