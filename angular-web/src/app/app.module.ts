import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { DataModule } from '@data/data.module';
import { ModulesModule } from '@modules/modules.module';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule, NavbarModule } from '@asociart/portal.fe.lib.ui-core-components';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { IconModule } from '@sc/portal.fe.lib.ui-core-components';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    DataModule,
    ModulesModule,
    SharedModule,
    ButtonModule,
    ButtonModule,
    NavbarModule,
    IconModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
