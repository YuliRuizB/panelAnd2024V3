import { Component } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { BajaUsuarioComponent } from '../baja-usuario/baja-usuario.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { TermsComponent } from '../terms/terms.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { globalImputs } from '../../directives/global-imputs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent {

  isVisible!: false;
  isConfirmLoading!: boolean;

  constructor(
    private modalService: NzModalService
  ) { }

  showModalTerms() {
    this.modalService.create({
      nzTitle: 'Términos y Condiciones de Uso',
      nzContent: TermsComponent
    });
  }

  showModalPrivacy() {
    this.modalService.create({
      nzTitle: 'Privacidad',
      nzContent: PrivacyComponent,
      nzFooter: null
    });
  }
  showModalBaja() {
    this.modalService.create({
      nzTitle: 'Baja de Usuario',
      nzContent: BajaUsuarioComponent, 
      nzFooter: null
    });
  }
}
