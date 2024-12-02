import { Component, OnInit, OnDestroy, Input, TemplateRef, inject } from '@angular/core';
import { Observable, Subscription, Timestamp } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../../../interfaces/product.type';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
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
  productsListLoaded: Product[] = [];
  validateForm!: UntypedFormGroup;
  validateFormE!: UntypedFormGroup;
  infoLoad: any = [];
  userlevelAccess?: string;
  user: any;
  userService = inject(UsersService);
  authService = inject(AuthenticationService);
  fileListInfo: any = [];
  fileList: NzUploadFile[] = [];
  fileListE: NzUploadFile[] = [];
  fileUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = 'products1/products';
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
  previewImageE: string | undefined = '';
  camioneta: string = 'Camioneta';
  camion: string = 'Camión';
  previewVisible = false;
  previewVisibleE = false;
  weekControls: FormControl[] = [];
  weekControlsE: FormControl[] = [];

  constructor(
    private modal: NzModalService,
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

    this.validateForm.get('weeks')!.valueChanges.subscribe((weeks: number) => {
      this.onFrequencyChange(weeks);
    });
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
      price: [null, [Validators.required, Validators.min(1)]],
      timesSold: [0, [Validators.required]],
      type: ["Servicio"],
      rangeDatePicker: [null],
      validFrom: [new Date(), [Validators.required]],
      validTo: [new Date(), [Validators.required]],
      imageUrl: [''],
      frequencies: [''],
      transportType: [''],
      weeks: [''],
      disable: [false],
      rangeWeeks: this.fb.group({}),
      amountTrips: [0],
      id: [],
      sits: [0],
      isCalculate: [false],
      customerId: ['']
    });
    this.validateFormE = this.fb.group({
      active: [false, [Validators.required]],
      category: [null],
      date_created: [new Date()],
      description: [null, [Validators.required]],
      isTaskIn: [true],
      isTaskOut: [true],
      name: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      timesSold: [0],
      type: ["Servicio"],
      rangeDatePicker: [null],
      validFrom: [new Date()],
      validTo: [new Date()],
      imageUrl: [''],
      frequencies: [''],
      transportType: [''],
      weeks: [''],
      disable: [false],
      rangeWeeks: this.fb.group({}),
      amountTrips: [0],
      sits: [0],
      id: [],
      isCalculate: [],
      customerId: ['']
    });
  }

  get price() {
    return this.validateForm.get('price');
  }

  isPriceInvalid(): boolean {
    const control = this.price;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isPriceRequired(): boolean {
    const control = this.price;
    return !!(control && control.errors?.['required']);
  }

  isPriceMin(): boolean {
    const control = this.price;
    return !!(control && control.errors?.['min']);
  }

  resetForm() {
    this.fileList = [];
    this.fileListE = [];

    this.validateForm.reset({
      active: false,
      date_created: new Date(),
      isTaskIn: true,
      isTaskOut: true,
      price: 0,
      timesSold: 0,
      validFrom: new Date(),
      validTo: new Date(),
      frequencies: '',
      transportType: '',
      weeks: '',
      imageUrl: '',
      amountTrips: 0,
      sits: 0,
      customerId: ''
    });
    this.validateFormE.reset({
      active: false,
      date_created: new Date(),
      isTaskIn: true,
      isTaskOut: true,
      price: 0,
      timesSold: 0,
      validFrom: new Date(),
      validTo: new Date(),
      frequencies: '',
      transportType: '',
      imageUrl: '',
      weeks: '',
      amountTrips: 0,
      sits: 0,
      customerId: ''
    });
  }

  mapDateValues(event: any) {
    if (event.length > 1) {
      this.validateForm.controls['validFrom'].patchValue(new Date(event[0]));
      this.validateForm.controls['validTo'].patchValue(new Date(event[1]));
    }
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
  }


  submitForm(value: string) {
    var amountTrips: number = 0;
    if (this.userlevelAccess != "3") {
      if (value == 'A') {
        if (this.validateForm.valid) {
          const frequencies = this.validateForm.controls['frequencies'].value || 0;
          if (frequencies > 0) {
            amountTrips = Number(frequencies) * 80;
          }
          this.validateForm.controls['amountTrips'].setValue(amountTrips);
          this.validateForm.controls['type'].setValue("Servicio");
          this.validateForm.controls['disable'].setValue(false);
          this.validateForm.controls['customerId'].setValue(this.accountId);

          // console.log(this.validateForm.value);
          this.productsService.setProduct(this.accountId, this.validateForm.value).then(() => {
            this.resetForm();
            this.modalService.closeAll();
            this.messageService.success(`Todo salió bien.`, {
              nzPauseOnHover: true,
              nzDuration: 3000
            });
          })
        } else {
          this.sendMessage('error', "Hay valores requeridos para crear el producto, favor de validar.");
        }

      } else {
        if (this.validateFormE.valid) {
          const idProduct = this.validateFormE.controls['id'].value;
          const frequencies = this.validateFormE.controls['frequencies'].value || 0;
          if (frequencies > 0) {
            amountTrips = Number(frequencies) * 80;
          }
          this.validateFormE.controls['amountTrips'].setValue(amountTrips);
          this.validateFormE.controls['type'].setValue("Servicio");
          this.validateFormE.controls['disable'].setValue(false);
          this.validateFormE.controls['customerId'].setValue(this.accountId);
          this.productsService.updateProduct(this.accountId, this.validateFormE.controls['id'].value, this.validateFormE.value).then(() => {
            this.resetForm();
            this.modalService.closeAll();
            this.messageService.success(`Todo salió bien.`, {
              nzPauseOnHover: true,
              nzDuration: 3000
            });
          })
        } else {
          this.sendMessage('error', "Hay valores requeridos para crear el producto, favor de validar.");
        }

      }

    }
  }

  toggleActivateProduct(product: Product) {
    if (product.active) {
      this.showDeactivateConfirm(product);
    } else {
      this.processtoDeactivateProduct(this.accountId, product.id, product.active);
    }
  }


  showDeactivateConfirm(product: Product): void {
    this.modal.confirm({
      nzTitle: 'Estas Seguro de detener la venta? ',
      nzContent: `<b style="color: red;">${product.name}</b> será desacrivado. </b>  Una ves realizado todos los pases asociados se desactivaran`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => this.processtoDeactivateProduct(this.accountId, product.id, product.active),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  processtoDeactivateProduct(accountId: string, productId: string, active: boolean) {
    //desactiva/activa el servicio
    this.productsService.toggleProductActive(accountId, productId, active);
    this.productsService.toggleBoardingPass(productId, active);
    this.productsService.togglePurchaseRequests(productId, active);
  }

  getSubscriptions() {
    this.sub = this.usersService.getAccountProducts(this.accountId).pipe(
      map((actions: any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Product;
        return { ...data, id }; // Include id property only once
      }))
    ).subscribe((products: Product[]) => {
      this.productsList = products;
      this.productsListLoaded = products;
    });
  }

  deleteProduct(product: Product) {
    if (this.userlevelAccess == "1") {
      this.productsService.deleteProduct(this.accountId, product.id).then(() => {
        this.messageService.success(`El ${product.type} ${product.name} ha sido eliminado.`, {
          nzPauseOnHover: true,
          nzDuration: 3000
        });
        this.productsService.toggleBoardingPass(product.id, false);
        this.productsService.togglePurchaseRequests(product.id, false);
      })
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  initializeRangeDatePicker(val1: { seconds: number, nanoseconds: number }, val2: { seconds: number, nanoseconds: number }): [Date, Date] {

    const validFrom = this.convertTimestampToDate(val1);
    const validTo = this.convertTimestampToDate(val2);
    return [validFrom, validTo];
  }

  convertTimestampToDate(timestamp: { seconds: number, nanoseconds: number }): Date {
    return new Date(timestamp.seconds * 1000);
  }


  editProduct(item: any, editContent: TemplateRef<{}>) {
    this.resetForm();

    // Populate the rangeWeeks group with existing data

    const valores = this.initializeRangeDatePicker(item.validFrom, item.validTo) ?? null;

    this.validateFormE.patchValue({
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
      rangeDatePicker: valores, // Assuming rangeDatePicker is a control for date range, it's not patched here
      validFrom: item.validFrom || new Date(),
      validTo: item.validTo || new Date(),
      imageUrl: item.imageUrl || '',
      frequencies: item.frequencies || null,
      transportType: item.transportType || '',
      amountTrips: item.amountTrips || 0,
      weeks: item.weeks || 0,
      rangeWeeks: item.rangeWeeks || {},
      id: item.id,
      isCalculate: item.isCalculate || false,
      sits: item.sits || 0,
      customerId: item.customerId || ''
    });
    if (item.rangeWeeks != undefined) {
      const rangeWeeksGroup = this.validateFormE.get('rangeWeeks') as FormGroup;
      for (const [key, value] of Object.entries(item.rangeWeeks)) {
        rangeWeeksGroup.addControl(key, this.fb.control(value));
      }
    }
    this.validateFormE.get('category')?.disable();
    this.validateFormE.get('date_created')?.disable();
    this.validateFormE.get('timesSold')?.disable();
    this.validateFormE.get('type')?.disable();
    this.validateFormE.get('validFrom')?.disable();
    this.validateFormE.get('validTo')?.disable();
    this.validateFormE.get('isTaskIn')?.disable();
    this.validateFormE.get('isTaskOut')?.disable();


    const modal = this.modalService.create({
      nzTitle: 'Editar Producto / Servicio',
      nzContent: editContent,
      nzFooter: [{
        label: 'Guardar Cambios',
        type: 'primary',
        onClick: () => this.modalService.confirm(
          {
            nzTitle: '¿Estas seguro de los cambios?',
            nzOnOk: () => {
              this.submitForm('E');
            }
          }
        )
      },
      ],
      nzWidth: 800
    });
  }

  showNewModal(newContent: TemplateRef<{}>) {
    this.resetForm();
    const modal = this.modalService.create({
      nzTitle: 'Nuevo Servicio',
      nzContent: newContent,
      nzFooter: [{
        label: 'Crear',
        type: 'primary',
        onClick: () => this.modalService.confirm(
          {
            nzTitle: '¿Está seguro?',
            nzOnOk: () => {
              this.submitForm('A');
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
  handlePreviewE = (file: NzUploadFile) => {
    this.previewImageE = file.url || file.thumbUrl;
    this.previewVisibleE = true;
  };
  handleChange(event: NzUploadChangeParam): void {
    const status = event.file.status;
    if (status !== 'uploading') {
      this.fileList = event.fileList;
      if (event.file.originFileObj) {
        this.getBase64(event.file.originFileObj, (img: string) => {
          const fileName = event.file.name;
          const filePath = `${this.bucketPath}/${fileName}`;

          const fileRef = this.bucketStorage.ref(filePath);
          this.task = this.bucketStorage.ref(filePath).putString(img, 'data_url');

          // observe percentage changes
          this.uploadPercent = this.task.percentageChanges() as Observable<number>;
          this.uploadPercent.pipe(
            map(a => {
              return Number((a / 100).toFixed(2));
            })
          ).subscribe((value) => {
            this.uploading = value != 0;
            this.uploadvalue = value;
          });

          // get notified when the download URL is available
          this.task.snapshotChanges().pipe(
            finalize(() => {
              this.uploading = false;
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(async (url) => {
                this.updateAdvanceURL(url, 'A');

                if (url.length > 0) {
                  this.sendMessage('success', `${event.file.name} Archivo cargado satisfactoriamente.`);
                } else if (status === 'error') {
                  this.sendMessage('error', `${event.file.name} archivo fallido, favor de validar.`);
                }
              });
            })
          ).subscribe();
        });
      }
    }
  }


  handleChange2(event: NzUploadChangeParam): void {
    const status = event.file.status;
    if (status !== 'uploading') {
      const status = event.file.status;
      this.fileListE = event.fileList;
      if (event.file.originFileObj) {
        this.getBase64(event.file.originFileObj, (img: string) => {
          this.fileUrl = img;

          const fileName = event.file.name;
          const filePath = `${this.bucketPath}/${fileName}`;
          const fileRef = this.bucketStorage.ref(filePath);
          this.task = this.bucketStorage.ref(filePath).putString(img, 'data_url');
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
                this.updateAdvanceURL(url, 'E');
                if (url.length > 0) {
                  this.sendMessage('success', `${event.file.name} Archivo cargado satisfactoriamente.`);
                } else if (status === 'error') {
                  this.sendMessage('error', `${event.file.name} archivo fallido, favor de validar.`);
                }
              });
            })
          ).subscribe();
        });
      }
    }
  }

  private getBase64(file: File, callback: (result: string) => void): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result as string);
    reader.onerror = error => console.log('Error: ', error);
  }

  async updateAdvanceURL(url: string, info: string) {
    if (info == 'A') {
      this.validateForm.controls['imageUrl'].patchValue(url);
    } else {
      this.validateFormE.controls['imageUrl'].patchValue(url);
    }

  }
  onFrequencyChange(weeks: number): void {
    this.weekControls = [];
    const rangeWeeksGroup = this.fb.group({});
    for (let i = 0; i < weeks; i++) {
      const control = new FormControl(null);
      control.valueChanges.subscribe((date: Date | null) => this.getWeek(date, i));
      this.weekControls.push(control);
      rangeWeeksGroup.addControl(`week${i + 1}`, new FormControl(null));
    }
    this.validateForm.setControl('rangeWeeks', rangeWeeksGroup);
  }
  onFrequencyChangeE(weeks: number): void {
    this.weekControlsE = [];
    const rangeWeeksGroup = this.fb.group({});
    for (let i = 0; i < weeks; i++) {
      const control = new FormControl(null);
      control.valueChanges.subscribe((date: Date | null) => this.getWeekE(date, i));
      this.weekControlsE.push(control);
      rangeWeeksGroup.addControl(`week${i + 1}`, new FormControl(null));
    }
    this.validateFormE.setControl('rangeWeeks', rangeWeeksGroup);
  }

  getWeekNumber(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 1);
    const dayNr = (date.getDay() + 6) % 7;
    start.setDate(start.getDate() + 4 - (start.getDay() || 7));
    const weekNo = Math.ceil((((date.getTime() - start.getTime()) / 86400000) + 1) / 7);
    return weekNo.toString().padStart(2, '0');
  }

  getWeek(date: Date | null, index: number): void {
    if (date) {
      const weekYear = date.getFullYear();
      const weekNumber = this.getWeekNumber(date);
      const startDay = this.getStartOfWeek(new Date(date));
      const endDay = this.getEndOfWeek(new Date(date));
      const formattedWeek = {
        week: `${weekYear}-${weekNumber}`,
        startDay: startDay.toISOString().split('T')[0],
        endDay: endDay.toISOString().split('T')[0],
      };
      const rangeWeeks = this.validateForm.get('rangeWeeks') as FormGroup;
      rangeWeeks.controls[`week${index + 1}`].setValue(formattedWeek);
    }
  }

  getWeekE(date: Date | null, index: number): void {
    if (date) {
      const weekYear = date.getFullYear();
      const weekNumber = this.getWeekNumber(date);
      const startDay = this.getStartOfWeek(new Date(date));
      const endDay = this.getEndOfWeek(new Date(date));
      const formattedWeek = {
        week: `${weekYear}-${weekNumber}`,
        startDay: startDay.toISOString().split('T')[0],
        endDay: endDay.toISOString().split('T')[0],
      };
      const rangeWeeks = this.validateFormE.get('rangeWeeks') as FormGroup;
      rangeWeeks.controls[`week${index + 1}`].setValue(formattedWeek);
    }
  }

  getStartOfWeek(date: Date): Date {
    const copiedDate = new Date(date);
    copiedDate.setDate(copiedDate.getDate() + 7);
    const day = copiedDate.getDay(); // Get current day number  
    const diff = copiedDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust date to the previous Monday if Sunday, else to the Monday of the current week  
    copiedDate.setDate(diff);
    return new Date(copiedDate.setHours(0, 0, 0, 0));
  }

  getEndOfWeek(date: Date): Date {
    const startOfWeek = this.getStartOfWeek(date);
    // startOfWeek.setDate(startOfWeek.getDate() +7);
    startOfWeek.setUTCDate(startOfWeek.getUTCDate() + 4);
    return new Date(startOfWeek.setUTCHours(23, 59, 59, 999));
  }


  getItems(searchbar: any) {
    const q = searchbar;
    if (!q) {
      this.productsList = this.productsListLoaded.slice();
      return;
    }
    const text = q.toLowerCase();   
    this.productsList = this.productsListLoaded.filter((object: any) => {
      return object.description.toLowerCase().includes(text);
    }); 

  }

}
