import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { AuthService } from 'src/app/auth/auth.service'

import { UiService } from './../common/ui.service'
import { Role } from './auth.enum'

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    protected authService: AuthService,
    protected router: Router,
    private uiService: UiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(route)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(childRoute)
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin()
  }

  protected checkLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        const roleMatch = this.checkRoleMatch(authStatus.userRole, route)
        const allowLogin = authStatus.isAuthenticated && roleMatch
        if (!allowLogin) {
          this.showAlert(authStatus.isAuthenticated, roleMatch)
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResoleUrl(route),
            },
          })
        }
        return allowLogin
      }),
      take(1) // complete the observable for the guard to work
    )
  }

  private checkRoleMatch(role: Role, route?: ActivatedRouteSnapshot): boolean {
    if (!route?.data?.expectedRole) {
      return true
    }
    return role === route?.data.expectedRole
  }

  private showAlert(isAuth: boolean, roleMatch: boolean): void {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue')
    }

    if (!roleMatch) {
      this.uiService.showToast('You do not have the permissions to view this resource')
    }
  }

  getResoleUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) {
      return ''
    }

    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/')
  }
}
