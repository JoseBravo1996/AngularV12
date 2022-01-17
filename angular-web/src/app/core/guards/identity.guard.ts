
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { MsalService } from '@azure/msal-angular';

import { GraphService } from '@core/services/graph/graph.service';
import { IdentityService } from '@core/services/identity/identity.service';
import { environment } from '@environments/environment';
import { Routes } from '../../data/routes/routes';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {

  constructor(private msal: MsalService, private identity: IdentityService,
    private graphService: GraphService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentClaims = this.msal.instance.getAllAccounts();

    if (currentClaims) {
      this.identity.getClaims(currentClaims);
      this.graphService.initialize();
      this.identity.claims$.subscribe((claims) => {
        if (claims) {
          this.identity.getUserProfile();
        }
      });

      return true;
    }

    return false;
    this.redirect();
  }

  private redirect = (): void => {
    localStorage.setItem("return_url", this.getReturnUrl());
    
    const request = {
      scopes: environment.graph.scopes,
      state: environment.rootApi
    }
    
    this.msal.instance.loginRedirect(request);
  }

  private getReturnUrl = (): string => window.location.href.includes(Routes.httpErrors[401]) ?
    window.location.origin : window.location.href;

}
