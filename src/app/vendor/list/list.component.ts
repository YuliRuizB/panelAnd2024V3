import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { map, takeUntil, tap } from 'rxjs/operators';
import { IVendor } from '../../shared/interfaces/vendor.type';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RolService } from '../../shared/services/roles.service';
import { VendorService } from '../../shared/services/vendor.service';
import { AccountsService } from '../../shared/services/accounts.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponentVendor implements OnInit {
  vendorService = inject(VendorService);
  accountsService = inject(AccountsService);
  view: string = 'cardView';
  newProject: boolean = false;
  vendorList: IVendor[] = [];
  vendorListLoad: IVendor[] = [];
  objectForm!: UntypedFormGroup;
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  infoSegment: any = [];
  stopSubscription$: Subject<boolean> = new Subject();


  constructor(private modalService: NzModalService,
    private messageService: NzMessageService,
    private fb: UntypedFormBuilder) {

    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined && this.user.idSegment !== undefined) {
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.userlevelAccess = this.infoLoad.optionAccessLavel;

          this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
            takeUntil(this.stopSubscription$),
            map((a: any) => {
              const id = a.payload.id;
              const data = a.payload.data() as any;
              return { id, ...data }
            }),
            tap(record => {
              this.infoSegment = record;
              this.getSubscriptions();
              this.createForm();
              return record;
            })
          ).subscribe();
        });
      }
    });

  }

  ngOnInit(): void {

  }
  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  createForm() {
    this.objectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      legalName: ['', [Validators.required, Validators.minLength(10)]],
      primaryContact: ['', [Validators.required]],
      primaryEmail: ['', [Validators.email, Validators.required]],
      primaryPhone: ['', [Validators.required]],
      active: [false],
      deleted: [false],
      status: ['In Progress'],
      website: ['', [Validators.required]]
    });
  }
  ngOnDestroy() {
    this.stopSubscription$.next(false);
    this.stopSubscription$.complete();
  }

  getSubscriptions() {
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) {
      this.vendorService.getVendorRoutesAccessByCustomer(this.user.customerId).pipe(
        takeUntil(this.stopSubscription$),
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        })))
        .subscribe((data: any) => {
          if (data && data.length > 0) {
            const firstVendorId = data[0].vendorId;            
            this.vendorService.getVendor(firstVendorId).
              subscribe((data: any) => {
                const vendorData = data.payload.data();
                this.vendorList = [vendorData];
                this.vendorListLoad = this.vendorList;
              });
          }
        });
    }
    else {
      this.vendorService.getVendors().pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe((vendors) => {        
        this.vendorList = vendors;
        this.vendorListLoad = this.vendorList;
      })
    }
  }

  showNewProject(newProjectContent: TemplateRef<{}>) {
    const modal = this.modalService.create({
      nzTitle: 'Nueva División',
      nzContent: newProjectContent,
      nzFooter: [
        {
          label: 'Crear División',
          type: 'primary',
          disabled: () => {
            return !this.objectForm.valid;
          },
          onClick: () => this.modalService.confirm(
            {
              nzTitle: '¿Está seguro de crearlo?',
              nzOnOk: () => {
                this.modalService.closeAll();
                this.submitForm();
              }
            }
          )
        },
      ],
      nzWidth: 800
    })
  }

  modalConfirmDelete(objectId: string) {
    this.modalService.confirm(
      {
        nzTitle: '¿Está seguro de eliminarlo?',
        nzOnOk: () => {
          this.modalService.closeAll();
          this.vendorService.deleteVendor(objectId);
        }
      }
    )
  }

  submitForm() {
    if (this.objectForm.valid) {
      if (this.userlevelAccess != "3") {
        this.vendorService.createVendor(this.objectForm.value);
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para crear datos, favor de contactar al administrador.");
      }
    }
  }

  toggleAccountActive(vendorId: string, active: boolean) {
    this.vendorService.toggleVendorActive(vendorId, active);
  }

  getItems(searchbar: any) {
    const q = searchbar; // Assuming `searchbar` is an input element and you want to extract its value    
    if (!q) {
      // If the search query is empty, reset the devicesList to its original state
      this.vendorList = this.vendorListLoad.slice();
      return;
    }
    const text = q.toLowerCase(); // Using `toLowerCase()` instead of `toLower()` for lowercase conversion   
    this.vendorList = this.vendorListLoad.filter((object: any) => {
      // Check if any property of the object contains the search text
      return Object.values(object).some((value: any) => {
        // Convert the property value to lowercase and check if it includes the search text
        return String(value).toLowerCase().includes(text);
      });
    });
  }


}
