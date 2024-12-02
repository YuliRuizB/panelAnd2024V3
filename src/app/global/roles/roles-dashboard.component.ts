import { Component, OnInit, inject   } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { RolService } from '../../shared/services/roles.service';
import { en_US } from 'ng-zorro-antd/i18n';;

interface formRol {
    uid?: string;
    id?: string;
    idForm?: string;
    name?: string;
    description?: string;
    active?:string
  }
@Component({
    templateUrl: './roles-dashboard.component.html',
    styleUrls: ['./roles-dashboard.component.css']
  })



  export class RolComponent implements OnInit{
    rolService = inject(RolService);
    list: Array<TransferItem & { description: string; icon: string }> = [];
    data:any = [];
    roles:any;
    forms:any;
    sub?: Subscription;
    isAddVisible:boolean = false;
    isEditVisible:boolean = false;
    validateAddRolForm!:UntypedFormGroup;
    validateEditRolForm!:UntypedFormGroup ;
    currentRolSelected: any;
    currendUidSelected: any;
    roldata:any;
    rolesCollection: AngularFirestoreCollection<any> | undefined;
    formCollection: AngularFirestoreCollection<any> | undefined;
    formRolCollection: AngularFirestoreCollection<any> | undefined;
    loadedRolesList: Array<any> = [];
    displayData: any;
    NameRol:string  = "";
    rolSelectedID: any;
    disabled = false;
    options = [
      { value: '1', label: 'Ver, Editar, Borrar' },
      { value: '2', label: 'Ver, Editar' },
      { value: '3', label: 'Ver' }
    ];
  
   

    constructor(public msg: NzMessageService ,
       private fb: UntypedFormBuilder,
       private afs: AngularFirestore
      ) {}
    
    ngOnInit() {
      

      this.validateAddRolForm = this.fb.group({
        name: ['',[Validators.required]],
        description: ['',[Validators.required]],
        rolId:['',[Validators.required]],
        optionAccessLavel:['',[Validators.required]],
        active: ['',[Validators.required]]     
      });
      this.validateEditRolForm = this.fb.group({
        name: ['',[Validators.required]],
        description: ['',[Validators.required]],
        rolId:['',[Validators.required]],
        optionAccessLavel:['',[Validators.required]],
        active:['',[Validators.required]]
      });
      this.geRolesList();
    //  this.getData();
     
    }
    geRolesList() {
      this.rolesCollection = this.afs.collection<any>('roles', ref => ref.orderBy('name'));
      this.roles = this.rolesCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(roles => {
        this.loadroles(roles);
      });
    }

    loadroles(roles: any) {
      if (this.loadedRolesList.length <= 1) {
        this.displayData = roles;
        this.roldata = _.orderBy(JSON.parse(JSON.stringify(roles)), ['name'], ['asc']);
        this.loadedRolesList = this.roldata;
       // console.log(this.loadedRolesList);
      }
    }
    ngOnDestroy() {
      if (this.roles) {
        this.roles.unsubscribe();
      }
      this.NameRol = "";
    
    }
  rolSelected(data: any) {
    this.disabled = false;
    this.list = [];
    this.currendUidSelected ="";
    this.currentRolSelected = data;
    this.NameRol = data.description;
    this.getFormRol(data.uid);
    this.rolSelectedID = data.uid;

  }

    getFormRol(uid:string){
      this.formRolCollection = this.afs.collection('roles').doc(uid).collection('forms', ref => ref.orderBy('name'));
      this.roles = this.formRolCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(roles => {
        console.log(roles);
        this.getData(uid,roles);
      });

    }

    getData(uid:string, formRoles: formRol[]): void {
      const ret: Array<TransferItem & { description: string; icon: string; direction:string, idForm:string}> = [];
      // Call forms getAllForms
      this.formCollection = this.afs.collection<any>('form', ref => ref.where('active', '==', "true").orderBy('name'));
      this.forms = this.formCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(forms => {
       // Se va a buscar los roles ya puestos dentro del rol.         
       
        for (const rolI in forms) {
          const result1 = this.searchInArrayOfObjects(formRoles, forms[rolI]["id"]);
          if (result1 != undefined) {
            ret.push({
              key: forms[rolI]["id"],
              title: forms[rolI]["name"],
              description: forms[rolI]["description"],
              icon: '',
              direction: 'right',
              idForm: forms[rolI]["id"]
            });
          } else {
            ret.push({
              key: forms[rolI]["id"],
              title: forms[rolI]["name"],
              description: forms[rolI]["description"],
              icon: '',
              direction: 'left',
              idForm:''
            });
          }
        }
        this.list = ret;
      });
     // console.log(ret);
    }
     searchInArrayOfObjects(array: formRol[], searchName: string): formRol | undefined {
      // Use the Array.prototype.find() method to search for the object with the matching name.
      // The method returns the object if found, otherwise, it returns undefined.
      return array.find((form: formRol) => form.idForm === searchName);
    }

    select(ret: any): void {
      this.formRolCollection = this.afs.collection('roles').doc(this.rolSelectedID).collection('forms', ref => ref.where('idForm', "==", ret.list[0]["idForm"]));
      this.roles = this.formRolCollection.snapshotChanges().pipe(
        map((actions:any) => actions.map((a: any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      ).subscribe(roles => {
        this.currendUidSelected = roles[0]["uid"];
      });

     if (this.NameRol == "Master") {
        this.msg.info("El Usuario Master no puede ser modificado");
      //  this.disabled= true;
      } else {

        if (ret.list.length >= 2) { 
          this.msg.error("Solo se puede seleccionar una forma a la vez.");
        }
        else {         
          if (ret.list[0]["title"] == "Perfiles" || ret.list[0]["title"] == "Roles"){
            this.msg.error("La forma Perfiles solo puede ser seleccionada por usuario Master");
          } else {
          console.log('nzSelectChange', ret);
        //  this.disabled = false;
          if (ret.list[0]["direction"] == 'right') {
            this.formRolCollection = this.afs.collection('roles').doc(this.rolSelectedID).collection('forms', ref => ref.where('idForm', "==", ret.list[0]["idForm"]));
            this.roles = this.formRolCollection.snapshotChanges().pipe(
              map((actions:any) => actions.map((a: any) => {
                const id = a.payload.doc.id;
                const data = a.payload.doc.data() as any;
                return { id, ...data }
              }))
            ).subscribe(roles => {
              this.currendUidSelected = roles[0]["uid"];
            });
          }
        }
        }
      }
    }
   change(ret:any): void {
    const idchanged = ret.list[0]["key"];
    const idtitle = ret.list[0]["title"];
    if (ret.from == 'left' && ret.to == 'right') {
     // console.log("from left to rigth"); // save record
      this.rolService.createFormRol(this.rolSelectedID, idchanged, idtitle).then((response) => {
      }).catch((err) => { console.log("error: " + err); });
      }
     if (this.NameRol == "Master") {
    //   this.disabled = true;
    
      } else {
  
    
       if (ret.list.length >= 2) {
         this.msg.error("Solo se puede seleccionar una forma a la vez.");
       }
       else {
         const idchanged = ret.list[0]["key"];
         const idtitle = ret.list[0]["title"];
         if (ret.from == 'left' && ret.to == 'right') {
          // console.log("from left to rigth"); // save record
           this.rolService.createFormRol(this.rolSelectedID, idchanged, idtitle).then((response) => {
           }).catch((err) => { console.log("error: " + err); });
         } else {  // delete the record
          // console.log("from left to rigth"); // delete record
           this.rolService.deleteformRol(this.rolSelectedID, this.currendUidSelected).then((response) => {
           }).catch((err) => { console.log("error: " + err); });

         }
       }
     }
    }

   
    showModalAddRol(){
      this.validateAddRolForm.controls['name'].setValue("");
      this.validateAddRolForm.controls['description'].setValue("");
      this.validateAddRolForm.controls['rolId'].setValue("");
     this.validateAddRolForm.controls['optionAccessLavel'].setValue("");
      this.validateAddRolForm.controls['active'].setValue(false);
      this.isAddVisible=true;
      this.isEditVisible = false;
    }

    showModalEditRol(currentRolSelected: any)  {
      if (currentRolSelected ==undefined) {
      this.msg.error("No has seleccionado ningun rol a editar");
    }
    else {
     console.log(currentRolSelected);
      this.validateEditRolForm.controls['name'].setValue(currentRolSelected.name);
      this.validateEditRolForm.controls['description'].setValue(currentRolSelected.description);
      this.validateEditRolForm.controls['rolId'].setValue(currentRolSelected.rolId);
      this.validateEditRolForm.controls['optionAccessLavel'].setValue(currentRolSelected.optionAccessLavel);
      this.validateEditRolForm.controls['active'].setValue(true);
      const uidRol  = currentRolSelected.id == undefined ? "" : currentRolSelected.id;   

      this.isAddVisible=false;
      this.isEditVisible = true;
    }
  }
   
   handleCancel(){
      this.isAddVisible=false;
      this.isEditVisible = false;
    }
    submitAddForm(){
        console.log(this.validateAddRolForm.value);
        console.log(this.validateAddRolForm.valid);
        if (this.validateAddRolForm.valid) {
         
          this.rolService.createRol(this.validateAddRolForm.value).then((response) => {
            this.isAddVisible = false;
             this.msg.success("Se agregó con exito el rol, favor de actualizar la pagina");
          }).catch ( (err) => { console.log("error: "+ err); }); 
        
        } else {
          this.msg.success("El Formulario no es valido favor de validar");
        }
    }

    submitEditForm(){
      console.log(this.validateEditRolForm.value);
      console.log(this.validateEditRolForm.valid);

      const data = {       
        name : this.validateEditRolForm.controls['name'].value,
        description : this.validateEditRolForm.controls['description'].value,
        active: this.validateEditRolForm.controls['active'].value,
        optionAccessLavel: this.validateEditRolForm.controls['optionAccessLavel'].value,
        rolId:this.validateEditRolForm.controls['rolId'].value,
        uid: this.currentRolSelected.uid,
        id: this.currentRolSelected.id
      };


      if (this.validateEditRolForm.valid) {
        this.rolService.updateRol(this.currentRolSelected.uid, data)
        .then( (success) => {
          this.isEditVisible = false;
        }).catch ( (err) => { console.log("error: "+ err); });  
      } else {
        this.msg.success("El Formulario no es valido favor de validar");
      }

    }
  
 
   
  }

 