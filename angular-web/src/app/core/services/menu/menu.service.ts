import { Injectable } from '@angular/core';

import { NavbarMenuFactoryService, LateralMenuService } from '@asociart/portal.fe.lib.ui-core-components';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private factory: NavbarMenuFactoryService,
    public lateralMenuService: LateralMenuService,
  ) { }

  public createMenu() {
    return this.factory.menu({
      label: 'principal',
      items: this.getMainMenutems()
    });

  }

  public createPanel(){
    return this.factory.panel({
      label: 'MainPanel',
      items:
        [
          this.factory.item({
            label: 'Pantalla completa',
            icon: 'fullscreen',
            size: '1'
          }),
          this.factory.panel({
            label: 'Alertas',
            icon: 'bell',
            size: '1_25'
          }),
          this.factory.panel({
            label: 'Aplicaciones',
            icon: 'grid-dots',
            size: '1_25'
          }),
          this.factory.panel({
            label: '',
            icon: 'icon-circle-user',
            size: '1_25',
            items: [
              this.factory.itemPanel({
                label: 'Cerrar sesión',
                icon: 'close-elipse'
              })
            ]
          })
        ]
    });
  }

  private getMainMenutems() {
    const items = [];
    items.push(
      this.factory.route({
        id: 'inicio',
        label: 'Inicio',
        icon: 'icon-rama_inmueble'
      }),
      this.factory.route({
        id: 'evoluciones',
        label: 'Evoluciones Autorizaciones',
        icon: 'icon-archivar'
      }),
      this.factory.route({
        id: 'facturas',
        label: 'Facturas',
        icon: 'icon-doc_propuesta'
      }),
      this.factory.route({
        id: 'turnos',
        label: 'Gestión de Turnos',
        icon: 'icon-calendar'
      }),
      this.factory.route({
        id: 'ayuda',
        label: 'ayuda',
        icon: 'icon-info-elipse'
      })
    );
    return items;
  }
}
