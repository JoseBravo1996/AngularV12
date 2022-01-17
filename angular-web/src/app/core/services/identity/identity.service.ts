import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserSession } from '@core/models/UserSession';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private claims = new BehaviorSubject<any>(undefined);
  public claims$ = this.claims.asObservable();
  private user = new BehaviorSubject<UserSession | null>(null);
  public user$ = this.user.asObservable();

  constructor(private httpClient: HttpClient, private jwtService: JwtHelperService, private msalService: MsalService) {
    this.claims.next(this.getDecodedAuthToken());
  }

  getClaims = (user: any): void => {
    if (this.claims.value) return;

    const body = {
      ObjectId: user.idToken["oid"],
      Email: user.userName,
      Name: user.name,
      first_name: user.name.split(', ')[1],
      last_name: user.name.split(', ')[0],
      AccessToken: user.homeAccountIdentifier,
      LoginProvider: 'AZUREAD',
      ApplicationToken: environment.identity.applicationId
    };

    this.httpClient.post(`${environment.identity.url}/api/auth/external-login`, body).subscribe((token: any) => {
      this.setClaims(token);

      let currentHref = localStorage.getItem("return_url");
      if (currentHref && currentHref.length && window.location.href !== currentHref) {
        window.location.href = currentHref;
      } else {
        localStorage.removeItem("return_url");
        window.location.href = window.location.origin;
      }
    });
  }

  setClaims = (token: any): void => {
    this.claims.next(this.jwtService.decodeToken(token.auth_Token));
    localStorage.setItem('auth_token', token.auth_Token);
    localStorage.setItem('refresh_token', token.refresh_Token);
  }

  clearClaims = (): void => {
    this.claims.next(undefined);
    localStorage.clear();
  }

  signOut = (): void => {
    this.clearClaims();
    this.user.next(null);
    this.msalService.logout();
  }

  getAccessToken = (): Observable<any> => {
    return from(this.msalService.acquireTokenSilent({ scopes: environment.graph.scopes }));
  }

  private getDecodedAuthToken() {
    return this.jwtService.decodeToken(localStorage.getItem('auth_token') || '');
  }

  public getUserProfile = (): void => {
    this.httpClient.get(`${environment.rootApi}/api/Usuarios/perfil`).subscribe((user: any) => {

      var currentUser;

      currentUser = !!user ? new UserSession({
        email: user.email,
        firstName: user.nombre,
        lastName: user.apellido,
        roles: (user.roles instanceof Array) ? user.roles : [user.roles]
      }) : null;

      this.user.next(currentUser);
    });

  }
}

