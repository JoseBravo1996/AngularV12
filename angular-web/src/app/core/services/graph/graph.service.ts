import { Injectable } from '@angular/core';

import { Client } from '@microsoft/microsoft-graph-client';

import { IdentityService } from '@core/services/identity/identity.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private client: Client | undefined;

  constructor(private identityService: IdentityService) {
    this.initialize();
  }

  public initialize = (): void => {
    this.client = Client.init({
      authProvider: async (done) => { 
        this.identityService.getAccessToken().subscribe((result: any) => done(null, result));
      }
    });
  }
}
