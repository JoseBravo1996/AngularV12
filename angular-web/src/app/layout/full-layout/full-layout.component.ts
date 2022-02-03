import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MenuService } from '@core/services/menu/menu.service';
import { Menu, ScrollService, Panel } from '@asociart/portal.fe.lib.ui-core-components';

@Component({
  selector: 'full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit, AfterViewChecked {

  menu: Menu | any;
  panelOptions: Panel | any;
  claims: any;
  signingOut: boolean | undefined;
  fullName: string | undefined;
  loading: boolean | undefined;


  constructor(private scrollService: ScrollService,
    private menuService: MenuService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.panelOptions = this.menuService.createPanel();
    this.menu = this.menuService.createMenu();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onMenuToggle = (isOpen: boolean): void => {
    isOpen ? this.scrollService.disableViewportScroll() : this.scrollService.enableViewportScroll();
  }

  signOut = (): void => {
    if (this.signingOut) { return; }
    this.signingOut = true;
  }

}
