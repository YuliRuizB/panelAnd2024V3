import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-terms', 
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})

export class TermsComponent implements OnInit {

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }

  ngOnInit() {
  }

}
