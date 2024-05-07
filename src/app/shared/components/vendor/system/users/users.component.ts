import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { columnDefs, rowGroupPanelShow } from '../../../../../customers/classes/customers';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GridOptions } from 'ag-grid-community';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { map } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RolService } from '../../../../services/roles.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { CustomersService } from '../../../../../customers/services/customers.service';

@Component({  
  selector: 'app-shared-vendor-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class SharedVendorUsersListComponent implements OnInit, OnDestroy {
  usersService = inject(CustomersService);
  @Input() vendorId: string = '';
  @Input() accountName: string = '';
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  sub!: Subscription;
  usersList: any = [];
  columnDefs = columnDefs;
  rowGroupPanelShow = rowGroupPanelShow;
  
  gridOptions: GridOptions = this.getGridOptions();

  popupParent: any;

  //Modal
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;

  //Wizard
  current = 0;
  index = 'First-content';

  //Ngx CSV Parser
  csvRecords: any[] = [];
  header = true;
  isSavingUsers: boolean = false;
  isDone: boolean = false;
  validateForm!: UntypedFormGroup;
  infoLoad: any = [];
  userlevelAccess!: string;
  user: any;

  constructor(
    private afs: AngularFirestore,
    private msg: NzMessageService,
    private ngxCsvParser: NgxCsvParser,     
    private fb: UntypedFormBuilder
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {         
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.userlevelAccess = this.infoLoad.optionAccessLavel;
        });
      }
    });
    this.popupParent = document.querySelector("body");
  }

  getGridOptions(): GridOptions {
    return {
      columnDefs: columnDefs,
      context: {
        thisComponent: this
      },
      rowData: null,
      rowSelection: 'single',
      pagination: true,
      defaultColDef: {
        sortable: true,
        filter: true,
        // Add more default column properties as needed
      },
      statusBar: {
        statusPanels: [
          { statusPanel: 'agFilteredRowCountComponent' },
          { statusPanel: 'agSelectedRowCountComponent' },
          { statusPanel: 'agAggregationComponent' }
        ]
      },
      enableRangeSelection: true,
      paginationPageSize: 20,
    };
  }

  sendMessage(type: string, message: string): void {
    this.msg.create(type, message);
  }

  ngOnInit() {
    this.createForm();
    this.getSubscriptions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getSubscriptions() {
    this.sub = this.usersService.getAccountSystemUsers(this.vendorId, 'vendor').pipe(
      map((actions:any) => actions.map((a:any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    )
      .subscribe((users) => {
        this.usersList = users;
        console.log(this.usersList)
      });
  }

  createForm() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      role: [null, [Validators.required]]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  repairUsers() {
    this.usersList.forEach((user: any) => {

      const currentUserLocation = this.afs.doc(`/users/${user.id}`);
      const expectedUserLocation = this.afs.doc(`/users/${user.uid}`);

      if (user.uid == user.id) {
        console.log('skipped user: ', user);
      } else {
        expectedUserLocation.set(user, { merge: true }).then(() => {
          currentUserLocation.delete();
        });
      }

    });

  }


  getContextMenuItems(params: any) {
    var result = [
      {
        name: "Ver detalles de " + params.node.data.firstName,
        action: () => {
          console.log(params);
          let context = params.context.thisComponent;
          const notification = context.afs.collection('testFCM').doc(params.value);
          notification.set({ name: 'hola' });
        },
        icon: '<nz-avatar nzIcon="user"></nz-avatar>',
        cssClasses: ["redFont", "bold"]
      },

      "separator",
      {
        name: "Checked",
        checked: true,
        action: function () {
          console.log("Checked Selected");
        },
        icon: '<img src="../images/skills/mac.png"/>'
      },
      "copy",
      "separator"
    ];
    return result;
  }

  //Modal
  showModal(): void {
    this.isVisible = true;
    this.isDone = false;
    this.isSavingUsers = false;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isSavingUsers = false;
    this.isVisible = false;
    this.csvRecords = [];
    this.current = 0;
    this.isDone = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.csvRecords = [];
    this.current = 0;
    this.isDone = false;
  }

  //Wizard
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    this.isSavingUsers = true;

    if (this.userlevelAccess != "3") {
      this.usersService.createSystemUser(this.makeUserObject(this.validateForm.value)).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
    this.isDone = true;
    this.isVisible = false;
    this.isSavingUsers = false;
  }

  makeUserObject(user: any) {
    let userObj = {
      _isEditMode: false,
      customerId: this.vendorId,
      customerName: this.accountName,
      disabled: false,
      displayName: user.firstName + ' ' + user.lastName,
      email: user.email || '',
      emailVerified: false,
      firstName: user.firstName,
      lastName: user.lastName,
      lastUpdatedAt: new Date(),
      occupation: 'vendor',
      paid: false,
      phone: user.phoneNumber,
      phoneNumber: user.phoneNumber,
      photoURL: '',
      roles: [user.role],
      studentId: user.employeeId || 'unspecified',
      uid: '',
      username: user.firstName,
      userRegisteredBy: 'fromSystem'
    }
    return userObj;
  }

  handleChange(event: NzUploadChangeParam): void {
    const status = event.file.status;
    if (event.fileList.length == 0) {
      this.csvRecords = [];
    }
    if (status !== 'uploading') {
      console.log(event.file, event.fileList, event);
    }
    if (status === 'done') {
      this.msg.success(`${event.file.name} Se ha cargado con éxito.`);
      console.log(event.file);
      if (event.file.originFileObj) {
      this.parser(event.file.originFileObj);
      }

    } else if (status === 'error') {
      this.msg.error(`${event.file.name} no ha podido ser cargado.`);
    }
  }

  parser(file: File) {
    setTimeout(() => {
      this.ngxCsvParser.parse(file, { header: this.header, delimiter: ',' })
        .subscribe(
          (value: any[] | NgxCSVParserError) => { // Specify the union type for the value parameter
            if (value instanceof NgxCSVParserError) {
              console.log('Error', value);
            } else {
              const result: any[] = value;
              console.log('Result', result);
              this.csvRecords = result;
            }
          }
        );
    }, 100);
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

}