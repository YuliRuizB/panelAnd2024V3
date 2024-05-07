import { Component, OnInit, OnDestroy, Input, TemplateRef, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../../../interfaces/product.type';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { UsersService } from '../../../services/users.service';
import { RolService } from '../../../services/roles.service';
import { ProductsService } from '../../../services/products.service';
import { CustomersService } from '../../../../customers/services/customers.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-shared-products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'] 
})
export class SharedProductsListComponent implements OnInit, OnDestroy {

  @Input() accountId: string = '';
  rolService = inject(RolService);
  productsService = inject(ProductsService);
  usersService = inject(CustomersService);
  view: string = 'cardView';
  sub?: Subscription;
  productsList: Product[] = [];
  validateForm!: UntypedFormGroup;
  infoLoad: any = [];
  userlevelAccess?:string;
 user: any;
 userService= inject(UsersService);
 authService = inject(AuthenticationService);
 fileListInfo: any = [];
  fileList: any;
  fileUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = 'products/';
 // Upload Task 
 task!: AngularFireUploadTask;
 // Progress in percentage
 uploadPercent!: Observable<number>;
 uploadvalue: number = 0;
 downloadURL!: Observable<string>;
 // Snapshot of uploading file
 snapshot!: Observable<any>;
 // Uploaded File URL
 UploadedFileURL!: Observable<string>;
 showUploadList = {
  showPreviewIcon: true,
  showRemoveIcon: true,
  hidePreviewIconInNonImage: true
};
previewImage: string | undefined = '';
    previewVisible = false;

  constructor(
    private bucketStorage: AngularFireStorage, 
    private afs: AngularFirestore,
    private modalService: NzModalService,
    public messageService: NzMessageService,   
    private fb: UntypedFormBuilder) {

      this.authService.user.subscribe((user: any) => {
        this.user = user;
        if (this.user !== null && this.user !== undefined && this.user.rolId !== undefined) {        
            this.rolService.getRol(this.user.rolId).valueChanges().subscribe((item: any) => {
                this.infoLoad = item;
                this.userlevelAccess = this.infoLoad.optionAccessLavel;                 
            });
        }
    });

  }

  ngOnInit() {
    this.createForm();
    this.getSubscriptions();
  }

  ngOnDestroy(): void {
   // this.sub.unsubscribe();
  }

  createForm() {
    this.validateForm = this.fb.group({
      active: [false, [Validators.required]],
      category: [null, [Validators.required]],
      date_created: [new Date(), [Validators.required]],
      description: [null, [Validators.required]],
      isTaskIn: [true, [Validators.required]],
      isTaskOut: [true, [Validators.required]],
      name: [null, [Validators.required]],
      price: [0, [Validators.required]],
      timesSold: [0, [Validators.required]],
      type: [null, [Validators.required]],
      rangeDatePicker: [null],
      validFrom: [new Date(), [Validators.required]],
      validTo: [new Date(), [Validators.required]],
      imageUrl: [null]
    });
  }

  resetForm() {
    this.validateForm.reset({
      active: false,
      date_created: new Date(),
      isTaskIn: true,
      isTaskOut: true,
      price: 0,
      timesSold: 0,
      validFrom: new Date(),
      validTo: new Date()
    });
  }

  mapDateValues(event: any) {
    if (event.length > 1) {
      this.validateForm.controls['validFrom'].patchValue(new Date(event[0]));
      this.validateForm.controls['validTo'].patchValue(new Date(event[1]));
    }
    console.log(this.validateForm.value);
    console.log(this.validateForm.valid);

  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}


  submitForm() {
    if (this.validateForm.valid) {
      if (this.userlevelAccess != "3") {
        console.log(this.validateForm.value);
        this.productsService.setProduct(this.accountId, this.validateForm.value).then(() => {
          this.resetForm();
          this.modalService.closeAll();
          this.messageService.success(`Todo salió bien.`, {
            nzPauseOnHover: true,
            nzDuration: 3000
          });
        })
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
      
    }
  }

  toggleActivateProduct(product: Product) {
    this.productsService.toggleProductActive(this.accountId, product.id, product.active);
  }

  getSubscriptions() {
  //  console.log(this.accountId);
    this.sub = this.usersService.getAccountProducts(this.accountId).pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
      const data = a.payload.doc.data() as Product;
      return { ...data, id }; // Include id property only once
      }))
    ).subscribe((products: Product[]) => {
      this.productsList = products;
   //   console.log(this.productsList)
    });
  }
  
  deleteProduct(product:Product) {
    if (this.userlevelAccess == "1") {
      this.productsService.deleteProduct(this.accountId, product.id).then(() => {
        this.messageService.success(`El ${product.type} ${product.name} ha sido eliminado.`, {
          nzPauseOnHover: true,
          nzDuration: 3000
        });
      })
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  
  }

  editProduct(item: any, editContent: TemplateRef<{}>) {

    this.validateForm.patchValue({
      active: item.active || false,
      category: item.category || null,
      date_created: item.date_created || new Date(),
      description: item.description || null,
      isTaskIn: item.isTaskIn || true,
      isTaskOut: item.isTaskOut || true,
      name: item.name || null,
      price: item.price || 0,
      timesSold: item.timesSold || 0,
      type: item.type || null,
   //   rangeDatePicker: item.rangeDatePicker || null, // Assuming rangeDatePicker is a control for date range, it's not patched here
      validFrom: item.validFrom || new Date(),
      validTo: item.validTo || new Date(),
      imageUrl: item.imageUrl || null
      });

    const modal = this.modalService.create({
      nzTitle: 'Editar Producto / Servicio',
      nzContent: editContent,
      nzFooter: [{
        label: 'Guardar',
        type: 'primary',
        onClick: () => this.modalService.confirm(
          {
            nzTitle: '¿Confirmar la edición?',
            nzOnOk: () => {
              this.submitForm();
            }
          }
        )
      },
      ],
      nzWidth: 800
    });
  }

  showNewModal(newContent: TemplateRef<{}>) {
    const modal = this.modalService.create({
      nzTitle: 'Nuevo Producto / Servicio',
      nzContent: newContent,
      nzFooter: [{
        label: 'Crear',
        type: 'primary',
        onClick: () => this.modalService.confirm(
          {
            nzTitle: '¿Está seguro?',
            nzOnOk: () => {
              this.submitForm();
            }
          }
        )
      },
      ],
      nzWidth: 800
    });
  }

  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  handleChange2(event: NzUploadChangeParam): void {
    const status = event.file.status;
    if (status !== 'uploading') {
      const status = event.file.status;     
      this.fileListInfo = event.file;
      if (status === 'done') {
        this.sendMessage('success', `${event.file.name} Archivo cargado satisfactoriamente.`);
      } else if (status === 'error') {
        this.sendMessage('error', `${event.file.name} archivo fallido, favor de validar.`);
      }
      if (event.file.originFileObj) {
        this.getBase64(event.file.originFileObj, (img: string) => {
          this.fileUrl = img;
          const fileRef = this.bucketStorage.ref(this.bucketPath);
          this.task = this.bucketStorage.ref(this.bucketPath).putString(img, 'data_url');
          // observe percentage changes
          this.uploadPercent = this.task.percentageChanges() as Observable<number>;
          this.uploadPercent.pipe(
            map(a => {
              return Number((a / 100).toFixed(2));
            })
          ).subscribe((value) => {
            this.uploading = value != 0;
            this.uploadvalue = value;
          })

          // get notified when the download URL is available
          this.task.snapshotChanges().pipe(
            finalize(() => {
              this.uploading = false;
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(async (url) => {
                this.updateAdvanceURL(url);
              });
            })
          ).subscribe();
        });
      }
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        if (reader.result !== null && typeof reader.result === 'string') {
            callback(reader.result);
        } else {
            // Handle the case where reader.result is null or not a string
            console.error('Invalid result from FileReader');
        }
    });
    reader.readAsDataURL(img);
}

  async updateAdvanceURL(url: string) {   
    this.validateForm.controls['imageUrl'].patchValue(url);
  }

}
