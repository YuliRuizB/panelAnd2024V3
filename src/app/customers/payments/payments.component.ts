import { Component, OnInit, ViewChild  } from '@angular/core';
import { ThemeConstantService } from '../../shared/services/theme-constant.service';
import { AppsService } from '../../shared/services/apps.service';
//import { NzContextMenuService } from 'ng-zorro-antd';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponents implements OnInit {
    @ViewChild('dropdown') dropdown: any;
    files!:any [];
    selected: string | null = null;
    themeColors = this.colorConfig.get().colors;
    selectedFile = '';
    listView = false;
    isDetailsOpen = false;
    isNavOpen = false;

    colorRed = this.themeColors.red;
    colorBlue = this.themeColors.blue;
    colorCyan = this.themeColors.cyan;
    colorGold = this.themeColors.gold;
    colorVolcano = this.themeColors.volcano;
    colorPurple = this.themeColors.purple;

    constructor(
        private colorConfig: ThemeConstantService,      
        private fileManagerSvc: AppsService ) {
    }

    ngOnInit(): void {
    }  //TODO

    changeView() {
        this.listView = !this.listView;
    }

    contextMenu(event: MouseEvent, fileName: any, selected: any): void {
        //contextMenu(event: MouseEvent, contextDropdownTpl: NzDropdownMenuComponent, fileName: string): void {
        //this.nzContextMenuService.create($event, contextDropdownTpl);
        event.preventDefault();
        //this.selectedFile = fileName;
        this.selectedFile = fileName;
        this.isDetailsOpen = true;
        //this.contextDropdown.create(event);
        this.dropdown.nzVisible = true;
    }

    selectFile(selected: string) {
        this.selectedFile = selected;
        this.isDetailsOpen = true;
    }

    unselectFile() {
        this.selectedFile = '';
    }

    close(): void {
       // this.nzContextMenuService.close();
    }

    closeContentDetails() {
        this.isDetailsOpen = false;
    }

    navToggler() {
        this.isNavOpen = !this.isNavOpen;
    }
}
