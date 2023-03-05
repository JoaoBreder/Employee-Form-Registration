import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.currentUser;
    const next = state.url;

    if (next === '/home') {
      if (user) return true;

      this.router.navigate(['/login']);
      return false;
    } else {
      if (!user) return true;

      this.router.navigate(['/home']);
      return false;
    }
  }
}
