import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DriversService } from '../../../services/drivers.service';
import { RolService } from '../../../services/roles.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { AccountsService } from '../../../services/accounts.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ConsoleSqlOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-shared-vendor-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class SharedVendorDriversComponent implements OnInit, OnDestroy {

  @Input() vendorId: string = '';
  driversService = inject(DriversService);
  driversList: any = [];
  driversListLoaded: any = [];
  driversSubscription!: Subscription;
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  view: string = 'listView';
  isVisibleNewDriver: boolean = false;
  isCreatingDriver: boolean = false;
  isEditMode: boolean = false;
  isEditPassword: boolean = false;
  responseUpdate: string = "";
  modalName: string = "Agregar PR";
  signupForm!: UntypedFormGroup;
  signupFormEdit!: UntypedFormGroup;
  signupFormPassword!: UntypedFormGroup;
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;
  customerList: any[] = [];
  accountsService = inject(AccountsService);
  stopSubscription$: Subject<any> = new Subject();
  infoSegment: any = [];
  cDocument: AngularFirestoreDocument<any> | undefined;
  cCollection: AngularFirestoreCollection<any> | undefined;
  customerSubscription: Subscription | undefined;

  constructor(
    private afs: AngularFirestore,
    private nzMessageService: NzMessageService,
    private fb: UntypedFormBuilder
  ) {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
            this.infoLoad = item;
            this.userlevelAccess = this.infoLoad.optionAccessLavel;
          });
          this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
            takeUntil(this.stopSubscription$),
            map((a: any) => {
              const id = a.payload.id;
              const data = a.payload.data() as any;
              return { id, ...data }
            }),
            tap(record => {
              this.infoSegment = record;
              return record;
            })
          ).subscribe();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getSubscriptions();
    this.createForm();
  }
  sendMessage(type: string, message: string): void {
    this.nzMessageService.create(type, message);
  }

  createForm() {
    this.signupForm = this.fb.group({
      id: [],
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      employeeId: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(7), Validators.required])],
      vendorId: [this.vendorId, Validators.compose([Validators.required])],
      vendorName: [''],
      displayName: [''],
      password: ['', Validators.compose([Validators.required])],
      verifyPassword1: ['', [this.confirmValidator]],
      customerId: ['']
    });
    this.signupFormEdit = this.fb.group({
      id: [],
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      employeeId: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(7), Validators.required])],
      vendorId: [this.vendorId, Validators.compose([Validators.required])],
      vendorName: [''],
      displayName: [''],
      customerId: ['']
    });
    this.signupFormPassword = this.fb.group({
      id: [],
      password: ['', Validators.compose([Validators.required])],
      verifyPasswordSec: ['', [this.confirmValidatorPass]]
    });
  }

  ngOnDestroy() {
    if (this.driversSubscription) {
      this.driversSubscription.unsubscribe();
    }
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }

  getSubscriptions() {
    if (this.vendorId != '') {
      this.driversService.getDriversByCustomergetDrivers(this.vendorId).pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id: id, ...data }
        }))
      ).subscribe((drivers) => {
        this.driversList = drivers;
        this.driversListLoaded = drivers;
      })
    }
  }

  toggleActive(data: any) {
    this.driversService.toggleActiveDriver(data.uid, data.active)
  }

  deletePermission(data: any) {
    if (this.userlevelAccess == "1") {
      this.driversService.deleteDriver(data.uid);
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    }

  }

  cancelDelete() {
  }

  editRecord(data: any) {
    this.isEditMode = true;

    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.cDocument = this.afs.collection('customers').doc(this.user.customerId);
      this.customerSubscription = this.cDocument.snapshotChanges().pipe(
        map(action => {
          const id = action.payload.id;
          const data = action.payload.data() as any;
          return { id, ...data };
        })
      ).subscribe(customers => {
        this.customerList = [customers];
      });
    } else {
      this.cCollection = this.afs.collection<any>('customers', ref => ref.where('active', '==', true));
      this.customerSubscription = this.cCollection.snapshotChanges().pipe(
        map((actions: any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(customers => {
        this.customerList = customers;
      });
    }

    this.isEditPassword = false;
    this.modalName = "Editar PR";
    this.patchForm(data);
  }

  editRecordPassword(data: any) {
    this.isEditMode = true;
    this.isEditPassword = true;
    this.modalName = "Restablecer Contraseña";
    this.patchFormPassword(data);
  }

  patchForm(data: any) {
    this.signupFormEdit.patchValue({ ...data });
    this.openCreateDriverModal();
  }
  patchFormPassword(data: any) {
    this.signupFormPassword.patchValue({ ...data });
    this.openCreateDriverModal();
  }

  createDriver() {
    const isValid: boolean = true;
    if (this.userlevelAccess != "3") {

      if (this.isEditMode && !this.isEditPassword) {
        //is edit contact
        if (this.signupFormEdit.valid) {
          let currSignForm = this.signupFormEdit.value;
          currSignForm.displayName = currSignForm.firstName + ' ' + currSignForm.lastName;
          this.driversService.updateDriver(currSignForm.id, currSignForm).then(() => {
            this.isVisibleNewDriver = false;
            this.isCreatingDriver = false;
            this.isEditMode = false;
            this.modalName = "Agregar PR";
          });
          this.nzMessageService.success("Se editó el contacto con éxito");
        } else {
          Object.values(this.signupFormEdit.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
      } else {
        if (!this.isEditMode && !this.isEditPassword) {
          // is Adding
          if (this.signupForm.valid) {
            this.driversService.createDriver(this.signupForm.value).then((response) => {
              this.isVisibleNewDriver = false;
              this.isCreatingDriver = false;
              this.isEditMode = false;
            });
            this.nzMessageService.success("Se agregó con exito el PR");
          } else {
            Object.values(this.signupForm.controls).forEach(control => {
              if (control.invalid) {
                control.markAsDirty();
                control.updateValueAndValidity({ onlySelf: true });
              }
            });
          }
        } else {
          if (this.signupFormPassword.valid) {
            this.driversService.resetPassword(this.signupFormPassword.controls['id'].value, this.signupFormPassword.controls['password'].value).then((response) => {
              this.isEditPassword = false;
              this.isEditMode = false;
              this.isVisibleNewDriver = false;
            });
            this.nzMessageService.success('Se actualizó la contraseña con éxito');
          } else {
            Object.values(this.signupFormPassword.controls).forEach(control => {
              if (control.invalid) {
                control.markAsDirty();
                control.updateValueAndValidity({ onlySelf: true });
              }
            });
          }
        }
      }
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  createDriverModal() {
    this.isEditMode = false;
    this.isEditPassword = false;
    this.signupForm.pristine;
    this.modalName = "Agregar PR";
    this.openCreateDriverModal();
  }

  openCreateDriverModal() {
    this.isVisibleNewDriver = true;
  }

  closeNewDriverModal() {
    this.isVisibleNewDriver = false;
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.isEditPassword ? this.signupFormPassword.controls['verifyPasswordSec'].updateValueAndValidity() : this.signupForm.controls['verifyPassword1'].updateValueAndValidity());
  }

  validateConfirmPassword1(): void {
    setTimeout(() => this.signupForm.controls['verifyPassword1'].updateValueAndValidity());
  }

  confirmValidatorPass = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.signupFormPassword.controls['password'].value) {
      return { verifyPasswordSec: true, error: true };
    }
    return {};
  };
  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { verifyPassword1: true, error: true };
    }
    return {};
  };


  getItems(searchbar: any) {
    const q = searchbar; // Assuming `searchbar` is an input element and you want to extract its value    
    if (!q) {
      // If the search query is empty, reset the devicesList to its original state
      this.driversList = this.driversListLoaded.slice();
      return;
    }
    const text = q.toLowerCase(); // Using `toLowerCase()` instead of `toLower()` for lowercase conversion   
    this.driversList = this.driversListLoaded.filter((object: any) => {
      // Check if any property of the object contains the search text
      return Object.values(object).some((value: any) => {
        // Convert the property value to lowercase and check if it includes the search text
        return String(value).toLowerCase().includes(text);
      });
    });
  }


}
