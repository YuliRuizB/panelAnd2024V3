import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { filter, toLower, some } from 'lodash';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
//import { IStopPoint } from 'src/app/shared/interfaces/route.type';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { VendorService } from '../../../shared/services/vendor.service';
import { RolService } from '../../../shared/services/roles.service';
import { RoutesService } from '../../../shared/services/routes.service';
import { CustomersService } from '../../../customers/services/customers.service';
import { AccountsService } from '../../../shared/services/accounts.service';

@Component({ 
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GlobalUsersListComponent implements OnInit, OnDestroy {
  customersService = inject(CustomersService);

  @ViewChild('searchBar', { static: false }) searchbar: any;
  @ViewChild('searchBarDrive', { static: false }) searchbarDrive: any;
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  devicesList: any;
  devicesListDrive: any;
  loadedDevicesList: Array<any> = [];
  loadedDevicesListDrive: Array<any> = [];
  currentUserSelected: any;
  currentDriverSelected: any;
  currentSelectedCustomerId: any;
  accountId$ = new Subject<string>();
  routeId$ = new Subject<string>();
  isUserSelected = false;
  isDriverSelected = false;
  isBoardingPassSelected = false;
  validateEditForm!: UntypedFormGroup;
  stopPointsList: any = [];
  isEditUserVisible = false;
  isCustomersVisible = false;
  userRoutes: any = [];
  fileListInfo: any = [];
  newCustomerIdEditMode: string = "";
  isConfirmLoading: boolean = false;
  resetClientEditInfo: boolean = false;
  isVisible = false;
  isLoadingUsers = false;
  isLoadingDrivers = false;
  usersByAccount: any = [];
  usersCollection: AngularFirestoreCollection<any> | undefined;
  driversCollection: AngularFirestoreCollection<any> | undefined;
  rolCollection: AngularFirestoreCollection<any> | undefined;
  users: any;
  rolesName: any;
  hasBeenFiltered = false;
  displayData: any;
  displayDataDriver: any;
  roles: any[] | undefined;
  rolSuscription?: Subscription;
  RolesArray: any;
  rolesperUser?: string;
  rolesperUserAplicacion?: string;
  infoLoad: any = [];
  vendorinfo: any = [];
  vendorName: string = "";
  userinfoLoad: any = [];
  userlevelAccess?: string;
  user: any;
  routesService = inject(RoutesService);
  vendorService= inject(VendorService);
  accountsService = inject(AccountsService);
  stopSubscription$: Subject<any> = new Subject();
  infoSegment: any  = [];
  segmentList:any;
  selectedSegmentId: any; 
  selectedSegmentName: any; 

  constructor(
    private afs: AngularFirestore,   
    private msg: NzMessageService, 
    private fb: UntypedFormBuilder) {
    this.authService.user.subscribe((user) => {
      this.user = user;
      this.authService.user.subscribe((user) => {
        this.user = user;
        if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
            this.infoLoad = item;
            this.userlevelAccess = this.infoLoad.optionAccessLavel;
          });
          this.accountsService.getSegmentLevel(this.user.idSegment).pipe(
            takeUntil(this.stopSubscription$),
            map((a:any) => {
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
      });  
    });
  }

  ngOnInit() {
    const routesObservable: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('customers').doc(accountId).collection('routes', ref => ref.where('active', '==', true)).valueChanges({ idField: 'routeId' })
      ));
    const usersObservable: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('users', ref => ref.where('customerId', '==', accountId).orderBy('studentId')).valueChanges({ idField: 'uid' })
      ));
    const rolSuscription: Observable<any>  = this.accountId$.pipe(
      switchMap(accountId => this.afs.collection('roles', ref => ref.where('active', '==', true)).valueChanges({ idField: 'uid' })
      ));
    usersObservable.subscribe((usersByAccount: any) => {
      this.usersByAccount = usersByAccount;
    })
    rolSuscription.subscribe((roles: any) => {
      this.roles = roles;
    });
    this.getUsersList();
    this.getDriversList();
    this.validateEditForm = this.fb.group({
      rolId: [''],
      roles: ['']
    });
  }

  ngOnDestroy() {
    this.stopSubscription$.next(undefined);
    this.stopSubscription$.complete();
  }

  initializeItems() {
    this.devicesList = this.loadedDevicesList;
    this.devicesListDrive = this.loadedDevicesListDrive;
  }

  getUsersList() {
    this.isLoadingUsers = true;
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.usersCollection = this.afs.collection<any>('users', ref => ref
      .where('customerId', '==', this.user.customerId)
      .orderBy('displayName'));
      this.users = this.usersCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(users => {
        this.loadUsers(users);
      });
    } 
    else {
      this.usersCollection = this.afs.collection<any>('users', ref => ref.orderBy('displayName'));
      this.users = this.usersCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(users => {
        this.loadUsers(users);
      });
    }
  }

  getDriversList() {
    this.isLoadingDrivers = true;
    if (this.infoSegment.nivelNum !== undefined && this.infoSegment.nivelNum == 1) { //Individual
      this.driversCollection = this.afs.collection<any>('drivers', ref => ref
      .where('customerId', '==', this.user.customerId)
      .orderBy('displayName'));
      this.users = this.driversCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(drivers => {
        this.loadDrivers(drivers);
      });
      } else {
        this.driversCollection = this.afs.collection<any>('drivers', ref => ref.orderBy('displayName'));
        this.users = this.driversCollection.snapshotChanges().pipe(
          map((actions:any) => actions.map((a: any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          }))
        ).subscribe(drivers => {
          this.loadDrivers(drivers);
        });
      }   
  }

  loadUsers(users: any) {
    if (this.loadedDevicesList.length <= 1) {
      this.displayData = users;
      this.devicesList = _.orderBy(JSON.parse(JSON.stringify(users)), ['displayName'], ['asc']);
      this.loadedDevicesList = this.devicesList;
    }
  }

  loadDrivers(drivers: any) {
    if (this.loadedDevicesListDrive.length <= 1) {
      this.displayDataDriver = drivers;
      this.devicesListDrive = _.orderBy(JSON.parse(JSON.stringify(drivers)), ['displayName'], ['asc']);
      this.loadedDevicesListDrive = this.devicesListDrive;
    }
  }

  getItems(searchbar: any) {
    this.initializeItems();
    const q = searchbar;
    if (!q) { return; }
    const text = _.toLower(q);
    this.devicesList = filter(this.devicesList, (object) => {
      return some(object, (string: any) => {
          return toLower(string).includes(text);
      });
  });
  }

  getItemsDrive(searchbarDrive: any) {
    this.initializeItems();
    const q = searchbarDrive;
    if (!q) { return; }
    const text = _.toLower(q);    
    this.devicesListDrive = filter(this.devicesList, (object) => {
      return some(object, (string: any) => {
          return toLower(string).includes(text);
      });
  });
  }

  userSelected(data: any) {
    this.rolesperUser = "";
    this.rolesperUserAplicacion = "";
    this.currentUserSelected = data;
    this.RolesArray = data.roles;
    this.rolesperUserAplicacion = this.RolesArray.join(', ');
    if (data.rolId != undefined) {
      if (data.rolId.length > 0) {
        this.rolService.getRol(data.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.rolesperUser = this.infoLoad.description;
        });

      }
    }
    this.currentSelectedCustomerId = this.currentUserSelected.customerId;
    this.isBoardingPassSelected = false;
    this.accountId$.next(this.currentUserSelected.customerId);
    this.isUserSelected = true;
  }

  driverSelected(data: any) {
    this.vendorName = "";
    this.rolesperUser = "";
    this.rolesperUserAplicacion = "";
    this.currentDriverSelected = data;
    this.RolesArray = data.roles;
    this.rolesperUserAplicacion = this.RolesArray.join(', ');
    if (data.rolId != undefined) {
      if (data.rolId.length > 0) {
        this.rolService.getRol(data.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.rolesperUser = this.infoLoad.name;
        });
      }
    }
    if (data.vendorId != undefined) {
      this.vendorService.getVendor(data.vendorId).pipe(
        map((a:any) => {
          const id = a.payload.id;
          const data = a.payload.data() as any;
          return { id: id, ...data }
        })
      ).subscribe((vendor) => {
        this.vendorinfo = vendor;
        this.vendorName = this.vendorinfo.name;
      });
    }
    this.isBoardingPassSelected = false;
    this.isDriverSelected = true;
  }

  setUserDisabled(disabled: any) {
    this.customersService.setUserDisabled(this.currentUserSelected.uid, disabled);
    this.currentUserSelected.disabled = disabled;
  }
  nzClicOptionInformacion() {
    this.isBoardingPassSelected = false;
  }

  nzClicOptionSegment(currentUser : any){
    this.customersService.getAllSegments().pipe(
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id: id, ...data }
      }))
    ).subscribe((segment:any) => {
      this.segmentList = segment;
      const selectedSegment = this.segmentList.find((segment: any) => segment.id === currentUser.idSegment);
      if (selectedSegment) {
        this.selectedSegmentName =  selectedSegment.nivel;
      }    
    });
    if (currentUser !== null && currentUser.idSegment !== undefined) {
     this.selectedSegmentId = currentUser.idSegment;    
    }
  }
  onSegmentSelected(segment: any) {
    this.selectedSegmentName = segment.nivel;
    this.selectedSegmentId = segment.id;
  }

  log(): void {
  }

  showModalEditUser(currentUserSelected: any) {
    this.isEditUserVisible = true;
  }

  saveSegment(currentUserSelected: any) {  
    this.customersService.saveSegmentId(currentUserSelected.id,this.selectedSegmentId);
  }

  showModalEditDriver(currentUserSelected: any) {
    this.isEditUserVisible = false;
  }

  showModalCustomer() {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isEditUserVisible = false;
  }

  submitForm(): void {
  }

  submitEditForm(): void {
    const rolId = this.validateEditForm.controls['rolId'].value == undefined ? "" : this.validateEditForm.controls['rolId'].value;
    const uid = this.currentUserSelected.uid;
    let validForm: boolean = true;
    const data = {
      uid: uid,
      rolId: rolId
    };
    if (validForm) {
      if (this.userlevelAccess != "3") {
        this.rolService.updateUserRol(this.currentUserSelected.uid, data)
          .then((success) => {
            this.isEditUserVisible = false;
          }).catch((err) => { this.msg.error(err) });
      } else {
        this.msg.error("El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }

    } else {
      this.msg.success("El Formulario no es valido favor de validar");
    }
  }

  submitCustomerForm(): void {
  }
}




