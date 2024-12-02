import { Component, OnInit, inject } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { QualityService } from '../../shared/services/quality.service';
import { RolService } from '../../shared/services/roles.service';

export interface IFileInfo {
  folder?: string;
  fileName?: string;
  fileUrl?: string;
  creation_date?: Date;
  
}
@Component({
  templateUrl: './quality-dashboard.component.html',
  styleUrls: ['./quality-dashboard.component.css']
})
export class QualityDashboardComponent implements OnInit {
  rolService = inject(RolService);
  authService = inject(AuthenticationService);
  isConfirmLoading: boolean = false; 
  fileUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = '/quality1/quality/';
  view: string = 'Ver';
  isVerVisible: boolean = false;
  isEditModalVisible: boolean = false;
  urlFile: string = "";
  // Upload Task 
  task: AngularFireUploadTask | undefined;
  // Progress in percentage
  uploadPercent!: Observable<number>;
  getMetadata: Observable<any> | undefined;
  uploadvalue: number = 0;
  downloadURL: Observable<string> | undefined;
  // Snapshot of uploading file
  snapshot: Observable<any> | undefined;
  // Uploaded File URL
  UploadedFileURL: Observable<string> | undefined;
  fileListInfo: any;
  validateForm!: UntypedFormGroup;

  rowFleetData: any[] | undefined;
  gridApi: any;
  gridApiDetail: any;
  gridColumnApiDetail: any;
  rowData?: IFileInfo[];
  rowFolders:any = [];
  qualitySubscription!: Subscription;
  addNewFolder: boolean = false;
  fileURL: string | undefined;
  fileName: string | undefined;
  selectedUid!: string;
  selectedRecord = [];
  public rowSelectionEdit: 'single' | undefined;
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  infoLoad: any = [];
  userlevelAccess: string | undefined;
  user: any;
  qualityService = inject(QualityService);

  constructor(private msg: NzMessageService,
    private bucketStorage: AngularFireStorage,
    private fb: UntypedFormBuilder) {

    //  console.log("Entro a reportsw");
      
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user && this.user.rolId != undefined) {
        this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
          this.infoLoad = item;
          this.userlevelAccess = this.infoLoad.optionAccessLavel;
        });
      }
    });  
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      folder: [''],
      fileUrl: [''],
      fileName: [''],
      NewFolderName: ['']
    });
    this.loadFiles();
  }
  sendMessage(type: string, message: string): void {
    this.msg.create(type, message);
  }

  loadFiles() {
    this.qualitySubscription = this.qualityService.getFiles().subscribe((files) => {
      this.rowData = files as IFileInfo[];
      if (files.length >= 0) {
        files.forEach((element: any) => {
          this.rowFolders.push(element["folder"]);
        });
        const unique = Array.from(new Set(this.rowFolders));
        this.rowFolders = unique;
      }
    });
  }

  ngOnDestroy() {
    this.qualitySubscription.unsubscribe();
  }


  submitForm() {
   // console.log("GuardarArchivo");
    var fileForm: Object;
    var fileinfoURL = this.fileURL || "";
    var folder = this.validateForm.controls['folder'].value || "";
    var fileName = this.fileName || "No-Name";
    var creation_date = new Date();
   // console.log(this.fileName);
    if (folder == "") {
      this.msg.error("Se requiere seleccionar una carpeta para almacenenar.");
    }

    if (fileinfoURL == "") {
      this.msg.error("Se requiere tener un archivo para subir.");
    }

    //console.log('url==' + this.fileURL);

    fileForm = {
      active: true,
      folder: folder,
      fileUrl: fileinfoURL,
      fileName: fileName,
      creation_date: creation_date,
      uid: ''
    }
    // console.log(fileForm);
    // save info 
    if (this.userlevelAccess != "3") {
      this.qualityService.saveFileCollection(fileForm)
        .then((success) => {
          this.msg.success("Se subio el archivo con éxito.");
          this.refreshTable();

        }).catch((err) => {
          this.msg.error("Se presento un error." + err);
        });
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
    }
  }

  changeFolder(event: any) {
   // console.log("changeFolder");
  }
  newFolder() {
    this.addNewFolder = true;
  }

  handleChange(event: NzUploadChangeParam): void {
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
                this.updateURL(url);              
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

  async updateURL(url: string) {
    this.fileURL = url;
  }

  private getBase64(file: File, callback: (img: string) => void): void {
    const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result as string);
  reader.onerror = error => console.log('Error: ', error);
}

  refreshTable() {
    this.loadFiles();
  }
/*   onGridReady(params: GridReadyEvent) {   
    this.gridApiDetail = params.api;
    this.gridColumnApiDetail = params.columnApi;
  }
 */
  newFolderSave() {
    const newFolderNameControl = this.validateForm.get('NewFolderName');
    if (newFolderNameControl && newFolderNameControl.value !== null) {
      this.rowFolders.push(newFolderNameControl.value);
          this.addNewFolder = false;
          this.validateForm.controls['NewFolderName'].setValue("");
    }   
  }


  handleOKEdit() {
    //console.log("borrararchivo." + this.view);
    //console.log(this.selectedRecord);

    if (!this.isVerVisible) {
      if (this.userlevelAccess == "1") {
        this.qualityService.deletePurchase(this.selectedUid);
        this.refreshTable();
        this.isEditModalVisible = false;
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
      }
    } else {
      this.isVerVisible = true;
    }
  }

  changeOption(value: number) {
    if (value == 2) {
      this.isVerVisible = false;
    } else {
      this.isVerVisible = true;
    }

  }

  handleCancelEdit() {
    this.isEditModalVisible = false;
  }

  handleChangeUpload(info: NzUploadChangeParam): void { 
    if (info.file.status !== 'uploading') {   

      if (info.file.status === 'done') {
        this.msg.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.msg.error(`${info.file.name} file upload failed.`);
      }
      if (info.file.originFileObj) {
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.fileUrl = img;

        const fileRef = this.bucketStorage.ref(this.bucketPath + info.file.name);
        // this.bucketPath +=  info.file.name;       
        this.task = this.bucketStorage.ref(this.bucketPath + info.file.name).putString(img, 'data_url');
        this.fileName = info.file.name;
        // Create a reference under which you want to list
        var listRef = this.bucketStorage.ref(this.bucketPath).child(info.file.name);
        //console.log(fileRef);
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
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(async (url) => {
              this.updateURL(url);
            });
          })
        ).subscribe();

      });
    }
    }
    //console.log( this.fileURL);

  }
}