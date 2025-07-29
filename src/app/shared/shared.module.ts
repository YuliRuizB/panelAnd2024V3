import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { globalImputs } from './directives/global-imputs';
import { TableService } from './services/table.service';
import { TermsComponent } from './templates/terms/terms.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AgGridModule } from 'ag-grid-angular';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({ 
    schemas: [NO_ERRORS_SCHEMA],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        globalImputs,     
        SearchPipe,   
        ReactiveFormsModule,
        NzSelectModule,
        NzTableModule
      ],
    imports: [
        RouterModule,
        CommonModule,       
        FormsModule,
        ReactiveFormsModule,
        globalImputs,
        AgGridModule,
    ],
    declarations: [
        SearchPipe,
        CurrencyPipe,
        ReportsComponent,
    ],
    providers: [  
        TableService
    ]
})

export class SharedModule { }
