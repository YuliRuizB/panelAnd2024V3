import { Component, OnInit, OnDestroy, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { columnDefs, rowGroupPanelShow } from '../../../../customers/classes/customers';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { map } from 'rxjs/operators';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../../../customers/services/customers.service';


@Component({
  selector: 'app-shared-system-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class SharedSystemUsersListComponent implements OnInit, OnDestroy {

  @Input() accountId: string = '';
  @Input() accountName: string = '';
  sub!: Subscription;
  usersList: any = [];
  columnDefs = columnDefs;
  rowGroupPanelShow = rowGroupPanelShow;
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
  usersService = inject(CustomersService);
  constructor(
    private afs: AngularFirestore,
    private messageService: NzMessageService,
    private msg: NzMessageService,
    private ngxCsvParser: NgxCsvParser,
    private fb: UntypedFormBuilder
  ) {
    this.popupParent = document.querySelector("body");
  }

  ngOnInit() {
    this.createForm();
    this.getSubscriptions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getSubscriptions() {
    this.sub = this.usersService.getAccountSystemUsers(this.accountId, 'customer').pipe(
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    )
      .subscribe((users) => {
        this.usersList = users;
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
    this.isSavingUsers = false;
    this.isVisible = false;
    this.csvRecords = [];
    this.current = 0;
    this.isDone = false;
  }

  handleCancel(): void {
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
    this.usersService.createSystemUser(this.makeUserObject(this.validateForm.value)).then(response => {
    }).catch(err => {
      this.sendMessage('error', err);
    })
    this.isDone = true;
    this.isVisible = false;
    this.isSavingUsers = false;
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }

  makeUserObject(user: any) {
    let userObj = {
      _isEditMode: false,
      customerId: this.accountId,
      customerName: this.accountName,
      disabled: false,
      displayName: user.firstName + ' ' + user.lastName,
      email: user.email || '',
      emailVerified: false,
      firstName: user.firstName,
      lastName: user.lastName,
      lastUpdatedAt: new Date(),
      occupation: 'customer',
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
      this.sendMessage('info', event.file + ' ' + event.fileList + ' ' + event);
    }
    if (status === 'done') {
      this.msg.success(`${event.file.name} Se ha cargado con éxito.`);
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
          (value: any[] | NgxCSVParserError) => { // Specify the union type for the value parameter //TODO
            if (value instanceof NgxCSVParserError) {
            } else {
              const result: any[] = value;
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