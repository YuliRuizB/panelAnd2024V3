import { Component, Input, OnInit, inject } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { RolService } from '../../../services/roles.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { PromotionService } from '../../../services/promotions.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  @Input() accountId: string = '';
  pageSize3:number = 3;
  loadingLatestPurchases: boolean = false;
  rolService = inject(RolService);
  promotionsService = inject(PromotionService);
  authService = inject(AuthenticationService);
  view: string = 'cardView';
  sub?: Subscription;
  user: any;
  userlevelAccess!:string;
  validateForm!: UntypedFormGroup;
  infoLoad: any = [];
  programForm!: UntypedFormGroup;
  programEditForm:UntypedFormGroup;
  isCreateVisible: boolean = false;
  isEditMode: boolean = false;
  currentSelectedId!: string;
  currentSelected: any;
  fileListInfo: any = [];
  fileList: any;
  fileUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = 'promotions/';
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
    pageSize: number = 10;
    usersList: any = [];
    columnDefs: any;
    rowGroupPanelShow = [];
    popupParent: any
    gridApi: any;
    gridColumnApi: any;;
    promotionsList:any = [];
    promotionsListLoaded:any= [];
    showUploadList = {
      showPreviewIcon: true,
      showRemoveIcon: true,
      hidePreviewIconInNonImage: true
    };
    previewImage: string | undefined = '';
    previewVisible = false;
    isEditVisible:boolean = false;

  constructor(    
    private bucketStorage: AngularFireStorage, 
    private messageService: NzMessageService,
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

  this.programEditForm = this.fb.group({
    imageUrl: [''],
    active: [''],
    uid: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: [],
    validFrom: [new Date()],
    validTo: [new Date()],
    date_created: []
  })
  this.createForm();
  }

  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  editPromotion(uid: any,name:string, description:string,validFrom:Date, validTo:Date){
    this.programEditForm.controls['uid'].setValue(uid);
    this.programEditForm.controls['name'].setValue(name);
    this.programEditForm.controls['description'].setValue(description);
    this.programEditForm.controls['validFrom'].setValue(validFrom);
    this.programEditForm.controls['validTo'].setValue(validTo);
    this.isEditVisible = true;
 
  }
  deletePromotiom(uid: any){
   // console.log("borrar promocion " + uid);
     this.promotionsService.deletePromotion(this.accountId, uid); 
  }
  diactivePromotion(value:boolean, uid: any){
    //console.log("desactivar promocion " + uid);
    this.promotionsService.deactivePromotion(uid,value,this.accountId);  
  }

  promotionSelected(data:any) {
    
  }
  createForm() {
    this.programForm = this.fb.group({
      imageUrl: [''],
      active: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [],
      validFrom: [],
      validTo: [],
      date_created: []
    })
  }
  toggleActive() {

  }

  ngOnInit() {  
  //  console.log(this.accountId);
    this.sub = this.promotionsService.getPromotionsList(this.accountId).pipe(
      map((actions:any) => actions.map((a: any) => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    )
      .subscribe((prom: any) => {       
        this.promotionsList = prom;
        this.promotionsListLoaded = prom;
      });
  }
  showCreateModal() {
    this.programForm.reset();
    this.isCreateVisible = true;
    this.currentSelectedId = "";
    this.currentSelected = null;
  }

  showModalDelete(data: any) {
  //  console.log(data);
   /*  if (this.userlevelAccess == "1") {
      this.routesService.deleteRouteAssignments(this.accountId, data.routeId, data.id).then(() => {
        this.isCreateVisible = false;
        this.isEditMode = false;
      })
        .catch(err => console.log(err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    } */
   
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}

  handleCancel() {
    this.isCreateVisible = false;
    this.isEditMode = false;
    this.currentSelectedId = "";
    this.isEditVisible = false;
  }

  createPromotion() {
  //  console.log(this.programForm.valid);
    if (this.programForm.valid) {
      var advanceForm: object;
      advanceForm = {
        active: true,    
        name: this.programForm.controls['name'].value,
        description: this.programForm.controls['description'].value, 
        validFrom: this.programForm.controls['validFrom'].value,
        validTo: this.programForm.controls['validTo'].value,
        imageUrl: this.programForm.controls['imageUrl'].value || "",
        customerId:  this.user.customerId,
        category: "",
        date_created :  this.programForm.controls['date_created'].value 
      };  

   //   console.log(advanceForm);
      if (this.userlevelAccess != "3") {
        this.promotionsService.savePromotion(advanceForm,this.accountId).then(() => {          
          this.messageService.success(`Se agregó la promoción con éxito.`, {
            nzPauseOnHover: true,
            nzDuration: 3000
          });
          this.isCreateVisible = false;
        })
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
    }
  }
  handleChange2(event: NzUploadChangeParam): void {
    const status = event.file.status;
    if (status !== 'uploading') {
      const status = event.file.status;     
      this.fileListInfo = event.fileList;
     
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
                this.updateAdvanceURL(url);
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



  private getBase64(file: File, callback: (img: string) => void): void {
    const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result as string);
  reader.onerror = error => console.log('Error: ', error);
}

  async updateAdvanceURL(url: string) {   
    this.programForm.controls['imageUrl'].patchValue(url);
  }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

/*   getGridOptions(): GridOptions {
    return {
      columnDefs: this.columnDefs,
      context: {
        thisComponent: this
      },
      rowData: null,
      rowSelection: 'single',
      pagination: true,
      paginationPageSize: this.pageSize,
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
      enableRangeSelection: true
    };
  } */
  setPaginationPageSize(pageSize: number = 10) {
    this.pageSize = pageSize;   
    this.gridApi.paginationSetPageSize(Number(pageSize));
  }

  editSavePromotion() {
    console.log("save");
    if (this.programEditForm.valid) {


     this.promotionsService.editPromotion( this.programEditForm.controls['uid'].value,this.accountId, this.programEditForm.controls['name'].value ,  this.programEditForm.controls['description'].value,
     this.programEditForm.controls['validFrom'].value,  this.programEditForm.controls['validTo'].value).then(() => {          
        this.messageService.success(`Todo salió bien.`, {
          nzPauseOnHover: true,
          nzDuration: 3000
        });
      }) 
      this.isEditVisible = false;
    } else {
      this.sendMessage("error", "Datos invalidos favor de validar");
    }
 
  }

  getItems(searchbar: any) {
    const q = searchbar; // Assuming `searchbar` is an input element and you want to extract its value    
    if (!q) {       
        // If the search query is empty, reset the devicesList to its original state
        this.promotionsList = this.promotionsListLoaded.slice();
        return; 
    }
    const text = q.toLowerCase(); // Using `toLowerCase()` instead of `toLower()` for lowercase conversion   
    this.promotionsList = this.promotionsListLoaded.filter((object: any) => {
        // Check if any property of the object contains the search text
        return Object.values(object).some((value: any) => {
            // Convert the property value to lowercase and check if it includes the search text
            return String(value).toLowerCase().includes(text);
        });
    });
}



}
