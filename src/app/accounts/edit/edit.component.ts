import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsService } from '../../shared/services/accounts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  accountsService = inject(AccountsService);
    changePWForm!: UntypedFormGroup;
    sub!: Subscription;
    recordId: any;
    selectedIndex: number = 0;
    record: any = [];
    avatarUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
    selectedCountry: any;
    selectedLanguage: any;

    constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute,
       private modalService: NzModalService, private message: NzMessageService) {
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.recordId = params['id']; // (+) converts string 'id' to a number
        this.selectedIndex = params['index']; // (+) converts string 'id' to a number
        
        this.getSubscriptions();
     });

        this.changePWForm = this.fb.group({
            oldPassword: [ null, [ Validators.required ] ],
            newPassword: [ null, [ Validators.required ] ],
            confirmPassword: [ null, [ Validators.required ] ]
        });
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    showConfirm(): void {
        this.modalService.confirm({
            nzTitle  : '<i>Do you want to change your password?</i>',
            nzOnOk   : () => this.message.success('Password Change Successfully')
        });
    }

    getSubscriptions() {
      this.accountsService.getAccount(this.recordId).pipe(
        map((a:any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id: id, ...data }
        })
      ).subscribe( (account) => {
        this.record = account;
      })
    }
 
    submitForm(): void {
        for (const i in this.changePWForm.controls) {
            this.changePWForm.controls[ i ].markAsDirty();
            this.changePWForm.controls[ i ].updateValueAndValidity();
        }

        this.showConfirm();
    }

    private getBase64(img: File, callback: (img:string | ArrayBuffer | null) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

   /*  handleChange(info: { file: UploadFile }): void {
        this.getBase64(info.file.originFileObj, (img: string) => {
            this.avatarUrl = img;
        });
    } */
}    